<template>
  <div class="card col-6 container p-0">
    <div class="card-header">
      Inicio de Sesión
    </div>
    <div class="card-body">
      <form v-on:submit.prevent="processLogInUser">
      <label for="userInput" class="form-label">Usuario</label>
      <input type="text" class="form-control mb-3" v-model="user.username" placeholder="Nombre de usuario"
        name="userInput">
      <label for="passwordInput" class="form-label">Contraseña</label>
      <input type="password" class="form-control mb-3" v-model="user.password" placeholder="Contraseña"
        name="passwordInput">
      <button type="submit" class="btn btn-primary mt-3">Iniciar Sesión</button>
    </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { request } from 'http';
export default {
  name: "CoLogIn",
  data: function () {
    return {
      user: {
        username: "",
        password: ""
      },
      is_auth: false
    }
  },
  methods: {
    processLogInUser: function () {
      axios.post(
        "https://coomateriales-backend.herokuapp.com/login/",
        this.user,
        { headers: {} }
      )
        .then((result) => {
          let dataLogIn = {
            token_access: result.data.access,
            token_refresh: result.data.refresh,
            username: this.user.username
          }
          this.completedLogIn(dataLogIn)
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales son incorrectas.")
        });
    },
    completedLogIn: function (data) {
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      localStorage.setItem("username", data.username);
      localStorage.setItem("isAuth", true);
      this.is_auth = true
      // aqui va codigo para devolver el estado al componente CoAppbar
      alert("Autentación exitosa");
      this.$emit('verifyAuth');
    },

  }

}
</script>

<style>
</style>
