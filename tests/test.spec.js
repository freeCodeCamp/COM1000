import test from 'tape';

test('#tape.spec', (t) => {
  t.test('Test 1 should fail', (t) => {

    /*
     * Run the tests and see that assertions can pass even
     * if the entire test fails
     */

    const actual = 5;
    const expected = 5;

    // t.pass(); This would generate a passing assertion
    t.comment('Assertion passes');
    t.equals(actual, expected);
    // t.fail(); This would generate a failing assertion
    t.comment('Assertion fails');
    t.notEqual(actual, expected);
    // t.end explicitly tells the test to end if you don't want to use plan
    t.end();
  });
  t.end();
});
