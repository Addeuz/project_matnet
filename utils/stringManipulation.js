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
  return string
    .replace(/(?:^\w|[A-ZÅÄÖ]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
