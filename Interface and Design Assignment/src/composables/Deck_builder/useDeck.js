import { ref } from 'vue'

import { useGameRules } from './useGameRules'

import { useDeckHelpers } from './Helpers/deckHelpers'

const gameNameMap = {
  yugioh: 'Yu-Gi-Oh!',
  pokemon: 'Pokemon',
  mtg: 'MTG',
  onepiece: 'One Piece'
}

/**
 * Creates the default zone layout for a given game.
 * Each zone holds a name, optional min/max card counts, and the card array.
 * Returns an empty array for unknown games.
 *
 * @param {string} game - the game key (e.g. 'yugioh', 'pokemon', etc.)
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

function buildDeck(game, name) {
  return {
    id: crypto.randomUUID(),
    name,
    game,
    zones: createDefaultZones(game)
  }
}

/**
 * Main composable for managing a deck's state.
 * Creates reactive deck data, looks up the game's ruleset, and wires up all
 * helper functions (add / remove cards, totals, etc.).
 * Supports switching games via setGame() which resets the deck and rules.
 *
 * When a card is added to an empty deck, the game auto-detects from the card.
 * Once cards are present, only cards matching that game are accepted.
 *
 * @param {string} initialGame
 * @param {string} [name='New Deck']
 */
export function useDeck(
  initialGame,
  name = 'New Deck'
) {

  const currentGame = ref(initialGame)

  const rules = ref(useGameRules(initialGame))

  const deck = ref(buildDeck(initialGame, name))

  function setGame(newGame) {
    currentGame.value = newGame
    rules.value = useGameRules(newGame)
    deck.value = buildDeck(newGame, name)
  }

  const helpers = useDeckHelpers(deck, rules)

  const zoneRouting = {
    yugioh: {
      'Fusion Monster': 'Extra',
      'XYZ Monster': 'Extra',
      'Link Monster': 'Extra',
      'Synchro Monster': 'Extra',
      'Pendulum Monster': 'Extra'
    },
    onepiece: {
      'Leader': 'Leader'
    }
  }

  function getDefaultZone(card) {
    const routes = zoneRouting[deck.value.game]
    if (routes) {
      const match = Object.keys(routes).find(type => card.cardType === type)
      if (match) return routes[match]
    }
    return deck.value.zones[0]?.name
  }

  function addCard(card, zoneName) {
    const gameName = gameNameMap[deck.value.game]

    const deckEmpty = deck.value.zones.every(z => z.cards.length === 0)

    if (deckEmpty) {
      const matchingGame = Object.keys(gameNameMap).find(k => gameNameMap[k] === card.game)
      if (matchingGame && matchingGame !== currentGame.value) {
        setGame(matchingGame)
      }
      zoneName = zoneName || getDefaultZone(card)
      zoneName = deck.value.zones.some(z => z.name === zoneName) ? zoneName : deck.value.zones[0]?.name
      if (!zoneName) return false
      return helpers.addCard(card, zoneName)
    }

    if (card.game && card.game !== gameName) {
      return false
    }

    zoneName = zoneName || getDefaultZone(card)
    zoneName = deck.value.zones.some(z => z.name === zoneName) ? zoneName : deck.value.zones[0]?.name
    if (!zoneName) return false

    return helpers.addCard(card, zoneName)
  }

  return {
    deck,
    game: currentGame,
    setGame,
    addCard,
    removeCard: helpers.removeCard,
    getZone: helpers.getZone,
    getCardCount: helpers.getCardCount,
    totalCards: helpers.totalCards
  }
}