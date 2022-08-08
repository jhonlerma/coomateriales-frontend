<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="processSignUp">
                <input type ="text" v-model="user.username" placeholder="Nombre de Usuario">
                <input type ="password" v-model="user.password" placeholder="Contraseña">   
                <input type ="text" v-model="user.name" placeholder="Nombre">  
                <input type ="email" v-model="user.email" placeholder="Correo electrónico">
                <input type ="number" v-model="user.account.balance" placeholder="Saldo Inicial"> 
                <button type="submit">Registrarse</button>
            </form>
        </div>  
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name:'CoSignUp',

    data: function(){
        return{
            user:{
                username:"",
                password:"",
                name:"",
                email:"",
                account:{
                    balance:0,
                    lastChangeDate:(new Date()).toJSON(),
                    isActive: true
                }
            }    
        }
    },
    methods:{
        processSignUp: function(){
            axios.post(
                "https://mision-tic-c3-g6.herokuapp.com/userCreate/",
                this.user,
                {headers:{}}
            )
            .then((result) => {
                let dataSignUp={
                    token_access: result.data.access,
                    token_refresh: result.data.refresh,
                    username: this.user.username 
                }
                this.$emit('completedSignUp',dataSignUp)
            })
            .catch((error)=> {
                console.log(error)
                alert("ERROR: Fallo en el registro");
            });
        }   
    }
}
</script>

<style>
</style>