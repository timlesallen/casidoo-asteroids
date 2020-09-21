const asteroids = require('..');
const expect = require('chai').expect;

describe('asteroids', () => {
  it('finds the final state', () => {
    expect(asteroids([5, 8, -5])).to.deep.equal([5, 8]); // The 8 and -5 collide, 8 wins. The 5 and 8 never collide.
    expect(asteroids([1, 2, 3, 4, 5, 8, -10])).to.deep.equal([-10]);
    expect(asteroids([-10, 1, 2, 3, 4, 5, 8])).to.deep.equal([-10, 1, 2, 3, 4, 5, 8]);
    expect(asteroids([1, 2, 3, -3, 4, 5, 8])).to.deep.equal([1, 2, 4, 5, 8]);
    expect(asteroids([10, -10])).to.deep.equal([]); // The 10 and -10 collide and they both explode.
    expect(asteroids([10, 10, -10, -10])).to.deep.equal([]); // The 10 and -10 collide and they both explode.
  });
});
