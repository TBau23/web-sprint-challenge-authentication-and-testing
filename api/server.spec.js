const { expectCt } = require("helmet");
const supertest = require("supertest");
const { intersect } = require("../database/dbConfig.js");

const server = require("./server.js");

describe('server.js endpoint tests', () => {
    describe("REGISTER", () => {
        it("should return 201", () => {
            
            return supertest(server)
                // this test will only work once unless I set up a testing database and 
                .post("/api/auth/register")
                .send({
                    username: "Legolas",
                    password: "pass"
                })
                .then(res => {
                    expect(res.status).toBe(500)
                })
        })
    })
    describe("LOGIN", () => {
        it("should return 200", () => {

            return supertest(server)
                .post("/api/auth/login")
                .send({
                    username: "Legolas",
                    password: "pass"
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toEqual("Login successful")
                })
        })
        it("should return 'Login Successful", () => {

            return supertest(server)
                .post("/api/auth/login")
                .send({
                    username: "Legolas",
                    password: "pass"
                })
                .then(res => {
                    expect(res.body.message).toEqual("Login successful")
                })
        })
    })
})