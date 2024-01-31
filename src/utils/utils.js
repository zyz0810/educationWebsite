export function deepCopy(target) {
    if (typeof target == 'object') {
        const result = Array.isArray(target)? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }

        return result
    }
    
    return target
}

export function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}


export function exportFile(res,str){
 const blob = new Blob([res]);
 let myDate = new Date();
 let timename = myDate.toLocaleDateString().split("/").join("-");
 const fileName = str + timename + ".xls";
 const linkNode = document.createElement("a");
 linkNode.download = fileName; //a标签的download属性规定下载文件的名称
 linkNode.style.display = "none";
 linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
 document.body.appendChild(linkNode);
 linkNode.click(); //模拟在按钮上的一次鼠标单击
 URL.revokeObjectURL(linkNode.href); // 释放URL 对象
 document.body.removeChild(linkNode);
}