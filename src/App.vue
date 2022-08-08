<template>
    <header>
      <co-appbar></co-appbar>
    </header>
    <main>
      <router-view v-on:completedLogIn="completedLogIn"
                   v-on:completedSignUp="completedSignUp"
                   v-on:logOut="logOut">
      </router-view>

    </main>
    <footer>
      <h2>Que viva el comunismo y los mamertos 2022</h2>
    </footer>
</template>

<script>
import CoAppbar from './components/CoAppbar.vue'
export default{
  name: 'App',
  data: function(){
    return{
      is_auth:false
    }
  },
  methods:{
    verifyAuth: function(){
      this.is_auth = localStorage.getItem("isAuth") || false
      if(this.is_auth==false)
        this.$router.push({name:'coLogIn'});
      else
        this.$router.push({name:'coHome'});
    },
  },
  components:{
    CoAppbar,
  },
  created: function (){
    this.verifyAuth()
  }
}
</script>

<style>
</style>
