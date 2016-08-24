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
  DEMONHUNTER: 'demonhunter',
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
  demonhunter: {
    'Havoc': roles.MELEE,
    'Vengeance': roles.TANK
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
    'Outlaw': roles.MELEE,
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
    classes.WARLOCK,
    classes.DEMONHUNTER
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
    classes.ROGUE,
    classes.DEMONHUNTER
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
  demonhunter: {
    'Havoc': trinketTypes.AGI,
    'Vengeance': trinketTypes.TANK
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
    'Outlaw': trinketTypes.AGI,
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

const relicTypes = {
  BLOOD: 'blood',
  SHADOW: 'shadow',
  IRON: 'iron',
  FROST: 'frost',
  FIRE: 'fire',
  FEL: 'fel',
  ARCANE: 'arcane',
  LIFE: 'life',
  STORM: 'storm',
  HOLY: 'holy'
}

const relics = {
  deathknight: {
    'Blood': [relicTypes.BLOOD, relicTypes.SHADOW, relicTypes.IRON],
    'Frost': [relicTypes.FROST, relicTypes.SHADOW],
    'Unholy': [relicTypes.FIRE, relicTypes.SHADOW, relicTypes.BLOOD]
  },
  demonhunter: {
    'Havoc': [relicTypes.FEL, relicTypes.SHADOW],
    'Vengeance': [relicTypes.IRON, relicTypes.ARCANE, relicTypes.FEL]
  },
  druid: {
    'Balance': [relicTypes.ARCANE, relicTypes.LIFE],
    'Guardian': [relicTypes.FIRE, relicTypes.BLOOD, relicTypes.LIFE],
    'Feral': [relicTypes.FROST, relicTypes.BLOOD, relicTypes.LIFE],
    'Restoration': [relicTypes.LIFE, relicTypes.FROST]
  },
  hunter: {
    'Beast Mastery': [relicTypes.STORM, relicTypes.ARCANE, relicTypes.IRON],
    'Marksmanship': [relicTypes.STORM, relicTypes.BLOOD, relicTypes.LIFE],
    'Survival': [relicTypes.STORM, relicTypes.IRON, relicTypes.BLOOD]
  },
  mage: {
    'Arcane': [relicTypes.ARCANE, relicTypes.FROST],
    'Fire': [relicTypes.FIRE, relicTypes.ARCANE],
    'Frost': [relicTypes.FROST, relicTypes.ARCANE]
  },
  monk: {
    'Brewmaster':[relicTypes.LIFE, relicTypes.STORM, relicTypes.IRON],
    'Mistweaver':[relicTypes.FROST, relicTypes.LIFE, relicTypes.STORM],
    'Windwalker':[relicTypes.STORM, relicTypes.IRON]
  },
  paladin: {
    'Holy':[relicTypes.HOLY, relicTypes.LIFE],
    'Retribution':[relicTypes.HOLY, relicTypes.FIRE],
    'Protection':[relicTypes.HOLY, relicTypes.IRON, relicTypes.ARCANE]
  },
  priest: {
    'Discipline':[relicTypes.HOLY, relicTypes.SHADOW],
    'Holy':[relicTypes.HOLY, relicTypes.LIFE],
    'Shadow':[relicTypes.SHADOW, relicTypes.BLOOD]
  },
  rogue: {
    'Assasination':[relicTypes.SHADOW, relicTypes.IRON, relicTypes.BLOOD],
    'Outlaw':[relicTypes.BLOOD, relicTypes.IRON, relicTypes.STORM],
    'Subtlety':[relicTypes.FEL, relicTypes.SHADOW]
  },
  shaman: {
    'Elemental':[relicTypes.STORM, relicTypes.FROST],
    'Enhancement':[relicTypes.FIRE, relicTypes.IRON, relicTypes.STORM],
    'Restoration':[relicTypes.LIFE, relicTypes.FROST]
  },
  warlock: {
    'Affliction':[relicTypes.SHADOW, relicTypes.BLOOD],
    'Demonology':[relicTypes.SHADOW, relicTypes.FIRE, relicTypes.FEL],
    'Destruction':[relicTypes.FEL, relicTypes.FIRE]
  },
  warrior: {
    'Arms':[relicTypes.IRON, relicTypes.BLOOD, relicTypes.SHADOW],
    'Fury':[relicTypes.FIRE, relicTypes.STORM, relicTypes.IRON],
    'Protection':[relicTypes.IRON, relicTypes.BLOOD, relicTypes.FIRE]
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

function getRelicForSpec(className, spec) {
  if (typeof spec !== undefined && spec !== null) {
    return relics[className][spec];
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
  tokens,
  relicTypes,
  relics,
  getRelicForSpec
};
