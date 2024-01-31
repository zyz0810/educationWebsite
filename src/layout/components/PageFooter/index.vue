<template>
  <div class="page_footer">
    <div class="page_footer_top">
        <div class="footer_one">
          <div class="flex f14">
            <div class="flex_hd footer_logo"><img src="./../../../assets/logo/logo.png"/> </div>
            <div class="flex_bd">鑫桂泽咨询</div>
          </div>
          <p>与咨询老师沟通，获得专业指导和建议，解决学习难题，为学业助力</p>
        </div>
        <div class="footer_two">
          <p class="f18">产品</p>
          <p class="f16"><router-link to="/home/index">产品介绍</router-link></p>
          <p class="f16"><router-link to="/about/index">关于我们</router-link></p>
        </div>
        <div class="footer_two">
          <p class="f18">法律</p>
          <p class="f16"><router-link to="/law/agreement">用户协议</router-link></p>
          <p class="f16"><router-link to="/law/privacy">隐私政策</router-link></p>
        </div>
        <div class="footer_two">
          <p class="f18">联系我们</p>
          <div class="flex f16">
            <div class="flex_hd footer_icon"><img src="./../../../assets/image/mobile_icon.png"/> </div>
            <div class="flex_bd">400-9692-985</div>
          </div>
          <div class="flex f16">
            <div class="flex_hd footer_icon"><img src="./../../../assets/image/address_icon.png"/> </div>
            <div class="flex_bd">太原市小店区晋阳街170<br/>纳达大厦西区501</div>
          </div>
        </div>
      </div>
    <div class="page_footer_bottom">
      <p class="page_footer_bottom_box"><a href="https://beian.miit.gov.cn" target="_blank">Copyright ©山西鑫桂泽科技有限公司   晋ICP备2023018025号-1</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {},
  methods: {
    handleProduct(){
      this.$router.push({
        path: "/about/product",
        query: { },
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .f14{
    font-size: 14px;
  }
  .f16{
    font-size: 16px;
  }
  .f18{
    font-size: 18px;
  }
.page_footer{
  background: #0B1024;
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  padding-top: 20px;
  min-width: 1200px;
  .page_footer_top{
    display: flex;
    width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    .footer_one{
      flex: 2;
      .flex{
        font-weight: 700;
        align-items: center;
      }
    }
    .footer_two{
      flex: 1;
      .flex{
        line-height: 1.3;
        margin-bottom: 13px;
      }
    }
    .footer_logo{
      width: 40px;
      height: 40px;
      margin-right: 5px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .footer_icon{
      width: 20px;
      height: 20px;
      margin-right: 5px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .page_footer_bottom{
    .page_footer_bottom_box{
      width: 1200px;
      margin: 0 auto;
      position: relative;
      text-align: center;
      padding: 15px 0 30px 0;
      &:before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid rgba(255,255,255,0.2);
        color: rgba(255,255,255,0.2);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
      }
    }

  }
}
</style>


