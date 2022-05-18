<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title
          ><h1>
            
            Album {{ title }}
          </h1>
        </ion-title>
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
          <ion-card class="card">
            <ion-card-header>
              <ion-img :src="album.cover_medium"></ion-img>
              <ion-card-title>{{ album.title }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              <h2>{{ album.release_date }}</h2>
              <h3>{{ album.nb_tracks }} titre(s)</h3>
              <h3>{{ album.label }}</h3>
            </ion-card-content>
          </ion-card>

          <ion-card v-for="track in tracks" :key="track.id" class="card">
            <ion-card-header>
              <ion-card-title
                >{{ track.title }}
                <ion-button
                  color="dark"
                  class="play-button"
                  @click="playTrack(track.preview)"
                  >Play</ion-button
                >
              </ion-card-title>
            </ion-card-header>
          </ion-card>
        </ion-toolbar>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
const baseUrl = "https://api.deezer.com/album/";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonImg,
  IonButtons,
  IonBackButton  
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TrackView",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonImg,
    IonButtons,
    IonBackButton  
  },

  data() {
    return {
      id: this.$route.params.idAlbum,
      title: this.$route.params.albumTitle,
      album: new Object(),
      preview: "",
      audio: HTMLAudioElement,
      tracks: [],
      playing: false,
    };
  },

  created() {
    const promise = this.axios.get(baseUrl + this.id);
    const dataPromise = promise.then((response) => response.data);
    promise.then((response) => {
      this.album = response.data;
      this.tracks = this.album.tracks.data;
      console.log(this.album.tracks.data);
      console.log(baseUrl + this.id);
      return response.data;
    });
  },

  methods: {
  
    playTrack(preview) {
      this.playing = !this.playing;
      console.log(this.playing);

      if (this.playing == true) {
        this.audio = new Audio(preview);
        this.audio.load();
        this.audio.play();
      } else if (this.playing == false) {
        this.audio.pause();
      }
    },
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

#container a {
  text-decoration: none;
}
.card {
  margin-top: 20px;
  text-align: left;
}
.play-button {
  float: right;
}
</style>
