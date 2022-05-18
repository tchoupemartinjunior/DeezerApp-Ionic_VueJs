<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
      <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title><h1>{{titre}}</h1></ion-title>
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
          <ion-card v-for="album in albums" :key="album.id" class="card">
            <ion-card-header>
              <router-link :to="{ name: 'track', params: { idAlbum: album.id, albumTitle:album.title } }"
                ><ion-img :src="album.cover_medium"></ion-img
              ></router-link>

              <ion-card-title>{{ album.title }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              <h2>{{ album.release_date }}</h2>
              <h3>{{ album.label }}</h3>
            </ion-card-content>
          </ion-card>
        </ion-toolbar>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
const baseUrl = "https://api.deezer.com/artist/";

import {

 IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,IonCardTitle,IonCardHeader,IonCardContent,
  IonImg,
} from "@ionic/vue";
import { defineComponent } from "vue";



export default defineComponent({
  name: "AlbumsView",
  components: {
    IonCard,
    IonCardTitle,IonCardHeader,IonCardContent,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
  },
  data() {
    return {
      id: this.$route.params.id,
      titre:this.$route.params.author,
      albums: [],
    };
  },

  created() {
    this.axios.get(baseUrl + this.id + "/albums").then((response) => {
      this.albums = response.data.data;
      console.log(this.albums);
    });
    
  },
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
#container h2 h3 {
  text-align: left;
}
#container a {
  text-decoration: none;
}
.card {
  margin-top: 20px;
  text-align: left;
}
.icon {
  color: black;
}
</style>
