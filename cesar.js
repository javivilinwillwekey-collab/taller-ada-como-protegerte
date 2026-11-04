(function (root) {
  'use strict';
  const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  function shift(text, key) {
    if (!Number.isInteger(key)) throw new TypeError('La clave debe ser entera.');
    return Array.from(text).map(function (letter) {
      const index = alphabet.indexOf(letter.toUpperCase());
      if (index < 0) return letter;
      const result = alphabet[((index + key) % alphabet.length + alphabet.length) % alphabet.length];
      return letter === letter.toLowerCase() ? result.toLowerCase() : result;
    }).join('');
  }
  const api = Object.freeze({ alphabet: alphabet, shift: shift });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Cesar = api;
}(typeof window !== 'undefined' ? window : globalThis));
