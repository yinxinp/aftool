import { KeyUtil } from "../src";
const guid = KeyUtil.guid;
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
