import axios from 'axios';

const BorrowedService = () => {
  const getListBorrowed = async (page: number, take: number = 10) => {
    return await axios.get(
      `registration/my-borrowing?order=DESC&page=${
        page ? page : 1
      }&sort=created_at&take=${take}`,
    );
  };

  const getBorrowed = async (id: number) => {
    return await axios.get(`registration/${id}`);
  };

  const createBorrowing = async (data: any) => {
    return await axios.post(`registration`, data);
  };

  return {
    createBorrowing,
    getListBorrowed,
    getBorrowed,
  };
};

export const borrowedService = BorrowedService();
