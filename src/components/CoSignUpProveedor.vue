<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 col-md-6">
                <h2>Registro de Proveedores</h2>
                <br>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Nit</label>
                        <input type="text" class="form-control" v-model="userProveedor.nit_proveedor" placeholder="Nit">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-control" v-model="userProveedor.nombre_proveedor" placeholder="Nombre">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Teléfono</label>
                        <input type="text" class="form-control" v-model="userProveedor.telefono_proveedor" placeholder="Teléfono">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" v-model="userProveedor.correo_proveedor" placeholder="Correo electrónico">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Dirección</label>
                        <input type="text" class="form-control" v-model="userProveedor.direccion_proveedor" placeholder="Dirección">
                    </div>
                    <button type="submit" class="btn btn-primary">Registrar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CoSignUpProveedores',
    data: function () {
        return {
            userProveedor: {
                nit_proveedor: "",
                nombre_proveedor: "",
                telefono_proveedor: "",
                correo_proveedor: "",
                direccion_proveedor: ""
            }
        }
    },
    methods: {
        processSignUp: function () {
            axios.post(
                "https://coomateriales-backend.herokuapp.com/proveedor/create/",
                this.userProveedor,
                { headers: {} }
            )
                .then((result) => {
                    let dataSignUp = {
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                        nit_proveedor: this.userProveedor.nit_proveedor
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

<!-- <style>
.signUp_user{
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 .container_signUp_user {
    border: 3px solid #283747;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.signUp_user h2
{
    color: #283747;
}
 .signUp_user form
{
    width: 70%;
}
 .signUp_user input
{
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #283747;
}
 .signUp_user button
{
    width: 100%;
    height: 40px;
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}
 .signUp_user button:hover {
    color: #E5E7E9;
    background: crimson;
    border: 1px solid #283747;
 }
</style> -->
