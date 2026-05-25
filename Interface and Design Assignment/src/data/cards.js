export const cards = [
    // =========================
    // YU-GI-OH! DARK MAGICIAN CORE
    // =========================

    {
        id: 1,
        game: 'Yu-Gi-Oh!',
        name: 'Dark Magician',
        cardType: 'Monster',
        type: 'Monster',
        image: 'https://images.ygoprodeck.com/images/cards/46986414.jpg',
        description: 'The ultimate wizard in terms of attack and defense.',

        stats: {
            attribute: 'DARK',
            level: 7,
            race: 'Spellcaster',
            atk: 2500,
            def: 2100
        },

        metadata: {
            dateAdded: '2026-05-07',
            popularity: 95
        },

        route: '/card/1'
    },

    {
        id: 2,
        game: 'Yu-Gi-Oh!',
        name: 'Dark Magician Girl',
        cardType: 'Monster',
        type: 'Monster',
        image: 'https://images.ygoprodeck.com/images/cards/38033121.jpg',
        description: 'The apprentice of Dark Magician.',

        stats: {
            attribute: 'DARK',
            level: 6,
            race: 'Spellcaster',
            atk: 2000,
            def: 1700
        },

        metadata: {
            dateAdded: '2026-05-07',
            popularity: 92
        },

        route: '/card/2'
    },

    {
        id: 3,
        game: 'Yu-Gi-Oh!',
        name: 'Magician\'s Rod',
        cardType: 'Monster',
        type: 'Monster',
        image: 'https://images.ygoprodeck.com/images/cards/5040556.jpg',
        description: 'Search a Spell/Trap that lists Dark Magician.',

        stats: {
            attribute: 'DARK',
            level: 3,
            race: 'Spellcaster',
            atk: 1600,
            def: 100
        },

        metadata: {
            dateAdded: '2026-05-06',
            popularity: 84
        },

        route: '/card/3'
    },

    {
        id: 4,
        game: 'Yu-Gi-Oh!',
        name: 'Magician\'s Souls',
        cardType: 'Monster',
        type: 'Monster',
        image: 'https://images.ygoprodeck.com/images/cards/97631303.jpg',
        description: 'Special summon itself and support Dark Magician.',

        stats: {
            attribute: 'DARK',
            level: 1,
            race: 'Spellcaster',
            atk: 0,
            def: 0
        },

        metadata: {
            dateAdded: '2026-05-06',
            popularity: 90
        },

        route: '/card/4'
    },

    {
        id: 5,
        game: 'Yu-Gi-Oh!',
        name: 'Apprentice Illusion Magician',
        cardType: 'Monster',
        type: 'Monster',
        image: 'https://images.ygoprodeck.com/images/cards/91034681.jpg',
        description: 'Supports Dark Magician strategies.',

        stats: {
            attribute: 'DARK',
            level: 6,
            race: 'Spellcaster',
            atk: 2000,
            def: 1700
        },

        metadata: {
            dateAdded: '2026-05-05',
            popularity: 80
        },

        route: '/card/5'
    },

    {
        id: 6,
        game: 'Yu-Gi-Oh!',
        name: 'Dark Magical Circle',
        cardType: 'Spell',
        type: 'Spell',
        image: 'https://images.ygoprodeck.com/images/cards/35371948.jpg',
        description: 'Banish cards when Dark Magician is summoned.',

        stats: {
            spellType: 'Continuous Spell'
        },

        metadata: {
            dateAdded: '2026-05-05',
            popularity: 96
        },

        route: '/card/6'
    },

    {
        id: 7,
        game: 'Yu-Gi-Oh!',
        name: 'Soul Servant',
        cardType: 'Spell',
        type: 'Spell',
        image: 'https://images.ygoprodeck.com/images/cards/23434538.jpg',
        description: 'Stack cards and draw based on Dark Magician cards.',

        stats: {
            spellType: 'Normal Spell'
        },

        metadata: {
            dateAdded: '2026-05-05',
            popularity: 93
        },

        route: '/card/7'
    },

    {
        id: 8,
        game: 'Yu-Gi-Oh!',
        name: 'Secrets of Dark Magic',
        cardType: 'Spell',
        type: 'Spell',
        image: 'https://images.ygoprodeck.com/images/cards/48356796.jpg',
        description: 'Fusion or Ritual summon using Dark Magician.',

        stats: {
            spellType: 'Quick-Play Spell'
        },

        metadata: {
            dateAdded: '2026-05-04',
            popularity: 81
        },

        route: '/card/8'
    },

    {
        id: 9,
        game: 'Yu-Gi-Oh!',
        name: 'Illusion Magic',
        cardType: 'Spell',
        type: 'Spell',
        image: 'https://images.ygoprodeck.com/images/cards/73616671.jpg',
        description: 'Tribute a Spellcaster to search Dark Magician.',

        stats: {
            spellType: 'Quick-Play Spell'
        },

        metadata: {
            dateAdded: '2026-05-04',
            popularity: 75
        },

        route: '/card/9'
    },

    {
        id: 10,
        game: 'Yu-Gi-Oh!',
        name: 'Monster Reborn',
        cardType: 'Spell',
        type: 'Spell',
        image: 'https://images.ygoprodeck.com/images/cards/83764718.jpg',
        description: 'Special Summon 1 monster from either GY.',

        stats: {
            spellType: 'Normal Spell'
        },

        metadata: {
            dateAdded: '2026-04-28',
            popularity: 97
        },

        route: '/card/10'
    },

    {
        id: 11,
        game: 'Yu-Gi-Oh!',
        name: 'Raigeki',
        cardType: 'Spell',
        type: 'Spell',
        image: 'https://images.ygoprodeck.com/images/cards/12580477.jpg',
        description: 'Destroy all monsters your opponent controls.',

        stats: {
            spellType: 'Normal Spell'
        },

        metadata: {
            dateAdded: '2026-05-03',
            popularity: 94
        },

        route: '/card/11'
    },

    {
        id: 12,
        game: 'Yu-Gi-Oh!',
        name: 'Called by the Grave',
        cardType: 'Spell',
        type: 'Spell',
        image: 'https://images.ygoprodeck.com/images/cards/24224830.jpg',
        description: 'Negate graveyard monster effects.',

        stats: {
            spellType: 'Quick-Play Spell'
        },

        metadata: {
            dateAdded: '2026-05-03',
            popularity: 91
        },

        route: '/card/12'
    },

    {
        id: 13,
        game: 'Yu-Gi-Oh!',
        name: 'Eternal Soul',
        cardType: 'Trap',
        type: 'Trap',
        image: 'https://images.ygoprodeck.com/images/cards/48680970.jpg',
        description: 'Protects and summons Dark Magician.',

        stats: {
            trapType: 'Continuous Trap'
        },

        metadata: {
            dateAdded: '2026-05-03',
            popularity: 93
        },

        route: '/card/13'
    },

    {
        id: 14,
        game: 'Yu-Gi-Oh!',
        name: 'Solemn Judgment',
        cardType: 'Trap',
        type: 'Trap',
        image: 'https://images.ygoprodeck.com/images/cards/41420027.jpg',
        description: 'Negate summons or Spell/Trap activations.',

        stats: {
            trapType: 'Counter Trap'
        },

        metadata: {
            dateAdded: '2026-05-02',
            popularity: 90
        },

        route: '/card/14'
    },

    {
        id: 15,
        game: 'Yu-Gi-Oh!',
        name: 'Mirror Force',
        cardType: 'Trap',
        type: 'Trap',
        image: 'https://images.ygoprodeck.com/images/cards/44095762.jpg',
        description: 'Destroy all attack position monsters your opponent controls.',

        stats: {
            trapType: 'Normal Trap'
        },

        metadata: {
            dateAdded: '2026-05-02',
            popularity: 88
        },

        route: '/card/15'
    },

    // =========================
    // EXTRA DECK
    // =========================

    {
        id: 16,
        game: 'Yu-Gi-Oh!',
        name: 'The Dark Magicians',
        cardType: 'Fusion Monster',
        type: 'Fusion Monster',
        image: 'https://images.ygoprodeck.com/images/cards/50912458.jpg',
        description: 'Fusion of Dark Magician and Dark Magician Girl.',

        stats: {
            attribute: 'DARK',
            level: 8,
            race: 'Spellcaster',
            atk: 2800,
            def: 2300
        },

        metadata: {
            dateAdded: '2026-05-01',
            popularity: 89
        },

        route: '/card/16'
    },

    {
        id: 17,
        game: 'Yu-Gi-Oh!',
        name: 'Dark Magician the Dragon Knight',
        cardType: 'Fusion Monster',
        type: 'Fusion Monster',
        image: 'https://images.ygoprodeck.com/images/cards/64332131.jpg',
        description: 'Protects Spell/Trap cards.',

        stats: {
            attribute: 'DARK',
            level: 8,
            race: 'Dragon',
            atk: 3000,
            def: 2500
        },

        metadata: {
            dateAdded: '2026-05-01',
            popularity: 85
        },

        route: '/card/17'
    },

    {
        id: 18,
        game: 'Yu-Gi-Oh!',
        name: 'Ebon Illusion Magician',
        cardType: 'XYZ Monster',
        type: 'XYZ Monster',
        image: 'https://images.ygoprodeck.com/images/cards/77610772.jpg',
        description: 'Special summons Spellcasters from the deck.',

        stats: {
            attribute: 'DARK',
            rank: 7,
            race: 'Spellcaster',
            atk: 2500,
            def: 2000
        },

        metadata: {
            dateAdded: '2026-04-30',
            popularity: 79
        },

        route: '/card/18'
    },

    {
        id: 19,
        game: 'Yu-Gi-Oh!',
        name: 'Link Spider',
        cardType: 'Link Monster',
        type: 'Link Monster',
        image: 'https://images.ygoprodeck.com/images/cards/98978921.jpg',
        description: 'Useful generic Link monster.',

        stats: {
            attribute: 'EARTH',
            linkRating: 1,
            race: 'Cyberse',
            atk: 1000
        },

        metadata: {
            dateAdded: '2026-04-30',
            popularity: 74
        },

        route: '/card/19'
    },

    {
        id: 20,
        game: 'Yu-Gi-Oh!',
        name: 'Selene, Queen of the Master Magicians',
        cardType: 'Link Monster',
        type: 'Link Monster',
        image: 'https://images.ygoprodeck.com/images/cards/51454020.jpg',
        description: 'Revives Spellcasters from the graveyard.',

        stats: {
            attribute: 'LIGHT',
            linkRating: 3,
            race: 'Spellcaster',
            atk: 1850
        },

        metadata: {
            dateAdded: '2026-04-29',
            popularity: 87
        },

        route: '/card/20'
    },

    // =========================
    // POKEMON Dummy data for testing
    // =========================

    {
        id: 101,
        game: 'Pokemon',
        name: 'Charizard',
        cardType: 'Pokemon',
        image: 'https://via.placeholder.com/200x300',
        description: 'Spits fire hot enough to melt boulders.',
        stats: {
            hp: 170,
            type: 'Fire',
            stage: 'Stage 2'
        },
        metadata: {
            dateAdded: '2026-05-08',
            popularity: 99
        },
        route: '/card/101'
    },

    // =========================
    // ONE PIECE Dummy data for testing
    // =========================

    {
        id: 201,
        game: 'One Piece',
        name: 'Monkey D. Luffy',
        cardType: 'Leader',
        image: 'https://via.placeholder.com/200x300',
        description: 'Captain of the Straw Hat Pirates.',
        stats: {
            color: 'Red',
            power: 5000,
            life: 5
        },
        metadata: {
            dateAdded: '2026-05-10',
            popularity: 94
        },
        route: '/card/201'
    },

    // =========================
    // MTG Dummy data for testing
    // =========================

    {
        id: 301,
        game: 'MTG',
        name: 'Black Lotus',
        cardType: 'Artifact',
        image: 'https://via.placeholder.com/200x300',
        description: 'Add three mana of any one color.',
        stats: {
            manaCost: '{0}',
            rarity: 'Rare'
        },
        metadata: {
            dateAdded: '2026-05-12',
            popularity: 100
        },
        route: '/card/301'
    }
]