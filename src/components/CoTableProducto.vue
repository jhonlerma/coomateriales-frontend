<template>
  <div class="container">
    <div>
      <h2>Productos</h2>
    </div>
    <br>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Marca</th>
            <th scope="col">Precio</th>
            <th scope="col">Resumen</th>
            <th scope="col">Detalle</th>
            <th scope="col">Id Categoria</th>
            <th scope="col">Id Fabricante</th>
            <th scope="col">Id Proveedor</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, index) in productos" :key="index">
            <th>{{ cat.id }}</th>
            <td>{{ cat.nombre_producto }}</td>
            <td>{{ cat.marca_producto }}</td>
            <td>{{ cat.precio_unit_producto }}</td>
            <td>{{ cat.resumen_producto }}</td>
            <td>{{ cat.detalle_producto }}</td>
            <td>{{ cat.categoria_producto }}</td>
            <td>{{ cat.fabricante_producto }}</td>
            <td>{{ cat.proveedor_producto }}</td>
            <td>
              <button type="submit" class="btn btn-success" v-on:click="userEdit(cat)"><i
                  class="bi bi-pencil-square"></i></button>
              <button type="submit" class="btn btn-danger" v-on:click="userDelete(cat.id)"><i
                  class="bi bi-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <co-edit-producto-modal
  v-if="is_visible_modal"
  v-bind:to_edit_props="to_edit"
  v-on:completedEditProducto="completedEditProducto"
  v-on:close="is_visible_modal = false"></co-edit-producto-modal>
</template>
<script>
import CoEditProductoModal from './CoEditProductoModal.vue';
import axios from 'axios';
export default {
  name: "coTableProducto",
  data: function () {
    return {
      productos: [],
      is_visible_modal: false,
      to_edit: {},
    };
  },
    components: {
    CoEditProductoModal,
  },
  methods: {
    getData: async function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.get("https://coomateriales-backend.herokuapp.com/producto/list/", { headers: { "Authorization": `Bearer ${token}` } }).then(result => this.productos = result.data);
    },
    verifyToken: function () {
      return axios.post("https://coomateriales-backend.herokuapp.com/refresh/", { refresh: localStorage.getItem("token_refresh") }, { headers: {} })
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
    userEdit: function (cat) {
      this.is_visible_modal = true;
      this.to_edit = cat;
    },
    userDelete: function (id) {
      if (id) {
        if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
          this.$emit('logOut');
          return;
        }
        this.verifyToken();
        let token = localStorage.getItem("token_access");
        axios.delete(
          `https://coomateriales-backend.herokuapp.com/producto/delete/` + id + `/`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        ).then((rest) => {
          console.log(rest);
          alert("Dato elminiado");
          this.$emit('verifyAuth');
        }).catch((e) => e);
      }
    },
    completedEditProducto: function(){
      this.is_visible_modal = false;
      this.getData();
      alert("registro actualizado correctamente");
    }


  },
  created: async function () {
    this.getData();
  },
}
</script>
