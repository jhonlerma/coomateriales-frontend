<template>
  <form v-on:submit.prevent="processEditCategoria">
    <div class="modal fade show modal-active" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Categoría</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              v-on:click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p class="m-0"><strong>Categoría: </strong>{{ to_edit_props.id }}</p>
              <p class="m-0"><strong>Nombre Categoría: </strong>{{ to_edit_props.nombre_categoria }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre Categoría </label>
              <input type="text" class="form-control" v-model="categoria.nombre_categoria"
                placeholder="Nuevo Nombre" required>
            </div>
          </div>
          <div class="modal-footer">

            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              v-on:click="$emit('close')">Cerrar</button>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>

          </div>
        </div>
      </div>
    </div>
  </form>

  <div class="modal-backdrop fade show"></div>

</template>
<script>
import axios from 'axios';
export default {
  name: 'CoEditCategoriaModal',
  data: function () {
    return {
      categoria: {
        id: 0,
        nombre_categoria: "",
      },
    }
  },
  props: {
    to_edit_props: {
      required: true
    },
  },

  methods: {
    processEditCategoria: function () {

      this.categoria.id = this.to_edit_props.id;
      
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.put(
        "https://coomateriales-backend.herokuapp.com/categoria/update/", // colocar el indice que retorna el boton edit
        this.categoria,
        { headers: { 'Authorization': `Bearer ${token}` }, }
      )
        .then((result) => {
          let dataSignUp = {
            token_access: result.data.access,
            token_refresh: result.data.refresh,
            nombre_categoria: this.categoria.nombre_categoria
          }
          this.$emit('completedEditCategoria', dataSignUp)
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
    },
  },
  mounted(){
    this.categoria = this.to_edit_props;
  },

}
</script>
<style>
.modal-active {
  display: block;
}
</style>