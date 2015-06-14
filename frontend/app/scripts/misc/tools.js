import sha1 from 'sha1';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomName(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for( var i=0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const classes = [
  'deathknight', 'druid', 'hunter', 'mage', 'monk', 'paladin',
  'priest', 'rogue', 'shaman', 'warlock', 'warrior'
];

function getRandomClass() {
  return classes[getRandomInt(0, classes.length)];
}

function generateCharacterId(region, realm, name) {
  return sha1(
    region.toLowerCase() +
    realm.toLowerCase() +
    name.toLowerCase()
  );
}

function generateRandomCharacter() {
  let character = {
    name: getRandomName(12),
    region: getRandomName(8),
    realm: getRandomName(8),
    className: getRandomClass()
  };
  character.id = generateCharacterId(
    character.region,
    character.realm,
    character.name
  );
  return character;
}

export {
  generateRandomCharacter
};
