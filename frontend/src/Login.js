import React, {useState} from 'react';

function Login(props) {
    const [person, setPerson] = useState(
       {
          username: "",
          password: "",
       }
    );
  
    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "password")
        setPerson(
           {username: person['username'], password: value}
        );
      else     
         setPerson(
           {username: value, password: person['password']}   
         );
    }
  
    function submitForm() {
      console.log("Submit Form Person: "+person);
      props.handleSubmit(person);
      setPerson({username: '', password: ''});
     
    }
  
    return (
      <form>
        <label htmlFor="name">Userame</label>
        <input
          type="text"
          name="name"
          id="name"
          value={person.username}
          onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange} />
          <input type="button" value="Submit" onClick={submitForm} />
      </form>
    );
  }

  export default Login;