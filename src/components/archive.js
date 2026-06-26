import { formatDateShort, getMonthKey, getMonthLabel, sortByDateDesc } from '../utils/helpers.js'
import { fadeInElement } from '../utils/animations.js'
import { openModal } from './modal.js'

export function renderArchive(news, container) {
  const sorted = sortByDateDesc(news)

  // 按月份分组
  const groups = {}
  sorted.forEach((item) => {
    const key = getMonthKey(item.date)
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  })

  container.innerHTML = ''

  Object.entries(groups).forEach(([monthKey, items], groupIndex) => {
    const monthDiv = document.createElement('div')
    monthDiv.className = 'archive-month'

    monthDiv.innerHTML = `
      <div class="archive-month__label">${getMonthLabel(monthKey)}</div>
      ${items
        .map(
          (item) => `
        <div class="archive-item" data-id="${item.id}">
          <span class="archive-item__date">${formatDateShort(item.date)}</span>
          <div>
            <div class="archive-item__title">${item.title}</div>
            <div class="archive-item__tags">
              ${item.tags.map((t) => `<span class="archive-item__tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `
        )
        .join('')}
    `

    monthDiv.querySelectorAll('.archive-item').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.dataset.id
        const item = sorted.find((n) => n.id === id)
        if (item) openModal(item)
      })
    })

    fadeInElement(monthDiv, groupIndex * 0.05)
    container.appendChild(monthDiv)
  })
}
