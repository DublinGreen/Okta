import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";

//Load Vuex
Vue.use(Vuex);


// LeftNav store
const moduleLeftNavDrawer = {
  state: {
    count: 1500,
    leftDrawer: true,
    searchTerm: "All Integrations"
  },
  getter: {
    leftDrawer: state => {
      return state.leftDrawer;
    },
    count: state => {
      return state.count;
    }
  },
  setter: {
    leftDrawer: state => {
      !state.leftDrawer;
    }
  },
  mutations: {
    toogleLeftDrawer(state) {
      let tempState = state.leftDrawer;
      state.leftDrawer = !tempState;
    },
    setSearchTerm(state, value) {
      state.searchTerm = value;
    }
  }
};

// Commons store
const moduleCommons = {
  state: {
    appName: "Okta Integration Network App",
    currentYear: new Date(),
    copyright: ""
  },
  getter: {
    currentYear: state => {
      return state.currentYear.getFullYear();
    },
    appName: state => {
      return state.appName;
    },
    copyright: state => {
      return (state.copyright =
        state.appName + " &copy; " + state.currentYear.getFullYear());
    }
  },
  setter: {},
  mutations: {
  }
};

// Url store
const urlCommons = {
  state: {
    baseUrl: "https://ct012022-oktainc.pantheonsite.io/oktaapi/integration/",
    filterUrl: "filters/products",
    searchUrl: "search"
  },
  getter: {
    baseUrl: state => {
      return state.baseUrl;
    }
  },
  setter: {},
  mutations: {}
};

// Main store
export default new Vuex.Store({
  state: {
    token: null,
    createdBy: "person 1",
    redirectTimeout: 2000,
    alertTimeout: 7000,
    alertLongTimeout: 12000,
    allowedUploadLimit: 2000000,
    documentPopupWindowWidth: 800,
    documentPopupWindowHeight: 500
  },
  getter: {
    createdBy: state => {
      return state.createdBy;
    },
    alertTimeout: state => {
      return state.alertTimeout;
    }
  },
  setter: {},
  mutations: {
    setToken(state, value) {
      console.log("setToken mutation call");
      state.token = value;
    },
    setIsLogin(state, value) {
      console.log("setIsLogin mutation call");
      state.isLogin = value;
    }
  },
  actions: {},
  modules: {
    leftNavDrawerStore: moduleLeftNavDrawer,
    commonStore: moduleCommons,
    urlStore: urlCommons
  }
});
