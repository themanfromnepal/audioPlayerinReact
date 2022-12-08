import { useState, useRef } from 'react';

// #region ------------ TRACKS---------
import Inspired from './music/Inspired.mp3';
import Nature from './music/Nature.mp3';
import Rocker from './music/Rocker.mp3';
// #endregion ------------ Tracks ---------

import {BiSkipPrevious, BiPlay, BiPause, BiSkipNext} from 'react-icons/bi'
import './player.scss'


const playlist = [Inspired, Nature, Rocker];
const title = ['Inspired', 'Nature', 'Rocker'];

export default function Player(){
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title[index]);

    const audioElem = useRef();

    const tooglePlay =()=>{
        if(!isPlaying){
            audioElem.current.play()
        }
        else{
            audioElem.current.pause()
        }
        
        setIsPlaying(prev => !prev)

    }
    
    const toogleSkipForward = ()=>{
        if(index >= playlist.length -1){
            setIndex(0);
            audioElem.current.src = playlist[0];
            audioElem.current.play();
            setCurrentTitle(title[0]);
        }
        else{
            setIndex(prev => prev +1);
            audioElem.current.src = playlist[index + 1];
            audioElem.current.play();
            setCurrentTitle(title[index + 1]);
        }    
    }

    const toogleSkipBackward = ()=>{
        if(index <= 0){
            setIndex(2);
            audioElem.current.src = playlist[2];
            audioElem.current.play();
            setCurrentTitle(title[2]) ;
        }
        else{
            setIndex(prev => prev -1);
            audioElem.current.src = playlist[index - 1];
            audioElem.current.play();
            setCurrentTitle(title[index - 1]) ;
        }    
    }

    const [progress, setProgress] = useState(0);

    const onPlaying = ()=>{
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;
        setProgress(ct / duration * 100);
    }
    
    const clickRef = useRef();

    const checkWidth = (e) =>{
        const width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const duration = audioElem.current.duration;

        const divprogress = offset/width *100;
        audioElem.current.currentTime = divprogress/100 * duration;
    }
    

    return(
        <div className='player_container'>
            <audio src={playlist[0]} ref={audioElem} onTimeUpdate={onPlaying} onEnded={toogleSkipForward}/>
            <div><h1>Listen to New Releases</h1></div>

            <div className='title'><h2>{currentTitle}</h2></div>

            <div className='navigation'>
                <div className='navigation_wrapper' onClick={checkWidth} ref={clickRef}>
                    <div className='seek_bar' style={{width:`${progress + "%"}`}}></div>
                </div>
            </div>
  
            <div className='controls'>
                <BiSkipPrevious fontSize='3rem' color= 'white'   onClick= {toogleSkipBackward} className='btn-hover'/>

                {!isPlaying
                ?<BiPlay fontSize='5rem'  onClick={tooglePlay} className='btn-hover'/>
                :<BiPause fontSize='5rem'   onClick={tooglePlay} className='btn-hover'/>                
                }

                <BiSkipNext fontSize='3rem' color= 'white' onClick= {toogleSkipForward}  />
            </div>          
        </div>
    )
}