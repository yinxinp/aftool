import { ArrayUtil, KeyUtil } from "../src/";
const guid = KeyUtil.guid;
test("1+1", () => {
  expect(1 + 1).toBe(2);
});
test("1===1", () => {
  expect(1 === 1).toBe(true);
});

test("ArrayUtil", () => {
  const a = () => [
    { name: "xxxx" },
    { name: "ssxw" },
    { name: "sdaasd" },
    { name: "exaa" },
    { name: "exaa" }
  ];
  const test01 = a();
  const removeItems = ArrayUtil.remove(test01, item => /s/.test(item.name));
  console.log("test01", test01);
  expect(removeItems.length).toBe(2);
  expect(test01.length).toBe(3);
  expect(test01[1].name).toBe("exaa");
  expect(ArrayUtil.removeFirst(a(), item => /s/.test(item.name)).name).toBe(
    "ssxw"
  );
  expect(ArrayUtil.removeLast(a(), item => /x/.test(item.name)).name).toBe(
    "exaa"
  );
  expect(ArrayUtil.removeLast(a(), item => /b/.test(item.name))).toBe(
    undefined
  );
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
