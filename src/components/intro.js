const GLITCH_CHARS = '梯度前沿GFRNTX0123456789'

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function playIntro() {
  const intro = document.getElementById('intro')
  if (!intro) return Promise.resolve()

  // 检查是否已播放过（session 级别）
  if (sessionStorage.getItem('gf-intro-done')) {
    intro.remove()
    return Promise.resolve()
  }

  const charsContainer = document.getElementById('intro-chars')
  const titleChars = '梯度前沿'

  // 创建中文字符元素
  titleChars.split('').forEach((char) => {
    const span = document.createElement('span')
    span.className = 'intro__char'
    span.textContent = char
    span.setAttribute('data-glitch', randomChar())
    charsContainer.appendChild(span)
  })

  return runAnimation(intro, titleChars)
}

async function runAnimation(intro, titleChars) {
  // 阻止页面滚动
  document.body.style.overflow = 'hidden'

  // Phase 1: 网格线展开
  await sleep(200)
  intro.querySelectorAll('.intro__grid-line').forEach((line, i) => {
    setTimeout(() => line.classList.add('is-drawn'), i * 80)
  })

  // Phase 2: 扫描线
  await sleep(400)
  const line = intro.querySelector('.intro__line')
  line.classList.add('animate')

  // Phase 3: 逐字显现 + 闪烁
  await sleep(600)
  const chars = intro.querySelectorAll('.intro__char')

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]

    // 闪烁阶段：快速随机变换字符
    let flickerCount = 0
    const flickerMax = 6
    const flickerInterval = setInterval(() => {
      char.setAttribute('data-glitch', randomChar())
      flickerCount++
      if (flickerCount >= flickerMax) {
        clearInterval(flickerInterval)
        char.setAttribute('data-glitch', char.textContent)
        char.classList.add('is-revealed')
      }
    }, 40)

    await sleep(80)
  }

  // Phase 4: 英文副标题
  await sleep(200)
  intro.querySelector('.intro__en').classList.add('is-revealed')

  // Phase 5: 标语 + 光点
  await sleep(300)
  intro.querySelector('.intro__tagline').classList.add('is-revealed')
  intro.querySelector('.intro__center').classList.add('is-revealed')

  // Phase 6: 停留后退出
  await sleep(1000)
  intro.classList.add('is-exiting')

  await sleep(900)
  intro.remove()
  document.body.style.overflow = ''
  sessionStorage.setItem('gf-intro-done', '1')
}
