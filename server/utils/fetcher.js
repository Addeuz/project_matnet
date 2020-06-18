const fetch = require('isomorphic-unfetch');

module.exports = async function(...args) {
  const res = await fetch(...args);
  return res.json();
};
