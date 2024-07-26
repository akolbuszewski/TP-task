import './App.css'
import { RoomsProvider } from './components/RoomContext'
import { Rooms } from './components/Rooms'
import Pagination from './components/Pagination'
import { Sort } from './components/Sort'

function App() {
    return (
        <RoomsProvider>
            <Sort />
            <Rooms />
            <Pagination />
        </RoomsProvider>
    )
}

export default App
