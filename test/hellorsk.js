const HelloRSK = artifacts.require('HelloRSK');

contract('HelloRSK', accounts => {
  let helloRSK;

  beforeEach(async () => {
    helloRSK = await HelloRSK.new();
  });

  it('should have an initial greeting', async () => {
    let greeting = await helloRSK.getGreeting();

    assert.equal(greeting, 'Set me :D');
  });

  it('should set greeting', async () => {
    const greeting = 'You set me wright!';

    await helloRSK.setGreeting(greeting);

    const actualGreeting = await helloRSK.getGreeting();

    assert.equal(actualGreeting, greeting);
  });
});
