import axios from "axios";

// functions
import { sumOfArray } from "../functions";
import { asyncSumOfArray } from "../functions";
import { asyncSumOfArraySometimesZero } from "../functions";
import { getFirstNameThrowIfLong } from "../functions";
import { NameApiService } from "../nameApiService";
import * as DatabaseMockService from "../util";

// services
import { DatabaseMock } from "../util";

// mock
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// --------------------------------------------------

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

// asyncSumOfArraySometimesZero
describe("asyncSumOfArraySometimesZero", (): void => {
  describe("正常系", (): void => {
    it("default", async (): Promise<void> => {
      const arr: number[] = [1, 2, 3];
      const database = new DatabaseMock();
      const spyGetRandomInt = jest.spyOn(DatabaseMockService, "getRandomInt");
      spyGetRandomInt.mockReturnValue(3);
      const res = await asyncSumOfArraySometimesZero(arr, database);
      expect(res).toBe(6);
    });
  });

  describe("異常系", (): void => {
    it("default", async (): Promise<void> => {
      const arr: number[] = [];
      const database = new DatabaseMock();
      const res = await asyncSumOfArraySometimesZero(arr, database);
      expect(res).toBe(0);
    });
  });
});

// getFirstNameThrowIfLong
describe("getFirstNameThrowIfLong", (): void => {
  beforeAll((): void => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const params = { data: { first_name: "mira" } }
    mockedAxios.get.mockResolvedValue(params);
  });

  afterAll((): void => {
    jest.clearAllMocks();
  });

  describe("正常系", (): void => {
    it("default", async (): Promise<void> => {
      const maxLength = 5;
      const nameApiService = new NameApiService();
      const res = await getFirstNameThrowIfLong(maxLength, nameApiService);
      expect(res).toBe("mira");
    });
  });

  describe("異常系", (): void => {
    it("default", async (): Promise<void> => {
      const maxLength = 3;
      const nameApiService = new NameApiService();
      await expect(
        getFirstNameThrowIfLong(maxLength, nameApiService)
      ).rejects.toThrow();
    });
  });
});
