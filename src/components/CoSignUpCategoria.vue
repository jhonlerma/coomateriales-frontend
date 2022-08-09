<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card" style="border-radius: 15px">
                    <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-3">Registro de Categoría</h2>
                        <form v-on:submit.prevent="processSignUp">
                            <div class="mb-3">
                                <label class="form-label">Nombre Categoría </label>
                                <input type="text" class="form-control" v-model="Categoria.nombre_categoria"
                                    placeholder="Nombre categoría">
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
    name: 'CoSignUpCategoria',
    data: function () {
        return {
            Categoria: {
                nombre_categoria: "",
            }
        }
    },
    methods: {
        processSignUp: function () {
            axios.post(
                "https://coomateriales-backend.herokuapp.com/categoria/create/",
                this.Categoria,
                { headers: {} }
            )
                .then((result) => {
                    let dataSignUp = {
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                        nit_proveedor: this.Categoria.nombre_categoria
                    }
                    this.$emit('completedSignUpCategoria', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro");
                });
        }
    }
}
</script>