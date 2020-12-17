import { guid } from "../src/generateKey";
test("guid", () => {
  let isOk = true;
  for (let i = 0; i < 1000; i++) {
    if (guid() === guid()) {
      isOk = false;
      break;
    }
  }
  for (let i = 0; i < 1000; i++) {
    const seed = guid();
    if (guid(seed) === guid(seed)) {
      isOk = false;
      break;
    }
  }
  expect(isOk).toBe(true);
});
