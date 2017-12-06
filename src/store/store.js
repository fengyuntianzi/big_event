import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userName: '',
	userScore: 0
}

export default new Vuex.Store({
	state
})