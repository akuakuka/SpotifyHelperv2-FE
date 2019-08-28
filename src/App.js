import React, { useState, useEffect } from "react";
import spotifyService from "./services/spotify";
import Band from "./components/Band"
import Loading from "./components/Loading"
import './Table.css';
import _  from "lodash/array"
const App = () => {
  const [user, setUser] = useState({});
  const [artists, setArtists] = useState([]);
  const [loggedIn, toggleLoggedIn] = useState(false);
  const [loading, toggleLoading] = useState(true);
  const [filterString, setFilterString] = useState('');
  const [checked, setChecked] = useState([]);
  useEffect(() => {

    const init = async () => {
      const auth = await spotifyService.ensureAuthenticated();
      if (auth.statusText === "OK") {
        toggleLoggedIn(true);
        const user = await spotifyService.getMe();
        toggleLoading(true);
        const artistWithAlbums = await spotifyService.getArtistWithAlbums();
        console.log(artistWithAlbums.data)
        setArtists(artistWithAlbums.data);
   
        toggleLoading(false);
        setUser(user.data.body);
      } else {
        toggleLoggedIn(false);
      }
    };
    init();

  }, []);


  const handleFilterStringChange = (text) => {
    setFilterString(text)
  }
  const handleLoginButton = () => {
    window.location = "http://sptfy.xyz/auth/spotify"
  }
  const handleSaveButton = async () => {
    
    
    const rsp = await spotifyService.saveAlbumsToUser(checked)
    console.log(rsp)
  }
 const bands = () => artists.filter(kk => kk.name.toUpperCase()
 .includes(filterString.toUpperCase())).map(band =>
   <Band
     key={band.id}
     band={band}
     check={handleCheckBox}
   />
  )
 
  const handleCheckBox = async (band) => {
    let inx = _.indexOf(checked, band);
    if ( inx >= 0) {
      let array = checked;
      _.remove(array, function(n) {
        return band.id === n.id;
      });
      setChecked(array)
    } else {
      let nw = checked;
      nw.push(band)
      setChecked(nw)
    }
   
 
  }



  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <p>Logged in as {user.id}</p>
          <div>
            {loading ? <div> <Loading/> </div> : 
            <div>
            <div className="filter">     

          <input 
          defaultValue='Filter Artists' 
          type="text"
          placeholder="Filter Artists"
          onKeyUp={event => 
          handleFilterStringChange(event.target.value)}
          />
          </div>
          <div className="buttoncontainer">
          <button onClick={handleSaveButton}>
  Save checked albums
</button>
            </div>
        
            <div className="container">
              <table>
                <thead>
                  <tr>
                    <th>Artist Name</th>

                  </tr>
                </thead>
                <tbody>
                  {bands()}
                </tbody>
              </table>
              <div className="footer">
              https://github.com/akuakuka/SpotifyHelperv2-BE
                </div>
            </div>
          </div>}
          </div>
        </div>
      ) : (
          <div>
            <p>NOT LOGGED IN</p>
            <button onClick={handleLoginButton}>
  Log in with Spotify
</button>
          </div>
        )}
    </div>
  );
};

export default App;
