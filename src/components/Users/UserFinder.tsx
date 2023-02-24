import styles from '@/styles/Chat.module.css';
import { useState } from 'react';
import Users from '.';

export function UserFinder() {
  const [ searchField, setSearchField ] = useState<string>("");
  const [ searchText, setSearchText ] = useState<string>("");

  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="search-by-drop-down">Search by</label>
        {' '}
        <select id="search-by-drop-down" name="search-by" value={searchField} 
          onChange={(event) => setSearchField(event.target.value)}>
          <option value="uid">User ID</option>
          <option value="name">Name</option>
          <option value="all">All</option>
          {/* <option value="gender">Gender</option> */}
          {/* <option value="age">Age</option> */}
          {/* <option value="email">Email</option> */}
          {/* <option value="phone">Phone number</option> */}
        </select>
        <input className={styles.search} type="text" value={searchText} 
          onChange={(event) => setSearchText(event.target.value)}></input>
      </form>
      <Users searchField={searchField} searchText={searchText}></Users>
    </>
  )
}