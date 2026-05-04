<script setup>
import yugioh from '@/assets/Home_assests/yugioh.jpg'
import mtg from '@/assets/Home_assests/mtg.jpg'
import pokemon from '@/assets/Home_assests/pokemon-tcg.png'
import onepiece from '@/assets/Home_assests/onepiece.png'

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

<style scoped>
.carousel-section {
  max-width: 900px;
  margin: 0 auto;
}

.carousel-slide {
  width: 100%;
  height: 420px;
  background-color: #1e1e2f;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slide-overlay {
  background: rgba(0, 0, 0, 0.45);
  padding: 24px 40px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  backdrop-filter: blur(4px);
  transition: transform 0.25s ease, background 0.25s ease;
}

.carousel-slide:hover .slide-overlay {
  transform: scale(1.04);
  background: rgba(0, 0, 0, 0.55);
}

.slide-overlay h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.carousel-inner {
  border-radius: 12px;
}

.carousel-item a {
  text-decoration: none;
  color: inherit;
  display: block;
}

@media (max-width: 768px) {
  .carousel-slide {
    height: 280px;
  }

  .slide-overlay h3 {
    font-size: 1.3rem;
  }
}
</style>