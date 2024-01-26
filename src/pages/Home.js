import React from "react";
import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { Link } from "react-router-dom";

 const Home =({posts}) => {
  console.log(posts);

    return (
      <div className={styles.postList}>
        {posts.map((post) => (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                    alt="user-pic"
                  />
                  <div className={styles.postAvatarheader}>
                    <Link to={{
                     pathname: `/user/${post.user._id}`,
                     state:{
                      user:post.user,
                     },
                      }
                    }
                     className={styles.postAuthor}
                     >
                      {post.user.name}
                     </Link>
                    <span className={styles.postTime}>3min</span>
                  </div>
                </div>

                <div className={styles.postContent}>{post.content} </div>
                <div className={styles.postActions}>
                  <div className={styles.postLike}>
                    <img
                      src=" https://cdn-icons-png.flaticon.com/128/739/739231.png"
                      alt="likes-icon"
                    />
                    <span>5</span>
                  </div>
                  <div className={styles.postCommentsIcon}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3193/3193015.png"
                      alt="post-comment-icon"
                    />
                    <span>2</span>
                  </div>
                </div>
                <div className={styles.postCommentBox}>
                  <input placeholder="start typing a comment" />
                </div>
                <div className={styles.postCommentsList}>
                  <div className={styles.postCommentItem}>
                    <div className={styles.postCommentHeader}>
                      <span className={styles.postCommentAuthor}>bill</span>
                      <span className={styles.postCommentTime}>22min ago</span>
                      <span className={styles.postCommentLikes}>22</span>
                    </div>
                    <div className={styles.postCommentContent}>
                      random content
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

Home.propTypes={
  posts: PropTypes.array.isRequired,
};

export default Home;