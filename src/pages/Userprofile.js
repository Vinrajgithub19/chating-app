import React from "react";
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile,removeFriend } from '../Api';



const Userprofile =( )=> {
  
    const [user, setUser] = useState({});
    const [requestInprogress,setRequestInprogress]=useState(false);
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

    const handleRemoveFriendClick = async() => {
      setRequestInprogress(true);

      const response =await removeFriend(userId);

      if (response.success) {
        const friendship = auth.user.friends.filter(
          (friend) => friend.to_user._id === userId
        );

        auth.updateUserFriends(false, friendship[0]);
        addToast('Friend removed successfully!', {
          appearance: 'success',
        });

      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }
      setRequestInprogress(false);
    };
  
  const handleAddFriendClick= async()=>{    
    setRequestInprogress(true);

    const response =await addFriend(userId);

   if(response.success){
     const {friendship}= response.data;

     auth.updateUserFriends(true, friendship);
     addToast('friend added succesfully',{
        appearance:'success',
      })
      } 
     else{
      addToast(response.message,{
       appearance:'error',
     })
  }
     setRequestInprogress(false);
  }

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
      (<button 
         className={`button ${styles.saveBtn}`}
         onClick={handleRemoveFriendClick}
         >
        {requestInprogress?'...removing friend':'remove friend'}</button>)
       : ( <button 
        className={`button ${styles.saveBtn}`}
        onClick={handleAddFriendClick}
        disabled={requestInprogress}>
        {requestInprogress?'...ading friend':'add friend'}
        </button> )}
     </div> 
  
  </div>);
}


export default Userprofile;