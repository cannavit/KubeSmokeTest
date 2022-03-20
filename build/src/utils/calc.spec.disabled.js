"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calc_1 = __importDefault(require("./calc"));
describe('Calc', () => {
    test('should return 10 for add(6, 4)', () => {
        expect(calc_1.default.add(6, 4)).toBe(10);
    });
    test('should return 9 for add(10, -1)', () => {
        expect(calc_1.default.add(10, -1)).toBe(9);
    });
});
