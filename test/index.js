import * as testObj from "../src/index";

testObj.treeFilter("hehedaaa====a");
(async function() {
  const result = await testObj.waitTime(() => "hehehda", 2000);
  console.log("result===>", result);
})();
