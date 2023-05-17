import { createRouter, createWebHistory } from 'vue-router'
import Barang from '../views/Member/Barang.vue'
import Supplier from '../views/Member/Supplier.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'FrontPage',
    redirect: {path: '/login'},
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'registration',
        name: 'Registration',
        component: Registration
      },
    ]
  },
  {
    path: '/barang',
    name: 'Barang',
    component: Barang,
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Supplier,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
