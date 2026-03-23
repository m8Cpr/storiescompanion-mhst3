declare global {
  interface Object {
    /**
     * Returns true if the object has no own enumerable keys
     */
    isEmpty(): boolean;
  }

  interface Array<T> {
    /**
     * Returns the first element inside the array.
     */
    first(): T;

    /**
     * Returns the last element inside the array.
     */
    last(): T;

    /**
     * Returns a random element inside the array.
     */
    random(): T;

    /**
     * Returns true if the array is empty
     */
    isEmpty(): boolean;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.first = function () {
  return this[0];
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.isEmpty = function () {
  return this?.length === 0;
};

Object.defineProperty(Object.prototype, "isEmpty", {
  value() {
    return Object.keys(this).length === 0;
  },
  writable: true,
});
