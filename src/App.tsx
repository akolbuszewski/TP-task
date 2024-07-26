import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {RoomsProvider} from "./components/RoomContext";
import {Rooms} from "./components/Rooms";
import Pagination from "./components/Pagination";
import {Sort} from "./components/Sort";

function App() {

  return (
    <RoomsProvider>
        <Sort/>
        <Rooms />
        <Pagination/>
    </RoomsProvider>
  )
}

export default App
