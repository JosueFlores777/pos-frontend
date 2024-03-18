// js
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

const PreviewVideo = (props) => {
    
    const [state, setState] = useState({
        videoId: "",
    });
    const opts = {

        height: '190',
        width: '330',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
        
        },
      };

      const _onReady = (event)=>  {

        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

      useEffect(() => {


        setState({ ...state,  videoId: props.videoId });

    }, [])
    return (
        <div>
           
            <YouTube videoId={state.videoId} opts={opts} onReady={_onReady} />
        </div>
    );
}
PreviewVideo.propTypes = {
    videoId: PropTypes.string,
}
export default PreviewVideo;
