import './Roster.css';
import { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useEvent } from '../context/EventProvider';

const Roster = ({ onNewMatch}) => {
  const { playerList, eventEmitter } = useEvent();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    if (playerList[id].challenge) {
      const myId = Object.keys(playerList).find(id => playerList[id].me);
      onNewMatch({players: [id, myId], eventEmitter});
    } else {
      eventEmitter.challenge(id);
    }
  };

  /*if (playerList) {
  console.log(Object.keys(playerList));
  console.log(Object.keys(playerList).map(id=>playerList[id]))}*/
  return playerList ? (
    <List component="nav" className="roster">
      { Object.keys(playerList).map((id, idx)=>(
        <ListItem
          key={id}
          button
          selected={selectedIndex === idx}
          disabled={playerList[id].me}
          className={playerList[id].challenge ? "challenger": ""}
          onClick={(event) => handleListItemClick(event, idx, id)}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={`${playerList[id].name}`} />
        </ListItem>
      ))}
      </List>
  ) : null;
}

export default Roster;