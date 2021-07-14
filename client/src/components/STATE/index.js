import moment from 'moment';
export const cardInitialState = {
    PATH: '',
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
    ACC: 0.5,
    PASS: [],
    SPD: .5,
    VUL: false,
    UNIVERSE: '',
    COLLECTION: 'N/A',
    HAS_COLLECTION: null,
    STOCK: 10,
    AVAILABLE: true,
    DESCRIPTIONS: [],
    EXCLUSIVE: true
}

export const armInitialState = {
    ARM: '',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    ABILITIES: [],
    UNIVERSE: '',
    COLLECTION: 'N/A',
    STOCK: 10,
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
    TIER: 1,
    DPET: '',
    UPET: '',
    UNIVERSE_BOSS: '',
}

export const titleInitialState = {
    TITLE: '',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    ABILITIES: [],
    UNIVERSE: '',
    COLLECTION: 'N/A',
    STOCK: 10,
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
