import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    base_URL: 'http://api.jsdelivr.com/v1/jsdelivr/libraries',
    searchValue: '',
    loading: false,
    searchResult: '',
    specialMsg: '',
  },
  mutations: {
    setSearchData (state, payload) {
      state.specialMsg = ''
      state.searchValue = payload
      state.loading = true
      axios({
        method: 'GET',
        url: state.base_URL,
        params: {
          name: state.searchValue + '*'
        }
      })
      .then ( res => {
        let result = res.data
        state.searchResult = result
        state.loading = false
        if (state.searchResult.length == 0) {
          state.specialMsg = `Результатов по запросу "${state.searchValue}" нет` 
        }
      })
    }
  },
  actions: {
    getSeacrhData ({commit}, payload) {
      commit('setSearchData', payload)
    }
  },
  modules: {
  }
})
