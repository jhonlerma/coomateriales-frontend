<template>
  <nav>

    <img src="../assets/logo.png" alt="">
    <!-- <div class="search">
            <input class="search--input" type="text" name="searchInput" id="searchInput">
            <button class="search--button"><span></span>buscar</button>
        </div> -->

    <div class="links-section">
      <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
      <button v-if="is_auth" v-on:click="loadAccount">Cuenta</button>
      <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
      <button class="links-section--register-button" v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      <button class="links-section--login-button" v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'CoAppbar',
  data: function () {
    return {
      name: "",
      email: "",
      balance: 0,
      loaded: false,
    }
  },
  methods: {
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
      this.$emit('verifyAuth');
    },    
  },
  created: async function () {
    this.getData();
  }

}
</script>

<style>
</style>