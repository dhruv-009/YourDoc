function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

// function emptyOrRows(rows) {
//     if (!rows) {
//         return [];
//     }
//     return rows;
// }

function emptyOrRows(rows) {
    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return [];
    } else {
      return rows;
    }
  }

module.exports = {
    getOffset,
    emptyOrRows
}