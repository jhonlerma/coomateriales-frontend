<template>
    <div class="logIn_user">
        <div class="container_logIn_user">
            <form v-on:submit.prevent="processLogInUser">
                <input type="text" v-model="user.username" placeholder="Nombre de usuario">
                <br>
                <input type="password" v-model="user.password" placeholder="Contraseña">
                <br>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import { request } from 'http';
export default{
    name:"CoLogIn",
    data: function(){
        return {
            user:{
                username:"",
                password:""        
            }
        }
    },
    methods:{
        processLogInUser: function(){
            axios.post(
                "https://coomateriales-backend.herokuapp.com/login/",
                this.user,
                {headers:{}}
            )
            .then((result) => {
                let dataLogIn ={
                    token_access: result.data.access,
                    token_refresh : result.data.refresh,
                    username: this.user.username
                }
                this.$emit('completedLogIn',dataLogIn)
            })
            .catch((error) =>{
                if(error.response.status=="401")
                    alert("ERROR 401: Credenciales son incorrectas.")
            });
        }    
    }

}
</script>

<style>

</style>
