import { ArrayUtil } from "../src/arrayUtil";
import { guid } from "../src/generateKey";
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

test("ArrayUtil.tree", () => {
  const tree = [
    {
      id: guid(),
      children: [{ id: guid() }, { id: guid() }, { id: guid() }, { id: guid() }]
    },
    { id: guid(), children: [{ id: guid() }, { id: guid() }] },
    { id: guid(), children: [{ id: guid() }, { id: guid() }] },
    { id: guid(), children: [{ id: guid() }] },
    { id: guid(), children: [{ id: guid() }] },
    { id: guid(), children: [{ id: guid() }] },
    { id: guid() }
  ];
  const result = ArrayUtil.flatToMap(tree);
  const resultLength = Object.keys(result).length;
  expect(resultLength).toBe(18);
});
