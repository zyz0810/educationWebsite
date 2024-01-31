import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/home/index'),
  //   hidden: true
  // },
  // {
  //   path: '/home',
  //   component: () => import('@/views/home/index'),
  //   hidden: true
  // }, {
  //   path: '/link',
  //   component: () => import('@/views/link/index'),
  //   hidden: true,
  //   meta:{
  //     keepalive:true,
  //     title:'康药多'
  //   }
  // },


  {
    path: '/',
    redirect: '/home/index',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: 'noRedirect',
    name: '首页',
    meta: {
      title: '首页',
      icon: '',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index'),
        name: '首页',
        meta: { title: '首页', icon: 'indexIcon', affix: true }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    redirect: 'noRedirect',
    name: '关于我们',
    meta: {
      title: '关于我们',
      icon: '',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/about/index'),
        name: 'aboutUs',
        hidden: true,
        meta: {
          title: '关于我们',
          noCache: true,
          icon: '',
          // affix: true,
        }
      },
    ]
  },
  {
    path: '/law',
    component: Layout,
    // redirect: 'dashboard',
    redirect: 'noRedirect',
    name: '法律',
    hidden: true,
    meta: {
      title: '法律',
      icon: '',
    },
    children: [
      {
        path: 'privacy',
        // component: resolve => require(['@/views/about/privacy'], resolve),
        component: () => import('@/views/about/privacy'),
        name: 'privacy',
        hidden: true,
        meta: {
          title: '隐私政策',
          noCache: true,
          icon: '',
          // affix: true,
        }
      },
      {
        path: 'agreement',
        // component: resolve => require(['@/views/about/agreement'], resolve),
        component: () => import('@/views/about/agreement'),
        name: 'agreement',
        hidden: true,
        meta: {
          title: '用户协议',
          noCache: true,
          icon: '',
          // affix: true,
        }
      },
    ]
  },
]

export const asyncRoutes = []
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
