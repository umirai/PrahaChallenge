import axios from "axios";

// service
import { NameApiService } from "../nameApiService";

// mock
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// --------------------------------------------------


describe("NameApiService", (): void => {

  describe("正常系", (): void => {
    beforeAll((): void => {
      const params = { data: { first_name: "mira" } };
      mockedAxios.get.mockResolvedValue(params);
    });

    afterAll((): void => {
      jest.clearAllMocks();
    });

    it("defautl", async (): Promise<void> => {
      const api = new NameApiService();
      const res = await api.getFirstName();
      expect(res).toMatch("mira");
    })
  });

  describe("異常系", (): void => {
    beforeAll((): void => {
      const params = { data: { first_name: "mirai" } };
      mockedAxios.get.mockResolvedValue(params);
    });

    afterAll((): void => {
      jest.clearAllMocks();
    });

    it("defautl", async (): Promise<void> => {
      const api = new NameApiService();
      return expect(api.getFirstName()).rejects.toThrow();
    })
  });
});
