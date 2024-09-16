import axios from 'axios';

const CategoryService = () => {
  const getListCategory = async () => {
    return await axios.get('categories');
  };

  return {
    getListCategory,
  };
};

export const categoryService = CategoryService();
