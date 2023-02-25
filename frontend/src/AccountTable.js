import React from 'react'

function AccountTableHeader()  {
    return (
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
    );
}

function AccountTableBody(props) {
    const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
      <td>{row.username}</td>
      <td>{row.email}</td>
      <td>{row.password}</td>
      <td>
        <button onClick={() => props.removeCharacter(index)}>Delete</button>
      </td>
    </tr>
    ) 
    }
    );
    return (
      <tbody>
        {rows}
       </tbody>
    );
}

function AccountTable (props) {
  return (
    <table>
      <AccountTableHeader />
      <AccountTableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
    </table>
  );
}
export default AccountTable;  
