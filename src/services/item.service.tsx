import axios from 'axios';
import * as _ from 'lodash';

const ItemService = () => {
  const getAll = async (page: number, keyword: string, take: number = 10) => {
    return await axios.get(
      `items?keyword=${
        !_.isEmpty(keyword) ? keyword : ''
      }&take=${take}&order=DESC&page=${page ? page : 1}&sort=created_at`,
    );
  };

  const getListEquipment = async (page: number, keyword: string) => {
    return await axios.get(
      `items/category/1?keyword=${
        !_.isEmpty(keyword) ? keyword : ''
      }&order=DESC&page=${page ? page : 1}&sort=created_at`,
    );
  };

  const getListTool = async (page: number, keyword: string = '') => {
    return await axios.get(
      `items/category/2?${keyword}&order=DESC&page=${
        page ? page : 1
      }&sort=created_at`,
    );
  };

  const getListChemicals = async (page: number, keyword: string = '') => {
    return await axios.get(
      `items/category/3?${keyword}&order=DESC&page=${
        page ? page : 1
      }&sort=created_at`,
    );
  };

  const getRoomItemByItem = async (
    itemId: any,
    page: number = 1,
    keyword: string = '',
  ) => {
    return await axios.get(
      `room-items/item/${itemId}?${keyword}&order=DESC&page=${
        page ? page : 1
      }&sort=created_at`,
    );
  };

  return {
    getAll,
    getListEquipment,
    getListTool,
    getListChemicals,
    getRoomItemByItem,
  };
};

export const itemService = ItemService();
