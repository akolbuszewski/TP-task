import {useRoomsContext} from "./RoomContext";

const Pagination = () => {
    const { currentPage, setPage, numberOfPages }= useRoomsContext();

    const pages = [...Array(numberOfPages).keys()].map(num => num + 1);

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                Previous
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => setPage(page)}
                    className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-gray-400`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === numberOfPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;