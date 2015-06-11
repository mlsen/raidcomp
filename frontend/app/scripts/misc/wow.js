const roles = {
  HEALER: 'healer',
  MELEE: 'melee',
  RANGED: 'ranged'
  TANK: 'tank'
};

const classes = {
  DEATHKNIGHT: 'deathknight',
  DRUID: 'druid',
  HUNTER: 'hunter',
  MAGE: 'mage',
  MONK: 'monk',
  PALADIN: 'paladin',
  PRIEST: 'priest',
  ROGUE: 'rogue',
  SHAMAN: 'shaman',
  WARLOCK: 'warlock',
  WARRIOR: 'warrior'
};

const specs = {
  'deathknight': {
    Blood: roles.TANK,
    Frost: roles.MELEE,
    Unholy: roles.MELEE
  },
  'druid': {
    Balance: roles.RANGED,
    Feral: roles.MELEE,
    Restoration: roles.HEALER
  },
  'hunter': {
    Beastmaster: roles.RANGED,
    Marksman: roles.RANGED,
    Survival: roles.RANGED
  },
  'mage': {
    Arcane: roles.RANGED,
    Fire: roles.RANGED,
    Frost: roles.RANGED
  },
  'monk': {
    Brewmaster: roles.TANK,
    Mistweaver: roles.HEALER,
    Windwalker: roles.MELEE
  },
  'paladin': {
    Holy: roles.HEALER,
    Protection: roles.TANK,
    Retribution: roles.MELEE
  },
  'priest': {
    Discipline: roles.HEALER,
    Holy: roles.HEALER,
    Shadow: roles.RANGED
  },
  'rogue': {
    Assasination: roles.MELEE,
    Combat: roles.MELEE,
    Subtlety: roles.MELEE
  },
  'shaman': {
    Elemental: roles.RANGED,
    Enhancement: roles.MELEE,
    Restoration: roles.HEALER
  },
  'warlock': {
    Afflication: roles.RANGED,
    Demonology: roles.RANGED,
    Destruction: roles.RANGED
  }
};

export {
  roles: roles,
  classes: classes,
  specs: specs
};
