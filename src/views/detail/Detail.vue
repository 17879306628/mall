<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
   
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info ref="params" :param-info="paramInfo"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    
    <back-top @click.native="topClick" v-show="isShow"/>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childDetail/DetailNavBar'
  import DetailSwiper from './childDetail/DetailSwiper'
  import DetailBaseInfo from './childDetail/DetailBaseInfo'
  import DetailShopInfo from './childDetail/DetailShopInfo'
  import DetailGoodsInfo from './childDetail/DetailGoodsInfo'
  import DetailParamsInfo from './childDetail/DetailParamsInfo'
  import DetailCommentInfo from './childDetail/DetailCommentInfo'
  import DetailBottomBar from './childDetail/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommends} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils.js'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      // 1. 拿到当前这个数据的id'
      this.iid = this.$route.params.iid
      // 2. 请求数据
      getDetail(this.iid).then(res => {
        //console.log(res);
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
        // 获取商品评论信息
        if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
        }

        // 给getThemeTopY赋值(对this.themeTopY赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
          this.themeTopY = []
          this.themeTopY.push(0)
          this.themeTopY.push(this.$refs.params.$el.offsetTop)
          this.themeTopY.push(this.$refs.comment.$el.offsetTop)
          this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopY.push(Number.MAX_VALUE)
          //console.log(this.themeTopY);
        }, 100)
      })

      // 请求推荐数据
      getRecommends().then(res => {
        //console.log(res);
        this.recommends = res.data.list
      })

      
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
      },
      contentScroll(position) {
        this.isShow = (-position.y) > 1000
        const positionY = -position.y
        let length = this.themeTopY.length
        for(let i = 0; i < length - 1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        this.$store.dispatch('addCart', product)
      }

    },
    destroyed () {
      // 取消全局事件的监听
      this.$bus.$off('refresh', this.itemImgListener)
    }
  }
</script>

<style  scoped>
  #detail {
    position: relative;
    z-index: 100;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
