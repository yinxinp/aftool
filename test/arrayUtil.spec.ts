import { ArrayUtil } from "../src/arrayUtil";
test("arrayUtil", () => {
  const randomA = Math.random() * 10;
  const randomB = Math.random() * 10;
  expect(ArrayUtil.myTest(randomA, randomB)).toBe(randomA + randomB);
});
