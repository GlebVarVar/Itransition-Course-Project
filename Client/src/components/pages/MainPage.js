import { Link } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import {userContext} from "../Contexts/Contexts";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import axios from "axios";

import { Row, Col, Card, Container, Badge, Button} from "react-bootstrap";

import ReactMarkdown from "react-markdown";


import {StarRating, StarRatingStatic} from "../Stars/Stars";

const MainPage = () => {
  const context = useContext(userContext) 
  const navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);

  const [countOfDisplay, setCountOfDisplay] = useState(4);
  const [buttonDisplay, setButtonDisplay] = useState(true);

  


  useEffect(() => {
    console.log(countOfDisplay);
    axios.get("http://localhost:3001/api/posts", {headers: {countOfDisplay : countOfDisplay}}).then((responce) => {
      console.log(responce);
      if (responce.data.addition != false  ){
        setListOfPosts(responce.data.listOfPosts);
      } else {
        setButtonDisplay(false);
        setListOfPosts(responce.data.listOfPosts);
      }
      
    })
    
  }, [countOfDisplay]);
  
  // console.log(listOfPosts[0]);


  // const AverageRating = (post) => {
  //   let counter = 0;
  //   const ratingCount = post.Ratings.map((rating) => {
  //     if (rating.UserId ==! post.UserId) {
  //       counter+= rating.Rating;
  //       console.log(rating.Rating);
  //       return rating.Rating;
  //     }
  //   })
    
  //   const res = ratingCount[0] === undefined? 'No rating exist' :  counter / ratingCount

  //   return(
  //     res
  //   )
    
    
  // }

  return (
      <>
      <NavBar/>
        <div style={{padding: "5% 0 0 0"}}>
          <Row></Row>
          <Container >
          {listOfPosts.length !== 0 ? 
          <Row xs={1} md={2} className="g-4">
              {
                listOfPosts.map((post, key) => {
                  return (
                    <Col key={key}>
                      <Card >
                        {
                          post.Photos.length !== 0 ? <Card.Img onClick={() => navigate(`/posts/${post.id}`)} variant="top" src={post.Photos[0].Photo} /> : ''
                        }
                        <Card.Body>
                          <Row onClick={() => navigate(`/posts/${post.id}`)}>
                            <Card.Title>{post.title}</Card.Title>
                          </Row>
                          {/* <Card.Text>
                            
                          </Card.Text> */}
                          <Row onClick={() => navigate(`/posts/${post.id}`)}>
                            <ReactMarkdown>{post.postText}</ReactMarkdown>
                          </Row>
                          <Row onClick={() => navigate(`/posts/${post.id}`)}>
                            <div>
                              {
                                post.Tags.map((tag, key) => {
                                  return (
                                    <Badge style={{margin: '0 10px 0 10px'}} bg="primary" key={key}>{tag.tag}</Badge>
                                  )
                                })
                              }
                            </div>
                          </Row>
                          <Row onClick={() => navigate(`/posts/${post.id}`)}> 
                            <Col>Likes</Col>
                            <Col>User rating</Col>
                            <Col>Author rating</Col>
                            </Row>
                            <Row>
                              <Col>{post.Likes.length}</Col>
                              <Col>
                                {
                                  // AverageRating(post)
                                  <StarRatingStatic rating={post.Ratings.map(rate => rate.Rating).reduce((prev, curr) => prev + curr, 0) / post.Ratings.length}/>
                                }
                              </Col>
                              <Col>
                                {
                                  <StarRatingStatic rating={post.Ratings.map((rate) => {
                                    if (rate.PostId == post.id ) {
                                      return rate
                                    }
                                  })[0].Rating
                                  }/>
                                }
                              </Col>
                          </Row>
                          <Row>
                            <Link to={`/profile/${post.id}`}>{post.username} </Link>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row> : ''
            }
            <Row>
              {
                buttonDisplay == true ? 
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={() => setCountOfDisplay(countOfDisplay + 4)}>
                    More Posts!
                  </Button>
                 </div> : ''
              }
            </Row>
          </Container>


          {/* {
          listOfPosts.map((value, key) => {
            return (
              <div className="post" key={key}>
                <div className="title"> {value.title} </div>
                <div className="body" onClick={() => {navigate(`/posts/${value.id}`)}}>{value.postText}</div>
                <div className="footer">
                  <div className="username"><Link to={`/profile/${value.UserId}`}>{value.username}</Link></div> */}
                  {/* <div className="buttons">
                    <ThumbUpAltIcon className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"} onClick={() => likePost(value.id)}/>
                  </div>
                  <label>{value.Likes.length}</label> */}
                {/* </div>
              </div>
            );
          })
          }  */}

          
        </div>
      </>
  )
}
  
export default MainPage;