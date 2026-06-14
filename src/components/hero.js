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
      row.textContent = Array(20).fill(text).join('  ·  ')
      container.appendChild(row)
    }
  }

  generateRows(layer1)
  generateRows(layer2, true)

  // 鼠标跟随光效
  let mouseX = 0
  let mouseY = 0

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top

    spotlight.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 198, 255, 0.07), transparent 40%)`
  })

  // 清理
  hero.addEventListener('mouseleave', () => {
    spotlight.style.background = 'none'
  })
}
