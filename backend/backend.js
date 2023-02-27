const express = require('express');    
const cors = require('cors');

const userServices = require('./models/user-services');
const eventServices = require('./models/events-services');

const app = express();                  
const port = 5000;          

//-----------------HASH PASSWORD USING BCRYPT 10 ROUNDS----------------------------------

app.use(cors());
app.use(express.json());               

app.get('/', (req, res) => {            
    res.send("Hello World.")
});

//USERS--------------------------------------------------------------
//GET USERS
app.get("/users", async (req, res) => {
    try {
        const result = await userServices.getUsers();
        if (result===undefined)
            res.status(406).send('User not found.');
        else{
            res.status(200).send({users_list: result});
        }         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

//ADD A USER
app.post('/users', async (req, res) => {
    try{
        const user = req.body;
        const result = await userServices.addUser(user);

        if (result === undefined){
            res.status(442).send('Unprocessable Entity');
        }
        else{
            res.status(201).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured in the server');
    }
});

//SAVE AN EVENT
app.post('/users/:id', async (req, res) => {
    try{
        eventId = req.body['eventId'];
        hostId = req.params['id'];

        const result = await userServices.saveEvent(hostId, eventId);
        if (result === undefined || result === false){
            res.status(442).send('Unprocessable Entity');
        }
        else{
            res.status(201).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured in the server');
    }
});

//LOGIN AUTHENTICATION
app.post('/login', async (req, res) => {
    try{
        const result = await userServices.validateUser(req.body);
        if (result===true)
            res.status(200).send('Successful login');
        else    
            res.status(401).end();
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured in the server');
    }
});

//DELETE A USER
app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const userToDel = await userServices.delUser(id);
    if (userToDel)
        res.status(202).send(userToDel)
    else
        res.status(500).send(userToDel)
});


//ADD A FRIEND
app.patch('/users/:id', async (req, res) => {
    try{
        const userId = req.params['id'];
        const friendId = req.body.friendId;

        const result = await userServices.addFriend(userId, friendId);
        if (result === true){
            res.status(200).send('Friend Successfully Added');
        }
        else if (result === false){
            res.status(300).send('Users are already friends');
        }
        else{
            res.status(442).send('Unprocessable Entity');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured in the server');
    }
});

//EVENTS-------------------------------------------------------------

//GET EVENTS
app.get("/events", async (req, res) => {
    try {
        const result = await eventServices.getEvents();
        if(result===undefined) {
            res.status(406).send('Event not found.');
        } else {
            res.send({event_list: result});  
        }       
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

//ADD AN EVENT
app.post('/events', async (req, res) => {
    const event = req.body;
    try {
        const savedEvent = await eventServices.addEvents(event);
        if (savedEvent)
            res.status(201).send(savedEvent);
        else
            res.status(442).send('Unprocessable Entity');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');   
    }
});

//DELETE AN EVENT
app.delete('/events/:id', async (req, res) => {
    const id = req.params['id'];
    try {
        const eventToDel = await eventServices.delEvents(id);
        if (eventToDel===true)
            res.status(204).send(eventToDel);
        else
            res.status(406).send('Event not found.');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');  
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });





