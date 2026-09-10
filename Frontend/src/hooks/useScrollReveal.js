import { useEffect } from 'react'

/**
 * Observes every `.reveal`, `.reveal-left`, `.reveal-right` and
 * `.reveal-zoom` element on the page and adds `.is-visible` when it
 * scrolls into view. Hidden state is only applied while
 * `html[data-reveal="on"]` is present, so content still displays
 * when JavaScript is unavailable. The MutationObserver re-scans for
 * elements mounted after the initial render (route changes, accordions).
 */
const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-zoom'

const useScrollReveal = () => {
  useEffect(() => {
    if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    document.documentElement.setAttribute('data-reveal', 'on')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((element) => {
        if (!element.classList.contains('is-visible')) {
          observer.observe(element)
        }
      })
    }

    const mutationObserver = new MutationObserver(scan)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    scan()

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}

export default useScrollReveal