<template>
    <div class="container">
        <div>
            <h2>Usuarios</h2>
        </div>
        <br>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                        <th>{{ user.id }}</th>
                        <td>{{ user.username }}</td>
                        <td>{{ user.nombre_usuario }}</td>
                        <td>{{ user.apellido_usuario }}</td>
                        <td>{{ user.telefono_usuario }}</td>
                        <td>{{ user.correo_usuario }}</td>
                        <td>{{ user.direccion_usuario }}</td>
                        <td>
                            <button type="submit" class="btn btn-success" v-on:click="userEdit(user.id)"><i
                                    class="bi bi-pencil-square"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "coTableUser",
  data: function () {
    return {
      users: []
    };
  },
  methods: {
    getData: async function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      axios.get("https://coomateriales-backend.herokuapp.com/user/list/", { headers: { "Authorization": `Bearer ${token}` } }).then(result => this.users = result.data);
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
    userEdit: function (id) {
      alert(id);
    }

  },
  created: async function () {
    this.getData();
  },
}
</script>
