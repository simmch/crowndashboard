import moment from 'moment';
export const cardInitialState = {
    PATH: '',
    FPATH: '',
    RPATH: '',
    GIF: '',
    NAME: '',
    RNAME: '',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    MOVESET: {},
    HLT: null,
    STAM: 100,
    ATK: 50,
    DEF: 70,
    TYPE: 0,
    TIER: 1,
    PASS: [],
    SPD: 5,
    VUL: false,
    UNIVERSE: '',
    COLLECTION: 'N/A',
    HAS_COLLECTION: null,
    STOCK: 99,
    AVAILABLE: true,
    DESCRIPTIONS: [],
    EXCLUSIVE: true,
    IS_SKIN: false,
    SKIN_FOR: 'N/A'
}

export const armInitialState = {
    ARM: '',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    ABILITIES: [],
    UNIVERSE: '',
    COLLECTION: 'N/A',
    STOCK: 99,
    AVAILABLE: true,
    EXCLUSIVE: true
}

export const universeInitialState = {
    TITLE: '',
    PATH: '',
    CROWN_TALES: [],
    HAS_CROWN_TALES: false,
    PREREQUISITE: '',
    UTITLE: '',
    UARM: '',
    DTITLE: '',
    DARM: '',
    DPET: '',
    UPET: '',
    UNIVERSE_BOSS: '',
}

export const abyssInitialState = {
    FLOOR: 0,
    ENEMIES: [],
    BANNED_CARDS: [],
    BANNED_TITLES: [],
    BANNED_ARMS: [],
    BANNED_UNIVERSES: [],
    BANNED_TIERS: [],
    BANNED_PETS: [],
    TITLE: '',
    ARM: '',
    PET: '',
    SPECIAL_BUFF: 0
}

export const titleInitialState = {
    TITLE: '',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    ABILITIES: [],
    UNIVERSE: '',
    COLLECTION: 'N/A',
    STOCK: 99,
    AVAILABLE: true,
    EXCLUSIVE: true
}

export const petInitialState = {
    PET: '',
    PATH: '',
    UNIVERSE: '',
    LVL: 1,
    ABILITIES: [],
    COLLECTION: 'N/A',
    AVAILABLE: true,
    EXCLUSIVE: true
}

export const enhancements = [
    'ATK',
    'DEF',
    'STAM',
    'HLT',
    'LIFE',
    'DRAIN',
    'FLOG',
    'WITHER',
    'RAGE',
    'BRACE',
    'BZRK',
    'CRYSTAL',
    'GROWTH',
    'STANCE',
    'CONFUSE',
    'BLINK',
    'SLOW',
    'HASTE',
    'SOULCHAIN',
    'GAMBLE',
    'FEAR',
    'WAVE',
    'BLAST',
    'CREATION',
    'DESTRUCTION'
]

export const arm_enhancements = [
    'BASICX',
    'SPECIALX',
    'ULTX',
    'MANA',
    'SHIELD',
    'ULTIMA'
]
