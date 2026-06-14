/**
 * 防抖函数
 */
export function debounce(fn, delay = 200) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * 格式化日期为中文
 */
export function formatDate(dateStr) {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year} 年 ${month} 月 ${day} 日`
}

/**
 * 格式化日期为简短
 */
export function formatDateShort(dateStr) {
  const d = new Date(dateStr)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

/**
 * 获取年月分组键
 */
export function getMonthKey(dateStr) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/**
 * 获取年月中文标签
 */
export function getMonthLabel(key) {
  const [year, month] = key.split('-')
  return `${year} 年 ${parseInt(month)} 月`
}

/**
 * 按日期降序排序
 */
export function sortByDateDesc(items) {
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date))
}
