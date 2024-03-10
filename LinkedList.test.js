const { Node, LinkedList } = require("./LinkedList.js");

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

test("Ссылка при создании ноды должна быть нулем", () => {
  const node = new Node(1);
  expect(node.next).toBeNull();
});

test("Добавление одного элемента в начало", () => {
  const list = new LinkedList();
  list.pushFront(1);
  expect(list.head.value).toEqual(1);
  expect(list.tail.value).toEqual(1);
});

test("Добавление одного элемента в конец", () => {
  const list = new LinkedList();
  list.pushBack(1);
  expect(list.head.value).toEqual(1);
  expect(list.tail.value).toEqual(1);
});

test("Рандомное добаввление рандомных элементов", () => {
  const list = new LinkedList();
  const len = randomInt(100) + 1;
  const array = Array.from({ length: len })
    .fill(0)
    .map(() => randomInt(100));
  for (let i = len - 1; i >= 0; i--) {
    list.pushFront(array[i]);
  }

  let node = list.head;
  expect(node.value).toEqual(array[0]);
  node = node.next;
  let index = 1;

  while (node) {
    expect(node.value).toEqual(array[index]);
    node = node.next;
    index++;
  }

  expect(index).toEqual(len);
  expect(node).toBeNull();
});

test("Тестирование стрингифай", () => {
  const list = new LinkedList();
  list.pushFront(4).pushFront(3).pushFront(2).pushFront(1);
  const listString = list.stringify();
  expect(listString).toEqual("1, 2, 3, 4");
});

test("Тестирование fromArray", () => {
  const list = LinkedList.fromArray([1, 2, 3, 4]);
  const listString = list.stringify();
  expect(listString).toEqual("1, 2, 3, 4");
});

test("Тестирование пушБек", () => {
  const list = new LinkedList();
  list.pushBack(1).pushBack(2).pushBack(3).pushBack(4);
  const listString = list.stringify();
  expect(listString).toEqual("1, 2, 3, 4");
});
