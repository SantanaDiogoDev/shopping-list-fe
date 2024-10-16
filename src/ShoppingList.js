import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_USERNAME, API_PASSWORD } from './config';

const ShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedList, setExpandedList] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoppingListsAndItems = async () => {
      try {
        const username = API_USERNAME;
        const password = API_PASSWORD;
        const authHeader = 'Basic ' + btoa(`${username}:${password}`);

        const listsResponse = await axios.get(`${API_BASE_URL}/lists`, {
          headers: { Authorization: authHeader },
        });
        setShoppingLists(listsResponse.data);

        const itemsResponse = await axios.get(`${API_BASE_URL}/items`, {
          headers: { Authorization: authHeader },
        });
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error loading lists or items:', error);
        setError('Error loading lists or items');
      }
    };
    
    fetchShoppingListsAndItems();
  }, []);

  const handleExpand = (listId) => {
    setExpandedList(listId === expandedList ? null : listId);
  };

  return (
    <div>
      <h2>My Shopping List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
       {shoppingLists.map(list => (
          <li key={list.id}>
            <div onClick={() => handleExpand(list.id)}>
              <strong>{list.name}</strong>
            </div>
            {expandedList === list.id && (
              <ul>
                {items
                  .filter(item => item.listId === list.id)
                  .map(item => (
                    <li key={item.id}>
                      {item.name} - {item.quantity} {item.status ? "(Bought)" : "(Not Bought)"}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
