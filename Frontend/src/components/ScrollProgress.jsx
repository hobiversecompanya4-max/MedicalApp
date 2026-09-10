import { useEffect, useState } from 'react'

/**
 * Fixed gradient progress bar pinned to the top of the viewport.
 * Width tracks how far the page has been scrolled.
 */

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY ?? document.documentElement.scrollTop
      const ratio = scrollable > 0 ? scrolled / scrollable : 0
      setProgress(Math.min(Math.max(ratio * 100, 0), 100))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div aria-hidden="true" className="scroll-progress" style={{ width: `${progress}%` }} />
}

export default ScrollProgress