
import {
 MessageBox
} from 'element-ui'

// 点击显示图片
const  showImage={
 bind:()=>{},
 inserted:(el,binding)=>{
  el.onclick=()=>{
   const{value}=binding
   MessageBox({
      title: "查看图片",
      dangerouslyUseHTMLString: true,
      message: `<img src=${value} style="max-height:80vh"><img/>`,
      confirmButtonText: "确定",
      beforeClose: (action, instance, done) => {
       done()
      },
    });
  }
 },
 updated:()=>{},
}

// 点击展示不通过原因
const showText={
 bind:()=>{},
 inserted:(el,binding)=>{
  el.onclick=()=>{
   const{value}=binding
   MessageBox({
      title: "不通过原因",
      message: value,
      type:'warning',
      confirmButtonText: "确定",
      beforeClose: (action, instance, done) => {
       done()
      },
    });
  }
 },
 updated:()=>{},
}

// input输入框自动精确到小数点两位
const toFixed={
 bind:()=>{},
 inserted:(el,binding)=>{
  const {value}=binding
  el.onchange=(element)=>{
   element.target.value= Number(element.target.value).toFixed(2)
  }
 },
 updated:(el,binding)=>{
 },
}
// input输入框正整数
const toInt={
  bind:()=>{},
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  },
  updated:(el,binding)=>{
  },
}
const number = {
  // bind(el) {
  //   console.log('武切维奇')
  //   el.onkeyup = () => {
  //     if (el.value) {
  //       console.log(el.value)
  //       if (parseInt(el.value) == parseFloat(el.value) && !el.value.includes('.')) {
  //         if (paeseInt(el.value) == 0) {
  //           el.value = 0
  //           console.log('一')
  //         } else {
  //           el.value = el.value.replace(/^0/, '')
  //           console.log('二')
  //         }
  //       } else {
  //         // 小数
  //         el.value = el.value.replace(/^0+\./g, '0')
  //         console.log('三')
  //       }
  //       // 输入多个0，输入框失去焦点或者是输入框失去焦点后点击其他的输入框，会出现00
  //       // 解决：vue中绑定的值是通过监听input进行赋值的，直接修改输入框值不会触发input事件，需要通过dispatchEvent再次手动触发input事件
  //
  //       el.dispatchEvent(new Event('input'))
  //       console.log('四')
  //     }
  //   }
  // }


  bind:()=>{},
  inserted:(el,binding)=>{
    const {value}=binding
    el.onkeyup=(element)=>{
      // element.target.value= Number(element.target.value).toFixed(2)

      if (element.target.value) {
        // console.log(element)
        // console.log(element.target.value)
        // console.log(parseInt(element.target.value) == parseFloat(element.target.value))
        // console.log(element.target.value.includes('.'))
        // console.log(parseInt(element.target.value) == parseFloat(element.target.value) && !element.target.value.includes('.'))
        if (parseInt(element.target.value) == parseFloat(element.target.value) && !element.target.value.includes('.')) { //输入整数且不带小数点
          if (parseInt(element.target.value) == 0) {
            if(element.key != '.' && element.key != 'Backspace'){
              element.target.value = 0
            }
          }
          else {
            if(element.key != '.' && element.key != 'Backspace'){
              element.target.value = element.target.value.replace(/^0/, '')
            }
          }
        } else {//输入不是整数或者带小数点
          // 小数
          // console.log('三')
          let str = element.target.value.substring(0,element.target.value.indexOf("."));
          let arr = str.split('');
          // console.log(arr)
          if(arr.length > 1 && arr[0] == 0){
            // console.log('三sansan')
            // element.target.value = element.target.value.replace(/^0+\./g, '0') //把小数0开头的多余0去掉
            element.target.value = element.target.value.replace(/^0/, '')
          }


        }
        // 输入多个0，输入框失去焦点或者是输入框失去焦点后点击其他的输入框，会出现00
        // 解决：vue中绑定的值是通过监听input进行赋值的，直接修改输入框值不会触发input事件，需要通过dispatchEvent再次手动触发input事件

        el.dispatchEvent(new Event('input'))
        // console.log('四')
      }


    }
  },
  updated:(el,binding)=>{
  },

}
// 自定义指令
const directives = {
 showImage,
 toFixed,
  toInt,
 showText,
  number
}


export default {
 install(Vue) {
   Object.keys(directives).forEach((key) => {
     Vue.directive(key, directives[key])
   })
 },
}
