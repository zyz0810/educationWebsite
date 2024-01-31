<template>
  <div class="navbar">
    <div class="nav_bar_cont">
      <logo v-if="true"
            :collapse="true"
            class="logo" />
      <div class="right-menu">
        <router-bar class="top_bar_container" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Logo from "../Sidebar/Logo";
import RouterBar from "./RouterBar";

export default {
  data () {
    return {
      // imgURL: require('../../../assets/image/head Portrait.png'),
    };
  },
  computed: {
    ...mapGetters([
      "device",
      "sidebar",
      "permission_routes",
      "name",
    ]),
    setting: {
      get () {
        return this.$store.state.settings.showSettings;
      },
      set (val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val
        });
      }
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse () {
      return !this.sidebar.opened;
    }
  },
  components: {
    Logo,
    RouterBar
  },
  mounted () {

  },
  methods: {
    ...mapActions(["set_route", "set_route_List",]),
    async logout () {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          // location.href = "/index";
          this.$router.push(`/login?redirect=/dashboard`);
        });
      });
    },
    handleChange (val,) {
      if (val == 'customerStoreIds') {
        this.$router.push({ path: '/customer', query: { customerStoreIds: 'ids' } });
      } else {
        this.$router.push({ path: '/customer', query: { certificateStatus: val, } });
      }
      this.set_route("");
      const arr = this.permission_routes.find(item => item.path == "");
      this.set_route_List(arr.children || []);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 72px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
.nav_bar_cont{
  display: flex;
  width: 1200px;
  margin: 0 auto;
}
  .logo {
    width: 200px;
  }
  .right-menu {
    flex: 1;
    text-align: right;
    /*height: 50px;*/
    /*line-height: 50px;*/

    &:focus {
      outline: none;
    }
    .el-icon-arrow-down {
      color: #ffffff;
    }
    .avatar-wrapper {
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 12px;
        margin-left: 10px;
        &.provider_tag {
          background: orange;
          margin-left: 3px;
          height: 1;
          line-height: 1;
          padding: 3px;
          border-radius: 5px;
        }
      }
      .el-icon-arrow-down:before {
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
}

.dropdown_item {
  min-width: 120px;
  display: flex;
  justify-content: space-between;
}
.el-dropdown-link {
  font-family: 微软雅黑;
  font-weight: 400;
  color: #ffffff;
  font-style: normal;
  font-size: 14px;
  text-align: center;
  line-height: normal;
}
.top_bar_container {
  /*width: 600px;*/
}
</style>
