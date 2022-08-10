<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-3">Registro de Producto</h2>
                        <form v-on:submit.prevent="processSignUpProducto">
                            <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input type="text" class="form-control" v-model="producto.nombre_producto"
                                    placeholder="Nombre del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Marca del Producto</label>
                                <input type="text" class="form-control" v-model="producto.marca_producto"
                                    placeholder="Marca del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Precio Unidad</label>
                                <input type="number" class="form-control" v-model="producto.precio_unit_producto"
                                    placeholder="Precio Unidad del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Resumen</label>
                                <input type="text" class="form-control" v-model="producto.resumen_producto"
                                    placeholder="Resumen del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Detalle</label>
                                <input type="text" class="form-control" v-model="producto.detalle_producto"
                                    placeholder="Detalle del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Categoría</label>
                                <input type="number" class="form-control" v-model="producto.categoria" placeholder="id de la categoría">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Fabricante</label>
                                <input type="number" class="form-control" v-model="producto.fabricante" placeholder="id del fabricante">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Proveedor</label>
                                <input type="number" class="form-control" v-model="producto.proveedor" placeholder="id del proveedor">
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
    name: 'CoSignUpProveedore',
    data: function () {
        return {
            producto: {
                nombre_producto: "",
                marca_producto: "",
                precio_unit_producto: 0,
                resumen_producto: "",
                detalle_producto: "",
                categoria: 0,
                fabricante: 0,
                proveedor: 0
            }
        }
    },
    methods: {
        processSignUpProducto: function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
            }
            this.verifyToken();
            let token = localStorage.getItem("token_access");
            axios.post(
                "https://coomateriales-backend.herokuapp.com/producto/create/",
                this.producto,
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
                .then((result) => {
                    let dataSignUp = {
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                        nombre_producto: this.producto.nombre_producto
                    }
                    this.$emit('completedSignUpProducto', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro");
                });
        },
        verifyToken: function () {
            return axios.post(
                "https://coomateriales-backend.herokuapp.com/refresh/",
                { refresh: localStorage.getItem("token_refresh") },
                { headers: {} })
                .then((result) => {
                    localStorage.setItem("token_access", result.data.access);
                })
                .catch(() => {
                    this.$emit('logOut')
                })
        }
    }
}
</script>