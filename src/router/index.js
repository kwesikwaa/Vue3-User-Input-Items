import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WBuilder from '../views/WBuilder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/hi',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'builder',
      component: WBuilder
    }
  ]
})

export default router
