<template>
  <div class="container col-md-12 col-lg-8 col-xl-6 mt-3 p-0">
    <div class="row">
      <div class="card" style="border-radius: 15px">
        <div class="card-body p-5">
          <h2 class="text-uppercase text-center mb-3">Registro de Categoría</h2>
          <form v-on:submit.prevent="processSignUpCategoria">
            <div class="mb-3">
              <label class="form-label">Nombre Categoría </label>
              <input type="text" class="form-control" v-model="categoria.nombre_categoria"
                placeholder="Nombre categoría">
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
  name: 'CoSignUpCategoria',
  data: function () {
    return {
      categoria: {
        nombre_categoria: "",
      }
    }
  },
  methods: {
    processSignUpCategoria: function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.post(
        "https://coomateriales-backend.herokuapp.com/categoria/create/",
        this.categoria,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
        .then((result) => {
          let dataSignUp = {
            token_access: result.data.access,
            token_refresh: result.data.refresh,
            nombre_categoria: this.categoria.nombre_categoria
          }
          this.$emit('completedSignUpCategoria', dataSignUp)
        })
        .catch((error) => {
          console.log(error)
          alert("ERROR: Fallo en el registro");
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
  }
}
</script>