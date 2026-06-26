let observer = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -40px 0px'
    }
  )
  return observer
}

/**
 * 观察所有 .fade-in 元素
 */
export function observeFadeIns(container = document) {
  const els = container.querySelectorAll('.fade-in:not(.is-visible)')
  const obs = getObserver()
  els.forEach((el) => obs.observe(el))
}

/**
 * 为元素添加 fade-in 类并观察
 */
export function fadeInElement(el, delay = 0) {
  el.classList.add('fade-in')
  if (delay > 0) {
    el.style.transitionDelay = `${delay}s`
  }
  const obs = getObserver()
  obs.observe(el)
}
