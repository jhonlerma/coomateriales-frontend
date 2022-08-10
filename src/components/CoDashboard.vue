<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark barra-lateral" style="width: 280px;">
    <div class="logo">
      <h2>Dashboard</h2>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a class="nav-link text-white" v-on:click="loadHome"><i class="bi bi-house"></i><span>Inicio</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" v-on:click="loadSignUp"><i class="bi bi-people-fill"></i><span>Registro
            de Usuarios</span></a>
      </li>
      <li v-if="is_auth_props" class="nav-item">
        <a class="nav-link text-white" v-on:click="loadSignUpCategoria"><i
            class="bi bi-star-fill"></i><span>Registro de
            Categoría</span></a>
      </li>
      <li v-if="is_auth_props" class="nav-item">
        <a class="nav-link text-white"  v-on:click="loadSignUpFabricante"><i
            class="bi bi-star-fill"></i><span>Registro
            de
            Fabricante</span></a>
      </li>
      <li v-if="is_auth_props" class="nav-item">
        <a class="nav-link text-white" v-on:click="loadSignUpProveedor"><i
            class="bi bi-people-fill"></i><span>Registro
            de
            Proveedores</span></a>

      </li>
      <li v-if="is_auth_props" class="nav-item">
        <a class="nav-link text-white" v-on:click="loadSignUpProducto"><i
            class="bi bi-star-fill"></i><span>Registro de
            Productos</span></a>
      </li>
      <li v-if="is_auth_props" class="nav-item">
        <a class="nav-link text-white" v-on:click="loadUserAccount"><i
            class="bi bi-person-fill"></i><span>Mi Cuenta</span></a>
      </li>

      <li v-if="is_auth_props" class="nav-item">
        <a class="nav-link text-white" v-on:click="logOut" href="#"><i
            class="bi bi-box-arrow-left"></i><span>Salir</span></a>

      </li>

    </ul>
    <hr>
  </div>
</template>

<script>
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
export default {
  name: 'CoDashboard',
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
      type: Boolean,
      required: true
    }
  },

  methods: {
    loadSignUp: function () {
      this.$router.push({ name: 'coSignUp' })
    },
    loadHome: function () {
      this.$router.push({ name: 'coHome' })
    },
    loadSignUpCategoria: function () {
      this.$router.push({ name: 'coSignUpCategoria' })
    },
    loadSignUpFabricante: function () {
      this.$router.push({ name: 'coSignUpFabricante' })
    },
    loadSignUpProveedor: function () {
      this.$router.push({ name: 'coSignUpProveedor' })
    },
    loadSignUpProducto: function () {
      this.$router.push({ name: 'coSignUpProducto' })
    },
    loadUserAccount: function () {
      this.$router.push({ name: 'coAccount' })
    },

    logOut: function () {
      localStorage.clear();
      this.$emit('verifyAuth');
      alert("Sesión cerrada");

    },


  },
  created: async function () {
    this.getData();
  }
}
</script>

<style>
/* --- LOGO --- */
.barra-lateral .logo {
  background: #0275db;
  margin-bottom: 2px;
}

.barra-lateral .logo h2 {
  font-size: 30px;
  font-family: 'Roboto', sans-serif;
  padding: 20px 0;
  text-align: center;
  font-weight: 300;
  margin: 0;
}

/* --- MENU --- */
.barra-lateral li {
  cursor: pointer;
}

.barra-lateral li:hover {
  background: #35ae6b;
  text-decoration: none;
}

.barra-lateral li a i {
  margin-right: 20px;
  font-weight: normal;
}
</style>