import test from 'tape';

test('tape.spec: Test 1 should fail', (t) => {

  /*
   * Run the tests and see that assertions can pass even
   * if the entire test fails
   */

  t.pass();
  t.equals(5, 5);
  t.fail();
  // t.end explicitly tells the test to end if you don't want to use plan
  t.end();
});
