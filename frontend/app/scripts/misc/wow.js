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

function getTokenForClass(className) {
  for(let token in classTokens) {
    if(classTokens.hasOwnProperty(token) && classTokens[token].indexOf(className) > -1) {
      return token;
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

export {
  roles,
  classes,
  classTokens,
  getRoleForSpec,
  getTokenForClass,
  specs,
  regions,
  tokens
};
