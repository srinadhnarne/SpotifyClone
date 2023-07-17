import React from 'react'
import './Sidebar.css'
import {IoLibrary} from 'react-icons/io5';
import {MdHomeFilled, MdSearch} from "react-icons/md";
import Playlists from './Playlists';

const Sidebar = () => {
  return (
    <div className='spotify__sidebar'>
      <div className="top__links">
        <div className="logo">
          <img
          src = "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
          alt='spotify'/>
        </div>
        <ul className='spotify__sidebar-list'>
          <li>
            <MdHomeFilled/>
            <span>Home</span>
          </li>
          <li>
            <MdSearch/>
            <span>Search</span>
          </li>
          <li>
            <IoLibrary/>
            <span>Library</span>
          </li>
        </ul>
        <Playlists/>
      </div>
    </div>
  )
}

export default Sidebar