import axios from 'axios';
import * as _ from 'lodash';

const RoomService = () => {
  const getListRoom = async (page: number, keyword: string) => {
    return await axios.get(
      `rooms?keyword=${!_.isEmpty(keyword) ? keyword : ''}&order=DESC&page=${
        page ? page : 1
      }&sort=created_at`,
    );
  };

  const getRoomItemByRoom = async (id: string, page: any, keyword: string) => {
    return await axios.get(
      `room-items/room/${id}?keyword=${
        !_.isEmpty(keyword) ? keyword : ''
      }&order=DESC&page=${page ? page : 1}&sort=created_at`,
    );
  };

  return {
    getListRoom,
    getRoomItemByRoom,
  };
};

export const roomService = RoomService();
