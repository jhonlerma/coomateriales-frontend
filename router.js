import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  // {
  //   path: '/user/LogIn',
  //   name: 'logIn',
  //   component: LogIn
  // },
  {
    path: '/user/SignUp',
    name: 'signUp',
    component: SignUp
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
