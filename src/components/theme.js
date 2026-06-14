const STORAGE_KEY = 'gf-theme'

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return stored
  return 'light'
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  updateIcons(theme)
}

function updateIcons(theme) {
  const sunIcon = document.querySelector('.icon-sun')
  const moonIcon = document.querySelector('.icon-moon')
  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.display = 'none'
      moonIcon.style.display = 'block'
    } else {
      sunIcon.style.display = 'block'
      moonIcon.style.display = 'none'
    }
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  localStorage.setItem(STORAGE_KEY, next)
  applyTheme(next)
}

// 初始化主题
applyTheme(getPreferredTheme())

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light')
  }
})

// 绑定切换按钮
document.addEventListener('click', (e) => {
  if (e.target.closest('#theme-toggle')) {
    toggleTheme()
  }
})
