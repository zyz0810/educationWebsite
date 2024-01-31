// 在JS文件中引入这两个插件
import JSZip from 'jszip'
import FileSaver from 'file-saver'

/**
 * 获取图片的 base64 编码
 * @param image 图像对象
 * @return {string} 返回base64编码
 */
const getImageBase64  = image => {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, image.width, image.height)
  // 获取图片后缀名
  const extension = image.src
    .substring(image.src.lastIndexOf('.') + 1)
    .toLowerCase()
  // 某些图片 url 可能没有后缀名，默认是 png
  return canvas.toDataURL('image/' + extension, 1)
}

/**
 * 批量下载图片
 * @param sourceList图像数据
 * @param zipName // 下载时的文件夹名称
 * @param sourceList[i].picName // 每张图片的名称--注意: 需要对数据属性进行转换
 */
export const downloadZip = async(sourceList, zipName = '文件夹名称') => {
  console.log('12112313')
  console.log(zipName)
  const zip = new JSZip()
  const fileFolder = zip.folder(zipName) // 创建 zipName 文件夹
  const fileList = []
  for (let i = 0; i < sourceList.length; i++) {
    const name = sourceList[i].name // 注意: 每张图片的名称--需要对数据属性进行转换
    const image = new Image()
    image.setAttribute('crossOrigin', 'Anonymous') // 设置 crossOrigin 属性，解决图片跨域报错
    image.src = sourceList[i].images
    image.onload = async() => {
      const url = await getImageBase64(image)
      fileList.push({ name: name, img: url.substring(22) }) // 截取 data:image/png;base64, 后的数据
      if (fileList.length === sourceList.length) {
        if (fileList.length) {
          for (let k = 0; k < fileList.length; k++) {
            // 往文件夹中，添加每张图片数据
            fileFolder.file(fileList[k].name + '.png', fileList[k].img, {
              base64: true
            })
          }
          zip.generateAsync({ type: 'blob' }).then(content => {
            FileSaver.saveAs(content, zipName + '.zip')
          })
        }
      }
    }
  }
}
