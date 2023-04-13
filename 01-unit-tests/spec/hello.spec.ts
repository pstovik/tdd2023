import { hello } from "../src/hello";

describe("hello::", () => {
    it("should be successfull", () => {
        expect(true).toBeTruthy();
    });
    xit("should fail", () => {
        expect(false).toBeTruthy();
    });
    it("should construct hello message", () => {
        expect(hello("world")).toEqual('Hello "world"');
    });
});
