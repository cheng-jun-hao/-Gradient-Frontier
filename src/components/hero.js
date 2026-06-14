export function initHero() {
  const hero = document.getElementById('hero')
  if (!hero) return

  const layer1 = hero.querySelector('.hero__matrix--layer1')
  const layer2 = hero.querySelector('.hero__matrix--layer2')
  const spotlight = hero.querySelector('.hero__spotlight')

  // 生成文字矩阵
  const textEn = 'GRADIENT FRONTIER'
  const textCn = '梯度前沿'
  const rowCount = 12

  function generateRows(container, offset = false) {
    for (let i = 0; i < rowCount; i++) {
      const row = document.createElement('div')
      row.className = `hero__matrix-row ${i % 2 === 0 ? '' : 'hero__matrix-row--alt'}`
      const text = i % 3 === 0 ? textCn : textEn
      // 重复足够多以填满宽度
      row.textContent = Array(20).fill(text).join('  ·  ')
      container.appendChild(row)
    }
  }

  generateRows(layer1)
  generateRows(layer2, true)

  // 鼠标跟随光效
  let mouseX = 0
  let mouseY = 0
  let prevMouseX = 0
  let prevMouseY = 0
  let velocityX = 0
  let velocityY = 0
  let rafId = null

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top

    // 计算速度
    velocityX = mouseX - prevMouseX
    velocityY = mouseY - prevMouseY
    prevMouseX = mouseX
    prevMouseY = mouseY
  })

  function animate() {
    // 光效位置
    const spotSize = 350
    spotlight.style.background = `radial-gradient(circle ${spotSize}px at ${mouseX}px ${mouseY}px, var(--hero-matrix-color-lit) 0%, transparent 100%)`

    // 视差偏移 — 两层不同速率
    const centerX = hero.offsetWidth / 2
    const centerY = hero.offsetHeight / 2
    const offsetX1 = (mouseX - centerX) * 0.02
    const offsetY1 = (mouseY - centerY) * 0.02
    const offsetX2 = (mouseX - centerX) * -0.015
    const offsetY2 = (mouseY - centerY) * -0.015

    layer1.style.transform = `translate(${offsetX1}px, ${offsetY1}px)`
    layer2.style.transform = `translate(${offsetX2}px, ${offsetY2}px)`

    // 快速移动拉伸
    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY)
    const stretch = Math.min(speed * 0.003, 0.15)
    const angle = Math.atan2(velocityY, velocityX)
    const scaleX = 1 + stretch * Math.abs(Math.cos(angle))
    const scaleY = 1 + stretch * Math.abs(Math.sin(angle))

    spotlight.style.transform = `translate(-50%, -50%) scaleX(${scaleX}) scaleY(${scaleY}) rotate(${angle}rad)`

    // 衰减速度
    velocityX *= 0.92
    velocityY *= 0.92

    rafId = requestAnimationFrame(animate)
  }

  rafId = requestAnimationFrame(animate)

  // 清理
  hero.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0'
  })
}
