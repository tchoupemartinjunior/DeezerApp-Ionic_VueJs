import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AlbumsView from '../views/AlbumsView.vue'
import TrackView from '../views/TrackView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/albums/:id/:author',
    name: 'albums',
    component: AlbumsView,
  
  },
  {
    path: '/track/:idAlbum/:albumTitle',
    name: 'track',
    component: TrackView,
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
