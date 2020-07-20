// const { default: SearchBar } = require("../Components/SearchBar/SearchBar");

let accessToken = '';
let expiresIn='';
var client_id = 'baf26983f8564dce9393d1eb5ad74749'; // Your client id
var client_secret = '715e4a907deb42cea3fa49b6b004fec7'; // Your secret
var redirect_uri = "http://localhost:3000/"; // Your redirect uri
let URL = '';
const Spotify = {
    getAccessToken() {
        accessToken='';
        if (accessToken !== '') {
            return accessToken;
            console.log('A');
        }

        URL = window.location.href;

        if (URL.match(/access_token=([^&]*)/) &&
        URL.match(/expires_in=([^&]*)/)) {
            accessToken = URL.match(/access_token=([^&]*)/)[1];
            expiresIn = URL.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log('B');
            return accessToken;
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
            console.log('C');
            return accessToken;
        }
    },

    search(term) {
        // accessToken=this.getAccessToken();
        return (fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`,
            { headers: { Authorization: `Bearer ${this.getAccessToken()}` } })
            .then(response => { return response.json(); })
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    console.log(jsonResponse);
                    console.log('D');
                    return (jsonResponse.tracks.items.map(track => {
                        return ({
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        })
                    }))
                }
            }
            )
        );

    },

    // savePlaylist(name, trackURIs){
    //     if(!name||!trackURIs){
    //     return;
    //     }
    //     let token=accessToken;
    //     let headers={
    //         Authorization: `Bearer ${this.getAccessToken()}`
    //     }
    //     let userId='';

    // }


}

export default Spotify;
