import moment from 'moment';

export const cardInitialState = {
    CARD_CODE: '',
    NAME: '',
    CARD_IMAGE: '',
    VARIANT: '',
    CARD_VARIANT_NAME: '',
    CLASS: '',
    PRICE: null,
    MOVES: [],
    WORLD: '',
    HEALTH: 0,
    ATTACK: 0,
    DEFENSE: 0,
    SPEED: 0,
    ACCURACY: 0,
    EVASION: 0,
    RANK: '',
    QUEST: [],
    MORALITY: 0,
    TIER: '',
    AVAILABLE: true,
    ZONES: [],
    WEAKNESS: [],
    RESISTANT: [],
    REPEL: [],
    IMMUNE: [],
    ABSORB: []
}

export const questTypes = [
    'TIMED BATTLE', // Win battle in X amount of time
    'WIN BATTLE', // Win battle X amount of times
    'USE ELEMENT', // Deal X amount of damage using Y element
    'WIN SCENARIO', // Win specific scenario,
]

export const rankInitialState = {
    RANK_CODE: '',
    TITLE: '',
    WORLD: '',
    BUFF: [],
    REQUIRED_MORALITY: 0,
}

export const rankTypes = [
    'PROTECTION',
    'LATENT_POWER',
    'AMPLIFIER',
    'SPELL_SHIELD',
    'AFFINITY_NEGATION'
]

export const worldInitialState = {
    TITLE: '',
    IMAGE_PATH: '',
    AVAILABLE: false,
}

export const scenarioInitialState = {
    SCENARIO_CODE: '',
    TITLE: '',
    IMAGE: '',
    REQUIRED_LEVEL: 0,
    REQUIRED_RANK: '',
    REWARDED_RANK: '',
    ENEMY_LEVEL: 0,
    ENEMIES: [],
    DROPS: [],
    ZONE: '',
    WORLD: '',
    AVAILABLE: true
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

export const zoneInitialState = {
    ZONE_CODE: '',
    TITLE: '',
    WORLD: '',
    AVAILABLE: true,
    REQ_RANK: ''
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

export const classes = [
    'FIGHTER', // Starts each fight with 3 Parrys
    'MAGE', // Increases elemental damage by 25%
    'TANK', // Starts each fight with Rarity * 150 Shield
    'RANGER', // Starts each fight with 2 barriers
    'HEALER', // Stores 10% of damage taken and heals for the total amount each focus
]

export const latent_power = [
    'ATTACK', // Increases Attack by %
    'DEFENSE', // Increased Defense by %
    'STAMINA', // Increases Stamina & Max Stamina by Number
    'HEAL', // Heals for % of missing health
    'LIFESTEAL', // Steals % of opponent missing health
    'ATTACK STEAL', // Steals % of opponent attack 
    'DEFENSE STEAL', // Steals % of opponent defense
    'RAGE', // Lowers defense by % and increase attack by that same amount once
    'BRACE', // Lowers attack by % and increases defense by that same amount once
    'BERSERK', // Lowers health by % and increase attack by that amount once
    'CRYSTALIZE', // Lowers defense by % and increase defense by that amount once
    'SOULCHAIN', // Attack & Defense sync together to 500 / 500
    'FEAR', // Decrease opponetn attack and defense by % once
    'CREATION', // Increases max health by % once
    'DESTRUCTION' // Lowers opponent max health by % once
]

export const elements = [
    "PHYSICAL", // Deals 25% increased damage against no protection, if attack is higher deal 35% increased damage
    "FIRE", // Burns for 10% damage over the following turns
    "ICE", // Freezes opponent when hit 3 times
    "WATER", // All water abilities increase by 20%
    "EARTH", // Increases defense by 25%
    "ELECTRIC", // Increases all abilities by 15%
    "WIND", // Never misses & boosts all wind damage by 10%
    "PSYCHIC", // Lowers opponent attack and defense by 15%
    "DEATH", // Lowers max health by 10%
    "SIPHON", // Steals 15% of damage worth of opponent health
    "LIGHT", // Increases Attack by 25%, if attack is lower than opponent, deals 35% more damage
    "DARK", // Goes through Shields, Adds 1 turn Barrier
    "POISON", // Decreases Opponent Attack and Defense and Health by 15 up to 150 each turn
    "RANGED", // Goes through Parry, Deals 35% increased damage
    "SPIRIT", // Increases Crit Rate
    "SLICE", // Goes through protection
    "TIME", // Adds 2 turn Parry that does not stack
    "GRAVITY", // Lowers opponent defense by 25%
    "RECOIL", // Deals Crit Damage but receives 55% of the damage back
    "SAND", // Creates 150 Damage Shield that stacks
    "DIVINE", // If hit 5 times opponent loses 2 turns, does not stack
]

export const rank_buffs = [
    'ATTACK', // Increases Attack by %
    'DEFENSE', // Increased Defense by %
    'STAMINA', // Increases Stamina & Max Stamina by Number
    'HEAL', // Heals for % of missing health
    'LIFESTEAL', // Steals % of opponent missing health
    'ATTACK STEAL', // Steals % of opponent attack 
    'DEFENSE STEAL', // Steals % of opponent defense
    'RAGE', // Lowers defense by % and increase attack by that same amount once
    'BRACE', // Lowers attack by % and increases defense by that same amount once
    'BERSERK', // Lowers health by % and increase attack by that amount once
    'CRYSTALIZE', // Lowers defense by % and increase defense by that amount once
    'SOULCHAIN', // Attack & Defense sync together to 500 / 500
    'FEAR', // Decrease opponetn attack and defense by % once
    'CREATION', // Increases max health by % once
    'DESTRUCTION', // Lowers opponent max health by % once
    "PHYSICAL", // Deals 25% increased damage against no protection
    "FIRE", // Burns for 10% damage over the following turns
    "ICE", // Freezes opponent when hit 3 times
    "WATER", // All water abilities increase by 10%
    "EARTH", // Increases defense by 25%
    "ELECTRIC", // Increases all abilities by 15%
    "WIND", // Never misses & boosts all wind damage by 10%
    "PSYCHIC", // Lowers opponent attack and defense by 15%
    "DEATH", // Lowers max health by 10%
    "SIPHON", // Steals 15% of damage worth of opponent health
    "LIGHT", // Increases Attack by 25%
    "DARK", // Goes through Shields, Adds 1 turn Barrier
    "POISON", // Decreases Opponent Attack and Defense and Health by 15 up to 150 each turn
    "RANGED", // Goes through Parry, Deals 35% increased damage
    "SPIRIT", // Increases Crit Rate
    "SLICE", // Goes through protection
    "TIME", // Adds 2 turn Parry that does not stack
    "GRAVITY", // Lowers opponent defense by 25%
    "RECOIL", // Deals Crit Damage but receives 55% of the damage back
    "SAND", // Creates 150 Damage Shield that stacks
    "DIVINE", // If hit 5 times opponent loses 2 turns, does not stack
    "SHIELD", // Blocks damage
    "BARRIER", // Blocks attacks until you attack
    "PARRY", // Opponent takes 40% of the damage, you take 60%
    "BOOST", // Increases Specific Elemental Damage
]
