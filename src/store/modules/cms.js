import Vue from 'vue'
import { deepCopy, swap } from '@/utils/utils'
import toast from '@/utils/toast'
import generateID from '@/utils/generateID'


import store from '@/store'

const state= {
 editMode: 'edit', // 编辑器模式 edit read
 canvasStyleData: { // 页面全局数据
     width: 375,
     height: 667,
     backgroundColor:"#FFFFFF",
     backgroundImg:'',
     title:''
 },  
 componentData: [], // 画布组件数据
 curComponent: null,
 curComponentIndex: null,
 snapshotData: [], // 编辑器快照数据
 snapshotIndex: -1, // 快照索引
 menuTop: 0, // 右击菜单数据
 menuLeft: 0,
 menuShow: false,
 copyData: null, // 复制粘贴剪切
}
const mutations= {
 copy(state) {
     state.copyData = {
         data: deepCopy(state.curComponent),
         index: state.curComponentIndex,
     }
 },

 paste(state, isMouse) {
     if (!state.copyData) {
         toast('请选择组件')
         return
     }

     const data = state.copyData.data
     
     if (isMouse) {
         data.style.top = state.menuTop
         data.style.left = state.menuLeft
     } else {
         data.style.top += 10
         data.style.left += 10
     }
     
     data.id = generateID()
     store.commit('addComponent', { component: data })
     store.commit('recordSnapshot')
     state.copyData = null
 },

 cut(state) {
     if (!state.curComponent) {
         toast('请选择组件')
         return
     }
     
     if (state.copyData) {
         store.commit('addComponent', { component: state.copyData.data, index: state.copyData.index })
         if (state.curComponentIndex >= state.copyData.index) {
             // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
             state.curComponentIndex++
         }
     }
     store.commit('copy')
     store.commit('deleteComponent')
 },

 setEditMode(state, mode) {
     state.editMode = mode
 },

 setCanvasStyle(state, style) {
  const {backgroundColor,backgroundImg,title}=style
     Object.assign(state.canvasStyleData,{
      backgroundColor,
      title,
      backgroundImg
     })
 },
 setBackgroundColor(state, style){
  state.canvasStyleData.backgroundColor=style
 },
 setTitle(state, title){
  state.canvasStyleData.title=title
 },
 setBackgroundImg(state, style){
  state.canvasStyleData.backgroundImg=style
 },
 addComponent:(state, { component, index }) =>{
     if (index !== undefined) {
         state.componentData.splice(index, 0, component)
     } else {
         state.componentData.push(component)
     }
 },

 setCurComponent(state, { component, index }) {
     state.curComponent = component
     state.curComponentIndex = index
 },
 
 setCurComponentPropValue(state,list){
  state.curComponent = state.curComponent?state.curComponent.propValue=list:[]
 },
 setShapeStyle({ curComponent }, { top, left, width, height, rotate }) {
     if (top) curComponent.style.top = top
     if (left) curComponent.style.left = left
     if (width) curComponent.style.width = width
     if (height) curComponent.style.height = height
     if (rotate) curComponent.style.rotate = rotate
 },

 setShapePosStyle({ curComponent }, { key, value }) {
     curComponent.style[key] = value
 },

 undo(state) {
     if (state.snapshotIndex >= 0) {
         state.snapshotIndex--
         store.commit('setComponentData', deepCopy(state.snapshotData[state.snapshotIndex]))
     }
 },

 redo(state) {
     if (state.snapshotIndex < state.snapshotData.length - 1) {
         state.snapshotIndex++
         store.commit('setComponentData', deepCopy(state.snapshotData[state.snapshotIndex]))
     }
 },

 setComponentData(state, componentData = []) {
    let list=componentData instanceof  Array?componentData:[]
    Vue.set(state, 'componentData', list)
 },

 recordSnapshot(state) {
     // 添加新的快照
     state.snapshotData[++state.snapshotIndex] = deepCopy(state.componentData)
     // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
     if (state.snapshotIndex < state.snapshotData.length - 1) {
         state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
     }
 },

 showContexeMenu(state, { top, left }) {
     state.menuShow = true
     state.menuTop = top
     state.menuLeft = left
 },

 hideContexeMenu(state) {
     state.menuShow = false
 },

 deleteComponent(state, index = state.curComponentIndex) {
     state.componentData.splice(index, 1)
 },

 //组件原生
 // upComponent({ componentData, curComponentIndex }) {
 //     // 上移图层 index，表示元素在数组中越往后
 //     if (curComponentIndex < componentData.length - 1) {
 //         swap(componentData, curComponentIndex, curComponentIndex + 1)
 //     } else {
 //         toast('已经到顶了')
 //     }
 // },
//  downComponent({ componentData, curComponentIndex }) {
//   // 下移图层 index，表示元素在数组中越往前
//   if (curComponentIndex > 0) {
//       swap(componentData, curComponentIndex, curComponentIndex - 1)
//   } else {
//       toast('已经到底了')
//   }
// },
// 王珏修改
 upComponent(state) {
  const { componentData, curComponentIndex, curComponent}=state
     // 上移图层 index，表示元素在数组中越往后
     if (curComponentIndex>0) {
      const current=curComponent
      componentData.splice(curComponentIndex,1)
      componentData.splice(curComponentIndex-1,0,current)
      state.curComponentIndex-=1
     } else {
         toast('已经到顶了')
     }
 },
 downComponent(state) {
  const { componentData, curComponentIndex,curComponent } =state
  // 下移图层 index，表示元素在数组中越往前
  if (curComponentIndex !=componentData.length-1) {
   const current=curComponent
   componentData.splice(curComponentIndex,1)
   componentData.splice(curComponentIndex+1,0,current)
   state.curComponentIndex+=1
  } else {
      toast('已经到底了')
  }
},

 topComponent({ componentData, curComponentIndex }) {
     // 置顶
     if (curComponentIndex < componentData.length - 1) {
         swap(componentData, curComponentIndex, componentData.length - 1)
     } else {
         toast('已经到顶了')
     }
 },

 bottomComponent({ componentData, curComponentIndex }) {
     // 置底
     if (curComponentIndex > 0) {
         swap(componentData, curComponentIndex, 0)
     } else {
         toast('已经到底了')
     }
 },

 addAnimation({ curComponent }, animation) {
     curComponent.animations.push(animation)
 },

 removeAnimation({ curComponent }, index) {
     curComponent.animations.splice(index, 1)
 },

 addEvent({ curComponent }, { event, param }) {
     curComponent.events[event] = param
 },

 removeEvent({ curComponent }, event) {
     delete curComponent.events[event]
 },

 clearCurProducts(state, list){
  state.curComponent.propValue=list
 },

 setCurProducts(state, list){
  state.curComponent.propValue=list
 }
}

