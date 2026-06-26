import './styles/main.css'
import './styles/nav.css'

import { initNav } from './components/nav.js'
import { observeFadeIns } from './utils/animations.js'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  observeFadeIns()
})
