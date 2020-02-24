export function generatorTree(num = 0, deep = 0, currentIndex = 0) {
  let container = [];
  if (num) {
    for (let i = 0; i < num; i++) {
      let children = {};
      if (currentIndex < deep) {
        currentIndex++;
        children.children = generatorTree(num, deep, currentIndex);
      }
      container.push({
        test01: `test01-${i}-${currentIndex}`,
        test02: `test02-${i}-${currentIndex}`,
        test03: `test03-${i}-${currentIndex}`,
        test04: `test04-${i}-${currentIndex}`,
        test05: `test05-${i}-${currentIndex}`,
        test06: `test06-${i}-${currentIndex}`,
        test07: `test07-${i}-${currentIndex}`,
        random: Math.floor(Math.random() * 100),
        ...children
      });
    }
  }
  return container;
}
