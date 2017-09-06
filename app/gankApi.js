const PAGE_NUM = 15;

export function fetchGankCategoryList(category, start) {
  let url = `http://gank.io/api/data/${category}/${PAGE_NUM}/${start}`
  return fetch(url).then(response => response.json())
}