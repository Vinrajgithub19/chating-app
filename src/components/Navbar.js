import React from 'react'
import styles from '../styles/navbar.module.css';
import {Link} from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar = () => {
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img alt="" src="" />
        </a>
      </div>

      <div className={styles.RightDiv}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                className={styles.userDp}
                alt=""
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLink}>
          <nav>
            <ul>
              {auth.user ? (
                <>
                  <li onClick={auth.logout}>Logout</li>
                  
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;