import './styles/main.css'
import './styles/nav.css'
import './styles/archive.css'
import './styles/cards.css'

import { initNav } from './components/nav.js'
import { initModal } from './components/modal.js'
import { renderArchive } from './components/archive.js'
import { initSearch } from './components/search.js'
import { initFilter } from './components/filter.js'
import { observeFadeIns } from './utils/animations.js'
import { sortByDateDesc } from './utils/helpers.js'
import newsData from './data/news.json'

const { categories, news } = newsData
const sortedNews = sortByDateDesc(news)

let currentCategory = 'all'
let currentSearch = ''

function getFilteredNews() {
  return sortedNews.filter((item) => {
    if (currentCategory !== 'all') {
      const categoryObj = categories.find((c) => c.id === currentCategory)
      if (categoryObj && !item.tags.includes(categoryObj.name)) {
        return false
      }
    }
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

function updateArchive() {
  const filtered = getFilteredNews()
  const list = document.getElementById('archive-list')
  renderArchive(filtered, list)
}

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initModal()

  initSearch(document.getElementById('archive-search-bar'), (query) => {
    currentSearch = query
    updateArchive()
  })

  initFilter(document.getElementById('archive-filter-bar'), categories, (catId) => {
    currentCategory = catId
    updateArchive()
  })

  updateArchive()
  observeFadeIns()
})
