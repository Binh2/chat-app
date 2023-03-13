import styles from '@/styles/Chat.module.css';
import { SyntheticEvent, useState } from 'react';
import Users from '.';
import { UserType } from './UserType';
import { useUsers } from './useUsers';

export function UsersFinderForm(props: {onClickOnUser?: (event?: SyntheticEvent, user?: UserType) => void}) {
  const [ searchField, setSearchField ] = useState<string>("name");
  const [ searchText, setSearchText ] = useState<string>("");
  const { users, usersLoading, setUsersLoading } = useUsers(4, searchField, searchText);

  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="search-by-drop-down">Search by</label>
        {' '}
        <select id="search-by-drop-down" name="search-by" value={searchField} 
          onChange={(event) => {
            setUsersLoading(true);
            setSearchField(event.target.value);
          }}>
          <option value="id">user ID</option>
          <option value="name">name</option>
        </select>
        {/* { searchField == "name" ? " that start with: ": searchField == "id" ? " that match exactly": "" } */}
        <input className={styles.search} type="text" value={searchText} 
          onChange={(event) => {
            setUsersLoading(true);
            setSearchText(event.target.value);
          }}></input>
      </form>
      { <Users users={users} usersLoading={usersLoading} onClickOnUser={props.onClickOnUser}></Users> }
    </>
  )
}