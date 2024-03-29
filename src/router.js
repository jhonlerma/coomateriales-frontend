import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import CoLogIn from './components/CoLogIn.vue'
import CoSignUp from './components/CoSignUp.vue'
import CoHome from './components/CoHome.vue'
import CoAccount from './components/CoAccount.vue'
import CoSignUpProveedor from './components/CoSignUpProveedor.vue'
import CoSignUpCategoria from './components/CoSignUpCategoria.vue'
import CoSignUpFabricante from './components/CoSignUpFabricante.vue'
import CoSignUpProducto from './components/CoSignUpProducto.vue'
import CoTableUser from './components/CoTableUser.vue'
import CoTableCategoria from './components/CoTableCategoria.vue'
import CoTableFabricante from './components/CoTableFabricante.vue'
import CoTableProducto from './components/CoTableProducto.vue'
import CoTableProveedor from './components/CoTableProveedor.vue'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/LogIn',
    name: 'coLogIn',
    component: CoLogIn
  },
  {
    path: '/user/SignUp',
    name: 'coSignUp',
    component: CoSignUp
  },
  {
    path: '/proveedor/SignUp',
    name: 'coSignUpProveedor',
    component: CoSignUpProveedor
  },
  {
    path: '/Categoria/SignUp',
    name: 'coSignUpCategoria',
    component: CoSignUpCategoria
  },
  {
    path: '/fabricante/SignUp',
    name: 'coSignUpFabricante',
    component: CoSignUpFabricante
  },
  {
    path: '/producto/SignUp',
    name: 'coSignUpProducto',
    component: CoSignUpProducto
  },
  {
    path: '/user/home',
    name: 'coHome',
    component: CoHome
  },
  {
    path: '/user/account',
    name: 'coAccount',
    component: CoAccount
  },
  {
    path: '/user/list',
    name: 'coTableUser',
    component: CoTableUser
  },
  {
    path: '/categoria/list',
    name: 'coTableCategoria',
    component: CoTableCategoria
  },
  {
    path: '/fabricante/list',
    name: 'coTableFabricante',
    component: CoTableFabricante
  },
  {
    path: '/producto/list',
    name: 'coTableProducto',
    component: CoTableProducto
  },
  {
    path: '/proveedor/list',
    name: 'coTableProveedor',
    component: CoTableProveedor
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
