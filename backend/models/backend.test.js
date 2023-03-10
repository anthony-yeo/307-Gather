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
            const result = await userServices.getUsers({});
            expect(result).toEqual(expect.arrayContaining(result));
        });
    
        test('Get verified users -- success', async () => {
            const result = await userServices.getUsers({verified:true});
            expect(result).toEqual(expect.arrayContaining(result));
        })

        test('Get users by first name -- success', async () => {
            const result = await userServices.getUsers({firstName:'Jimbothy'});
            expect(result).toEqual(expect.arrayContaining(result));
        })

        test('Get users by last name -- success', async () => {
            const result = await userServices.getUsers({lastName:'Bimbothy'});
            expect(result).toEqual(expect.arrayContaining(result));
        });

        test('Get users by first and last name -- success', async () => {
            const result = await userServices.getUsers({firstName:'Jimbothy', lastName:'Bimbothy'});
            expect(result).toEqual(expect.arrayContaining(result));
        });

        test('Get users by Id -- success', async () => {
            const userId = '63f67dd6dba96ee863500a62';
            const result = await userServices.findUserById(userId);
            expect(result).toEqual(expect.objectContaining(result));
        });

        test('Get users by email -- success', async () => {
            const email = 'asi@calpoly.edu';
            const result = await userServices.findUserByEmail(email);
            expect(result).toEqual(expect.objectContaining(result));
        })

    
        test('Get all events -- success', async () => {
            const result = await eventServices.getEvents({});
            expect(result).toEqual(expect.arrayContaining(result));
        });
    });

    describe ('POST REQUESTS', () => {
        test('Add a user -- success', async () => {
            const newUser = {
                'firstName':'Jest',
                'lastName':'Test',
                'email':'Jest@Test.com',
                'password':'Test',
              }
            const result = await userServices.addUser(newUser);
            expect(result).toEqual(expect.objectContaining(newUser));
        });
        test('Add a user 2 -- success', async () => {
            const newUser = {
                'firstName':'Jest',
                'lastName':'Test',
                'email':'Jest@Test2.com',
                'password':'Test',
              }
            const result = await userServices.addUser(newUser);
            expect(result).toEqual(expect.objectContaining(newUser));
        });
        test('Add a user with duplicate email', async () => {
            const dupeUser = {
                'firstName':'Dupe',
                'lastName':'Dupe',
                'email':'asi@calpoly.edu',
                'password':'Test',
            }

            const result = await userServices.addUser(dupeUser);
            expect(result).toEqual(undefined);
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



    describe ('PATCH REQUESTS', () => {
        // test('Add a friend -- success', async () => {
        //     const addFriend = {
        //         'id':'Jest',
        //         'friendId':'Test'
        //     }
        //     const result = await userServices.addUser(addFriend);
        //     expect(result).toEqual(expect.objectContaining(result));
        // });
        test('Save an event -- success', async () => {
            id = '64090410492c25ebe1d1272d';
            eventId = '6406d57e413a180baa597984';

            const result = await userServices.saveEvent(id, eventId);
            expect(result).toEqual(expect.objectContaining(result));
        })
    });

    describe ('DELETE REQUESTS', () => {
        test('Delete a user -- success', async () => {
            const delUser = await userServices.findUserByEmail('Jest@Test.com');
            console.log(delUser[0]._id);
            const result = await userServices.delUser({userId:delUser[0]._id});
            expect(result).toEqual(expect.objectContaining(result));
        });
        test('Delete a user 2 -- success', async () => {
            const delUser = {'email':'Jest@Test2.com'};
            const result = await userServices.delUser(delUser);
            expect(result).toEqual(expect.objectContaining(result));

        });
        test('Delete an event -- success', async () => {
            const result = await eventServices.delEvents('313233343536373839306162');
            expect(result).toEqual(expect.objectContaining(result));
        })
    })



    afterAll(done => {
        mongoose.disconnect();
        done();
    });
});