<template>
  <div class="app-container">
 <div class="about_top">
   <p class="about_title">鑫桂泽咨询</p>
   <div class="about_cont">
     山西鑫桂泽科技有限公司前身是2015年成立“三鑫伟业”公司，公司立足于教育行业智能信息化产品的运营、推广工作，是教育信息化软件系统和智能化硬件的集成服务商。公司紧跟国家教育行业发展部署，自2019年开始市场规划与布局，打造专业化市场服务能力，2023年推出了“鑫规泽教育情感倾诉小程序”、生涯规划咨询服务产品、少年综合素质研学等项目。在国家、省、市教育部门的政策指引下，依托信息化发展平台，为学校、家长提供多方位的咨询、指导服务，为孩子素质教育、健康成长提供“鑫桂泽”方案。</div>
 </div>
    <div class="flex about_bottom">
      <div class="flex_bd flex">
        <div class="flex_hd about_flex_img"><img src="./../../assets/image/mobile_img.png"/> </div>
        <div class="flex_bd">
          <p class="about_p_one">400-9692-985</p>
          <p class="about_p_two">电话</p>
        </div>
      </div>
      <div class="flex_bd flex">
        <a href="http://www.xgzjj365.com/" target="_blank" class="flex">
          <div class="flex_hd about_flex_img"><img src="./../../assets/image/website_img.png"/> </div>
          <div class="flex_bd">
            <p class="about_p_one">www.xgzjj365.com</p>
            <p class="about_p_two">网址</p>
          </div>
        </a>
      </div>
      <div class="flex_bd flex">
        <div class="flex_hd about_flex_img"><img src="./../../assets/image/address_img.png"/> </div>
        <div class="flex_bd">
          <p class="about_p_one">太原市小店区晋阳街170<br/>纳达大厦西区501</p>
          <p class="about_p_two">通讯地址</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {};
    },

    computed: {},
    mounted () {},
    methods: {

    },
  };
</script>

<style lang="scss" scoped>
  .about_top{
    width: 1200px;
    padding: 70px 50px;
    margin: 20px auto 0;
    /*background: url("./../../assets/image/about_bg.png");*/
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("./../../assets/image/about_bg.png");
  }
  .about_title{
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin: 50px 0 0;
  }
  .about_cont{
    color: #38383899;
    font-size: 20px;
    padding: 30px 50px 50px;
    margin: 0 auto;
    line-height: 2;
  }
  .about_flex_img{
    width: 48px;
    height: 48px;
    margin-right: 5px;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .about_bottom{
    width: 1200px;
    padding: 50px;
    margin: 0 auto 30px;
    align-items: flex-start;
    p{
      margin: 0;
    }
    .about_p_one{
      color: #1D2130;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
    }
    .about_p_two{
      color: #1d2130b5;
      font-size: 14px;
      margin-top: 10px;
    }
    .flex_item{
      &:nth-child(2){
        margin: 0 20px;
      }
    }
  }
</style>
