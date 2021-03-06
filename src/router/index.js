import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "user" */ '../views/backend/Auth.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/backend/Dashboard.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '../views/backend/Article.vue')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import(/* webpackChunkName: "lists" */ '../views/backend/Lists.vue')
  },
  {
    path: '/specifics',
    name: 'Specifics',
    component: () => import(/* webpackChunkName: "specific" */ '../views/backend/Specifics.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
