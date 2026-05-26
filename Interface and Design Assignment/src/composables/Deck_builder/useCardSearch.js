import { ref, computed } from 'vue'

const gameToDataMap = {
  yugioh: 'Yu-Gi-Oh!',
  pokemon: 'Pokemon',
  mtg: 'MTG',
  onepiece: 'One Piece'
}

const gameFilterSchemas = {
  yugioh: {
    typeOptions: [
      { value: '', label: 'All Types' },
      { value: 'Monster', label: 'Monster' },
      { value: 'Spell', label: 'Spell' },
      { value: 'Trap', label: 'Trap' },
      { value: 'Fusion Monster', label: 'Fusion' },
      { value: 'XYZ Monster', label: 'XYZ' },
      { value: 'Link Monster', label: 'Link' }
    ]
  },
  pokemon: {
    typeOptions: [
      { value: '', label: 'All Types' },
      { value: 'Pokemon', label: 'Pokemon' },
      { value: 'Trainer', label: 'Trainer' },
      { value: 'Energy', label: 'Energy' }
    ]
  },
  mtg: {
    typeOptions: [
      { value: '', label: 'All Types' },
      { value: 'Creature', label: 'Creature' },
      { value: 'Sorcery', label: 'Sorcery' },
      { value: 'Instant', label: 'Instant' },
      { value: 'Enchantment', label: 'Enchantment' },
      { value: 'Artifact', label: 'Artifact' },
      { value: 'Planeswalker', label: 'Planeswalker' },
      { value: 'Land', label: 'Land' }
    ]
  },
  onepiece: {
    typeOptions: [
      { value: '', label: 'All Types' },
      { value: 'Leader', label: 'Leader' },
      { value: 'Character', label: 'Character' },
      { value: 'Stage', label: 'Stage' },
      { value: 'Event', label: 'Event' }
    ]
  }
}

const defaultSchema = {
  typeOptions: [{ value: '', label: 'All Types' }]
}

export function useCardSearch(cards = [], gameRef) {

  const search = ref('')

  const selectedType = ref('')

  const schema = computed(() => gameFilterSchemas[gameRef.value] || defaultSchema)

  const dataGame = computed(() => gameToDataMap[gameRef.value] || gameRef.value)

  const filteredCards = computed(() => {

    return cards.filter(card => {

      if (card.game !== dataGame.value) {
        return false
      }

      const matchesSearch =
        card.name
          .toLowerCase()
          .includes(
            search.value.toLowerCase()
          )

      const matchesType =
        !selectedType.value ||
        card.cardType === selectedType.value

      return (
        matchesSearch &&
        matchesType
      )

    })

  })

  return {
    search,
    selectedType,
    schema,
    filteredCards
  }
}
