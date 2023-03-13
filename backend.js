const express = require('express');    
const cors = require('cors');

const userServices = require('./models/userServices');
const eventServices = require('./models/eventServices');

const app = express();                  
const port = 5000;          


app.use(cors());
app.use(express.json());               

app.get('/', (req, res) => {            
    res.send("Hello World.")
});

//USERS--------------------------------------------------------------
//GET USERS
app.get("/users", async (req, res) => {
    try {
        const result = await userServices.getUsers(req.query);

        if (result === undefined){
            res.send("No users found").status(204);
        }
        else{
            res.status(200).send({users_list: result});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/users/:id', async (req, res) => {
    try{
        result = await userServices.findUserById(req.params['id']);

        if (result === undefined)
            res.status(406).send('User not found');
        else
            res.status(200).send(result);
    } catch (error){
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
})

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
app.patch('/users/:id', async (req, res) => {
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
        console.log(req.body);
        const result = await userServices.validateUser(req.body);
        const compare = await userServices.findUserByEmail('email@email.com');

        if (result===false)
            res.status(401).end();
        else    
            res.status(200).send('Successful login');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occured in the server');
    }
});

//DELETE A USER
app.delete('/users', async (req, res) => {
    const userToDel = await userServices.delUser(req.body);
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
            res.status(409).send('Users are already friends');
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

        // //Types of filtering
        // const event_id = req.query.event_id;
        // const host_id = req.query.host_id;
        // const name = req.query.name;
        // const startDate = req.query.startDate;
        // const endDate = req.query.endDate;
        // const time = req.query.time;
        // const cat = req.query.cat;

        // console.log(req.query);

        //Testing eventServices.getEvents({cat:"Atheletics"});
        const result = await eventServices.getEvents(req.query);
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


app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
  });
