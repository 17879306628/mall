<template>
  <div id="home">
    <nav-bar class="navbar"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="upLoadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    
    <back-top @click.native="topClick" v-show="isShow"/>
    
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import {getHomeMultidata, getHomeGoodsData} from 'network/home'


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false
      }
    },
    created() {
      // 1. 请求首页轮播图和推荐页面数据
      this.getHomeMultidata()

      // 2. 请求首页tab栏下商品列表数据
      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      // 监听事件的方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
      },
      topClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // console.log(position);
        this.isShow = (-position.y) > 1000
      },
      upLoadMore() {
        this.getHomeGoodsData(this.currentType)

        
      },

      // 请求数据的方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoodsData(type) {
        const page = this.goods[type].page + 1
        getHomeGoodsData(type, page).then(res => {
          
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()

        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control {
    /* position: sticky;
    top: 44px; */
    z-index: 9;
  }
  .content {
    height: calc(100% - 49px);
    overflow: hidden;
  }
</style>
