import NavBar from "../Nav/NavBar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {userContext} from "../Contexts/Contexts";
import { useContext } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { InputGroup, DropdownButton, Dropdown, Toast, FormControl, Card, Tabs, Nav, Tab, Form,Carousel, Container, FloatingLabel, Col, Row, ButtonGroup, Button } from "react-bootstrap";

import {StarRating, StarRatingStatic} from "../Stars/Stars";


// utils
import { ownerRating, totalRating } from "../utils/Functions";
// API
import { getPostAPI } from "../../services/Posts";
import { getAllCommentsAPI, postAddCommentAPI, deleteCommentAPI } from "../../services/Comments";
import { getLikesOnPostAPI } from "../../services/Likes";
import { getRatingAPI } from "../../services/Rating";

const Post = () => {
  const context = useContext(userContext);
  console.log(context);
  let {postId} = useParams(); 

  let navigate = useNavigate()

  const [comments, setComments] = useState([]); 
  const [postObject, setPostObject] = useState({}); 
  const [newComment, setNewComment] = useState("");
  const [owner, setOwner] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [likes, setLikes] = useState({
    like: false,
    count: 0
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getPostAPI(postId).then((response) => {
      setPostObject(response.data);
      const rating = response.data.Ratings.map((rate) => {
        if (rate.PostId == response.data.id ) {
          return rate
        } 
      })[0].Rating

      

      const like = response.data.Likes.find(like => like.UserId == response.UserId)
      setLikes({
        count: response.data.Likes.length,
        like: like
      })
    });
    if (context != null) {
      getRatingAPI(context.email, postId).then((res) => {
        console.log(res.data[0].Rating);
        setUserRating(res.data[0].Rating);
      })
    }
    

    const comments = getAllCommentsAPI(postId).then(res => res);
    setComments(comments.data);
    
  }, [userRating, context]);

  const likePost = async () => {
    const count = await getLikesOnPostAPI(postObject.id, context.email);
    if (likes.like == true) {
      setLikes({
        count: count.data.count,
        like: false
      }) 
    } else {
      setLikes({
        count: count.data.count,
        like: true
      })
    }
  }

  const addComment = () => {
    postAddCommentAPI(newComment, postId, context.email)
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
    deleteCommentAPI(id).then(() => {
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
    <>
      <NavBar/>
      <div  style={{padding: "5% 5% 0 5%"}}>
      {
        !Object.keys(postObject).length  !== true? 
        <Container>
          <Row className="g-2">
            <Col >
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary" size="lg" disabled >
                  Category:
                </Button>
                <Button variant="primary" size="lg" onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}>
                  {postObject.category}
                </Button>
              </ButtonGroup> 
              
            </Col>
            <Col >
              <ButtonGroup aria-label="Basic example" style={{float: 'right'}}>
                <Button variant="primary" size="lg" disabled >
                  Tags:
                </Button>
                {
                  postObject.Tags.map((tag, key) => {
                    return (
                      <Button key={key} variant="primary" size="lg" >
                        {tag.tag}
                      </Button>
                    )
                  }) 
                }
                
              </ButtonGroup> 
            </Col> 
          </Row>
        
          <Row sm={1} xl={2} xs={1} md={1}>
            <Col >
              <Row>
                <Carousel>
                  {
                    postObject.Photos.map((photo, key) => {
                      return (
                        <Carousel.Item key={key}>
                          <img
                            className="d-block w-100"
                            src={photo.Photo}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      )
                    }) 
                  }
                </Carousel>
              </Row>
              <Row style={{margin: "2% 0 0 0"}}>
                <Tabs defaultActiveKey="Likes" id="uncontrolled-tab-example" className="mb-3" >

                  <Tab eventKey="Likes" title="Likes" aria-selected>

                    <Row >
                      {
                        context != null ?
                          <Col style={{fontWeight: "bold", fontSize: "20px"}} >
                            Click me!
                            <ThumbUpAltIcon style={{color: likes.like ? '#2193F9' : '#3FF4FC' }} onClick={likePost}/>
                          </Col>

                        : null
                      }
                      <Col >
                        <p style={{fontWeight: "bold", fontSize: "20px"}} >Total: {likes.count} likes </p>
                      </Col>
                    </Row>

                  </Tab>

                  <Tab eventKey="Rating" title="Rating">
                    <Row style={{fontWeight: "bold", fontSize: "20px"}} xs={1} lg={3}>
                      {
                        context != null ?
                        <Col>
                          <Row>Your Rating!</Row>
                          <Row><StarRating  userRating={userRating} postId={postObject.id} setUserRating={setUserRating}/></Row>
                        </Col> 
                        : null
                      }
                      <Col>
                        <Row>User's Rating!</Row>
                        <Row><StarRatingStatic rating={totalRating(postObject)}/></Row>
                      </Col>
                      <Col>
                        <Row>Author's Rating</Row>
                        <Row><StarRatingStatic rating={ownerRating(postObject)}/> </Row>
                      </Col>
                    </Row>
                  </Tab>

                </Tabs>
              </Row>
              
            </Col>

            <Col>
              <Container>
                <Card border="primary" >
                  <Card.Header style={{fontWeight:'bold'}}>{postObject.title}</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{postObject.postText}</ReactMarkdown>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Link to={`/profile/${postObject.UserId}`}>{postObject.username} </Link>
                      - {postObject.createdAt !== undefined? postObject.createdAt.slice(0, 10): null }
                  </Card.Footer>
                </Card>
              </Container>
            </Col>
          </Row>
          <Row style={{margin: "2% 0 0 0"}}>
            <Col>
             
            </Col>
            <Col></Col>
          </Row>
        </Container> 
      : null
      }

      </div>
    </>
  )
}
  
export default Post



{/* <div className='postPage' >
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

              <div className='footer' > {postObject.username}  */}


          //     {
          //       context ? (context.email === postObject.email? <button onClick={() => deletePost(postObject.id)}> Delete post </button> : "") : ""
          //     }
              
                
          //     </div>
          //   </div>
          // </div> 
          // {
          //   context? <CommentsSection/> : ""
          // } 
          // </div>



          // <Row>
          //   <Col md={6} className="mb-2">
          //     <Toast show={errorCreate.error} onClose={() => setErrorCreate({error: !errorCreate.error})}>
          //       <Toast.Header>
          //         <img
          //           src="holder.js/20x20?text=%20"
          //           className="rounded me-2"
          //           alt=""
          //         />
          //         <strong className="me-auto">Itransitions</strong>
          //       </Toast.Header>
          //       <Toast.Body>{errorCreate.errorMessage}</Toast.Body>
          //     </Toast>
          //   </Col>
          // </Row> 