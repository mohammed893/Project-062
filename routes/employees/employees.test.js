const request = require('supertest');
const app = require("../../app");

describe('Testing employees', () => {
    var id ;
    test("Add new Employee", async () => {
        const res = await request(app).post('/employees/').send({
                "name": "ex1",
                "nationalidnumber": "3021125039512213",
                "dateofappointment": "2025-07-06T21:00:00.000Z",
                "insurancenumber": "i305072301400395",
                "contractdate": "2025-07-06T21:00:00.000Z",
                "functionalgroup": "PR",
                "jobtitle": "Software engineer",
                "degree": "A",
                "address": "Suez Egypt",
                "dateoflastpromotion": "2025-07-06T21:00:00.000Z",
                "role": "Manager",
                "gender": "M",
                "religion": "Muslim",
                "date_of_birth": "2005/7/23",
                "phone_number": "+201277643400",
                "military_service_status": "OK",
                "jobcategory": "Technology",
                "administration": "Admin",
                "currentjob": "Engineer",
                "qualification": "PHD",
                "contract": "life is good",
                "typeofcontract": "Digital",
                "report": "report",
                "employmentstatus": "He is verygood",
                "maritalstatus":"متزوج"
        }).expect(200);
        id = res.body;
    });
    test("Get All employees ", async() => {
        const res = await request(app).get('/employees/').expect(200);
    });
    test("Get All things about employee",async () => {
        const res = await request(app).get(`/employees/Details/${id}`).expect(200);
    });
    test("Update Employee info",async () => {
        const res = await request(app).put(`/employees/${id}`).send({
            "name": "SUI",
            "nationalIDNumber": "234567890",
            "dateOfAppointment": "2022-05-01",
            "insuranceNumber": "INS23456",
            "contractDate": "2022-05-01",
            "functionalGroup": "Engineering",
            "jobTitle": "Mechanical Engineer",
            "address": "1234 Maple St, City",
            "dateOfLastPromotion": "2023-01-10",
            "phone_number": "+20112999393"
        }).expect(200);
    });
    test("Delete Employee",async () => {
        const res = await request(app).delete(`/employees/${id}`).expect(200);
    });
})