import Pagination from './Pagination'
import { fireEvent, render, screen } from '@testing-library/react'
// todo: setup custom matchers globally
import '@testing-library/jest-dom'

jest.mock('./../hooks/useRoomsContext', () => ({
    usePaginationData: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-var-requires
const usePaginationData = require('./../hooks/useRoomsContext').usePaginationData

describe('Pagination Component', () => {
    beforeEach(() => {
        // Reset the mock before each test
        usePaginationData.mockReset()
    })

    test('renders pagination buttons correctly', () => {
        usePaginationData.mockReturnValue({
            currentPage: 1,
            setPage: jest.fn(),
            numberOfPages: 5,
        })

        render(<Pagination />)

        const previousButton = screen.getByText('Previous')
        const nextButton = screen.getByText('Next')

        expect(previousButton).toBeDisabled()
        expect(nextButton).toBeEnabled()

        const pageButtons = screen.getAllByRole('button', { name: /\d/ })
        expect(pageButtons).toHaveLength(5)
        expect(pageButtons[0]).toHaveTextContent('1')
        expect(pageButtons[1]).toHaveTextContent('2')
        expect(pageButtons[2]).toHaveTextContent('3')
        expect(pageButtons[3]).toHaveTextContent('4')
        expect(pageButtons[4]).toHaveTextContent('5')
    })

    test('clicking next and previous buttons', () => {
        const setPageMock = jest.fn()
        usePaginationData.mockReturnValue({
            currentPage: 2,
            setPage: setPageMock,
            numberOfPages: 5,
        })

        render(<Pagination />)

        const previousButton = screen.getByText('Previous')
        const nextButton = screen.getByText('Next')

        expect(previousButton).toBeEnabled()
        expect(nextButton).toBeEnabled()

        fireEvent.click(previousButton)
        expect(setPageMock).toHaveBeenCalledWith(1)

        fireEvent.click(nextButton)
        expect(setPageMock).toHaveBeenCalledWith(3)
    })

    test('clicking a page number button', () => {
        const setPageMock = jest.fn()
        usePaginationData.mockReturnValue({
            currentPage: 3,
            setPage: setPageMock,
            numberOfPages: 5,
        })

        render(<Pagination />)

        const pageButton = screen.getByText('4')
        fireEvent.click(pageButton)

        expect(setPageMock).toHaveBeenCalledWith(4)
    })

    test('next button is disabled on last page', () => {
        usePaginationData.mockReturnValue({
            currentPage: 5,
            setPage: jest.fn(),
            numberOfPages: 5,
        })

        render(<Pagination />)

        const nextButton = screen.getByText('Next')
        expect(nextButton).toBeDisabled()
    })

    test('previous button is disabled on first page', () => {
        usePaginationData.mockReturnValue({
            currentPage: 1,
            setPage: jest.fn(),
            numberOfPages: 5,
        })

        render(<Pagination />)

        const previousButton = screen.getByText('Previous')
        expect(previousButton).toBeDisabled()
    })
})
