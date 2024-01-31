export default {

  install(Vue,options){

    Vue.prototype.global = {
      tableValueWidth: {
        tableTimeWidth:140,
        tableTwoTimeWidth:280,
        tableDayTimeWidth:180,
        tableUserWidth:100,
        tableImgWidth:100,
        tableStatusWidth: 80,
        tableExamStatusWidth: 140,
        tableShortNameWidth: 140,
        tableMobileWidth: 100,
        tableNumberWidth: 160,
        tableAddressWidth:220,
        tableMoreNumberWidth:220,
        tableSupplierNameWidth:220,
        tableProductNameWidth:220,
        tablePriceWidth:100,
        tableSpecWidth:180,
        tableMorePriceWidth:140,
        tableIdWidth:60,
      },
    };

  }

}
