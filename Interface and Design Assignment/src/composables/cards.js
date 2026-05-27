import { ref, computed } from 'vue'
import { cards } from '../data/cards.js'


export function getCard(id){
    return cards.find(card => card.id === id);
}

export function getCards(ids){
    return cards.filter(card => ids.includes(card.id));
}