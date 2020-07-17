import React from 'react';
import './App.css';
import '../SearchBar/SearchBar';
import SearchBar from '../SearchBar/SearchBar';
import '../SearchResults/SearchResults';
import SearchResults from '../SearchResults/SearchResults';
import '../PlayList/PlayList';
import PlayList from '../PlayList/PlayList';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {
      searchResults: [
        { name: 'Search 1', artist: 'marley', album: 'wailers', id: 123 },
        { name: 'Search 2', artist: 'beetles', album: 'white album', id: 456 }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        { name: 'List Song 1', artist: 'marley', album: 'wailers', id: 789 },
        { name: 'List Song 2', artist: 'beetles', album: 'white album', id: 245 }
      ]
    };

  }

  addTrack(track) {
    let newPlaylistTracks=Array.from(this.state.playlistTracks);
    if (this.state.playlistTracks
      .find(savedTrack => savedTrack.id === track.id)) 
      {
      return;
    }
    
    newPlaylistTracks.push(track);
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  removeTrack(track){
    var newPlaylistTracks =
      this.state.playlistTracks.filter(function (currentTrack) {
        return currentTrack.id != track.id;
      });

    this.setState({ playlistTracks: newPlaylistTracks });
  }




  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <PlayList
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} 
              />
          </div>
        </div>
      </div>
    );
  }
}


export default App;
