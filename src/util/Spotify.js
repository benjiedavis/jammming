import React from 'react';
let accessToken='';
var client_id = 'baf26983f8564dce9393d1eb5ad74749'; // Your client id
var client_secret = '715e4a907deb42cea3fa49b6b004fec7'; // Your secret
var redirect_uri = "http://localhost:3000/"; // Your redirect uri

class Spotify extends React.Component {
    let URL='';
    getAccessToken(){
        if(accessToken!=''){
            return accessToken;
        }  

        URL=window.location.href;
        
        if(URL.match('/access_token=([^&]*)/')&&
        URL.match('/expires_in=([^&]*)/')){
            accessToken=URL.match('/access_token=([^&]*)/';
            const expiresIn=URL.match('/expires_in=([^&]*)/');
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else{
            window.location=`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}'
        }
    }
    
    render() {
        return (
            <div >
               
            </div>
        )
    }
}

export default Spotify;
