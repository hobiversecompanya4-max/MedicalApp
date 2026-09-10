import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 up to `target` once the element scrolls into view.
 */
const AnimatedCounter = ({
  target = 100,
  duration = 1600,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setValue(target)
      return undefined
    }

    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [target])

  useEffect(() => {
    if (!started) return undefined

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setValue(target)
      return undefined
    }

    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export default AnimatedCounter