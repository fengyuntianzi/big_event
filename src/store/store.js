import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userName: '',
	userScore: 0
}
const mutations = {
	setUserName (state, payload) {
		state.userName = payload.userName
	},
	setUserScore (state, payload) {
		state.userScore = payload.userScore
	}
}
const action = {
	setUserScore: ({commit}, params) => commit('setUserScore', {item: params})
}

export default new Vuex.Store({
	state,
	mutations,
	action
})