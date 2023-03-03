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
    const { name, value } = event.target;
    if (name === "password")
      setPerson(
         {username: person['username'], email: person["email"], password: value}
      );
    else if (name === "email")
      setPerson(
         {username: person['username'], email: value, password: person["password"]}
      );
    else     
       setPerson(
         {username: value, email: person["email"], password: person['password']}   
       );
  }

  function submitForm() {
    console.log("Submit Form Person: "+person);
    props.handleSubmit(person);
    setPerson({username: '', email: '', password: ''});
   
  }

  return (
    <form>
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.username}
        onChange={handleChange} />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
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
