import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';

const PostFilterButton = ({filterOption, setFilterOption}) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  
  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="forum-button">
        Filter
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Filter by:</DropdownItem>
        <Input type="select" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
          <option>Any</option>
          <option>General</option>
          <option>Daily</option>
          <option>Gaming</option>
          <option>Memes</option>
        </Input>
      </DropdownMenu>
    </ButtonDropdown>
  );
}
export default PostFilterButton