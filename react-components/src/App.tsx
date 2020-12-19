import React, { useState } from 'react';
import { DropDown, NavBar, NavItem } from './components/NavBar/NavBar';

import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';

function App() {

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <NavBar>
        <NavItem icon={<AddIcon />} />
        <NavItem icon={<NotificationsIcon />} />

        <NavItem icon={(openMenu) ? <CloseIcon /> : <ArrowDropDownIcon />} onClick={() => setOpenMenu(!openMenu)}>
          <DropDown />
        </NavItem>

      </NavBar>
    </div>
  );
}

export default App;
