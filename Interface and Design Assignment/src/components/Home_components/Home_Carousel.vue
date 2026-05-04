<script setup>
// Import images for the carousel
import yugioh from '@/assets/Home_assests/yugioh.jpg'
import mtg from '@/assets/Home_assests/mtg.jpg'
import pokemon from '@/assets/Home_assests/pokemon-tcg.png'
import onepiece from '@/assets/Home_assests/onepiece.png'

// Define the card games for the carousel
const cardGames = [
  { name: 'Yu-Gi-Oh!', image: yugioh, section: 'yugioh' },
  { name: 'Magic: The Gathering', image: mtg, section: 'mtg' },
  { name: 'Pokémon TCG', image: pokemon, section: 'pokemon' },
  { name: 'One Piece Card Game', image: onepiece, section: 'onepiece' },
]
</script>

<template>
  <section class="carousel-section py-4">
    <div id="gameCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
      <div class="carousel-indicators">
        <button
          v-for="(game, i) in cardGames"
          :key="'ind-' + i"
          type="button"
          data-bs-target="#gameCarousel"
          :data-bs-slide-to="i"
          :class="{ active: i === 0 }"
          :aria-current="i === 0 ? 'true' : 'false'"
          :aria-label="game.name"
        />
      </div>

      <div class="carousel-inner">
        <div
          v-for="(game, i) in cardGames"
          :key="game.section"
          class="carousel-item"
          :class="{ active: i === 0 }"
        >
          <router-link :to="{ path: '/Catalogue', hash: '#' + game.section }">
            <div class="carousel-slide" :style="{ backgroundImage: game.image ? `url(${game.image})` : 'none' }">
              <div class="slide-overlay">
                <h3>{{ game.name }}</h3>
                <span class="btn btn-light btn-sm">View Cards</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#gameCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#gameCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

