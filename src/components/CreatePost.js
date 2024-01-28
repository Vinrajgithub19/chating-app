import React from 'react'
import styles from '../styles/home.module.css';

const CreatePost=()=> {



  return (
    <div className={styles.newpostcontainer}>
      <div>
        <textarea className={styles.textarea}> </textarea>
      </div>
      <div className={styles.apbtn}>
        <button className={styles.addpostbtn}> ADD POST</button>
      </div>
    </div>
  );
}

export default CreatePost;