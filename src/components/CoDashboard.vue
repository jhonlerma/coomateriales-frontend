<template>
    <div class="container-fluid">
        <div class="row">
            <div class="barra-lateral col-12 col-sm-auto">
                <div class="logo">
                    <h2>Dashboard</h2>
                </div>
                <nav class="menu d-flex d-sm-block justify-content-center flex-wrap">
                    <a v-on:click="loadHome"><i class="bi bi-house"></i><span>Inicio</span></a>
                    <a v-on:click="loadSignUp"><i class="bi bi-people-fill"></i><span>Registro de Usuarios</span></a>
                    <a v-on:click="loadSignUpCategoria"><i class="bi bi-star-fill"></i><span>Registro de Categoría</span></a>
                    <a v-on:click="loadSignUpFabricante"><i class="bi bi-star-fill"></i><span>Registro de Fabricante</span></a>
                    <a v-on:click="loadSignUpProveedor"><i class="bi bi-people-fill"></i><span>Registro de Proveedores</span></a>
                    <a v-on:click="loadSignUpProducto"><i class="bi bi-star-fill"></i><span>Registro de Productos</span></a>
                    <a href="#"><i class="bi bi-box-arrow-left"></i><span>Salir</span></a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
export default {
    name: 'CoDashboard',
    data: function () {
        return {
            name: "",
            email: "",
            balance: 0,
            loaded: false,
        }
    },
    methods: {
        loadSignUp: function () {
            this.$router.push({ name: 'coSignUp' })
        },
        loadHome: function () {
            this.$router.push({ name: 'coHome' })
        },
        loadSignUpCategoria: function () {
            this.$router.push({ name: 'coSignUpCategoria' })
        },
        loadSignUpFabricante: function () {
            this.$router.push({ name: 'coSignUpFabricante' })
        },
        loadSignUpProveedor: function () {
            this.$router.push({ name: 'coSignUpProveedor' })
        },
        loadSignUpProducto: function () {
            this.$router.push({ name: 'coSignUpProducto' })
        },

    },
    created: async function () {
        this.getData();
    }
}
</script>

<style>
body {
    background: #f2f2f2;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
}

/* --- --- BARRA LATERAL --- --- */
.barra-lateral {
    background: #262a34;
    color: #fff;
    min-width: 300px;
    min-height: 100vh;
    padding: 0;
}

.barra-lateral a {
    color: #fff;
}

/* --- LOGO --- */
.barra-lateral .logo {
    background: #0275db;
    margin-bottom: 2px;
}

.barra-lateral .logo h2 {
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    padding: 20px 0;
    text-align: center;
    font-weight: 300;
    margin: 0;
}

/* --- MENU --- */
.barra-lateral .menu a {
    display: block;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, .1);
}

.barra-lateral .menu a:hover {
    background: #35ae6b;
    text-decoration: none;
}

.barra-lateral .menu a i {
    margin-right: 20px;
    font-weight: normal;
}
</style>