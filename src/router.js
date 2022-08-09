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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
