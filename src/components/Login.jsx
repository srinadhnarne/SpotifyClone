import React from 'react'
import { styled } from 'styled-components'

const Login = () => {
    const handleClick = ()=>{
        const clientid = "443d9a7959d1449f9e7327ffa8c1a4db";
        const redirectURL = "https://srinadhnarne.github.io/SpotifyClone/";
        const apiURL = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-email',
            'user-read-private',
            'user-read-playback-state',
            'user-modify-playback-state', 
            'user-read-currently-playing',
            'user-read-playback-position',
            'user-top-read',
            'user-read-recently-played',
            'playlist-read-private',
        ];
        window.location.href = `${apiURL}?client_id=${clientid}&redirect_uri=${redirectURL}&scope=${scope.join(
            " "
            )}&response_type=token&show_daialog=true`;
    }

  return (
    <Container>
        <img
        src = "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt='spotify'/>
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #1db954;
    gap: 5rem;

    img{
        height:20vh;
        
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: black;
        color: #49f585;
        font-size: 1.5rem;
        cursor: pointer;
    }
`;

export default Login