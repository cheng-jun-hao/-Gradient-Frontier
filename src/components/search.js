import { debounce } from '../utils/helpers.js'

export function initSearch(container, onSearch) {
  container.innerHTML = `
    <div class="search-bar__inner">
      <svg class="search-bar__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input type="text" class="search-bar__input" placeholder="搜索资讯..." id="search-input">
    </div>
  `

  const input = document.getElementById('search-input')
  if (!input) return

  const debouncedSearch = debounce((value) => {
    onSearch(value)
  }, 200)

  input.addEventListener('input', (e) => {
    debouncedSearch(e.target.value.trim())
  })
}
