import NavBar from "../Nav/NavBar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {userContext} from "../Contexts/Contexts";
import { useContext } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Post = () => {
  const context = useContext(userContext);

  let {postId} = useParams(); 
  console.log(postId);

  const [comments, setComments] = useState([]); 
  const [postObject, setPostObject] = useState({}); 
  const [newComment, setNewComment] = useState("");


  useEffect(() => {
    axios.get(`http://localhost:3001/api/posts/${postId}`).then((response) => {
      setPostObject(response.data);
      console.log(response);
    });

    axios.get(`http://localhost:3001/api/comments/${postId}`).then((response) => {
      setComments(response.data);
      console.log(response.data);
    });
    
    
  }, []);



  const addComment = () => {
    axios
    .post("http://localhost:3001/api/comments/", {
      
      commentBody: newComment, 
      PostId: postId,
      email: context.email} )
    .then((responce) =>{
      if (responce.data.error) {
        console.log(responce.data.error)
      } else {
        const commentToAdd = {commentBody:newComment, username: context.displayName, email: context.email};
        setComments([...comments, commentToAdd]);
        setNewComment('');  
      }
    
    });
  }

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/api/comments/${id}`).then(() => {
      setComments(comments.filter((value) => {
        return value.id !== id;
      }));
    });
  }


  // onClick={() => {
  //   if(context.email === postObject.email) {
  //     editPost("title")
  //   }
  //   }}> 

  const CommentsSection = () => {
      return (
        <div className='rightSide'>
            <div className='addCommentContainer'>
              <input 
                type="text" 
                placeholder="Comment..." 
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}/>
              <button onClick={addComment}>Add comment</button>
            </div>  
            <div className='listOfComments'>
              {
                comments.map((comment, key) => {
                  return <div className='comment' key={key}> 
                  {comment.commentBody}
                  <label>Username: {comment.username}</label> 
                  {context.email === comment.email? <button onClick={() => deleteComment(comment.id)}>X</button> : ""}
                  </div>
                })
              }
            </div>  
          </div> 
        
      )
    
  }

    return (
      
      <div>
        <NavBar/>
        <div className='postPage' >
          <div className='leftSide'>
            <div className='post' id="individual">
              <div className='title' >
                {postObject.title}
              </div>
              <div className='body'
              // onClick={() => {
              //   if(context.email === postObject.email) {
              //     editPost("body")
              //   }
              //   }}
                 > 
                {postObject.postText}</div>

              <div className='footer' > {postObject.username} 
              {
                context ? (context.email === postObject.email? <button onClick={() => deletePost(postObject.id)}> Delete post </button> : "") : ""
              }
              
                
              </div>
            </div>
          </div> 
          {
            context? <CommentsSection/> : ""
          } 
          </div>
      </div>
    )
  }
  
export default Post