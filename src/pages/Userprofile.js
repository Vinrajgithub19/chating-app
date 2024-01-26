import React from "react";
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../Api';



const Userprofile =( )=> {
  

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const { addToast } = useToasts();
    const history = useHistory();
    const auth = useAuth();

    useEffect(() => {
      const getUser = async () => {
        const response = await fetchUserProfile(userId);

        if (response.success) {
          setUser(response.data.user);
        } else {
          addToast(response.message, {
            appearance: 'error',
          });
          return history.push('/');
        }

        setLoading(false);
      };

      getUser();
    }, [userId, history, addToast]);

    if (loading) {
      return <Loader />;
    }
  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  return (
    <div className={styles.settings}>
      <img
        className={styles.imgContainer}
        src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
        alt="user-pic"
      />
      <div className={styles.field}>
        <div className={styles.fieldLabel}>name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>
      <div className={styles.btnGrp}>
{checkIfUserIsAFriend() ?
      (<button className={`button ${styles.saveBtn}`}>add friend</button>)
       : ( <button className={`button ${styles.saveBtn}`}>remove friend</button> )}
     </div> 
  
  </div>);
}


export default Userprofile;