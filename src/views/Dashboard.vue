<template>
  <section style="width: 100%">
    <NavMain />
    <v-content style="clear: both;padding: 2%;margin:0;width: 100%">
 
      <sweetalert-icon icon="loading" v-show="showLoadingIcon" />

      <h1 class="subHeading middle">Apps</h1>

      <section class="SearchResults" v-show="showSearchPromotionsResults">

        <h1 class="subHeading">{{ getSearchTerm }}</h1>

        <section class="searchListings">

          <article v-for="searchResult in searchResultPromotion" :key="searchResult.tid">
            <v-img
              v-bind:alt="searchResult.short_description"
              :v-bind:title="searchResult.short_description"
              class="mt-1"
              :src="searchResult.logo"
              width="100"
            />
            <h2 :title="searchResult.short_description">{{searchResult.integration}}</h2>
            <span>{{searchResult.access}}</span>
          </article>
          <section class="clearfix"></section>  
        </section>

        <section class="clearfix"></section>
        <h1 class="subHeading">More Integrations</h1>

        <section class="searchListings">

          <article v-for="searchResult in searchResults" :key="searchResult.tid">
            <v-img
              v-bind:alt="searchResult.short_description"
              :v-bind:title="searchResult.short_description"
              class="mt-1"
              :src="searchResult.logo"
              width="100"
            />
            <h2 :title="searchResult.short_description">{{searchResult.integration}}</h2>
            <span>{{searchResult.access}}</span>
          </article>
          <section class="clearfix"></section>  
        </section>
      </section>
    </v-content>
    <Footer />
  </section>
</template>

<script>
import store from "../store";
import NavMain from "../components/Navs/NavMain.vue";
import Footer from "../components/Footers/Footer.vue";
import { appMixin } from "../mixins/appMixin.js";
import axios from "axios";

export default {
  name: "Dashboard",
  mixins: [appMixin],
  components: {
    NavMain,
    Footer
  },
  created: function() {
    let vmObjectInstance = this;

    axios
      .get(this.getSearchEndpoint)
      .then(function(response) {
        if (JSON.stringify(response.data) !='{}') {
          // console.log(response);
          vmObjectInstance.searchResults = response.data.results;
          vmObjectInstance.searchResultPromotion = response.data.promotions[0].integrations;
          
          console.log("promotions >>> ", response.data.promotions[0]);
          console.log("results >>> ", response.data.results);

          // var personObject = JSON.parse(response.data.promotions);
          // alert(personObject);

          if(vmObjectInstance.searchResultPromotion != null){
            vmObjectInstance.showSearchPromotionsResults = true;
          }else{
            vmObjectInstance.showSearchPromotionsResults = false; 
          }

          vmObjectInstance.showLoadingIcon = false;
          vmObjectInstance.showSearchResults = true;

        }
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  data: () => ({
    getSearchEndpoint: store.state.urlStore.baseUrl + store.state.urlStore.searchUrl,
    searchResults: [],
    searchResultPromotion: [],
    showLoadingIcon: true,
    showSearchResults: false,
    showSearchPromotionsResults: false
  }),
  computed: {
    getAppName() {
      return store.state.commonStore.appName;
    },
    getSearchTerm(){
      this.search(store.state.leftNavDrawerStore.searchTerm);
      return store.state.leftNavDrawerStore.searchTerm;
    }
  },
  methods: {
    search(name){
      name = encodeURI(name);
      let searchParameter = `?page=0&category=${name}`;
      // alert(searchParameter);
      let vmObjectInstance = this;
      this.showLoadingIcon = true;
      this.showSearchResults = false;

      axios
      .get(this.getSearchEndpoint + searchParameter)
      .then(function(response) {
        if (JSON.stringify(response.data) !='{}') {
          // console.log(response);
          vmObjectInstance.searchResults = response.data.results;
          vmObjectInstance.searchResultPromotion = response.data.promotions[0].integrations;

          if(vmObjectInstance.searchResultPromotion != null){
            vmObjectInstance.showSearchPromotionsResults = true;
          }else{
            vmObjectInstance.showSearchPromotionsResults = false; 
          }

          vmObjectInstance.showLoadingIcon = false;
          vmObjectInstance.showSearchResults = true;
        }
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  }
};
</script>

<style scoped>

.subHeading{
  color: #000000;
  font-size: 1.2em;
  text-align: left;
  margin: 20px 0;
  font-weight: 300;
}

.clearfix{
  clear: both;
}

.middle{
  text-align: center
}


.searchListings > article{
  width: 22.9%;
  height: 230px;
  box-shadow: 0px 2px 6px rgb(33 33 38 / 12%);
  float: left;
  padding: 1%;
  margin: 10px 20px 20px 10px;
}


.searchListings > article:hover{
  box-shadow: 0px 2px 6px rgb(33 33 38 / 62%);
}

.searchListings > article > h2{
  text-align: left;
  font-size: 1em;
  margin-top: 20px;
}

.searchListings > article > span{
  color: #c0c0c0;
  font-size: 0.7em;
  margin-top: -10px;
  float: left;
}

</style>