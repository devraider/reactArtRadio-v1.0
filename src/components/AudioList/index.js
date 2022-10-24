import './style.css'
import {backIcon} from '../../assets';

const AudioList = ({
    onBackButtonPress,
    audioList,
    onTrackSelected
}) => {
    return (
        <div className='audio-ls m-20'>
            <div className='audio-ls-header'>
                <img src={backIcon} onClick={onBackButtonPress} />
            </div>

            <ul>
                {
                    audioList.length ? audioList.map((item, index) => (
                        <li onClick={() => onTrackSelected(index)} key={index} className='audio-ls-container mtb-10'>
                        <div className  ='audio-ls-item flex align-center ptb-10'>
                            <div className='audio-img'>
                                <img src={`https://picsum.photos/200/300?random=${index}`}/>
                            </div>
                            <div className='audio-info mlr-10'>
                                <p>{item.track_name}</p>
                                <p>{item.track_singer}</p>
                            </div>
                        </div>
                    </li>
                    )) : <p>No audio found</p>

                }
               
            </ul>
        </div>
        


    );
}
export default AudioList;