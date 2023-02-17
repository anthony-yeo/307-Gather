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

app.get("/users", async (req, res) => {
    try {
        const result = await userServices.getUsers();
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });



 


// app.get('/users', (req, res) => {
//     const name = req.query.name;
//     const job = req.query.job

//     if (name != undefined && job != undefined){
//         //console.log('here')
//         let result = findUserbyJobName(name, job);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else if (name != undefined){
//         let result = findUserByName(name);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else if (job != undefined){
//         let result = findUserByJob(job);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else{
//         res.send(users);
//     }
// });

// const findUserByName = (name) =>{
//     return users['users_list'].filter( (user) => user['name'] === name);
// }

// const findUserByJob = (job) =>{
//     return users['users_list'].filter( (user) => user['job'] === job);
// }

// const findUserbyJobName = (name, job) => {
//     return users['users_list'].filter( (user) => user['name'] === name && user['job'] == job);
// }

// app.get('/users/:id', (req, res) => {
//     const id = req.params['id'];
//     let result = findUserById(id);
//     if (result === undefined || result.length ==  0)
//         res.status(404).send('Resource not found');
//     else{
//         result = {users_list: result};
//         res.send(result);
//     }
// });

// function findUserById(id){
//     return users['users_list'].find((user) => user['id'] === id);
//     //Find returns the first occurence that matches the conditions
// }

// app.post('/users', (req, res) => {
//     req.body.id = makeId(6)
//     const userToAdd = req.body;
//     //console.log(req.body.id)
//     addUser(userToAdd);
//     res.status(201).send(userToAdd).end();
// });

// function addUser(user){
//     //console.log(user.id)
//     users['users_list'].push(user);
// }

// function makeId(length){
//     let result = '';
//     let characters = 'abcdefghijklmnopqrstuvzwyz0123456789';
//     let charactersLength = characters.length;
//     for (let i = 0; i < length; i++){
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// app.delete('/users/:id', (req, res) => {
//     const id = req.params['id'];
//     delUser(id)
//     res.status(204).end();
// });

// function delUser(id){
//     let x = FindUserByIdDelete(id);
//     users['users_list'].splice(x, 1);
// }

// function FindUserByIdDelete(id){
//     return users['users_list'].findIndex((user) => user['id'] === id);
// }


// app.listen(port, () => {                //Listen to incoming requests on our defined port
//     console.log(`Example app listening at http://localhost:${port}'`);
// });



