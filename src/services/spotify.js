import axios from 'axios'
const baseURL = 'http://localhost:3001/api/spotify'
const a = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": baseURL
    }
})
const getMe = async () => {

    const response = await a.get("getUser")
    return response;
}
const getArtistWithAlbums = async () => {
    const response = await a.get("getFollowedArtistData")
    return response;
}
const saveAlbumsToUser = async (albums) => {
    console.log(albums)

    const response = await a.post("saveAlbumsToUser", { albums: albums }) // TESTI
    console.log(response)
    return response;
}


const ensureAuthenticated = async () => {
    const response = await a.get("ensureAuthenticated")
    console.log(response)
    return response;
}

export default { getMe, ensureAuthenticated, getArtistWithAlbums, saveAlbumsToUser } 