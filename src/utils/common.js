// 公共级联方法

export function getCascaderOptions(arr, ids) {
  arr.forEach(({
    name,
    id,
    childrens
  }) => {
    const data = {
      label: name,
      value: id
    }
    if (childrens.length) {
      getCascaderOptions(childrens, data.children = [])
    }
    ids.push(data)
  })
  return ids
}
