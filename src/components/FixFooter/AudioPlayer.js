import { closeIcon, homeIcon, nextIcon, playGreyIcon, prevIcon, userIcon, playBlackIcon, pauseBlackIcon} from "../../assets";
import "./style.css";

const AudioPlayer = (
    {
        track_name,
        track_singer,
        yt_song_thumbnail,
        duration,
        trackProgress,
        onChangeTrackProgress,
        onPlayPause,
        isPlaying,
        nextTrack,
        prevTrack
    }
) => {

    const currentProgress = (trackProgress / duration) * 100;
    const trackProgressStyleing  = `linear-gradient(to right, #ffffff ${currentProgress}%, grey ${currentProgress}%)`
    
  return (
    <div className="audio-player-lg">
      <div className="audio-cover-lg-img">
        <img src={yt_song_thumbnail} />
      </div>
      <div>
        <h2>{track_name}</h2>
        <h3>{track_singer}</h3>
      </div>
      <div className="audio-player-progress">
        <input type="range" min={"0"} max={duration}
         value={trackProgress}
         onChange={onChangeTrackProgress}
         style={{background: trackProgressStyleing}}
          />
      </div>
      <div className="audio-controls flex justify-sb">
        <button onClick={prevTrack} >
          <img src={prevIcon}/>
        </button>
        <div className="play-pause-btn">
          <button onClick={onPlayPause}>
            {isPlaying ? <img src={playBlackIcon} /> : <img src={pauseBlackIcon} />}
          </button>
        </div>
        <button onClick={nextTrack}>
          <img src={nextIcon} />
        </button>
      </div>
    </div>
  );
};
export default AudioPlayer;
