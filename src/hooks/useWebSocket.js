import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => socket.current.close();
  }, [url]);

  const sendMessage = (data) => {
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(data));
    }
  };

  return { messages, sendMessage };
};