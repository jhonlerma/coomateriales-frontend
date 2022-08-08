import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import CoLogIn from './components/CoLogIn.vue'
import CoSignUp from './components/CoSignUp.vue'
import CoHome from './components/CoHome.vue'
import CoAccount from './components/CoAccount.vue'


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
