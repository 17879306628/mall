<!--  -->
<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-item" 
      :class="{active: currentIndex === index}"
      @click="itemClick(index)"
    >
      <span >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style  scoped>
  .tab-control {
    display: flex;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
