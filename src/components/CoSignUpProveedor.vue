<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-3">Registro de Proveedor</h2>
                        <form v-on:submit.prevent="processSignUpProveedor">
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
                                <input type="email" class="form-control" v-model="proveedor.correo_proveedor" placeholder="Correo electrónico">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Dirección</label>
                                <input type="text" class="form-control" v-model="proveedor.direccion_proveedor" placeholder="Dirección">
                            </div>
                            <button type="submit" class="btn btn-primary">Registrar</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CoSignUpProveedor',
    data: function () {
        return {
            proveedor: {
                nit_proveedor: "",
                nombre_proveedor: "",
                telefono_proveedor: "",
                correo_proveedor: "",
                direccion_proveedor: ""
            }
        }
    },
    methods: {
        processSignUpProveedor: function () {
            if(localStorage.getItem("token_access")===null ||localStorage.getItem("token_refresh")===null ){
                this.$emit('logOut');
                return;
            }
            this.verifyToken();
            let token = localStorage.getItem("token_access");
            axios.post(
                "https://coomateriales-backend.herokuapp.com/proveedor/create/",
                this.proveedor,
                { headers: {'Authorization':`Bearer ${token}`} }
            )
                .then((result) => {
                    let dataSignUp = {
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                        nit_proveedor: this.proveedor.nit_proveedor
                    }
                    this.$emit('completedSignUpProveedor', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro");
                });
        },
        verifyToken: function(){
            return axios.post(
                "https://coomateriales-backend.herokuapp.com/refresh/",
                {refresh: localStorage.getItem("token_refresh")},
                {headers:{}})
                .then((result)=>{
                    localStorage.setItem("token_access",result.data.access);
                })
                .catch(()=>{
                    this.$emit('logOut')
                })    
        }
    }
}
</script>

