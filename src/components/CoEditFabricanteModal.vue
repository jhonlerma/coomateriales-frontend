<template>
  <form v-on:submit.prevent="processEditFabricante">
    <div class="modal fade show modal-active" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Fabricante</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              v-on:click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p class="m-0"><strong>Id Fabricante: </strong>{{ to_edit_props.id }}</p>
              <p class="m-0"><strong>Nombre Fabricante: </strong>{{ to_edit_props.nombre_fabricante }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre Fabricante </label>
              <input type="text" class="form-control" v-model="fabricante.nombre_fabricante"
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
  name: 'CoEditFabricanteModal',
  data: function () {
    return {
      fabricante: {
        id: 0,
        nombre_fabricante: "",
      },
    }
  },
  props: {
    to_edit_props: {
      required: true
    },
  },
  methods: {
    processEditFabricante: function () {

      this.fabricante.id = this.to_edit_props.id;

      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.put(
        "https://coomateriales-backend.herokuapp.com/fabricante/update/", // colocar el indice que retorna el boton edit
        this.fabricante,
        { headers: { 'Authorization': `Bearer ${token}` }, }
      )
        .then((result) => {
          let dataSignUp = {
            token_access: result.data.access,
            token_refresh: result.data.refresh,
            nombre_fabricante: this.fabricante.nombre_fabricante
          }
          this.$emit('completedEditFabricante', dataSignUp)
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
    this.fabricante = this.to_edit_props;
  },

}
</script>
<style>
.modal-active {
  display: block;
}
</style>