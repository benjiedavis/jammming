import React from 'react';
import './TrackList.css';
import '../Track/Track';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        let tracksArray = Array.from(this.props.tracks);
        return (
            <div className="TrackList">
                {tracksArray.map
                ((track) => {
                    return (<Track
                        key={track.id}
                        track={track}
                        isRemoval={this.props.isRemoval}
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                    />);
                }
                )
                }
            </div>
        );
    }
}

export default TrackList;
