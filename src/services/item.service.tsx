import axios from "axios"

const ItemService = () => {
    const getListEquipment = async (page: number) => {
        return await axios.get(`items/category/1?page=${page ? page : 1}`)
    }

    const getListTool = async (page: number) => {
        return await axios.get(`items/category/2?page=${page ? page : 1}`)
    }

    const getListChemicals = async (page: number) => {
        return await axios.get(`items/category/3?page=${page ? page : 1}`)
    }

    return ({
        getListEquipment, getListTool, getListChemicals
    })
}

export const itemService = ItemService()