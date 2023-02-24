import styles from '@/styles/Chat.module.css';
import Users from '.';
export function UserFinder() {
  return (
    <>
      <form>
        <label htmlFor="search-by-drop-down">Search by</label>
        {' '}
        <select id="search-by-drop-down" name="search-by">
          <option value="name">Name</option>
          <option value="gender">Gender</option>
          <option value="age">Age</option>
          <option value="email">Email</option>
          <option value="phone">Phone number</option>
        </select>
        <input className={styles.search} type="text"></input>
      </form>
      <Users></Users>
    </>
  )
}