export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量加1')
      } else {
        payload.count = 1
        payload.checked = true
        context.commit('addToCart', payload)
        resolve('添加到购物车中')
      }
    })
  },
  checkClick(context, payload) {
    context.commit('checkChange', payload)
  },
  checkAll(context, payload) {
    context.commit('checkAllChange', payload)
  },
  notCheckAll(context, payload) {
    context.commit('notCheckAllChange', payload)
  }
}