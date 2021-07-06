import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import movieDetails from '../views/movieDetails.vue';
import Login from '../views/Login.vue';
import Favourites from '../views/favourites.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:imdbId',
    props: true,
    name: 'movieDetails',
    component: movieDetails,
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
