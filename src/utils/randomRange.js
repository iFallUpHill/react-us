// https://www.w3schools.com/js/js_random.asp
const randomNumInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export {
  randomNumInRange
};
