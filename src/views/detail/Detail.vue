<!--  -->
<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
  import DetailNavBar from './childDetail/DetailNavBar'
  import DetailSwiper from './childDetail/DetailSwiper'
  import DetailBaseInfo from './childDetail/DetailBaseInfo'
  import DetailShopInfo from './childDetail/DetailShopInfo'

  import {getDetail, Goods, Shop} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    created() {
      // 1. 拿到当前这个数据的id'
      this.iid = this.$route.params.iid
      // 2. 请求数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        // 获取轮播图数据
        this.topImages = data.itemInfo.topImages
        // 获取商品基本信息数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取商家数据
        this.shop = new Shop(data.shopInfo)
      })
    }
  }
</script>

<style  scoped>

</style>
