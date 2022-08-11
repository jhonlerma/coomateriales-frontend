<template>
  <form v-on:submit.prevent="processEditProducto">
    <div class="modal fade show modal-active" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              v-on:click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p class="m-0"><strong>Id Producto: </strong>{{ to_edit_props.id }}</p>
              <p class="m-0"><strong>Nombre Producto: </strong>{{ to_edit_props.nombre_producto }}</p>
              <p class="m-0"><strong>Marca Producto: </strong>{{ to_edit_props.marca_producto }}</p>
              <p class="m-0"><strong>Precio Unidad: </strong>{{ to_edit_props.precio_unit_producto }}</p>
              <p class="m-0"><strong>Resumen: </strong>{{ to_edit_props.resumen_producto }}</p>
              <p class="m-0"><strong>Detalle: </strong>{{ to_edit_props.detalle_producto }}</p>
              <p class="m-0"><strong>Id Categoría: </strong>{{ to_edit_props.categoria_producto }}</p>
              <p class="m-0"><strong>Id Fabricante: </strong>{{ to_edit_props.fabricante_producto }}</p>
              <p class="m-0"><strong>Id Proveedor: </strong>{{ to_edit_props.proveedor_producto }}</p>
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" class="form-control" v-model="producto.nombre_producto"
                placeholder="Nuevo Nombre del Producto">
            </div>
            <div class="mb-3">
              <label class="form-label">Marca del Producto</label>
              <input type="text" class="form-control" v-model="producto.marca_producto"
                placeholder="Nuevo Marca del Producto">
            </div>
            <div class="mb-3">
              <label class="form-label">Precio Unidad</label>
              <input type="number" class="form-control" v-model="producto.precio_unit_producto"
                placeholder="Nuevo Precio Unidad del Producto">
            </div>
            <div class="mb-3">
              <label class="form-label">Resumen</label>
              <input type="text" class="form-control" v-model="producto.resumen_producto"
                placeholder="Nuevo Resumen del Producto">
            </div>
            <div class="mb-3">
              <label class="form-label">Detalle</label>
              <input type="text" class="form-control" v-model="producto.detalle_producto"
                placeholder="Nuevo Detalle del Producto">
            </div>
            <div class="mb-3">
              <label class="form-label">Categoría</label>
              <input type="number" class="form-control" v-model="producto.categoria_producto"
                placeholder="Nuevo id de la categoría">
            </div>
            <div class="mb-3">
              <label class="form-label">Fabricante</label>
              <input type="number" class="form-control" v-model="producto.fabricante_producto"
                placeholder="Nuevo id del fabricante">
            </div>
            <div class="mb-3">
              <label class="form-label">Proveedor</label>
              <input type="number" class="form-control" v-model="producto.proveedor_producto"
                placeholder="Nuevo id del proveedor">
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
  name: 'CoEditProductoModal',
  data: function () {
    return {
      producto: {
        id: 0,
        nombre_producto: "",
        marca_producto: "",
        precio_unit_producto: 0,
        resumen_producto: "",
        detalle_producto: "",
        categoria_producto: 0,
        fabricante_producto: 0,
        proveedor_producto: 0
      }
    }
  },
  props: {
    to_edit_props: {
      required: true
    },
  },
  methods: {
    processEditProducto: function () {
        this.producto.id = this.to_edit_props.id;

      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.put(
        "https://coomateriales-backend.herokuapp.com/producto/update/",
        this.producto,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
        .then((result) => {
          let dataSignUp = {
            token_access: result.data.access,
            token_refresh: result.data.refresh,
            nombre_producto: this.producto.nombre_producto
          }
          this.$emit('completedEditProducto', dataSignUp)
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
      this.producto = this.to_edit_props;
  },

}
</script>
<style>
.modal-active {
  display: block;
}
</style>