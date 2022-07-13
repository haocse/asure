import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {DropdownItem, NavItem, NavLink} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from './menu-components';
import {NavLink as Link} from "react-router-dom";

const openAPIItem = () => (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

export const UserMenu = ({ title }) => (
  <NavItem>
    <NavLink tag={Link} to="/users" className="d-flex align-items-center">
      <FontAwesomeIcon icon="users-cog" />
      <span>{title}</span>
    </NavLink>
  </NavItem>
  // <NavDropdown icon="users-cog" name="Users" id="admin-menu" data-cy="adminMenu">
  //   {adminMenuItems()}
  //   {showOpenAPI && openAPIItem()}
  // </NavDropdown>
);


export default UserMenu;
