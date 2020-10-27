<!--  -->
<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" 
      :is-checked="isSelectAll" 
      @click.native="selectAllClick">
      </check-button>
      <span>全选</span>
    </div>
    <div class="price">总计：￥{{totalPrice}}</div>
    <div class="calculate">去结算({{totalLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: "CartButtomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => item.checked)
      .reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    totalLength() {
      return this.$store.state.cartList.filter(item => item.checked)
      .reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    selectAllClick() {
      if(this.isSelectAll) {
        this.$store.dispatch('notCheckAll', this.$store.state.cartList)
      } else {
        this.$store.dispatch('checkAll', this.$store.state.cartList)
      }
    }
  }
}
</script>

<style  scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
    text-align: center;
  }
  .check-all {
    display: flex;
    width: 60px;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
  }
</style>
