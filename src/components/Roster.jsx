import './Roster.css';
import { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useEvent } from '../context/EventProvider';

const Roster = (_) => {
  const { playerList } = useEvent();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  if (playerList) {
  console.log(Object.keys(playerList));
  console.log(Object.keys(playerList).map(id=>playerList[id]))}
  return playerList ? (
    <List component="nav" className="roster">
      { Object.keys(playerList).map((id, idx)=>(
        <ListItem
          key={id}
          button
          selected={selectedIndex === idx}
          disabled={playerList[id].me}
          onClick={(event) => handleListItemClick(event, idx)}
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