<template>
    <div class ="container col-12">
        <h1> ¡Bienvenido <span>{{username}} </span>!</h1>
    </div>
</template>

<script>
export default {
   name:'CoHome',
   data: function(){
    return{
        username: localStorage.getItem("username") || "none"
    }
   } 
}
</script>

<style>
</style>