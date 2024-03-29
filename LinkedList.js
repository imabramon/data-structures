class Node {
  #value = undefined;
  #next = null;

  constructor(value, next = null) {
    if (!(next instanceof Node) && next !== null) {
      throw new TypeError(
        `Linked list node: in node constructor passed as second argument ${next}, but Node requered`
      );
    }

    this.#value = value;
    this.#next = next;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get next() {
    return this.#next;
  }

  set next(next) {
    if (!(next instanceof Node) && next !== null) {
      throw new TypeError(
        `Linked list node: in node constructor passed as second argument ${next}, but Node requered`
      );
    }

    this.#next = next;
  }
}

class LinkedList {
  #head = null;

  static fromArray(array) {
    const linkedList = new LinkedList();

    for (let i = array.length - 1; i >= 0; i--) {
      linkedList.pushFront(array[i]);
    }

    return linkedList;
  }

  isEmpty() {
    return this.#head === null;
  }

  pushFront(value) {
    this.#head = new Node(value, this.#head);
    return this;
  }

  pushBack(value) {
    if (this.isEmpty()) {
      return this.pushFront(value);
    }
    let tail = this.tail;

    tail.next = new Node(value, null);

    return this;
  }

  push(value, n) {
    let node;

    try {
      node = this.getByIndex(n);
    } catch (e) {
      throw e;
    }

    node = new Node(node.value, new Node(value, node.next));

    return this;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    if (this.isEmpty()) {
      return this.#head;
    }

    let prevNode = this.#head;
    let currNode = this.#head.next;

    while (currNode) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    return prevNode;
  }

  getByIndex(index) {
    if (index === 0) {
      return this.head;
    }

    let currIndex = 1;
    let currNode = this.#head.next;

    while (currNode !== null && currIndex < index) {
      currNode = currNode.next;
      currIndex++;
    }

    if (currNode === null) {
      throw new RangeError(`LinkedList: index ${index} is greater than length`);
    }

    return currNode;
  }

  stringify(valueStringifyFn = (value) => String(value)) {
    if (this.isEmpty()) {
      return "";
    }

    let str = `${valueStringifyFn(this.#head.value)}`;
    let currNode = this.#head.next;
    while (currNode) {
      str = `${str}, ${valueStringifyFn(currNode.value)}`;
      currNode = currNode.next;
    }

    return str;
  }

  get length() {
    if (this.isEmpty()) {
      return 0;
    }

    let length = 1;
    let currNode = this.#head.next;

    while (currNode) {
      length++;
      currNode = currNode.next;
    }

    return length;
  }
}

module.exports = { Node, LinkedList };
