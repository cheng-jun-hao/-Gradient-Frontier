import './theme.js'

export function initNav() {
  const nav = document.getElementById('navbar')
  if (!nav) return

  const currentPath = window.location.pathname
  const isArchive = currentPath.includes('archive')

  nav.className = 'nav'
  nav.innerHTML = `
    <div class="nav__inner">
      <a href="${import.meta.env.BASE_URL}" class="nav__logo">
        <span>梯度前沿</span>
        <span class="nav__logo-en">Gradient Frontier</span>
      </a>
      <div class="nav__links" id="nav-links">
        <a href="${import.meta.env.BASE_URL}" class="nav__link ${!isArchive ? 'active' : ''}">首页</a>
        <a href="${import.meta.env.BASE_URL}archive.html" class="nav__link ${isArchive ? 'active' : ''}">归档</a>
        <button class="nav__theme-btn" id="theme-toggle" aria-label="切换主题">
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <button class="nav__menu-btn" id="menu-toggle" aria-label="菜单">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `

  // 移动端菜单切换
  const menuBtn = document.getElementById('menu-toggle')
  const links = document.getElementById('nav-links')
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open')
      links.classList.toggle('open')
    })
  }
}
