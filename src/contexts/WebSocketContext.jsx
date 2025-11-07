import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getApiUrl } from '/src/config/apiConfig.js';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Attempting WebSocket connection for user:', user.username);
      connectWebSocket();
    }

    return () => {
      disconnectWebSocket();
    };
  }, [isAuthenticated, user]);

  const connectWebSocket = async () => {
    try {
      const apiUrl = await getApiUrl();

      const wsBaseUrl = apiUrl
        .replace('http://', 'ws://')
        .replace('https://', 'wss://')
        .replace(/\/$/, '');

      const wsUrl = `${wsBaseUrl}/ws/${user.id}`;

      console.log('Connecting to WebSocked:', wsUrl);
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);

        if (data.type === 'online_users') {
          console.log('Updating online users:', data.users);
          setOnlineUsers(data.users);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket ERROR:', error);
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket CLOSED:', event.code, event.reason);
        setIsConnected(false);

        // Option: auto reconnect
        if (isAuthenticated && user) {
          console.log('Attempting to reconnect in 3 seconds...');
          setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      console.log('Disconnecting WebSocket');
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  };

  const value = {
    onlineUsers,
    isConnected,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => useContext(WebSocketContext);
