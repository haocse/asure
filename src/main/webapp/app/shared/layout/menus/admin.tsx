import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {DropdownItem, NavItem, NavLink} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from './menu-components';
import {NavLink as Link} from "react-router-dom";

const adminMenuItems = () => (
  <>
    <MenuItem icon="users" to="/admin/user-management">
      User management
    </MenuItem>

    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

const openAPIItem = () => (
  <MenuItem icon="book" to="/admin/docs">
    API
  </MenuItem>
);

export const AdminMenu = ({ showOpenAPI }) => (
  <NavItem>
    <NavLink tag={Link} to="/admin/user-management" icon="users-cog" name="Administration" id="admin-menu" data-cy="adminMenu">
      <FontAwesomeIcon icon="users" />
      <span>User management</span>
    </NavLink>
  </NavItem>
);

export default AdminMenu;
