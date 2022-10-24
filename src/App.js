import { useEffect, useState } from 'react';
import './App.css';
import AudioList from './components/AudioList';
import FixFooter from './components/FixFooter';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import Tabs from './components/Tabs/index';
import {baseUrl} from './config';
import axios from 'axios';

function App() {
  const [list, setList] = useState(false);
  const [appData, setAppData] = useState({});
  const [audioList, setAudioList] = useState({});
  const [trackIndex, setTrackIndex] = useState(-1);
  const [searchedSong, setSearchedSong] = useState(-1);


  const onBackButtonPress = () => {
    setList(false);
  }
  const onItemSelect = (tab, key) => {
    setList(true)
  }

  const handleFetchData = async (index) => {
    console.log({"INTRARE INDEX": index})
    const response = await fetch(`${baseUrl}/spider/yt_search?query=${audioList[index].radio_name}`);
    const data = await response.json();
    setSearchedSong(data[0]);
    console.log(data[0]);
}


  const onTrackSelect = async (index) => {
    setTrackIndex(index);
    if (index !== -1) {
    await handleFetchData(index);
  }
    // const ytSearch = await fetch(`${baseUrl}/spider/yt_search?query=${audioList[index].radio_name}`)
    //   .then(res => res.json())
    //   // .then(ytSearch => setSearchedSong(ytSearch));
    // setSearchedSong(ytSearch)
  }
  useEffect(() =>  {
    fetch(`${baseUrl}/api/v1/homeScreen`)
    .then(res => res.json())
    .then(jsonResp => {
      console.log({jsonResp});
      setAppData(jsonResp);
    })
    
    .catch(error => {
      console.log( {error});
    })
  }, []);


  useEffect(() =>  {
    fetch(`${baseUrl}/api/v1/getTracks`)
    .then(res => res.json())
    .then(audioJson => {
      console.log({audioJson});
      setAudioList(audioJson)
    })
    
    .catch(error => {
      console.log( {error});
    })
  }, []);

  return (
    <div className="App m-20">
      <Header />
      <h2 className='mtb-20 app-quote'> Listen music from Radio without ads...</h2>
      <SearchInput />
      <Tabs onItemSelect={onItemSelect} tabData={appData} />
      {list && <AudioList audioList={audioList} onTrackSelect={onTrackSelect} setTrackIndex={setTrackIndex} onBackButtonPress={onBackButtonPress} />}
      <FixFooter trackIndex={trackIndex}
       audioList={audioList}
        searchedSong={searchedSong}
        setSearchedSong={setSearchedSong}
        />
    </div>
  );
}

export default App;
