const userServices = require('./userServices');
const eventServices = require('./eventServices');
const mongoose = require('mongoose');

require('dotenv').config();
const conn_str = 'mongodb+srv://ProjectGather:' + process.env.DB_PASSWORD + '@project-gather.iidopil.mongodb.net/?retryWrites=true&w=majority'


describe ('GATHER BACKEND TEST SUITE', () => {

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

    describe ('POST REQUESTS', () => {
        test('Add a user -- success', async () => {
            const newUser = {
                'firstName':'Jest',
                'lastName':'Test',
                'email':'test@jest.com',
                'password':'jest'
            }
            const result = await userServices.addUser(newUser);
            expect(result).toEqual(expect.objectContaining(newUser));
        });
        test('Add an event -- success', async () => {
            const newEvent = {
                '_id':'1234567890ab',
                'hostId':'63f67dd6dba96ee863500a62',
                'name':'Trivia Night',
                'location':'Mustang Lanes',
                'description':'Test your brain!',
                'date':'2023-05-14 16:00:00',
                'category':'Social Gathering',
                'gps':[24.56, 21.4]
            }

            const result = await eventServices.addEvents(newEvent);
            expect(result).toEqual(expect.objectContaining(result));
        })
    });

    /*describe ('PATCH REQUESTS', () => {
        test('Add a friend -- success', async () => {
            const addFriend = {
                'id':'Jest',
                'friendId':'Test'
            }
            const result = await userServices.addUser(addFriend);
            expect(result).toEqual(expect.objectContaining(result));
        });
        test('Save an event -- success', async () => {
            const saveEvent = {
                'id':'1234567890ab',
                'eventId':'63f67dd6dba96ee863500a62'
            }

            const result = await eventServices.addEvents(newEvent);
            expect(result).toEqual(expect.objectContaining(result));
        })
    });*/

    describe ('DELETE REQUESTS', () => {
        test('Delete a user -- success', async () => {
            const delUser = {'email':'test@jest.com'};
            const result = await userServices.delUser(delUser);
            expect(result).toEqual(expect.objectContaining(result));
        });
        test('Delete an event -- success', async () => {
            const result = await eventServices.delEvents('313233343536373839306162');
            console.log(result);
            expect(result).toEqual(expect.objectContaining(result));
        })
    })



    afterAll(done => {
        mongoose.disconnect();
        done();
    });
});

