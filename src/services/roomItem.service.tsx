import axios from 'axios';

const RoomItemService = () => {
  const getDetailRoomItem = async (id: number) => {
    return await axios.get(`room-items/${id}`);
  };

  return {
    getDetailRoomItem,
  };
};

export const roomItemService = RoomItemService();
