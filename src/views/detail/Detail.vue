<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramInfo"></detail-params-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childDetail/DetailNavBar'
  import DetailSwiper from './childDetail/DetailSwiper'
  import DetailBaseInfo from './childDetail/DetailBaseInfo'
  import DetailShopInfo from './childDetail/DetailShopInfo'
  import DetailGoodsInfo from './childDetail/DetailGoodsInfo'
  import DetailParamsInfo from './childDetail/DetailParamsInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
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
        // 获取店铺商家数据
        this.shop = new Shop(data.shopInfo)
        // 获取商品详情数据
        this.detailInfo = data.detailInfo
        // 获取商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style  scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
