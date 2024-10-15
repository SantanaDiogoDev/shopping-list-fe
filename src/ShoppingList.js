import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';

const ShoppingList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shopping-lists`);
      setLists(response.data._embedded.shoppingLists);
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  };

  return (
    <div>
      <h2>My Shopping List</h2>
      <ul>
        {lists.map(list => (
          <li key={list.id}>
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
