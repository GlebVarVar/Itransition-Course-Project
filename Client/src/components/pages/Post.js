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

const Post = () => {
  const context = useContext(userContext);

  let {postId} = useParams(); 

  const [comments, setComments] = useState([]); 
  const [postObject, setPostObject] = useState({}); 
  const [newComment, setNewComment] = useState("");
  const [owner, setOwner] = useState(false);

  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState({
    like: false,
    count: 0
  });
  const [edit, setEdit] = useState(false);
  // console.log(rating);
  // console.log(postObject)

  useEffect(() => {
    axios.get(`http://localhost:3001/api/posts/${postId}`).then((response) => {
      setPostObject(response.data);
      if (response.data.email === context.email) {
        setOwner(true)
        setRating(response.data.Ratings.map((rate) => {
          if (rate.PostId == response.data.id ) {
            return rate
          }
        })[0].Rating)
        
      } 
      const like = response.data.Likes.find(like => like.UserId == response.UserId)
      setLikes({
        count: response.data.Likes.length,
        like: like
      })
    });
    

    axios.get(`http://localhost:3001/api/comments/${postId}`).then((response) => {
      setComments(response.data);
      console.log(response.data);
    });
    
    
  }, []);

  const likePost = async () => {
    const count = await axios.post("http://localhost:3001/api/likes", {PostId: postObject.id, email: postObject.email})
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
    <>
      <NavBar/>
      <div  style={{padding: "5% 5% 0 5%"}}>

      <Container>
      
        {/* <Row>

          <Col>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-primary"
                title={category}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item onClick={() => {
                  setCategory('Films');
                  getAllTags();
                }}>Films</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                  setCategory('Books');
                  getAllTags();
                }}>Books</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                  setCategory('Games');
                  getAllTags();
                }}>Games</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Col>

          <Col xs={6} md={4}>
          {
            category !== 'Choose category' ? category !=='Выбор категории'? <DropdownExampleMultipleSearchSelection alltags={alltags} setTags={setTags} tags={tags}/> : '' : ''
          }
            
          </Col>
          
        </Row> */}
        
        <Row className="g-2">
              <Col >
                <ButtonGroup aria-label="Basic example">
                  <Button variant="primary" size="lg" disabled >
                    Category:
                  </Button>
                  <Button variant="primary" size="lg">
                    {postObject.category}
                  </Button>
                </ButtonGroup> 
                {/* <FloatingLabel controlId="floatingInputGrid" label="Title">
                  <Form.Control onChange={(e) => setTitle(e.target.value)} value={postObject.title} placeholder="Iron Man" />
                </FloatingLabel> */}
              </Col>
              <Col >
                {/* <FloatingLabel controlId="floatingSelectGrid" label="Rating">
                  <Form.Select aria-label="Floating label select example" value={Rating} onChange={(e) => setRating(e.target.value)}>
                    <option>Open this select menu</option>
                    <option value="5">5 - Awesome!</option>
                    <option value="4">4 - Great!</option>
                    <option value="3">3 - Okay</option>
                    <option value="2">2 - bad</option>
                    <option value="1">1 - horrible</option>
                  </Form.Select>
                </FloatingLabel> */}
                <ButtonGroup aria-label="Basic example" style={{float: 'right'}}>
                  <Button variant="primary" size="lg" disabled >
                    Tags:
                  </Button>
                  {
                    owner == true ? 
                    postObject.Tags.map((tag, key) => {
                      return (
                        <Button variant="primary" size="lg" >
                          {tag.tag}
                        </Button>
                      )
                    }) 
                    : null
                  }
                  
                </ButtonGroup> 
              </Col>
            </Row>
        
        <Row sm={1} xl={2} xs={1} md={1}>
          <Col >
            <Row>
                <Carousel>
                  {
                    owner == true ? 
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
                    : ''
                  }
                </Carousel>
              </Row>
            <Row style={{margin: "2% 0 0 0"}}>
              <Tabs defaultActiveKey="Likes" id="uncontrolled-tab-example" className="mb-3" >
                <Tab eventKey="Likes" title="Likes" aria-selected>
                  {
                  owner == true ? 
                  <>
                    <Row >
                      <Col style={{fontWeight: "bold", fontSize: "20px"}} >
                          Click me! {'  '}
                          <ThumbUpAltIcon style={{color: likes.like ? '#2193F9' : '#3FF4FC' }} onClick={likePost}/>
                      </Col>
                      <Col >
                        <p style={{fontWeight: "bold", fontSize: "20px"}} >Total: {likes.count} likes </p>
                      </Col>
                      
                    </Row>
                  </>
                    : null
                  }
                </Tab>
                <Tab eventKey="Rating" title="Rating">
                  <Row style={{fontWeight: "bold", fontSize: "20px"}}>
                    <Col>Your Rating!</Col>
                    <Col>User's Rating!</Col>
                    <Col>Author's Rating</Col>
                  </Row>
                  <Row>
                    <Col>
                      <StarRating rating={rating} setRating={setRating}/>
                    </Col>
                    <Col>
                      {
                        owner == true ? 
                        <StarRatingStatic rating={postObject.Ratings.map(rate => rate.Rating).reduce((prev, curr) => prev + curr, 0) / postObject.Ratings.length}/>
                         : null
                      }
                      
                    </Col>
                    <Col>
                      {
                        owner == true ? 
                        <StarRatingStatic rating={postObject.Ratings.map((rate) => {
                          if (rate.PostId == postObject.id ) {
                            return rate
                          }
                        })[0].Rating
                        }/> : null
                      }
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Row>
                
            {/* <Row>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload your photos(10 Max)!</Form.Label>
                <Form.Control onChange={(e) => {
                  if (PhotosToUpload.length != 10) {
                    imageHandler(e);
                    if (PhotosToUpload.length !== 0) {
                      setPhotosToUpload([...PhotosToUpload, e.target.files[0]])
                    } else {
                      setPhotosToUpload([e.target.files[0]])
                    }
                  }
                  
                  
                  // console.log(PhotosToUpload);

                }} type="file" />
                <Button onClick={createPost}>Submit</Button>
              </Form.Group>
            </Row> */}
            <Row>

            </Row>
          </Col>
          


          <Col>
            
              {/* <Tabs defaultActiveKey="Edit" id="uncontrolled-tab-example" className="mb-3">
                {
                    (context) &&  (postObject.email === context.email)? 
                  
                  <Tab eventKey="Edit" title="Edit">
                  <FloatingLabel controlId="floatingTextarea2" label="Your text here">
                    <Form.Control
                    value={postObject.postText}
                    // onChange={(e) => setPostText(e.target.value)}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '100px' }}
                    />
                  </FloatingLabel>
                </Tab> : ''
                }
                
                <Tab eventKey="Preview" title="Preview">
                <ReactMarkdown>{postObject.postText}</ReactMarkdown>
                </Tab>
              </Tabs> */}

              <Container>
                <Card border="primary" >
                  <Card.Header style={{fontWeight:'bold'}}>{postObject.title}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                    <ReactMarkdown>{postObject.postText}</ReactMarkdown>
                    </Card.Text>
                    
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Link to={`/profile/${postObject.UserId}`}>{postObject.username} </Link>
                     - {postObject.createdAt !== undefined? postObject.createdAt.slice(0, 10): null }
                  </Card.Footer>
                </Card>
              </Container>
          </Col>
        </Row>
      </Container>
      
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