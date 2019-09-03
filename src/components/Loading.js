
import React from 'react';
import '../App.css';
import '../Table.css';
import { FaCompactDisc } from 'react-icons/fa';
const Loading = () => {  
    return (
<div className="loading">
  <FaCompactDisc faStyle="spinner"  animate="spin"size={80}/>
</div>

    );
  }


export default Loading;