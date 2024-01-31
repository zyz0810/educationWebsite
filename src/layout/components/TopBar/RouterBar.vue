<template>
  <el-menu
    :default-active="activeMenu"
    :background-color="variables.topBarBg"
    :text-color="variables.textColor"
    :unique-opened="true"
    class="menuStyle"
    @select="menuChange"
    :active-text-color="variables.activeColor"
    mode="horizontal"
  >
    <div
      v-for="(route, index) in permission_routes.filter(item=>!item.hidden)"
      :key="route.path  + index"
    >
      <div v-if="!route.hidden">
        <template v-if="route.meta">
          <app-link :to="resolvePath(route,route.path)">
            <el-menu-item :index="route.path" :class="{'submenu-title-noDropdown':!isNest}">
              <item
                :icon="route.meta.icon||(route.meta&&route.meta.icon)"
                :title="route.meta.title"
              />
            </el-menu-item>
          </app-link>
        </template>
      </div>
    </div>
  </el-menu>
</template>


<script>
import { mapGetters, mapState, mapActions } from "vuex";
import SidebarItem from "./SidebarItem";
import path from "path";
import Item from "./Item";
import AppLink from "./Link";
import variables from '@/styles/variables.scss'
import { isExternal } from "@/utils/validate";

export default {
  components: { SidebarItem, Item, AppLink },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["permission_routes", "sidebar", "activeMenu"]),
    // activeMenu() {
    //   const route = this.$route;
    //   const { meta, path } = route;
    //   // if set path, the sidebar will highlight the path you set
    //   if (meta.activeMenu) {
    //     return meta.activeMenu;
    //   }
    //   return path;
    // },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  data() {
    this.onlyOneChild = {};
    return {
      isNest: true
    };
  },
  watch:{
        $route(to,from){
    this.findActiveMenu()
  }
  },
  mounted() {
    this.findActiveMenu();
  },
  methods: {
    findActiveMenu() {
      console.log('aa',this.permission_routes)
      const route = this.$route;
      const { meta, path } = route;
      const list = path.split("/");
      let str = "";
      if (list.length == 2) {
        this.set_route(str);
      } else {
        str = `/${list[1]}`;
        this.set_route(str);
      }

      const arr = this.permission_routes.find(item => item.path == str);
      this.set_route_List(arr.children || []);
    },
    ...mapActions(["set_route", "set_route_List", "set_sidebar_menu"]),
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    menuChange(index, path) {
      const arr = this.permission_routes.find(item => item.path == index);
      if (arr.children.length) {
        this.set_sidebar_menu(`${arr.path}/${arr.children[0].path}`);
      }
      this.set_route_List(arr.children || []);
      this.set_route(index);
    },
    resolvePath(list, basePath) {
      let routePath = "";
      if (list.children.length) {
        routePath = list.children[0].path;
      }
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }
      return path.resolve(basePath, routePath);
    }
  }
};
</script>

<style lang="scss" scoped>
.menuStyle {
  height: 72px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  border: none !important;
  /deep/.el-menu-item{
    height: 72px;
    line-height: 72px;
     &:hover{
      background-color: transparent !important;
    }
  }
}
.svg-icon {
  margin-right: 4px;
}
/deep/ .el-menu-item{
  background: #fff!important;
}
// 选中样式修改
/deep/ .is-active {
  /*background: #4682c6 !important;*/
  /*color: #FC9838 !important;*/
  border-bottom: 3px solid #FC9838;
}
</style>
