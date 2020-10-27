import {debounce} from './utils'

import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      itemRefresh: null
    }
  },
  mounted() {
    // 1. 监听图片加载事件
    this.itemRefresh = debounce(this.$refs.scroll.refresh, 200)
      
    this.itemImgListener = () => {
      this.itemRefresh()
    }

    this.$bus.$on('refresh', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    topClick() {
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}