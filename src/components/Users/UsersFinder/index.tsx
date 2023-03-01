import styles from '@/styles/Chat.module.css';
import { SyntheticEvent, useState } from 'react';
import Users from '..';
import { UserType } from '../UserType';
import { useUser } from '../useUser';

export function UsersFinder(props: {onClickOnUser?: (event?: SyntheticEvent, user?: UserType) => void}) {
  const [ searchField, setSearchField ] = useState<string>("name");
  const [ searchText, setSearchText ] = useState<string>("");
  const { users, usersLoading } = useUser(4, searchField, searchText);

  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="search-by-drop-down">Search by</label>
        {' '}
        <select id="search-by-drop-down" name="search-by" value={searchField} 
          onChange={(event) => setSearchField(event.target.value)}>
          {/* <option value=""></option> */}
          <option value="id">user ID</option>
          <option value="name">name</option>
          {/* <option value="gender">Gender</option> */}
          {/* <option value="age">Age</option> */}
          {/* <option value="email">Email</option> */}
          {/* <option value="phone">Phone number</option> */}
        </select>
        { searchField == "name" ? " that start with: ": searchField == "id" ? " that match exactly": "" }
        <input className={styles.search} type="text" value={searchText} 
          onChange={(event) => setSearchText(event.target.value)}></input>
      </form>
      { <Users users={users} usersLoading={usersLoading} onClickOnUser={props.onClickOnUser}></Users> }
    </>
  )
}