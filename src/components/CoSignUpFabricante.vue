<template>
    <div class="container col-md-12 col-lg-8 col-xl-6 mt-3 p-0">
        <div class="row">
            <div class="card" style="border-radius: 15px">
                <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-3">Registro de Fabricante</h2>
                    <form v-on:submit.prevent="processSignUpFabricante">
                        <div class="mb-3">
                            <label class="form-label">Nombre Fabricante </label>
                            <input type="text" class="form-control" v-model="fabricante.nombre_fabricante"
                                placeholder="Nombre fabricante">
                        </div>
                        <button type="submit" class="btn btn-primary">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CoSignUpFabricante',
    data: function () {
        return {
            fabricante: {
                nombre_fabricante: ""
            }
        }
    },
    methods: {
        processSignUpFabricante: function () {
            if(localStorage.getItem("token_access")===null ||localStorage.getItem("token_refresh")===null ){
                this.$emit('logOut');
                return;
            }
            this.verifyToken();
            let token = localStorage.getItem("token_access");
            axios.post(
                "https://coomateriales-backend.herokuapp.com/fabricante/create/",
                this.fabricante,
                { headers: {'Authorization':`Bearer ${token}`} }
            )
                .then((result) => {
                    let dataSignUp = {
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                        nombre_fabricante: this.fabricante.nombre_fabricante
                    }
                    this.$emit('completedSignUpFabricante', dataSignUp)
                    this.fabricante.nombre_fabricante = ""
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