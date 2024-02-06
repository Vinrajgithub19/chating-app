import React from 'react'
import styles from '../styles/home.module.css';
import { addPost } from '../Api';
import { useState } from 'react';
import {useToasts} from 'react-toast-notifications';
import { usePosts } from '../hooks';

const CreatePost=()=> {
  const [post,setPost]=useState('');
  const [inProgress,setInProgress]=useState(false);
  const {addToast}=useToasts();
  const posts = usePosts();

  const handleClickAddPost= async()=>{
    setInProgress(true);

    const response = await addPost(post);

    if(response.success){
     setPost('');
     posts.addPostToState(response.data.post);
     addToast('post added sucessfully',{
        appeareance:'success',
     });
    }
    else{
       addToast('respone.message',{
        appearance:'error',
       })
    }
 setInProgress(false); 
}



  return (
    <div className={styles.newpostcontainer}>
      <div>
        <textarea
          className={styles.textarea}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        >
         
        </textarea>
      </div>
      <div className={styles.apbtn}>
        <button className={styles.addpostbtn} onClick={handleClickAddPost}>
          {' '}
          {inProgress ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;