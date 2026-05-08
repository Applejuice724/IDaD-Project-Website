import { ref, computed } from 'vue'
import { cards } from '../data/cards.js'

export function get_newest_cards() {
    const allCards = ref(cards)

    return {
        cards: allCards,
        newestCards: computed(() => {
            return [...allCards.value].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        })
    }
}