import React,{ useEffect }  from 'react';
import './Playlists.css'
import {useStateProvider} from "../utils/StateProvider"
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

const Playlists = () => {
    const [{token,playlists},dispatch]=useStateProvider();
    useEffect(()=>{
        const getPlaylistData = async () => {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/playlists',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {items} = response.data;
            // console.log(items);
            const playlists = items.map(({name,id}) => {
                return {name,id};
            });
            // console.log(playlists);
            dispatch({type:reducerCases.SET_PLAYLISTS,playlists});
        };
        getPlaylistData();
    },[token,dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({type: reducerCases.SET_PLAYLISTID, selectedPlaylistId})
    };
  return (
    <div className='spotify__sidebar-playlist'>
        <ul>
            {
                playlists.map(({name,id})=> {
                return (<li key={id} onClick={()=>changeCurrentPlaylist(id)}>{name}</li>);
            })}
        </ul>
    </div>
  )
}

export default Playlists