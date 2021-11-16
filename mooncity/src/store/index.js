import Vue from 'vue'
import Vuex from 'vuex'

import { getArticleList, getArticleDetail } from '@api/article'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showPageLoadScrollBar: false
  },
  mutations: {
    setShowPageLoadScrollBar(state, data) {
      state.showPageLoadScrollBar = !!data
    }
  },
  actions: {
    async getArticleList(state, pageInfo) {
      // 再vuex中的acions和mutations 方法的第一参数默认都是staste，我们传入的参数是第二个开始的
      const result = await getArticleList(pageInfo)
      return result.data.data
    },
    async getArticleDetail(state, id, userId = 1) {

      const result = await getArticleDetail(id, userId);
      return result.data.data
    },

    /**
     * 把日期变成 月份 哪一天 年份
     */
    async dataHandle(state, dateObj) {
      let { year, month, day, week } = { ...dateObj }
      const monthArr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      const weekArr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      month = monthArr[parseInt(month)];
      week = weekArr[parseInt(week)];
      dateObj.month = month
      dateObj.week = week
      return { year, month, day, week }
    }
  },
  modules: {
  }
})
