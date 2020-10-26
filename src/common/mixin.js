import {debounce} from './utils'

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