const actions = {
 addComponent({ commit }, data) {
   commit('addComponent',data)
 },
 recordSnapshot({ commit }, data) {
   commit('recordSnapshot', data)
 },
 setCurComponent({ commit }, data) {
   commit('setCurComponent', data)
 },
 setCurComponentPropValue({ commit }, data) {
  commit('setCurComponentPropValue', data)
},
 removeEvent({ commit }, data) {
   commit('removeEvent', data)
 },
 addEvent({ commit }, data) {
   commit('addEvent', data)
 },
 removeAnimation({ commit }, data) {
   commit('removeAnimation', data)
 },
 addAnimation({ commit }, data) {
   commit('addAnimation', data)
 },
 bottomComponent({ commit }, data) {
   commit('bottomComponent', data)
 },
 topComponent({ commit }, data) {
   commit('topComponent', data)
 },
 downComponent({ commit }, data) {
   commit('downComponent', data)
 },
 upComponent({ commit }, data) {
   commit('upComponent',data)
 },
 deleteComponent({ commit }, data) {
   commit('deleteComponent')
 },
 hideContexeMenu({ commit }, data) {
   commit('hideContexeMenu', data)
 },
 showContexeMenu({ commit }, data) {
   commit('showContexeMenu', data)
 },
 setComponentData({ commit }, data) {
   commit('setComponentData', data)
 },
 redo({ commit }, data) {
   commit('redo', data)
 },
 undo({ commit }, data) {
   commit('undo', data)
 },
 setShapePosStyle({ commit }, data) {
   commit('setShapePosStyle', data)
 },
 setShapeStyle({ commit }, data) {
   commit('setShapeStyle', data)
 },
 setCanvasStyle({ commit }, data) {
   commit('setCanvasStyle', data)
 },
 setTitle({ commit }, data) {
  commit('setTitle', data)
},
 setBackgroundColor({ commit }, data) {
   commit('setBackgroundColor', data)
 },
 setBackgroundImg({ commit }, data) {
   commit('setBackgroundImg', data)
 },
 setEditMode({ commit }, data) {
   commit('setEditMode', data)
 },
 cut({ commit }, data) {
   commit('cut', data)
 },
 paste({ commit }, data) {
   commit('paste', data)
 },
 copy({ commit }, data) {
   commit('copy', data)
 },
 setBannerList({commit},data){
  commit('setBannerList', data)
 },
 clearCurProducts({commit},data){
  commit('clearCurProducts',[])
 },
 setCurProducts({commit},list){
  commit('setCurProducts',list)
 }
}


export default {
 // namespaced: true,
 state,
 actions,
 mutations
}
