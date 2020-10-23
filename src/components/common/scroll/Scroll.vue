<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScorll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    mounted() {
      // 1. 创建scroll对象
      this.scroll = new BScorll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 2. 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        //console.log(position);
        this.$emit('scroll', position)
      })

      // 3. 监听上拉事件
      this.scroll.on('pullingUp',() => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style  scoped>

</style>
