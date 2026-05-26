/**
 * Validates a deck object against its game rules and zone constraints.
 * Returns a list of issues (strings) rather than throwing, so the UI can
 * surface all problems at once.
 *
 * @param {{ id: string, name: string, game: string, zones: Array<{ name: string, min?: number, max?: number, cards: Array }> }} deck
 * @param {{ maxCopies: number }} rules
 * @returns {Array<{ zone?: string, message: string }>}
 */
export function validateDeck(deck, rules) {
  const issues = []

  if (!deck || !deck.zones) {
    issues.push({ message: 'Deck data is missing.' })
    return issues
  }

  for (const zone of deck.zones) {
    const count = zone.cards.reduce((sum, entry) => sum + (entry.quantity || 0), 0)

    if (zone.min != null && count < zone.min) {
      issues.push({
        zone: zone.name,
        message: `Too few cards in ${zone.name} (${count} / ${zone.min}).`
      })
    }

    if (zone.max != null && count > zone.max) {
      issues.push({
        zone: zone.name,
        message: `Too many cards in ${zone.name} (${count} / ${zone.max}).`
      })
    }

    for (const entry of zone.cards) {
      if ((entry.quantity || 0) > rules.maxCopies) {
        issues.push({
          zone: zone.name,
          message: `Card "${entry.card?.name || entry.card?.id}" exceeds the copy limit (${entry.quantity} / ${rules.maxCopies}).`
        })
      }
    }
  }

  return issues
}
