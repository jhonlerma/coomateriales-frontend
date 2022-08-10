<template>
  <div class="container col-md-12 col-lg-8 col-xl-6 mt-3 p-0">
    <div class="row">
      <div class="card" style="border-radius: 15px">
        <div class="card-body p-5">
          <h2 class="text-uppercase text-center mb-3">Registrarse</h2>
          <form v-on:submit.prevent="processSignUp">
            <div class="mb-3">
              <label class="form-label">Nombre de Usuario</label>
              <input type="text" class="form-control" v-model="user.username" placeholder="Nombre de Usuario">
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <input type="password" class="form-control" v-model="user.password" placeholder="Contraseña">
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" class="form-control" v-model="user.nombre_usuario" placeholder="Nombre">
            </div>
            <div class="mb-3">
              <label class="form-label">Apellido</label>
              <input type="text" class="form-control" v-model="user.apellido_usuario" placeholder="Apellido">
            </div>
            <div class="mb-3">
              <label class="form-label">Teléfono</label>
              <input type="text" class="form-control" v-model="user.telefono_usuario" placeholder="Teléfono">
            </div>
            <div class="mb-3">
              <label class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" v-model="user.correo_usuario" placeholder="Correo electrónico">
            </div>
            <div class="mb-3">
              <label class="form-label">Dirección</label>
              <input type="text" class="form-control" v-model="user.direccion_usuario" placeholder="Dirección">
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CoSignUp',
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        nombre_usuario: "",
        apellido_usuario: "",
        telefono_usuario: "",
        correo_usuario: "",
        direccion_usuario: ""
      }
    }
  },
  methods: {
    processSignUp: function () {
      axios.post(
        "https://coomateriales-backend.herokuapp.com/user/create/",
        this.user,
        { headers: {} }
      )
        .then((result) => {
          let dataSignUp = {
            token_access: result.data.access,
            token_refresh: result.data.refresh,
            username: this.user.username
          }
          this.$emit('completedSignUp', dataSignUp)
        })
        .catch((error) => {
          console.log(error)
          alert("ERROR: Fallo en el registro");
        });
    }
  }
}
</script>

