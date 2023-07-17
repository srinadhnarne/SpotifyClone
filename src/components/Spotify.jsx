import React,{useEffect,useRef, useState} from 'react';
import './Spotify.css';
// import { styled } from 'styled-components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

const Spotify = () => {
    const [{token},dispatch] = useStateProvider();

    const bodyRef = useRef();
    const [navbackground, setNavBackground] = useState(false);
    const [headerbackground, setHeaderBackground] = useState(false);

    const bodyScrolled = ()=> {
        bodyRef.current.scrollTop >= 30
            ? setNavBackground(true)
            : setNavBackground(false);
        bodyRef.current.scrollTop >= 268
            ? setHeaderBackground(true)
            : setHeaderBackground(false);
    }

    useEffect(()=>{
        const getUserInfo =  async () => {
            const {data} = await axios.get(
                'https://api.spotify.com/v1/me',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(data);
            const userInfo = {
                userId: data.id,
                userName: data.display_name,
                userUrl: data.external_urls.spotify,
            }
            dispatch({type:reducerCases.SET_USER,userInfo}); 
        };
        getUserInfo();
    },[dispatch,token]);
  return (
    <div className='spotify_main'>
        <div className="spotify_body">
            <Sidebar />
            <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar navbackground={navbackground}/>
                    <div className="body_contents">
                        <Body headerbackground={headerbackground}/>
                    </div>
            </div>
        </div>
        <div className="spotify_footer">
            <Footer />
        </div>
    </div>    
  )
}

export default Spotify;