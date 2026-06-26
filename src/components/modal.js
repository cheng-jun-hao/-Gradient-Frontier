import { formatDate } from '../utils/helpers.js'

export function initModal() {
  const modal = document.getElementById('modal')
  if (!modal) return

  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
  })

  // 点击遮罩关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
}

export function openModal(item) {
  const modal = document.getElementById('modal')
  if (!modal) return

  modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__content">
      <button class="modal__close" id="modal-close" aria-label="关闭">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="modal__header">
        <div class="modal__date">${formatDate(item.date)}</div>
        <h2 class="modal__title">${item.title}</h2>
        <div class="modal__tags">
          ${item.tags.map((tag) => `<span class="news-card__tag">${tag}</span>`).join('')}
        </div>
        <div class="modal__ai-notice">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10"></path>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <span>内容由 AI 辅助生成，仅供参考</span>
        </div>
      </div>
      <div class="modal__body">
        ${item.content.split('\n').map((p) => `<p>${p}</p>`).join('')}
      </div>
      <div class="modal__footer">
        <span>来源：<a href="${item.sourceUrl}" target="_blank" rel="noopener">${item.source}</a></span>
      </div>
    </div>
  `

  modal.classList.add('open')
  document.body.style.overflow = 'hidden'

  document.getElementById('modal-close').addEventListener('click', closeModal)
}

function closeModal() {
  const modal = document.getElementById('modal')
  if (!modal) return
  modal.classList.remove('open')
  document.body.style.overflow = ''
}
