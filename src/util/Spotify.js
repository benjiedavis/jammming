// const { default: SearchBar } = require("../Components/SearchBar/SearchBar");

let accessToken = '';
let expiresIn = '';
var client_id = 'baf26983f8564dce9393d1eb5ad74749'; // Your client id
var redirect_uri = "http://localhost:3000/"; // Your redirect uri
if (process.env.NODE_ENV==='production'){
    redirect_uri = "https://benjiedavis.github.io/jammming/"
};
let URL = '';

const Spotify = {
    getAccessToken() {
        if (accessToken !== '') {
            console.log('A');
            return accessToken;
        }

        URL = window.location.href;
        console.log('HEREMATCH');
        console.log(URL.match(/access_token=([^&]*)/));
        if (URL.match(/access_token=([^&]*)/)) {
            accessToken = URL.match(/access_token=([^&]*)/)[1];
            expiresIn = URL.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log('B');
            return accessToken;
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
            console.log('C');
            URL = window.location.href;
            accessToken = URL.match(/access_token=([^&]*)/)[1];
            expiresIn = URL.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }


    },

    search(term) {
        accessToken = this.getAccessToken();
        return (fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => { return response.json(); })
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
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

    getUserId() {
        accessToken = this.getAccessToken();
        return (fetch(`https://api.spotify.com/v1/me`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            .then(response => {
                return (response.json());
            })
            .then(jsonResponse => {
                return jsonResponse.id;
            })
        );
    },

    getPlaylistId(name, userId) {
        accessToken = this.getAccessToken();
        console.log('name:');
        console.log(name);
        return (fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name
                    // "description": "New playlist description",
                    // "public": false
                })
            })
            .then(response => {
                console.log('playlist idjson:');
                console.log(response);
                return response.json();
            })
            .then(jsonResponse => {
                return jsonResponse.id
            })
        )
    },

    addTracks(playlistID, trackURIs) {
        accessToken = this.getAccessToken();

        return (fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({ uris: trackURIs }),
            })
        );
    },


    savePlaylist(name, trackURIs) {
        accessToken = this.getAccessToken();

        if (!name || !trackURIs) {
            console.log('oops!');
            return;
        }
        this.getUserId()
            .then(userId => {
                return this.getPlaylistId(name, userId);
            })
            .then(playlistID => {
                return this.addTracks(playlistID, trackURIs);
            });

        
    }

}

export default Spotify;
