export function pageData(pageSize, pageno, total, listData) {
  return {
    pageSize: pageSize,
    pageno: pageno,
    total: total,
    data: listData
  }
}