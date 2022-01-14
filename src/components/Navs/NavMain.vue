<template>
  <nav>
    <v-navigation-drawer v-bind:value="leftDrawer" app>

      <section id="nav">
        <h2>Categories</h2>
        <ul id="navListing">
          <li v-for="category in categories" :key="category.tid">
            <a href="#" v-on:click="search(category.name)">
            {{ category.name }}
            <span>
              {{category.count}}
            </span>
            </a>
          </li>
        </ul>
      </section>
      

      <!-- <v-list dense active-class="border">
        <v-list-item class="leftNavs">
          <v-list-item-action>
            <i class="fa fa-home fa-4x iconlight"></i>
          </v-list-item-action>
          <v-list-item-content>
            <router-link class="leftNavText" to="/Dashboard">Home</router-link>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-list-item class="leftNavs" v-show="isLogin">
          <v-list-item-action>
            <router-link to="/Profile">
              <i class="fas fa-user-tie fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/Profile">Profile</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-list-item class="leftNavs" v-show="isLogin">
          <v-list-item-action>
            <router-link to="/RegisterVoters">
              <i class="fa fa-user fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/RegisterVoters">
                Register
                <br />Voter
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs" v-show="isLogin">
          <v-list-item-action>
            <router-link to="/ManageVotersCrud">
              <i class="fa fa-users fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/ManageVotersCrud">
                All
                <br />Voters
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs" v-show="isLoginAsVoter">
          <v-list-item-action>
            <router-link to="/Elections">
              <i class="fas fa-box-open fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/Elections">Elections</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs">
          <v-list-item-action>
            <router-link to="/Reports">
              <i class="fas fa-chart-bar fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/Reports">Reports</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs">
          <v-list-item-action>
            <i class="fa fa-power-off fa-4x iconlight"></i>
          </v-list-item-action>

          <v-list-item-content>
            <p id="leftNavLogout" @click="logout">Logout</p>
          </v-list-item-content>
        </v-list-item> 
      </v-list>-->
    </v-navigation-drawer>

    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon @click.stop="toogleLeftDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ getAppName }}</v-toolbar-title>
    </v-app-bar>
  </nav>
</template>

<script>
import store from "../../store";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "NavTop",
  data: () => ({
    getCategoriesEndpoint: store.state.urlStore.baseUrl + store.state.urlStore.filterUrl,
    categories: []
  }),
  created: function() {
    let vmObjectInstance = this;

    axios
      .get(this.getCategoriesEndpoint)
      .then(function(response) {
        if (JSON.stringify(response.data) !='{}') {
          console.log(response);
          vmObjectInstance.categories = response.data.results;
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  computed: mapState({
    leftDrawer: state => state.leftNavDrawerStore.leftDrawer,
    getLeftDrawer() {
      return store.state.leftNavDrawerStore.leftDrawer;
    },
    getAppName() {
      return store.state.commonStore.appName;
    }
  }),
  methods: {
    toogleLeftDrawer: function(event) {
      console.log("ToogleLeftDrawer ", event);
      store.commit("toogleLeftDrawer");
    },
    search(name){
      store.commit("setSearchTerm",name);
    }
  }
};
</script>

<style scoped>

#nav{
  background-color: #ffffff;
}

#nav h2{
  font-size: 1em;
  font-weight: bold;
  float: left;
}

#navListing{
  list-style-type: none;
  clear: both;
  margin-left: -15%;
}

#navListing > li{
  font-size: 0.5em;
  text-align: left;
  margin-bottom: 10px;
  padding: 3%;
}

#navListing > li > a > span{
  float: right;
  color: #c0c0c0;
  vertical-align: middle;
}

#navListing > li:hover{
  background-color: #cfcfcf;
}

nav {
  box-shadow: 3px 0px 3px #c0c0c0;
}

.leftNavs {
  background-color: #03a9fc;
  color: #ffffff;
  margin-bottom: 10px;
}

.leftNavs:hover {
  box-shadow: 5px 5px 5px #333333;
  border: 1px dotted #ffffff;
}

.iconlight {
  color: #ffffff;
}

.iconlight:hover {
  color: #ffff00;
}
</style>
