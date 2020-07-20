import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = {
            term: ''
        }
    }
    
    handleSearch(e){
        this.props.search(this.state.term);
        e.preventDefault();

    }
    
    handleTermChange(e){
        this.setState({term:e.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange} />
                <button onClick={this.handleSearch} className="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;
