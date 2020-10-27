export default {
  addCounter(state, payload) {
    payload.count += 1
  },
  addToCart(state, payload) {
    state.cartList.push(payload)
  },
  checkChange(state, payload) {
    payload.checked = !payload.checked
  },
  checkAllChange(state, payload) {
    payload.forEach(item => item.checked = true)
  },
  notCheckAllChange(state, payload) {
    payload.forEach(item => item.checked = false)
  }
}