import test from 'tape';

test('tape.spec', (t) => {

  t.test('Test 1 should fail', (t) => {

    const actual = typeof Array.prototype.map;
    const expected = 'object';

    t.equals(actual, expected, 'Array.prototype.map is an object');
    // t.end explicitly tells the test to end if you don't want to use plan
    t.end();
  });

  t.test('Test 2 should pass', (t) => {
    const actual = typeof Array.prototype.map;
    const expected = 'function';

    t.equals(actual, expected, 'Array.prototype.map is a function');
    t.end();
  });

  t.end();
});
