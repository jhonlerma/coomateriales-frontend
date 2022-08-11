<template>
  <div class="container">
    <div>
      <h2>Proveedores</h2>
    </div>
    <br>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nit</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Correo</th>
            <th scope="col">Direccion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, index) in proveedores" :key="index">
            <th>{{ cat.id }}</th>
            <td>{{ cat.nombre_proveedor }}</td>
            <th>{{ cat.nit_proveedor }}</th>
            <td>{{ cat.telefono_proveedor }}</td>
            <th>{{ cat.correo_proveedor }}</th>
            <td>{{ cat.direccion_proveedor }}</td>

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
    <co-edit-proveedor-modal
  v-if="is_visible_modal"
  v-bind:to_edit_props="to_edit"
  v-on:completedEditProveedor="completedEditProveedor"
  v-on:close="is_visible_modal = false"></co-edit-proveedor-modal>
</template>
<script>
import CoEditProveedorModal from './CoEditProveedorModal.vue';
import axios from 'axios';
export default {
  name: "coTableCategoria",
  data: function () {
    return {
      proveedores: [],
      is_visible_modal: false,
      to_edit: {},

    };
  },
  components: {
    CoEditProveedorModal,
  },
  methods: {
    getData: async function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.get("https://coomateriales-backend.herokuapp.com/proveedor/list/", { headers: { "Authorization": `Bearer ${token}` } }).then(result => this.proveedores = result.data);
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
          `https://coomateriales-backend.herokuapp.com/proveedor/delete/` + id + `/`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        ).then((rest) => {
          console.log(rest);
          alert("Dato elminiado");
          this.$emit('verifyAuth');
        }).catch((e) => e);
      }
    },
    completedEditProveedor: function(){
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
