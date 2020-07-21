import React from 'react';
import './App.css';
import '../SearchBar/SearchBar';
import SearchBar from '../SearchBar/SearchBar';
import '../SearchResults/SearchResults';
import SearchResults from '../SearchResults/SearchResults';
import '../PlayList/PlayList';
import PlayList from '../PlayList/PlayList';
import '../../util/Spotify';
import Spotify from '../../util/Spotify';

//What it doesn't do: clear playlist name after save
// search the first time you click search


class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    };

  }

  addTrack(track) {
    let newPlaylistTracks = Array.from(this.state.playlistTracks);
    if (this.state.playlistTracks
      .find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    newPlaylistTracks.push(track);
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  removeTrack(track) {
    var newPlaylistTracks =
      this.state.playlistTracks.filter(function (currentTrack) {
        return currentTrack.id !== track.id;
      });

    this.setState({ playlistTracks: newPlaylistTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });

  }

  savePlaylist() {
    let trackURIs = []
    this.state.playlistTracks.map(track => {
      return trackURIs.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistTracks: [],
      playlistName: 'New Playlist',
    });
  }

  search(term) {
    Spotify.search(term)
      .then(results => {
        this.setState({ searchResults: results });
      });
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar search={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default App;
