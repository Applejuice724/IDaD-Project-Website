<script setup lang="ts">
    import aboutUsGamersImage from '@/assets/About_assests/about_us_gamers.webp'
</script>
<template>

    <div class="row">
        <div class="col-12 col-md-6">
            <h2>About Us</h2>
            <p>We are a passionate team dedicated to creating the best playing card social media experience. 
                Our mission is to connect card enthusiasts from around the world and provide a platform 
                for sharing, discovering, and discussing all things related to playing cards.</p>
        </div>
        <div class="col-12 col-md-6">
            <h2>Our Story</h2>
            <p>Founded in 2024, our website was born out of a love for playing cards and a desire to create a community where people can come together to celebrate this timeless hobby. We started as a small project among friends and have since grown into a vibrant online community with thousands of members.</p>
        </div>
    </div>    
    <hr class="my-4 py-4"/>
    <div class="row offset-md-1">
        <div class="col-12 col-md-7 ">
            <h2>The players</h2>
            <p>Our community is made up of passionate card players from all over the world. 
                Whether you're a seasoned pro or just starting out, you'll find a place to belong in our 
                vibrant community. You can talk about your favorite card games, share your latest deck builds, 
                or just connect with other players who share your love for playing cards.            
            </p>            
        </div>
        <div class="col-12 col-md-4">
            <img :src="aboutUsGamersImage" alt="About Us Gamers" class="img-fluid rounded">
        </div>
    </div>
    <hr class="my-4 py-4"/>
     <div class="row">   
        <div class="col-12 col-md-12">
            <h2>Our Vision</h2>
            <p>We envision a world where playing cards are more than just a game, they are a way to connect, 
                learn, and grow. We want to create a space where players can come together to share their love for 
                playing cards and build lasting friendships. Our goal is to foster a community that celebrates the 
                diversity and creativity of the card gaming world. Not only also to increase their skills but also to 
                create a sense of belonging and camaraderie among all card enthusiasts.</p>
        </div>        
    </div>
</template>