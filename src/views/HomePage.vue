<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>IonicDeezer</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">IonicDeezer</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-toolbar>
          <ion-searchbar id="artistSearch" type="text" placeholder="Artiste" @keyup.enter="getArtist()" v-model="searchAutor"></ion-searchbar>

          <ion-card v-for="artist in artistes" :key="artist.id" class="card">
          <ion-card-header>
            <router-link :to="{name:'albums',params:{id:artist.id, author:artist.name}}"> <ion-img :src="artist.picture_medium"> </ion-img></router-link>
            <ion-card-title><h2>{{artist.name}}</h2></ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <h3>{{artist.nb_fan}} fans</h3>
          </ion-card-content>
        </ion-card>
        </ion-toolbar>


        
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
const baseUrl = "https://api.deezer.com/search/artist?q=";
import {
    IonCard,
    IonCardTitle,IonCardHeader,IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonImg,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: {
      IonCard,
    IonCardTitle,IonCardHeader,IonCardContent,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonImg,
  },

  data(){
    return {
      searchAutor:"",
      artistes:[],
      
    }
  },
  methods: {
    getArtist(){
      this.axios.get(baseUrl+this.searchAutor).then((response) => {
        this.artistes=response.data.data;
        console.log(this.artistes);
        console.log(response.data.data);
}) 
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  margin-top: 20px;
  
}


#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
.card{
  margin-top:20px;
}
</style>
