import React from 'react';
import { NavBar, NavItem } from './components/NavBar/NavBar';

import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function App() {
  return (
    <div>
      <NavBar>
        <NavItem icon={<AddIcon />} />
        <NavItem icon={<NotificationsIcon />} />

        <NavItem icon={<ArrowDropDownIcon />} >
          <p>Hello</p>
        </NavItem>

      </NavBar>
    </div>
  );
}

export default App;
