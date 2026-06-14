import './styles/main.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/cards.css'
import './styles/intro.css'

import { initNav } from './components/nav.js'
import { initHero } from './components/hero.js'
import { renderCards } from './components/newsCard.js'
import { initSearch } from './components/search.js'
import { initFilter } from './components/filter.js'
import { initModal } from './components/modal.js'
import { sortByDateDesc } from './utils/helpers.js'
import { observeFadeIns } from './utils/animations.js'
import { playIntro } from './components/intro.js'
import newsData from './data/news.json'

const { categories, news } = newsData
const sortedNews = sortByDateDesc(news)

// 当前筛选状态
let currentCategory = 'all'
let currentSearch = ''

function getFilteredNews() {
  return sortedNews.filter((item) => {
    // 分类筛选
    if (currentCategory !== 'all') {
      const categoryObj = categories.find((c) => c.id === currentCategory)
      if (categoryObj && !item.tags.includes(categoryObj.name)) {
        return false
      }
    }
    // 搜索筛选
    if (currentSearch) {
      const query = currentSearch.toLowerCase()
      const matchTitle = item.title.toLowerCase().includes(query)
      const matchSummary = item.summary.toLowerCase().includes(query)
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(query))
      if (!matchTitle && !matchSummary && !matchTags) return false
    }
    return true
  })
}

function updateCards() {
  const filtered = getFilteredNews()
  const grid = document.getElementById('news-grid')
  renderCards(filtered, grid)
}

// 初始化
document.addEventListener('DOMContentLoaded', async () => {
  await playIntro()

  initNav()
  initHero()
  initModal()

  initSearch(document.getElementById('search-bar'), (query) => {
    currentSearch = query
    updateCards()
  })

  initFilter(document.getElementById('filter-bar'), categories, (catId) => {
    currentCategory = catId
    updateCards()
  })

  updateCards()
  observeFadeIns()
})
