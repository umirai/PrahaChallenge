import { add, multiply, subtract, divide } from "../functions.js";

describe('add', () => {
  describe('正常系', () => {
    it('Array(30).fill(1)を受け取り、30を返す', () => {
      expect(add(Array(30).fill(1))).toBe(30);
    })

    it('[500, 500]を受け取り、1000を返す', () => {
      expect(add([500, 500])).toBe(1000);
    })

    it("[500, 501]を受け取り、'too big'を返す", () => {
      expect(add([500, 501])).toMatch('too big');
    })
  })

  describe('異常系', () => {
    it('Array(31).fill(1)を受け取り、エラーを返す', () => {
      expect(() => add(Array(31).fill(1))).toThrow();
    })

    it('空配列を受け取り、エラーを返す', () => {
      expect(() => add([])).toThrow();
    })

    it("[1, 2, 'three']を受け取り、エラーを返す", () => {
      expect(() => add([1, 2, 'three'])).toThrow();
    })
  })
})

describe('subtract', () => {
  describe('正常系', () => {
    it('Array(29).fill(1).concat(-100)を受け取り、72を返す', () => {
      expect(subtract(Array(29).fill(1).concat(-100))).toBe(72);
    })

    it('[0, 0, 0]を受け取り、0を返す', () => {
      expect(subtract([0, 0, 0])).toBe(0);
    })

    it("[0, 1, 2]を受け取り、'negative number'を返す", () => {
      expect(subtract([0, 1, 2])).toMatch('negative number');
    })
  })

  describe('異常系', () => {
    it('Array(30).fill(1).concat(100)を受け取り、エラーを返す', () => {
      expect(() => subtract(Array(30).fill(1).concat(100))).toThrow();
    })


    it('空配列を受け取り、エラーを返す', () => {
      expect(() => subtract([])).toThrow();
    })

    it("[10, 1, 'three']を受け取り、エラーを返す", () => {
      expect(() => subtract([10, 1, 'three'])).toThrow();
    })
  })
})

describe('multiply', () => {
  describe('正常系', () => {
    it('[2, 2, 2]を受け取り、8を返す', () => {
      expect(multiply([2, 2, 2])).toBe(8);
    })

    it('Array(30).fill(1)を受け取り、1を返す', () => {
      expect(multiply(Array(30).fill(1))).toBe(1);
    })

    it('[10, 10, 10]を受け取り、1000を返す', () => {
      expect(multiply([10, 10, 10])).toBe(1000);
    })


    it("[1001]を受け取り、'big big number'を返す", () => {
      expect(multiply([1001])).toMatch('big big number');
    })
  })

  describe('異常系', () => {
    it('Array(31).fill(1)を受け取り、エラーを返す', () => {
      expect(() => multiply(Array(31).fill(1))).toThrow();
    })


    it('空配列を受け取り、エラーを返す', () => {
      expect(() => multiply([])).toThrow();
    })

    it("[1, 2, 'three']を受け取り、エラーを返す", () => {
      expect(() => multiply([1, 2, 'three'])).toThrow();
    })
  })
})

describe('divide', () => {
  describe('正常系', () => {
    it('[100, 2, 2]を受け取り、25を返す', () => {
      expect(divide([100, 2, 2])).toBe(25);
    })

    it('[100, -2, 2]を受け取り、-25を返す', () => {
      expect(divide([100, -2, 2])).toBe(-25);
    })

    it('[100, 3]を受け取り、33.3を返す', () => {
      expect(divide([100, 3])).toBeCloseTo(33.3);
    })

    it('Array(30).fill(1)を受け取り、1を返す', () => {
      expect(divide(Array(30).fill(1))).toBe(1);
    })
  })

  describe('異常系', () => {
    it('Array(31).fill(1)を受け取り、エラーを返す', () => {
      expect(() => divide(Array(31).fill(1))).toThrow();
    })

    it('空配列を受け取り、エラーを返す', () => {
      expect(() => divide([])).toThrow();
    })

    it("[10, 2, 'two']を受け取り、エラーを返す", () => {
      expect(() => divide([10, 2, 'two'])).toThrow();
    })
  })
})