<template>
  <form v-on:submit.prevent="processEditProveedor">
    <div class="modal fade show modal-active" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Proveedor</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              v-on:click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p class="m-0"><strong>Id Proveedor: </strong>{{ to_edit_props.id }}</p>
              <p class="m-0"><strong>Nit Proveedor: </strong>{{ to_edit_props.nit_proveedor }}</p>
              <p class="m-0"><strong>Nombre Proveedor: </strong>{{ to_edit_props.nombre_proveedor }}</p>
              <p class="m-0"><strong>Telefono Proveedor: </strong>{{ to_edit_props.telefono_proveedor }}</p>
              <p class="m-0"><strong>Correo Proveedor: </strong>{{ to_edit_props.correo_proveedor }}</p>
              <p class="m-0"><strong>Direccion Proveedor: </strong>{{ to_edit_props.direccion_proveedor }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label">Nit</label>
              <input type="text" class="form-control" v-model="proveedor.nit_proveedor" placeholder="Nit">
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" class="form-control" v-model="proveedor.nombre_proveedor" placeholder="Nombre">
            </div>
            <div class="mb-3">
              <label class="form-label">Teléfono</label>
              <input type="text" class="form-control" v-model="proveedor.telefono_proveedor" placeholder="Teléfono">
            </div>
            <div class="mb-3">
              <label class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" v-model="proveedor.correo_proveedor"
                placeholder="Correo electrónico">
            </div>
            <div class="mb-3">
              <label class="form-label">Dirección</label>
              <input type="text" class="form-control" v-model="proveedor.direccion_proveedor" placeholder="Dirección">
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
  name: 'CoEditProveedor',
  data: function () {
    return {
      proveedor: {
        id: 0,
        nit_proveedor: "",
        nombre_proveedor: "",
        telefono_proveedor: "",
        correo_proveedor: "",
        direccion_proveedor: ""
      }
    }
  },
  props: {
    to_edit_props: {
      required: true
    },
  },
  methods: {
    processEditProveedor: function () {
      this.proveedor.id = this.to_edit_props.id;

      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.put(
        "https://coomateriales-backend.herokuapp.com/proveedor/update/",
        this.proveedor,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
        .then((result) => {
          let dataSignUp = {
            token_access: result.data.access,
            token_refresh: result.data.refresh,
            nit_proveedor: this.proveedor.nit_proveedor
          }
          alert("entra")
          this.$emit('completedEditProveedor', dataSignUp)
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
  },
  mounted(){
    this.proveedor = this.to_edit_props;
  },
}
</script>
<style>
.modal-active {
  display: block;
}
</style>

