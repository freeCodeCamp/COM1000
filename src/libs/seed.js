export function textToSeed(text) {
  return (
    text.replace(/\s/gi, '')
      .split('')
      .map((char) => {
        return(char.charCodeAt(0));
      })
      .reduce((x,y) => {return(x*y)})
  );
}