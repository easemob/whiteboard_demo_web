import Vue from 'vue'
import Vuex from 'vuex'
import Login from './login'
import WhiteboardStore from './whiteboardStore'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        login: Login,
        whiteboard: WhiteboardStore
    }
})

export default store;