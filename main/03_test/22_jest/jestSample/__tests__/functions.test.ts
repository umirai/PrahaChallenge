// functions
import { sumOfArray } from "../functions";
import { asyncSumOfArray } from "../functions";

// sumOfArray
describe("sumOfArray", (): void => {
  describe("正常系", (): void => {
    it("default", (): void => {
      const arr: number[] = [1, 2, 3];
      expect(sumOfArray(arr)).toBe(6);
    });

    it("include zero", (): void => {
      const arr: number[] = [0, 2, 3];
      expect(sumOfArray(arr)).toBe(5);
    });

    it("include nevative number", (): void => {
      const arr: number[] = [1, 2, -3];
      expect(sumOfArray(arr)).toBe(0);
    });

    it("include float number", (): void => {
      const arr: number[] = [1, 2, 3.5];
      expect(sumOfArray(arr)).toBeCloseTo(6.5);
    });
  });

  describe("異常系", (): void => {
    it("empty", (): void => {
      const arr: number[] = [];
      expect((): number => sumOfArray(arr)).toThrow();
    });
  });
});

// asyncSumOfArray
describe("asyncSumOfArray", (): void => {
  describe("正常系", (): void => {
    it("default", async (): Promise<void> => {
      const arr: number[] = [1, 2, 3];
      return await expect(asyncSumOfArray(arr)).resolves.toBe(6);
    });
  });

  describe("異常系", (): void => {
    it("empty", async (): Promise<void> => {
      const arr: number[] = [];
      return await expect(
        (): Promise<number> => asyncSumOfArray(arr)
      ).rejects.toThrow();
    });
  });
});
