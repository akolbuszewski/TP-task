import './App.css'
import { RoomsProvider } from './components/RoomContext'
import { Rooms } from './components/Rooms'
import Pagination from './components/Pagination'
import { Filters } from './components/Filters'

function App() {
    return (
        <RoomsProvider>
            <Filters />
            <Rooms />
            <Pagination />
        </RoomsProvider>
    )
}

export default App
