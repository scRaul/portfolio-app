
export async function wait(ms: number) {
  await sleep(ms);
  return;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getGreeting() {
  await wait(5000);
  return 'hello'
}
