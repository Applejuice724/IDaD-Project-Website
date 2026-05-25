import { computed } from 'vue'

/**
 * Provides zone-level deck manipulation helpers for a reactive deck ref.
 *
 * Each function works against the same `deck` ref and respects the provided
 * `rules` object, making it reusable across any game.
 *
 * @param {import('vue').Ref<{ id: string, name: string, game: string, zones: Array<{ name: string, min?: number, max?: number, cards: Array }> }>} deck
 * @param {{ maxCopies: number }} rules
 */
export function useDeckHelpers(
  deck,
  rules
) {

  /**
   * Finds a zone object by name inside the current deck.
   *
   * @param {string} zoneName
   * @returns {{ name: string, min?: number, max?: number, cards: Array } | undefined}
   */
  function getZone(zoneName) {

    return deck.value.zones.find(
      zone => zone.name === zoneName
    )
  }

  /**
   * Counts how many copies of a given card exist across ALL zones.
   *
   * @param {string} cardId
   * @returns {number}
   */
  function getCardCount(cardId) {

    return deck.value.zones.reduce(
      (total, zone) => {

        const found = zone.cards.find(
          c => c.card.id === cardId
        )

        return total + (found?.quantity || 0)

      },
      0
    )
  }

  /**
   * Tries to add one copy of a card to the named zone.
   *
   * Rejects if:
   * - The zone doesn't exist.
   * - The deck already holds `rules.maxCopies` of this card.
   *
   * Increments quantity when the card already exists in the zone,
   * otherwise pushes a new entry.
   *
   * @param {{ id: string }} card
   * @param {string} zoneName
   * @returns {boolean} — true if the card was added, false otherwise
   */
  function addCard(card, zoneName) {

    const zone = getZone(zoneName)

    if (!zone) {
      return false
    }

    const existingCopies =
      getCardCount(card.id)

    if (
      existingCopies >= rules.maxCopies
    ) {
      return false
    }

    const existingCard =
      zone.cards.find(
        c => c.card.id === card.id
      )

    if (existingCard) {

      existingCard.quantity++

    } else {

      zone.cards.push({
        card,
        quantity: 1
      })

    }

    return true
  }

  /**
   * Removes one copy of a card from a zone.
   * If the quantity reaches zero the card entry is removed from the zone array.
   *
   * @param {string} cardId
   * @param {string} zoneName
   */
  function removeCard(
    cardId,
    zoneName
  ) {

    const zone = getZone(zoneName)

    if (!zone) {
      return
    }

    const index =
      zone.cards.findIndex(
        c => c.card.id === cardId
      )

    if (index === -1) {
      return
    }

    zone.cards[index].quantity--

    if (
      zone.cards[index].quantity <= 0
    ) {
      zone.cards.splice(index, 1)
    }
  }

  /**
   * Reactive total of every card quantity across all zones.
   *
   * @type {import('vue').ComputedRef<number>}
   */
  const totalCards = computed(() => {
    return deck.value.zones.reduce(
      (total, zone) => {
        return total + zone.cards.reduce(
          (zoneTotal, card) => {
            return (
              zoneTotal + card.quantity
            )
          },
          0
        )
      },
      0
    )
  })

  return {

    getZone,
    getCardCount,

    addCard,
    removeCard,

    totalCards

  }
}