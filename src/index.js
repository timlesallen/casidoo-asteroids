/*
 * Given an array of integers representing asteroids in a row, for each
 * asteroid, the absolute value represents its size, and the sign represents
 * its direction (positive = right, negative = left). Return the state of the
 * asteroids after all collisions (assuming they are moving at the same speed).
 * If two asteroids meet, the smaller one will explode. When they are the same
 * size, they both explode. Asteroids moving in the same direction will never
 * meet.

  Example:

  $ asteroids([5, 8, -5])
  $ [5, 8] // The 8 and -5 collide, 8 wins. The 5 and 8 never collide.

  $ asteroids([10, -10])
  $ [] // The 10 and -10 collide and they both explode.
*/

const first = a => a[0];
const last = a => a[a.length - 1];
const right = x => x > 0;
const left = x => x < 0;

/** Given two stable sections, which one will win?
 */
const wins = (a, b) => {
  const x = last(a);
  const y = first(b);
  // Moving in same direction or away from each other
  if (Math.sign(x) === Math.sign(y) || (left(x) && right(y))) return 'both';
  // Destroy each other
  if (Math.abs(x) === Math.abs(y)) return 'neither';
  // Biggest wins
  return Math.abs(x) > Math.abs(y) ? 'left' : 'right';
};

/**
 * Given two sections, what is the result of placing them next to each
 * other?
 */
function merge (a, b) {
  if (a.length + b.length <= 1) return [...a, ...b];
  // Make sure both sections have stable state within section
  a = asteroids(a);
  b = asteroids(b);
  // Now check what happens when they are placed next to each other.
  switch (wins(a, b)) {
    case 'neither': return merge(a.slice(0, -1), b.slice(1)); // Both asteroids at touch point are lost
    case 'left': return merge(a, b.slice(1)); // Left asteroid at touch point wins
    case 'right': return merge(a.slice(0, -1), b); // Right asteroids at touch point wins
    default: return [...a, ...b]; // These sections are stable next to each other
  }
}

function asteroids (input) {
  const midpoint = input.length / 2;
  const m = merge(input.slice(0, midpoint), input.slice(midpoint));
  return m;
}

module.exports = asteroids;
