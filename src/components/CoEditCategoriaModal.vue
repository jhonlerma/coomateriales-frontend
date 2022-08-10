<template>
  <div class="modal fade show" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- <div class="container col-md-12 col-lg-8 col-xl-6 mt-3 p-0">
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
  </div> -->
  <button class="btn btn-primary" v-on:click="newAddressModal.show()">
    Show Modal
</button>
<div class="modal fade" id="newModal" ref="newModal">
    <div class="modal-dialog">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h3>Header</h3>
            </div>
        </div>
        <div class="modal-body">
            body
        </div>
    </div>
</div>

</template>
// import { Modal } from 'bootstrap';
// export default {
//     data(){
//         newModal : null
//     },
//     mounted(){
//         this.newModal = new Modal(this.$refs.nweModal);
//     }
// }
<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
export default {
  name: 'CoEditCategoriaModal',
  data: function () {
    return {
      categoria: {
        nombre_categoria: "",
      },
      newModal : null,
    }
  },
      mounted(){
        this.newModal = new Modal(this.$refs.nweModal);
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