import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '../views/CategoryView.vue'
import NewCategoryView from '../views/NewCategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CategoryView
    },
    {
      path: '/createcategory',
      name: 'createcategory',
      component: NewCategoryView
    },
    
  ]
})

export default router
