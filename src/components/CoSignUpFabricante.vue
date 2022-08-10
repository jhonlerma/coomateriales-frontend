<template>
    <div class="container col-md-12 col-lg-8 col-xl-6 mt-3 p-0">
        <div class="row">
            <div class="card" style="border-radius: 15px">
                <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-3">Registro de Fabricante</h2>
                    <form v-on:submit.prevent="processSignUp">
                        <div class="mb-3">
                            <label class="form-label">Nombre Fabricante </label>
                            <input type="text" class="form-control" v-model="Fabricante.nombre_fabricante"
                                placeholder="Nombre categoría">
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
            Fabricante: {
                nombre_fabricante: "",
            }
        }
    },
    methods: {
        processSignUp: function () {
            axios.post(
                "https://coomateriales-backend.herokuapp.com/fabricante/create/",
                this.Fabricante,
                { headers: {} }
            )
                .then((result) => {
                    let dataSignUp = {
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                        nit_proveedor: this.Fabricante.nombre_fabricante
                    }
                    this.$emit('completedSignUpFabricante', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro");
                });
        }
    }
}
</script>