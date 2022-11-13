import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './feed.module.css';
import { CommentInput, Comment, WriterMenu } from '../../components';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const FeedDetail = () => {
  const {feedId} = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [feed, setFeed] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const [comment, setComment] = useState();
  const [commentList, setCommentList] = useState();

  useEffect(() => {
    axios.get(`/feed/${feedId}`)
    .then(res => {
      // console.log(res.data);
      setFeed(res.data);
    }).catch(err => console.log(err));

    axios.get(`/feed/like/${feedId}/${user.id}`)
    .then(res => {
      console.log(res.data);
      if(res.data == 0)
        setIsLiked(false);
      else
        setIsLiked(true);
    }).catch(err => console.log(err));
  }, []);

  const deleteFeed = () => {
    
  }

  const handleLike = () => {
    if(isLiked){
      axios.delete(`/feed/like/delete`, {
        data: {
          feed_id: feedId,
          user_id: user.id
        }
      })
      .then(res => {
        setIsLiked(false);
      }).catch(err => console.log(err));
    }
    else{
      axios.post(`/feed/like/insert`, {
        feed_id: feedId,
        user_id: user.id
      })
      .then(res => {
        setIsLiked(true);
      }).catch(err => console.log(err));
    }
  }

  const insertComment = () => {
    // if(comment && comment != ''){
    //   setComment('');

    //   axios.post(`/challenge/comment/new`, {
    //     challenge_id: challengeId,
    //     user_id: user.id,
    //     content: comment
    //   })
    //   .then(res => {
    //     // console.log(res.data);
    //     setCommentList(res.data);
    //   }).catch(err => console.log(err));
    // }
  }

  return (
    <div className={styles.feed_detail}>
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <div className={styles.title}>피드</div>
        {
          // 개설한 유저에게만 보이는 메뉴
          feed.user_id == user.id ? 
          <WriterMenu handleDelete={deleteFeed} /> :
          <button className={styles.hidden}></button>
        }
      </div>

      <div className={styles.wrap}>
        {/* <img src={`/resources/user_photo/${feed.user_photo}`} className={styles.user_photo} alt=''/> */}
        <div className={styles.user_wrap}>
          {
            feed.user_photo && feed.user_photo ? 
            <img src={`/resources/user_photo/${feed.user_photo}`} className={styles.user_photo} alt="" /> :
            <div className={styles.no_photo}>
              <span className={`material-icons ${styles.no_photo_icon}`}>person</span>
            </div>
          }
          <div className={styles.user_name}>{feed.user_name}</div>
        </div>

        <Carousel showIndicators={feed.file_names && feed.file_names.length > 1 ? true : false} showArrows={false} showStatus={false} showThumbs={false} swipeScrollTolerance={100}>
          {
            feed.file_names && feed.file_names.map((image, idx) => (
              <div>
                <img src={`/resources/feed_photo/${image}`} className={styles.photo} alt=''/>
              </div>
            ))
          }
        </Carousel>

        <div className={styles.content_wrap}>
          <div className={styles.btn_wrap}>
            {
              isLiked ? 
              <span className={`material-icons ${styles.like_on}`} onClick={handleLike}>favorite</span> : 
              <span className={`material-icons ${styles.like_off}`} onClick={handleLike}>favorite_border</span>
            }

            <span className={`material-icons-outlined ${styles.comment_btn}`}>mode_comment</span>

            <span className={`material-icons-outlined ${styles.share_btn}`}>share</span>
          </div>

          <div className={styles.content}>{feed.content}</div>

          {
            feed.tags && feed.tags.length > 0 && 
            <div className={styles.tag_wrap}>
              {
                feed.tags.map(tag => <div className={styles.tag}>{tag}</div>)
              }
            </div>
          }

          <div className={styles.comment_list}>
            <div className={styles.subtitle}>
              댓글 {commentList && commentList.length}
            </div>

            {/* <div className={styles.input_wrap}>
              <input type='text' placeholder='댓글 달기...' className={styles.input_comment} value={comment} onChange={(e) => setComment(e.target.value)}/>
              <span className={`material-icons ${styles.comment_btn}`} onClick={insertComment}>reply</span>
            </div> */}
            <CommentInput comment={comment} setComment={setComment} insertComment={insertComment}/>

            {
              commentList && commentList.map((comment, index) => (
                <Comment comment={comment} user={user} setCommentList={setCommentList} key={index}/>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeedDetail;