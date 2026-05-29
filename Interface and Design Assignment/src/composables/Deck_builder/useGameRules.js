/**
 * Ruleset definitions for each supported game.
 * Each game key maps to an object of constraints applied during deck building.
 *
 * maxCopies: the maximum number of copies of the same card allowed in the entire deck.
 *
 * To be extended with additional rules (deck size limits, ban lists, etc.).
 */
const rules = {

  yugioh: {
    maxCopies: 3
  },

  pokemon: {
    maxCopies: 4
  },

  mtg: {
    maxCopies: 4
  },

  onepiece: {
    maxCopies: 4
  }

}

/**
 * Returns the ruleset for a given game.
 * Falls back to a sensible default (1 copy per card) when the game is unknown,
 * so the deck builder never crashes on an unsupported game identifier.
 *
 * @param {string} game
 * @returns {object}
 */
export function useGameRules(game) {
  return rules[game] || { maxCopies: 1 }
}