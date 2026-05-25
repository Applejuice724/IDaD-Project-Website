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

        route: '/cards/1'
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

        route: '/cards/2'
    },

    {
        id: 3,
        game: 'Yu-Gi-Oh!',
        name: 'Magician\'s Rod',
        cardType: 'Monster',
        type: 'Monster',
        image: 'https://ms.yugipedia.com//7/72/MagiciansRod-LDS3-EN-C-1E.png',
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

        route: '/cards/3'
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

        route: '/cards/4'
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

        route: '/cards/5'
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

        route: '/cards/6'
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

        route: '/cards/7'
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

        route: '/cards/8'
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

        route: '/cards/9'
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

        route: '/cards/10'
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

        route: '/cards/11'
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

        route: '/cards/12'
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

        route: '/cards/13'
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

        route: '/cards/14'
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

        route: '/cards/15'
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
        image: 'https://static.wikia.nocookie.net/yugioh/images/f/f4/TheDarkMagicians-LDS3-EN-ScR-LE.png/revision/latest?cb=20220727180437',
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

        route: '/cards/16'
    },

    {
        id: 17,
        game: 'Yu-Gi-Oh!',
        name: 'Dark Magician the Dragon Knight',
        cardType: 'Fusion Monster',
        type: 'Fusion Monster',
        image: 'https://static.wikia.nocookie.net/yugioh/images/6/66/DarkMagiciantheDragonKnight-GFP2-EN-UR-1E.png/revision/latest/scale-to-width-down/300?cb=20220608234105',
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

        route: '/cards/17'
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

        route: '/cards/18'
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

        route: '/cards/19'
    },

    {
        id: 20,
        game: 'Yu-Gi-Oh!',
        name: 'Selene, Queen of the Master Magicians',
        cardType: 'Link Monster',
        type: 'Link Monster',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.ygoprodeck.com%2Fimages%2Fcards%2F45819647.jpg&f=1&nofb=1&ipt=752f9342c8acef641009a5c4ca5439a3a06c4a771e546b222f5b9f096630b85c',
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

        route: '/cards/20'
    },

    // =========================
    // POKEMON Dummy data for testing
    // =========================

    {
        id: 101,
        game: 'Pokemon',
        name: 'Charizard',
        cardType: 'Pokemon',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstorage.googleapis.com%2Fimages.pricecharting.com%2F60629cf71073ec245daec608d05e959f3d8cfe678ea44c0a6ebdc28ed9b04007%2F1600.jpg&f=1&nofb=1&ipt=14028d675157a4f10b17689bec37ed938a3b876e144524fef98ff4302ed8419b',
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
        route: '/cards/101'
    },

    // =========================
    // ONE PIECE Dummy data for testing
    // =========================

    {
        id: 201,
        game: 'One Piece',
        name: 'Monkey D. Luffy',
        cardType: 'Leader',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcgc.chakra42.net%2Fimages%2Fone-piece-tcg-2022%2Fstraw-hat-crew-starter-deck%2FOnePiece2022-ST01-012.jpg&f=1&nofb=1&ipt=be211d82b8b265afab74c1764d33f584efd264409fe7a5ac5b59d024f4a0c385',
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
        route: '/cards/201'
    },

    // =========================
    // MTG Dummy data for testing
    // =========================

    {
        id: 301,
        game: 'MTG',
        name: 'Black Lotus',
        cardType: 'Artifact',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.printingproxies.com%2Fwp-content%2Fuploads%2F2023%2F05%2F30a-525-black-lotus.png&f=1&nofb=1&ipt=226eb3a5462f12df77975b345733b984d7f27390f3de31f6cc41ba10c67c0645',
        description: 'Add three mana of any one color.',
        stats: {
            manaCost: '{0}',
            rarity: 'Rare'
        },
        metadata: {
            dateAdded: '2026-05-12',
            popularity: 100
        },
        route: '/cards/301'
    }
]