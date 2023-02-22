const express = require('express');    
const cors = require('cors');

const userServices = require('./models/user-services');
const eventServices = require('./models/events-services');

const app = express();                  
const port = 5000;                      

//-----------------HASH PASSWORD USING BCRYPT 12 ROUNDS----------------------------------

app.use(cors());
app.use(express.json());               

app.get('/', (req, res) => {            
    res.send("Hello World.")
});

//USERS--------------------------------------------------------------
//NOTES
//ADDFRIENDS IN MONGOSH WITH DB.USERS.UPDATEONE({QUERY}{$PUSH:{NEW DATA}})
app.get("/users", async (req, res) => {

    try {
        const result = await userServices.getUsers(req.first_);
        res.send({users_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else    
        res.status(500).end();
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const userToDel = await userServices.delUser(id);
    if (userToDel)
        res.status(202).send(userToDel)
    else
        res.status(500).send(userToDel)
});

app.patch('/users', async (req, res) => {
    const user_id = req.body._id;
    const friend_id = req.body.friend_id;
    const friend = await userServices.addFriend(user_id, friend_id);
    if(friend)
        res.status(200).send(friend)
    else
        res.status(400).send(friend)
})


//EVENTS-------------------------------------------------------------
app.get("/events", async (req, res) => {
    try {
        const result = await eventServices.getEvents();
        res.send({event_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.post('/events', async (req, res) => {
    const user = req.body;
    const savedEvent = await eventServices.addEvents(user);
    if (savedEvent)
        res.status(201).send(savedEvent);
    else
        res.status(500).end();
});

app.delete('/events/:id', async (req, res) => {
    const id = req.params['id'];
    const eventToDel = await eventServices.delEvents(id);
    if (eventToDel)
        res.status(202).send(eventToDel)
    else
        res.status(500).send(eventToDel)
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });





