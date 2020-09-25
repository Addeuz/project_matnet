export function camelCaseToNormal(string) {
  return (
    string // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function(str) {
        return str.toUpperCase();
      })
  );
}

export function camelize(string) {
  // if (string.includes('å') || string.includes('ä') || string.includes('ö')) {
  //   return string.toLowerCase();
  // }
  return string
    .replace(/(?:^\w|[A-ZÅÄÖ]|\b\w)/g, function(word, index) {
      // console.log(word, index);
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
