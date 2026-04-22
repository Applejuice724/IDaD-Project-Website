<script setup lang="ts">
import logo from '@/assets/header-logo.png'
</script>

<template>
    <div class="container">
        <div class="row align-items-center g-3">
            <!-- logo -->
            <div class="col-12 col-md-4 d-flex align-items-center gap-2">
                <img :src="logo" alt="Logo" style="width: 100px;" />
                <h1 class="m-0">Card shop</h1>
            </div>

            <!-- navigation -->
            <div class="col-12 col-md-4">
                <ul class="nav justify-content-center justify-content-md-start gap-3">
                    <li class="nav-item"><a class="nav-link p-0" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link p-0" href="#">Shop</a></li>
                    <li class="nav-item"><a class="nav-link p-0" href="#">About</a></li>
                    <li class="nav-item"><a class="nav-link p-0" href="#">Contact</a></li>
                </ul>
            </div>

            <!-- search bar -->
            <div class="col-12 col-md-4">
                <div class="d-flex gap-2 justify-content-md-end">
                <input type="text" class="form-control" placeholder="Search..." />
                <button class="btn btn-primary">Search</button>
                </div>
            </div>
        </div>
    </div>
</template>