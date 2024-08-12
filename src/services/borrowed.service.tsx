import axios from "axios"

const BorrowedService = () => {
    const getListBorrowed = async () => {
        return await axios.get('registration/my-borrowing')
    }

    const getBorrowed = async (id: number) => {
        return await axios.get(`registration/${id}`)
    }

    return ({
        getListBorrowed, getBorrowed
    })
}

export const borrowedService = BorrowedService()