import React from 'react'
import { styled } from 'styled-components'
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle} from 'react-icons/bs'
import {CgPlayTrackNext,CgPlayTrackPrev} from 'react-icons/cg';
import {FiRepeat} from 'react-icons/fi';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

const PlayerControls = () => {
    const [{token, playerState},dispatch]=useStateProvider();

    // const initialState = async() => {
    //     const state = await axios.get(
    //         `https://api.spotify.com/v1/me/player`,
    //         {
    //             headers : {
    //                 Authorization : `Bearer ${token}`,
    //             },
    //         }
    //     );
    //     dispatch({type:reducerCases.SET_PLAYERSTATE, playerState: state.data.is_playing});
    //     const {item} = state.data;
    //     if(item !== ""){
    //         const currentlyPlaying = {
    //             id: item.id,
    //             name: item.name,
    //             artists : item.artists.map((artist) => artist.name),
    //             image: item.album.images[2].url,
    //         }
    //         // console.log(currentlyPlaying);
    //         dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying});
    //     }
    // };
    

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
            await axios.put(
                `https://api.spotify.com/v1/me/player/${state}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        dispatch({type:reducerCases.SET_PLAYERSTATE, playerState: !playerState});
    };

    const changeTrack = async(type) =>{
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({type:reducerCases.SET_PLAYERSTATE, playerState: true});
        const response = await axios.get(
            'https://api.spotify.com/v1/me/player/currently-playing',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(response.data.item);
        if(response.data !== ""){
            const {item}= response.data;
            const currentlyPlaying = {
                id: item.id,
                name: item.name,
                artists : item.artists.map((artist) => artist.name),
                image: item.album.images[2].url,
            }
            // console.log(currentlyPlaying);
            dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying});
        }
    };

  return (
    <Container >
        <div className="shuffle">
            <BsShuffle/>
        </div>
        <div className="previous">
            <CgPlayTrackPrev onClick={()=>changeTrack("previous")} />
        </div>
        <div className="state" >
            {playerState ? <BsFillPauseCircleFill onClick={changeState}/> : <BsFillPlayCircleFill onClick={changeState}/>}
        </div>
        <div className="next">
            <CgPlayTrackNext onClick={()=>changeTrack("next")} />
        </div>
        <div className="repeat">
            <FiRepeat />
        </div>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    svg {
        color: #b3b3b3;
        transition: 0.2s ease-in-out;
        &:hover{
            color: white;
        }
    }

    .state{
        svg {
            color: white;
        }
    }

    .previous,.next,.state {
        font-size: 2rem;
    }
`;

export default PlayerControls