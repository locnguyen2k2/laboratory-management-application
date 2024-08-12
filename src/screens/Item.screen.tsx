import React, {useState} from 'react';
import {ListCategory} from '../components/List/ListCategory';
import {ListItem} from '../components/List/ListItem';

export default function ItemScreen() {
  const [categoryId, setCategoryId] = useState<number>(1);
  const onChangeCategoryId = (id: number) => setCategoryId(id);
  return (
    <>
      <ListCategory onChange={onChangeCategoryId} />
      <ListItem id={categoryId} />
    </>
  );
}
