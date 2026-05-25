import { ref } from 'vue'

import { useGameRules } from './useGameRules'

import { useDeckHelpers } from './Helpers/deckHelpers'

/**
 * Creates the default zone layout for a given game.
 * Each zone holds a name, optional min/max card counts, and the card array.
 * Returns an empty array for unknown games.
 *
 * @param {string} game — game identifier (e.g. 'yugioh', 'pokemon', 'mtg', 'onepiece')
 * @returns {Array<{name: string, min?: number, max?: number, cards: Array}>}
 */
function createDefaultZones(game) {

  switch (game) {

    case 'yugioh':
      return [
        {
          name: 'Main',
          min: 40,
          max: 60,
          cards: []
        },
        {
          name: 'Extra',
          max: 15,
          cards: []
        },
        {
          name: 'Side',
          max: 15,
          cards: []
        }
      ]

    case 'pokemon':
      return [
        {
          name: 'Deck',
          min: 60,
          max: 60,
          cards: []
        }
      ]

    case 'mtg':
      return [
        {
          name: 'Main',
          min: 60,
          cards: []
        },
        {
          name: 'Sideboard',
          max: 15,
          cards: []
        }
      ]

    case 'onepiece':
      return [
        {
          name: 'Main',
          min: 50,
          max: 50,
          cards: []
        },
        {
          name: 'Leader',
          min: 1,
          max: 1,
          cards: []
        }
      ]
    default:
      return []
  }
}

/**
 * Main composable for managing a deck's state.
 * Creates reactive deck data, looks up the game's ruleset, and wires up all
 * helper functions (add / remove cards, totals, etc.).
 *
 * @param {string} game
 * @param {string} [name='New Deck']
 * @returns {{ deck: import('vue').Ref, getZone, getCardCount, addCard, removeCard, totalCards: import('vue').ComputedRef<number> }}
 */
export function useDeck(
  game,
  name = 'New Deck'
) {

  const rules = useGameRules(game)

  const deck = ref({

    id: crypto.randomUUID(),

    name,

    game,

    zones: createDefaultZones(game)

  })

  const helpers =
    useDeckHelpers(
      deck,
      rules
    )

  return {
    deck,
    ...helpers
  }
}