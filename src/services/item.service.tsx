import axios from 'axios';

const ItemService = () => {
  const getListEquipment = async (page: number) => {
    return await axios.get(
      `items/category/1?order=DESC&page=${page ? page : 1}&sort=created_at`,
    );
  };

  const getListTool = async (page: number) => {
    return await axios.get(
      `items/category/2?order=DESC&page=${page ? page : 1}&sort=created_at`,
    );
  };

  const getListChemicals = async (page: number) => {
    return await axios.get(
      `items/category/3?order=DESC&page=${page ? page : 1}&sort=created_at`,
    );
  };

  return {
    getListEquipment,
    getListTool,
    getListChemicals,
  };
};

export const itemService = ItemService();
