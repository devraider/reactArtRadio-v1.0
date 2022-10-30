import { useEffect, useRef, useState } from "react";
import { closeIcon, homeIcon, nextIcon, playGreyIcon, prevIcon, userIcon, playBlackIcon, pauseGreyIcon} from "../../assets";
import AudioPlayer from "./AudioPlayer";
import "./style.css";

const FixFooter = (
  {
    trackIndex,
    audioList,
    searchedSong,
    setSearchedSong,
    onTrackSelect,
    setTrackIndex
  }
) => {
  const [slideUp, setSlideUp] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(trackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState('');
  const {
    track_name = "",
    radio_name = "",
    track_singer = "",
    
  } = currentTrackIndex !== -1 ? audioList[currentTrackIndex] : {};
  // # Instantiate audio
  // const audioSrc = trackIndex !== -1 && searchedSong.lentgh == 1 ? searchedSong.yt_song_mp4 : "";
  const {
    yt_song_mp4 = "",
    yt_song_artists = "",
    local_track_url = "",
    yt_song_thumbnail = "https://www.wjzd.com/wp-content/themes/Branding/loading.gif"
  } = searchedSong.letgth !== 0 ? searchedSong: {};

  const audioSrc  = "";
  const audioRef = useRef(new Audio(audioSrc));
  audioRef.autoplay = true;
  audioRef.current.controls =true;
  const inervalRef = useRef();

  const startTimer = () => {
    inervalRef.current = setInterval(() => {
      clearInterval(inervalRef.current)
      setTrackProgress(audioRef.current.currentTime);
    }, 1000);
  }
  const onChangeTrackProgress = (e) => {
    setTrackProgress(e.target.value);
    audioRef.current.currentTime = e.target.value;
  }

  const nextTrack = () => {
    if (currentTrackIndex < audioList.length - 1) {
      const nextTrackId = currentTrackIndex + 1;
      setCurrentTrackIndex(nextTrackId);
      setTrackProgress(0);
      onTrackSelect(nextTrackId)
    } else {
      setCurrentTrackIndex(0);
      onTrackSelect(0)
    }
    audioRef.current.pause();
  };

  const prevTrack = () => {
    if (currentTrackIndex) {
      const nextTrackId = currentTrackIndex - 1;
      setCurrentTrackIndex(nextTrackId);
      setTrackProgress(0);
      onTrackSelect(nextTrackId)
    } else {
      const nextTrackId = audioList.length - 1;
      setCurrentTrackIndex(nextTrackId);
      setTrackProgress(0);
      onTrackSelect(nextTrackId)
    }
    audioRef.current.pause();
  };

  useEffect(() => {
    if (audioRef.current.ended) {
      nextTrack();
    }
  }, [audioRef.current.ended])

  useEffect(()=> {
    audioRef.current.pause();
    audioRef.current = searchedSong && new Audio(yt_song_mp4);
    audioRef.current.play();
    setIsPlaying(true);
    startTimer();
  }, [trackIndex, onTrackSelect, searchedSong])

  useEffect(()=> {
    if(isPlaying){
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(inervalRef.current)
    }
  }, [isPlaying])

  // console.log({currentTrackIndex, track_singer})
  return (
    <div className={`fix-footer ${slideUp ? "active" : ""}`}>
      <div onClick={() => setSlideUp(!slideUp)} className="slide-up-btn"></div>
      <div className="d-visibility"></div>

    {
        slideUp && <AudioPlayer 
        yt_song_thumbnail={yt_song_thumbnail}
        track_singer={track_singer}
        track_name={track_name}
        duration={audioRef.current.duration}
        trackProgress={trackProgress}
        onChangeTrackProgress={onChangeTrackProgress}
        onPlayPause = {()=> setIsPlaying(!isPlaying)}
        isPlaying={isPlaying}
        nextTrack = {nextTrack}
        prevTrack ={prevTrack}
        />
    }


      {!slideUp && (
        <>
          {trackIndex !== -1 && (
                      <div className="mini-player flex justify-sb align-center mtb-10">
                      <div className="flex align-center">
                        <div className="artist-cover-img">
                          <img src={yt_song_thumbnail} />
                        </div>
                        <div className="mini-player-info mlr-10">
                          <p>{track_name}</p>
                          <p>{track_singer}</p>
                        </div>
                      </div>
                      <div className="mini-player-control flex">
                        <button onClick={() => setIsPlaying(!isPlaying) }>
                          {isPlaying ? <img src={pauseGreyIcon} /> : <img src={playGreyIcon} /> }
                        </button>
                        <button>
                          <img src={closeIcon} />
                        </button>
                      </div>
                    </div>
          )}


          {/* Navigation menu */}
          <div className="navigation-menu flex justify-evenly">
            <a>
              <div>
                <img src={homeIcon} />
              </div>
              <div>
                <span>Home</span>
              </div>
            </a>
            <a>
              <div>
                <img src={userIcon} />
              </div>
              <div>
                <span>Home</span>
              </div>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default FixFooter;
