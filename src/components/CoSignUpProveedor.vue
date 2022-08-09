<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-3">Registro de Proveedores</h2>
                        <form v-on:submit.prevent="processSignUp">
                            <div class="mb-3">
                                <label class="form-label">Nit</label>
                                <input type="text" class="form-control" v-model="Proveedor.nit_proveedor"
                                    placeholder="Nit">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input type="text" class="form-control" v-model="Proveedor.nombre_proveedor"
                                    placeholder="Nombre">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Teléfono</label>
                                <input type="text" class="form-control" v-model="Proveedor.telefono_proveedor"
                                    placeholder="Teléfono">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control" v-model="Proveedor.correo_proveedor"
                                    placeholder="Correo electrónico">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Dirección</label>
                                <input type="text" class="form-control" v-model="Proveedor.direccion_proveedor"
                                    placeholder="Dirección">
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
            Proveedor: {
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
                this.Proveedor,
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

