import io from 'socket.io-client';
import React, { useState, useEffect, useContext, createContext } from "react";
import { useConfig } from '../context/ConfigProvider';
import { GAME_TYPE } from '../util/game';

const EventContext = createContext({
  playerList: null,
  eventEmitter: null
});

export function EventProvider({ children, playerName, gameType, onMatch, onAccept }) {
  const [ playerList, setPlayerList] = useState(null);
  const [ eventEmitter, setEventEmitter] = useState(null);

  useEffect(() => {
      const socket = io('/');
  
      socket.on('connect', () => {
        console.log(`connected`);
        socket.emit('register', {
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
        window.playerList = data;
      })

      socket.on('challenged', (challengerId) => {
        console.log(`${challengerId} challenged you`);
        const newData = {};
        Object.keys(window.playerList).map(id => {
          if (id === challengerId) {
            window.playerList[id].challenge = true;
          }
          newData[id] = window.playerList[id];
        });
        setPlayerList(newData);
      });

      socket.on('accept', data => onAccept(data, socket));
      socket.on('match', onMatch);

      setEventEmitter({
        challenge: (playerId) => {
          socket.emit('challenge', playerId);
        },
        match: (payload)=> {
          socket.emit('accept', payload);
        },
        socket
      });

      if (gameType !== GAME_TYPE.MULTIPLAYER) {
        socket.disconnect();
      }

  }, []);

  return <EventContext.Provider value={{ playerList, eventEmitter }}>{children}</EventContext.Provider>
}

export const useEvent = () => {
  return useContext(EventContext);
};