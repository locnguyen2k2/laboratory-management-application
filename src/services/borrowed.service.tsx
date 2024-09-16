import axios from 'axios';

const BorrowedService = () => {
  const getListBorrowed = async (page: number) => {
    return await axios.get(
      `registration/my-borrowing?take=5&order=DESC&page=${
        page ? page : 1
      }&sort=created_at`,
    );
  };

  const getBorrowed = async (id: number) => {
    return await axios.get(`registration/${id}`);
  };

  return {
    getListBorrowed,
    getBorrowed,
  };
};

export const borrowedService = BorrowedService();
