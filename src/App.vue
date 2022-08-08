<template>
  <div id="app" class="app">
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
  </div>
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
    loadLogIn: function(){
      this.$router.push({name:'coLogIn'})    
    },
    loadSignUp: function(){
      this.$router.push({name:'coSignUp'})    
    },
    loadHome: function(){
      this.$router.push({name:'coHome'})
    },
    loadAccount: function(){
      this.$router.push({name:'coAccount'})
    },
    logOut: function(){
      localStorage.clear();
      alert("Sesión cerrada");
      this.verifyAuth();
    },    
    completedLogIn: function(data){
      localStorage.setItem("token_access",data.token_access);
      localStorage.setItem("token_refresh",data.token_refresh);
      localStorage.setItem("username",data.username);
      localStorage.setItem("isAuth",true);
      alert("Autentación exitosa");
      this.verifyAuth();
    },
    completedSignUp: function(data){
      alert("Registro exitoso");
      this.completedLogIn(data)
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
