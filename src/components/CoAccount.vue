<template>
  <div v-if="loaded" class="container col-md-12 col-lg-8 col-xl-6 mt-3 p-0">
    <div class="row">
      <div class="card p-0" style="border-radius: 15px">
        <img src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/06/20/gustavo-petro-2.jpeg"
          class="card-img-top" alt="foto usuario">

        <div class="card-body p-5">
          <h2 class="text-uppercase text-center mb-3">{{ username }}</h2>
          <div class="mb-2">
            <label class="form-label fs-5"><strong>Nombre: </strong>{{nombre_usuario}}</label>
          </div>
          <div class="mb-2">
            <label class="form-label fs-5"><strong>Apellido: </strong>{{apellido_usuario}}</label>
          </div>
          <div class="mb-2">
            <label class="form-label fs-5"><strong>Teléfono: </strong>{{telefono_usuario}}</label>
          </div>
          <div class="mb-2">
            <label class="form-label fs-5"><strong>Correo electrónico: </strong>{{correo_usuario}}</label>
          </div>
          <div class="mb-2">
            <label class="form-label fs-5"><strong>Dirección: </strong>{{direccion_usuario}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div v-if="loaded" class="container col-md-12 col-lg-8 col-xl-6 mt-3 p-0">
    <div class="row">
      <div class="card mb-3">
        <img src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2022/06/20/gustavo-petro-2.jpeg"
          class="card-img-top" alt="foto usuario">
        <div class="card-body">
          <h2 class="card-title">Usuario: {{ username }}</h2>
          <h5 class="card-text">Nombres: <span>{{ nombre_usuario }}</span></h5>
          <h5 class="card-text">Apellidos: <span>{{ apellido_usuario }}</span></h5>
          <h5 class="card-text">Telefono: <span>{{ telefono_usuario }}</span></h5>
          <h5 class="card-text">Email: <span>{{ correo_usuario }}</span></h5>
          <h5 class="card-text">Direccion: <span>{{ direccion_usuario }}</span></h5>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
  name: 'CoAccount',
  data: function () {
    return {
      username: "",
      nombre_usuario: "",
      apellido_usuario: "",
      telefono_usuario: "",
      correo_usuario: "",
      direccion_usuario: "",
      loaded: false,

    }
  },
  methods: {
    getData: async function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios.get(
        `https://coomateriales-backend.herokuapp.com/user/read/${userId}/`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
        .then((result) => {

          this.username = result.data.username,
            this.nombre_usuario = result.data.nombre_usuario,
            this.apellido_usuario = result.data.apellido_usuario,
            this.telefono_usuario = result.data.telefono_usuario,
            this.correo_usuario = result.data.correo_usuario,
            this.direccion_usuario = result.data.direccion_usuario,

            this.loaded = true;
        })
        .catch(() => {
          this.$emit('logOut');
        });
    },
    verifyToken: function () {
      return axios.post(
        "https://coomateriales-backend.herokuapp.com/refresh/",
        { refresh: localStorage.getItem("token_refresh") },
        { headers: {} })
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit('logOut')
        })
    }

  },
  created: async function () {
    this.getData();
  }

}
</script>

<style>
</style>