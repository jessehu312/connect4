import io from 'socket.io-client';
import React, { useState, useEffect, useContext, createContext } from "react";
import { useConfig } from '../context/ConfigProvider';
import { GAME_TYPE } from '../util/game';

const EventContext = createContext({
  playerList: null
});

export function EventProvider({ children, playerName, gameType }) {
  const [ playerList, setPlayerList] = useState(null);
  const { radarClient } = useConfig();

  useEffect(() => {
    const chain = new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve(pos);
      });
    }).then(pos => {
      const socket = io('/');
  
      socket.on('connect', () => {
        console.log(`connected`);
        socket.emit('register', {
            pos,
            id: socket.id,
            name: playerName
        });
      })
  
      socket.on('lobby', (data)=>{
        console.log(`Lobby: ${JSON.stringify(data, 2, null)}`)
        Object.keys(data).map(id => {
          if (id === socket.id) {
            data[id].me = true;
          }
        });
        setPlayerList(data);
      })

      if (gameType !== GAME_TYPE.MULTIPLAYER) {
        socket.disconnect();
      }
    });

  }, []);

  return <EventContext.Provider value={{ playerList }}>{children}</EventContext.Provider>
}

export const useEvent = () => {
  return useContext(EventContext);
};