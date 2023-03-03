import React, {useState} from 'react';

function AccountForm(props) {
  const [person, setPerson] = useState(
     {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
     }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password")
      setPerson(
         {firstname: person['firstname'], lastname: person['lastname'], email: person["email"], password: value}
      );
    else if (name === "email")
      setPerson(
         {firstname: person['firstname'], lastname: person['lastname'], email: value, password: person["password"]}
      );
    else if (name === "lastname")     
       setPerson(
         {firstname: person['firstname'], lastname: value, email: person["email"], password: person['password']}   
       );
    else
       setPerson(
         {firstname: value, lastname: person["lastname"], email: person["email"], password: person['password']}
       );
  }

  function submitForm() {
    console.log("Submit Form Person: "+person);
    props.handleSubmit(person);
    setPerson({firstname: '', lastname: '', email: '', password: ''});
   
  }

  return (
    <form>
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        value={person.firstname}
        onChange={handleChange} />
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        value={person.lastname}
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
