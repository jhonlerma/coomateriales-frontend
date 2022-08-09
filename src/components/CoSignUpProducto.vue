<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-3">Registro de Producto</h2>
                        <form v-on:submit.prevent="processSignUp">
                            <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input type="text" class="form-control" v-model="Producto.nombre_producto"
                                    placeholder="Nombre del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Marca del Producto</label>
                                <input type="text" class="form-control" v-model="Producto.marca_producto"
                                    placeholder="Marca del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Precio Unidad</label>
                                <input type="number" class="form-control" v-model="Producto.precio_unit_producto"
                                    placeholder="Precio Unidad del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Resumen</label>
                                <input type="text" class="form-control" v-model="Producto.resumen_producto"
                                    placeholder="Resumen del Producto">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Detalle</label>
                                <input type="text" class="form-control" v-model="Producto.detalle_producto"
                                    placeholder="Detalle del Producto">
                            </div>
                            <!--falta categoria, fabricante y proveedor -->

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
            Producto: {
                nombre_producto: "",
                marca_producto: "",
                precio_unit_producto: "",
                resumen_producto: "",
                detalle_producto: "",
                categoria:"",
                fabricante:"",
                proveedor:""
            }
        }
    },
    methods: {
        processSignUp: function () {
            axios.post(
                "https://coomateriales-backend.herokuapp.com/producto/create/",
                this.Producto,
                { headers: {} }
            )
                .then((result) => {
                    let dataSignUp = {
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                        nit_proveedor: this.Proveedor.nit_proveedor
                    }
                    this.$emit('completedSignUpProveedores', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro");
                });
        }
    }
}
</script>