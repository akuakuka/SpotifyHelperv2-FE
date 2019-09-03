import React from 'react';
import '../App.css';
import { DiGithubBadge } from "react-icons/di";
const handleIconClick = () =>{
    window.open("https://github.com/akuakuka/SpotifyHelperv2-BE")
    
} 
const Footer = () => {  
    return (
        <div className="footer">
        <DiGithubBadge size={32}onClick={() => handleIconClick()} /> 
    </div>

    );
  }


export default Footer;