import React from 'react';
import '../App.css';
import '../Table.css';

const Artist = (props) => {
  const band = props.band;
  
    return (
     
      <tr>
      <td>{band.name} <input type="checkbox" 
      onChange={() => props.check(band)}/> </td> 

    </tr>


    );
  }


export default Artist;