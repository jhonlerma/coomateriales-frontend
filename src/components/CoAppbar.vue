<template>

  <nav class="navbar bg-dark">
    <div class="container-fluid mx-3">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" alt="logo coomateriales blanco" height="28">
      </a>
      <div class="links-section">
        <button v-if="!is_auth_props" v-on:click="loadSignUp" class="btn btn-light">Registrarse</button>
        <button v-if="!is_auth_props" v-on:click="loadLogIn" class="btn btn-success ms-3">Iniciar Sesión</button>
      </div>

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
  props: {
    is_auth_props: {
      required: true
    }
  },
  methods: {
    loadLogIn: function () {
      this.$router.push({ name: 'coLogIn' })
    },
    loadSignUp: function () {
      this.$router.push({ name: 'coSignUp' })
    },
    loadHome: function () {
      this.$router.push({ name: 'coHome' })
    },
    loadAccount: function () {
      this.$router.push({ name: 'coAccount' })
    },
  },
}
</script>

<style>
</style>