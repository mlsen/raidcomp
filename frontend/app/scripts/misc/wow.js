const regions = {
  cn: 'China',
  eu: 'Europe',
  kr: 'Korea',
  tw: 'Taiwan',
  us: 'United States'
};

const roles = {
  HEALER: 'healer',
  MELEE: 'melee',
  RANGED: 'ranged',
  TANK: 'tank',
  UNKNOWN: 'unknown'
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
  deathknight: {
    'Blood': roles.TANK,
    'Frost': roles.MELEE,
    'Unholy': roles.MELEE
  },
  druid: {
    'Balance': roles.RANGED,
    'Guardian': roles.TANK,
    'Feral': roles.MELEE,
    'Restoration': roles.HEALER
  },
  hunter: {
    'Beast Mastery': roles.RANGED,
    'Marksmanship': roles.RANGED,
    'Survival': roles.RANGED
  },
  mage: {
    'Arcane': roles.RANGED,
    'Fire': roles.RANGED,
    'Frost': roles.RANGED
  },
  monk: {
    'Brewmaster': roles.TANK,
    'Mistweaver': roles.HEALER,
    'Windwalker': roles.MELEE
  },
  paladin: {
    'Holy': roles.HEALER,
    'Protection': roles.TANK,
    'Retribution': roles.MELEE
  },
  priest: {
    'Discipline': roles.HEALER,
    'Holy': roles.HEALER,
    'Shadow': roles.RANGED
  },
  rogue: {
    'Assasination': roles.MELEE,
    'Combat': roles.MELEE,
    'Subtlety': roles.MELEE
  },
  shaman: {
    'Elemental': roles.RANGED,
    'Enhancement': roles.MELEE,
    'Restoration': roles.HEALER
  },
  warlock: {
    'Affliction': roles.RANGED,
    'Demonology': roles.RANGED,
    'Destruction': roles.RANGED
  },
  warrior: {
    'Arms': roles.MELEE,
    'Fury': roles.MELEE,
    'Protection': roles.TANK
  }
};

const tokens = {
  CONQUEROR: 'conqueror',
  PROTECTOR: 'protector',
  VANQUISHER: 'vanquisher'
};

const classTokens = {
  conqueror: [
    classes.PALADIN,
    classes.PRIEST,
    classes.WARLOCK
  ],
  protector: [
    classes.HUNTER,
    classes.SHAMAN,
    classes.WARRIOR,
    classes.MONK
  ],
  vanquisher: [
    classes.DEATHKNIGHT,
    classes.DRUID,
    classes.MAGE,
    classes.ROGUE
  ]
};

const armorTypes = {
  CLOTH: 'cloth',
  LEATHER: 'leather',
  MAIL: 'mail',
  PLATE: 'plate'
};

const classArmorTypes = {
  cloth: [
    classes.MAGE,
    classes.PRIEST,
    classes.WARLOCK
  ],
  leather: [
    classes.DRUID,
    classes.MONK,
    classes.ROGUE
  ],
  mail: [
    classes.HUNTER,
    classes.SHAMAN
  ],
  plate: [
    classes.DEATHKNIGHT,
    classes.PALADIN,
    classes.WARRIOR
  ]
};

const trinketTypes = {
  STR: 'strength',
  AGI: 'agility',
  TANK: 'tank',
  CASTER: 'caster',
  HEALER: 'healer'
};

const trinkets = {
  deathknight: {
    'Blood': trinketTypes.TANK,
    'Frost': trinketTypes.STR,
    'Unholy': trinketTypes.STR
  },
  druid: {
    'Balance': trinketTypes.CASTER,
    'Guardian': trinketTypes.TANK,
    'Feral': trinketTypes.AGI,
    'Restoration': trinketTypes.HEALER
  },
  hunter: {
    'Beast Mastery': trinketTypes.AGI,
    'Marksmanship': trinketTypes.AGI,
    'Survival': trinketTypes.AGI
  },
  mage: {
    'Arcane': trinketTypes.CASTER,
    'Fire': trinketTypes.CASTER,
    'Frost': trinketTypes.CASTER
  },
  monk: {
    'Brewmaster': trinketTypes.TANK,
    'Mistweaver': trinketTypes.HEALER,
    'Windwalker': trinketTypes.AGI
  },
  paladin: {
    'Holy': trinketTypes.HEALER,
    'Protection': trinketTypes.TANK,
    'Retribution': trinketTypes.STR
  },
  priest: {
    'Discipline': trinketTypes.HEALER,
    'Holy': trinketTypes.HEALER,
    'Shadow': trinketTypes.CASTER
  },
  rogue: {
    'Assasination': trinketTypes.AGI,
    'Combat': trinketTypes.AGI,
    'Subtlety': trinketTypes.AGI
  },
  shaman: {
    'Elemental': trinketTypes.CASTER,
    'Enhancement': trinketTypes.AGI,
    'Restoration': trinketTypes.HEALER
  },
  warlock: {
    'Affliction': trinketTypes.CASTER,
    'Demonology': trinketTypes.CASTER,
    'Destruction': trinketTypes.CASTER
  },
  warrior: {
    'Arms': trinketTypes.STR,
    'Fury': trinketTypes.STR,
    'Protection': trinketTypes.TANK
  }
};

function getTokenForClass(className) {
  for(let token in classTokens) {
    if(classTokens.hasOwnProperty(token) && classTokens[token].indexOf(className) > -1) {
      return token;
    }
  }
}

function getArmorTypeForClass(className) {
  for (let armorType in classArmorTypes) {
    if (classArmorTypes.hasOwnProperty(armorType) && classArmorTypes[armorType].indexOf(className) > -1) {
      return armorType;
    }
  }
}

function getRoleForSpec(className, spec) {
  // These classes can only fulfill one role
  if([classes.HUNTER, classes.MAGE, classes.WARLOCK].indexOf(className) > -1) {
    return roles.RANGED;
  } else if(className === classes.ROGUE) {
    return roles.MELEE;
  }

  if(typeof spec !== 'undefined' && spec !== null) {
    return specs[className][spec];
  }
  return null;
}

function getTrinketForSpec(className, spec) {
  if (typeof spec !== undefined && spec !== null) {
    return trinkets[className][spec];
  }
  return null;
}

export {
  roles,
  classes,
  classTokens,
  getRoleForSpec,
  getTokenForClass,
  trinketTypes,
  trinkets,
  getTrinketForSpec,
  armorTypes,
  getArmorTypeForClass,
  specs,
  regions,
  tokens
};
