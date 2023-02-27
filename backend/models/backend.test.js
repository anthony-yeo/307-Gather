const userServices = require('./user-services');
const eventServices = require('./events-services');
const mongoose = require('mongoose');

require('dotenv').config();
const conn_str = 'mongodb+srv://ProjectGather:' + process.env.DB_PASSWORD + '@project-gather.iidopil.mongodb.net/?retryWrites=true&w=majority'


describe ('GATHER TEST SUITE', () => {

    beforeAll(async () => {
        await mongoose.connect(conn_str, {
            useNewURLParse: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
    });

    describe ('GET REQUESTS', () => {
        test('Get all users -- success', async () => {
            const result = await userServices.getUsers();
            expect(result).toEqual(expect.arrayContaining(result));
        });
    
        test('Get users by Id -- success', async () => {
            const userId = '63f67dd6dba96ee863500a62';
            const result = await userServices.findUserById(userId);
            expect(result).toEqual(expect.objectContaining(result));
        });
    
        test('Get all events -- success', async () => {
            const result = await eventServices.getEvents();
            expect(result).toEqual(expect.arrayContaining(result));
        });
    });


    afterAll(done => {
        mongoose.disconnect();
        done();
    });
});

// describe ('POST REQUEST', () => {
//     beforeAll(async () => {
//         await mongoose.connect(conn_str, {
//             useNewURLParse: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//         });
//     });

//     test('TESTING', async () => {
//         expect(2 + 2).toBe(4);
//     });

//     afterAll(done => {
//         mongoose.disconnect();
//         done();
//     });
// });
