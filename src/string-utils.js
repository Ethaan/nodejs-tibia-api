export const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
};

export const isUrl = str =>
  str.indexOf('http://') === 0 || str.indexOf('https://') === 0
