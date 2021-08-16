import { createStore } from 'vuex'

import state     from './state'
import getters   from './getters'
import mutations from './mutations'
import actions   from './actions'

export default createStore({
  state,
  // getters 相当于组件中的 computed 方法
  getters,
  // mutations 相当于组件中的 methods 方法，但是不能使用异步方法（定时器和axios等）
  mutations,
  // actions 专门用来处理异步，实际修改状态值的，依然是 mutations
  actions,
  // 主模块
  modules: {},
})
