import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_USERNAME, API_PASSWORD } from './config';

const ShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const username = 'cUser';
        const password = 'customPassword';
        const authHeader = 'Basic ' + btoa(`${username}:${password}`);

        const response = await axios.get(`${API_BASE_URL}/lists`, {
          headers: {
            'Authorization': authHeader
          },
          withCredentials: true
        });
        setShoppingLists(response.data);
      } catch (error) {
        console.error('Error loading lists:', error);
        setError('Error loading lists')
      }
    };
    fetchShoppingLists();
  }, []);

  return (
    <div>
      <h2>My Shopping List</h2>
      <ul>
        {shoppingLists.map(list => ( 
          <li key={list.id}>
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
