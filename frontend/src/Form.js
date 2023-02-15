import React, {useState} from 'react';

function Form(props) {
  const [person, setPerson] = useState(
     {
        username: "",
        password: "",
     }
  );

  function handleChange(event) {
    const { username, value } = event.target;
    if (username === "password")
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
      <label htmlFor="username">Userame</label>
      <input
        type="text"
        username="username"
        //_id="name"
        value={person.username}
        onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        username="password"
        //_id="job"
        value={person.password}
        onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
