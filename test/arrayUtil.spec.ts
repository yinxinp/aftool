import { ArrayUtil } from "../src/arrayUtil";
test("1+1", () => {
  expect(1 + 1).toBe(2);
});
test("1===1", () => {
  expect(1 === 1).toBe(true);
});

test("ArrayUtil", () => {
  const a = [
    { name: "xxxx" },
    { name: "ssxw" },
    { name: "sdaasd" },
    { name: "exaa" }
  ];
  expect(ArrayUtil.remove(a, item => /s/.test(item.name)).length).toBe(2);
  expect(ArrayUtil.removeFirst(a, item => /s/.test(item.name)).name).toBe(
    "ssxw"
  );
  expect(ArrayUtil.removeLast(a, item => /x/.test(item.name)).name).toBe(
    "exaa"
  );
  expect(ArrayUtil.removeLast(a, item => /b/.test(item.name))).toBe(undefined);
});
