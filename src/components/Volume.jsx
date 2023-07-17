import React from 'react'
import { styled } from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import {AiFillSound} from 'react-icons/ai';

const Volume = () => {
    const [{token}] = useStateProvider();
    const setVolume = async (e) => {
        await axios.put(
            `https://api.spotify.com/v1/me/player/volume?volume_percent=${parseInt(e.target.value)}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    }
  return (
    <Container>
       <div className='soundIC'><AiFillSound /></div> 
      <div><input type='range' min={0} max={100} onMouseUp={(e=>setVolume(e))} /></div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
  .soundIC svg {
    margin-right: 0.5rem;
    color: white;
    height: 1.75rem;
  }
`;

export default Volume;