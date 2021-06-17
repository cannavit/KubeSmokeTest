async function checkPassTest() {
  console.log('@1Marker-No:_354467327');

  let passTest = await process.env.SMKTEST_PASS_TEST;

  console.log('SMKTEST_PASS_TEST:', passTest);
  if (passTest === 'false') {
    throw new InternalError(' 🛑 SMOKE TEST ERROR 👎');
  }
}

checkPassTest();
