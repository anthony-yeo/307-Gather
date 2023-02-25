import React, {useState} from 'react';

function AccountForm(props) {
  const [person, setPerson] = useState(
     {
        username: "",
        email: "",
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
    setPerson({username: '', email: '', password: ''});
   
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
      <label htmlFor="email">Email</label>
      <input
        type="text"
        username="email"
        id="email"
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
    </form>
  );
}

export default AccountForm;
