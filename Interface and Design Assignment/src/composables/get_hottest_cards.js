import { ref, computed } from 'vue'
import { cards } from '../data/cards.js'

export function get_hottest_cards() {
    const allCards = ref(cards)

    return {
        cards: allCards,
        hottestCards: computed(() => {
            return [...allCards.value].sort((a, b) => b.popularity - a.popularity)
        })
    }
}
