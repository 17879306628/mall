<template>
  <div id="Cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>

    <cart-list></cart-list>

    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
  import CartList from './childCart/CartList'
  import CartButtomBar from './childCart/CartButtomBar'
  
  import NavBar from 'components/common/navbar/NavBar'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      CartList,
      CartButtomBar,
      NavBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  #Cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
