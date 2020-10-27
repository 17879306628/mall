export default {
  addCart(context, payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct) {
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1
      payload.checked = true
      context.commit('addToCart', payload)
    }
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