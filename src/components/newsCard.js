import { formatDate } from '../utils/helpers.js'
import { fadeInElement } from '../utils/animations.js'
import { openModal } from './modal.js'

export function renderCards(news, container) {
  container.innerHTML = ''

  if (news.length === 0) {
    container.innerHTML = '<div class="no-results">没有找到匹配的资讯</div>'
    return
  }

  news.forEach((item, index) => {
    const card = document.createElement('article')
    card.className = 'news-card'
    card.innerHTML = `
      ${item.featured ? '<span class="news-card__badge">精选</span>' : ''}
      <div class="news-card__date">${formatDate(item.date)}</div>
      <h3 class="news-card__title">${item.title}</h3>
      <p class="news-card__summary">${item.summary}</p>
      <div class="news-card__tags">
        ${item.tags.map((tag) => `<span class="news-card__tag">${tag}</span>`).join('')}
      </div>
      <div class="news-card__source">
        来源：<a href="${item.sourceUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${item.source}</a>
      </div>
    `

    card.addEventListener('click', () => openModal(item))

    fadeInElement(card, index * 0.05)
    container.appendChild(card)
  })
}
