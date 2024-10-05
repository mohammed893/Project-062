const request = require('supertest');
const app = require("../../app");

describe('Testing assignments', () => {
    test("Add assingment", async () => {
        const res = await request(app).post('/')
    });
    test("sub test 2 : ", () => {
        res = 100;
        expect(res).toBe(100);
    });
    test("sub test 3 : ", () => {
        res = 100;
        expect(res).toBe(100);
    });
    test("sub test 4 : ", () => {
        res = 100;
        expect(res).toBe(100);
    });
})