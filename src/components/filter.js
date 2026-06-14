export function initFilter(container, categories, onFilter) {
  container.innerHTML = `
    <div class="filter-bar__inner">
      ${categories
        .map(
          (cat) =>
            `<button class="filter-bar__btn ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button>`
        )
        .join('')}
    </div>
  `

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-bar__btn')
    if (!btn) return

    container.querySelectorAll('.filter-bar__btn').forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    onFilter(btn.dataset.category)
  })
}
