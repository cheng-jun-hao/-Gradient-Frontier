import './styles/main.css'
import './styles/nav.css'
import './styles/archive.css'

import { initNav } from './components/nav.js'
import { initModal } from './components/modal.js'
import { renderArchive } from './components/archive.js'
import { observeFadeIns } from './utils/animations.js'
import newsData from './data/news.json'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initModal()

  const list = document.getElementById('archive-list')
  renderArchive(newsData.news, list)

  observeFadeIns()
})
