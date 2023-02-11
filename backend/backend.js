const express = require('express');     //Import Express Module
const { default: mongoose } = require('mongoose');
const app = express();                  //Create Instance of Express
const port = 5000;                      //Define Port Number
const cors = require('cors');

require('dotenv').config();

//-----------------HASH PASSWORD USING BCRYPT 12 ROUNDS----------------------------------

const conn_str = 'mongodb+srv://ProjectGather:' + process.env.DB_PASSWORD + '@project-gather.iidopil.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(
    conn_str,
    { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },(err) => {
    if (err) {
    console.log("error in connection");
    } else {
    console.log("mongodb is connected");
}});

app.use(cors());
app.use(express.json());                //Process Data as JSON format

app.get('/', (req, res) => {            //API Endpoint
    res.send('Hello World!');
});

app.listen(port, () => {                //Listen to incoming requests on our defined port
    console.log(`Gather app listening at http://localhost:${port}'`);
});




//export DEBUG='express:router'
// const users = { 
//     users_list :
//     [
//        { 
//           id : 'xyz789',
//           name : 'Charlie',
//           job: 'Janitor',
//        },
//        {
//           id : 'abc123', 
//           name: 'Mac',
//           job: 'Bouncer',
//        },
//        {
//           id : 'ppp222', 
//           name: 'Mac',
//           job: 'Professor',
//        }, 
//        {
//           id: 'yat999', 
//           name: 'Dee',
//           job: 'Aspring actress',
//        },
//        {
//           id: 'zap555', 
//           name: 'Dennis',
//           job: 'Bartender',
//        }
//     ]
//  }
 


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



