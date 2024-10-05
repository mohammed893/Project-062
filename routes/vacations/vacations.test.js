const request = require('supertest');
const app = require("../../app");

describe('Testing Vacations', () => {
    var id ;
    var vacId;
    test("Add new User", async () => {
        const res = await request(app).post('/employees/').send({
                "name": "ex1",
                "nationalidnumber": "3025039512213",
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
    test("Add new Vacation ticket", async () => {
        const res = await request(app).post('/vacations/').send({
            "employeeID": id,
            "startDate": "2024-07-01",
            "endDate": "2024-07-15",
            "duration": 14
        }).expect(200);
        vacId = res.body.vacationid;
    });
    test("Add vacation to undefined user", async () => {
        const res = await request(app).post('/vacations/').send({
            "employeeID": id+1,
            "startDate": "2024-07-01",
            "endDate": "2024-07-15",
            "duration": 14
        }).expect(404);
    });
    test("Get All Vacations ", async() => {
        const res = await request(app).get('/vacations/').expect(200);
    });
    test("Update Vacation info",async () => {
        const res = await request(app).put(`/vacations/${vacId}`).send({
                "employeeID": id,
                "startDate": "2024-07-05",
                "endDate": "2024-07-20",
                "duration": 11
        }).expect(200);
    });
    test("Update vacation for undefined User" , async () => {
        const res = await request(app).put(`/vacations/${vacId}`).send({
            "employeeID": id+1,
            "startDate": "2024-07-05",
            "endDate": "2024-07-20",
            "duration": 11
        }).expect(404);
    })
    test("Update undefined vacation " , async () => {
        const res = await request(app).put(`/vacations/${vacId+1}`).send({
            "employeeID": id,
            "startDate": "2024-07-05",
            "endDate": "2024-07-20",
            "duration": 11
        }).expect(404);
    })
    test("Delete Vacation",async () => {
        const res = await request(app).delete(`/vacations/${vacId}`).expect(200);
    });
    test("Delete undefined vacation",async () => {
        const res = await request(app).delete(`/vacations/${vacId+1}`).expect(404);
    });
    test("Delete Employee",async () => {
        const res = await request(app).delete(`/employees/${id}`).expect(200);
    });
})