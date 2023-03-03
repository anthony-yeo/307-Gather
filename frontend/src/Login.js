import React, {useState} from 'react';

function Login(props) {
    const [person, setPerson] = useState(
       {
          email: "",
          password: "",
       }
    );

    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "password")
        setPerson(
           {email: person['email'], password: value}
        );
      else     
         setPerson(
           {email: value, password: person['password']}   
         );
    }

    function submitForm() {
      console.log("Submit Form Person: "+person);
      props.handleSubmit(person);
      setPerson({email: '', password: ''});

    }

    return (
      <form>
        <label htmlFor="name">Email</label>
        <input
          type="text"
          name="name"
          id="name"
          value={person.email}
          onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange} />
          <input type="button" value="Submit" onClick={submitForm} />
          <li>
            <a href="/createaccount">Create Account</a>
          </li>  
      </form>
      //Add link Need an account
    );
  }

  export default Login;