const userServices = require('./userServices');
const eventServices = require('./eventServices');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

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

        test('Get users by last name -- success', async () => {
            const result = await userServices.getUsers({lastName:'asjdfio'});
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

        test('Get event by id -- success', async () => {
            const event_id = '63f93d5929eeae20467349be';
            const result = await eventServices.getEvents({event_id:event_id});
            expect(result).toEqual(expect.objectContaining(result));
        });

        test('Get events by only dates -- success', async () => {
            const startDate = '2023-02-28';
            const endDate = '2023-03-28';
            const result = await eventServices.getEvents({startDate:startDate, endDate:endDate});
            expect(result).toEqual(expect.arrayContaining(result));
        });

        test('Get events by name and date -- success', async () => {
            const startDate = '2023-01-01';
            const endDate = '2024-01-01';
            const name = 'Club';
            const result = await eventServices.getEvents({name:name, startDate:startDate, endDate:endDate});
            expect(result).toEqual(expect.arrayContaining(result));
        });

        test('Get events by cat and date -- success', async () => {
            const startDate = '2023-01-01';
            const endDate = '2024-01-01';
            const cat = 'Social Gathering';
            const result = await eventServices.getEvents({cat:cat, startDate:startDate, endDate:endDate});
            expect(result).toEqual(expect.arrayContaining(result));
        });

        test('Get events by location and date -- success', async () => {
            const startDate = '2023-01-01';
            const endDate = '2024-01-01';
            const location = 'Dexter';
            const result = await eventServices.getEvents({location:location, startDate:startDate, endDate:endDate});
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
                'verified':true,
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

        test('Login -- success', async () => {
            const body = {
                'email':'email@email.com',
                'password':'password',
            }
            const user = await userServices.findUserByEmail('email@email.com');
            const result = await userServices.validateUser(body);
            expect(result).toEqual(expect.objectContaining(user));
        });

        test('Login -- failure', async () => {
            const result = await userServices.validateUser({});
            expect(result).toEqual(false);
        });

        test('Login 2 -- failure', async () => {
            const body = {
                'email':'email@email.com',
                'password':'pass',
            }
            const result = await userServices.validateUser(body);
            expect(result).toEqual(false);
        });

        test('Login 2 -- failure', async () => {
            const body = {
                'email':'not@email.com',
                'password':'pass',
            }
            const result = await userServices.validateUser(body);
            expect(result).toEqual(false);
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
        });

        test('Add an event 2 -- success', async () => {
            const newEvent = {
                '_id':'1234567890ad',
                'hostId':'64090410492c25ebe1d1272d',
                'name':'CS Career Fair',
                'location':'Recreational Center',
                'description':'Find a job',
                'date':'2023-05-14 16:00:00',
                'category':'Academics',
                'gps':[24.56, 21.4],
            }

            const result = await eventServices.addEvents(newEvent);
            expect(result).toEqual(expect.objectContaining(result));
        });
    });



    describe ('PATCH REQUESTS', () => {
        test('Add a friend -- success', async () => {
            const user1 = await userServices.findUserByEmail('Jest@Test.com');
            const user2 = await userServices.findUserByEmail('Jest@Test2.com');

            const result = await userServices.addFriend(user1._id, user2._id);
            expect(result).toEqual(true);
        });
        test('Add a friend -- failure', async () => {
            const result = await userServices.addFriend();
            expect(result).toEqual(undefined);
        });
        test('Add a friend 2 -- failure', async () => {
            const result = await userServices.addFriend(new ObjectId(123), new ObjectId(456));
            expect(result).toEqual(undefined);
        });
        test('Add a friend 3 -- failure', async () => {
            const user1 = '63f001fb183b13b5d1a311ff';
            const user2 = '63eff8e5a3388bdeae167216';

            const result = await userServices.addFriend(user1, user2);
            expect(result).toEqual(false);
        });
        test('Save an event -- success', async () => {
            id = '64090410492c25ebe1d1272d';
            eventId = '6406d57e413a180baa597984';

            const result = await userServices.saveEvent(id, eventId);
            expect(result).toEqual(expect.objectContaining(result));
        })
        test('Save a `non-existent` event -- failure', async () => {
            id = '64090410492c25ebe1d1272d';
            eventId = '63f93d5929eeae20467349be';

            const result = await userServices.saveEvent(id, eventId);
            expect(result).toEqual(false);
        })
    });

    describe ('DELETE REQUESTS', () => {
        test('Delete a user -- success', async () => {
            const delUser = await userServices.findUserByEmail('Jest@Test.com');
            const result = await userServices.delUser({userId:delUser._id});
            expect(result).toEqual(expect.objectContaining(result));
        });
        test('Delete a user 2 -- success', async () => {
            const delUser = {'email':'Jest@Test2.com'};
            const result = await userServices.delUser(delUser);
            expect(result).toEqual(expect.objectContaining(result));

        });
        test('Delete a user 3 -- success', async () => {
            const result = await userServices.delUser({});
            expect(result).toEqual(false);
        });
        test('Delete an event -- success', async () => {
            const result = await eventServices.delEvents('313233343536373839306162');
            expect(result).toEqual(expect.objectContaining(result));
        })
        test('Delete an event 2 -- success', async () => {
            const result = await eventServices.delEvents('313233343536373839306164');
            expect(result).toEqual(expect.objectContaining(result));
        })

        test('Delete an event -- failure', async () => {
            const result = await eventServices.delEvents('313233343536373839306163');
            expect(result).toEqual(false);
        })

        
    })



    afterAll(done => {
        mongoose.disconnect();
        done();
    });
});