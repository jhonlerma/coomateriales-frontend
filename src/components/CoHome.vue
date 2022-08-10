<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <img src="../assets/user.png" alt="user" height="250">
            </div>
            <div class="col-8">
                <div class="card" style="border-radius: 15px">
                <div class="card-body p-5">
                    <h1> ¡Bienvenido <span>{{ username }} </span>!</h1>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoHome',
    data: function () {
        return {
            username: localStorage.getItem("username") || "none"
        }
    }
}
</script>