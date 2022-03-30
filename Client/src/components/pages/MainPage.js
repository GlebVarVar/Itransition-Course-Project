import {userContext, languageContext} from "../Contexts/Contexts";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// Utis
import { ownerRating, totalRating } from "../utils/Functions";
// Components
import { Row, Col, Card, Container, Badge, Button, InputGroup,NavDropdown, DropdownButton, Dropdown} from "react-bootstrap";
import NavBar from "../Nav/NavBar";
import ReactMarkdown from "react-markdown";
import {StarRating, StarRatingStatic} from "../Stars/Stars";

// API
import { getPostsAPI } from "../../services/Posts";


const MainPage = () => {
  const context = useContext(userContext); 
  const {language} = useContext(languageContext);

  const navigate = useNavigate();

  const [listOfPosts, setListOfPosts] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [countOfDisplay, setCountOfDisplay] = useState(4);
  const [buttonDisplay, setButtonDisplay] = useState(true);

  const [filter, setFilter] = useState('new');

  console.log(filter);


  useEffect(() => {
    getPostsAPI(countOfDisplay, filter).then((responce) => {
      console.log(responce.data)
      if (responce.data.addition != false  ){
        setListOfPosts(responce.data.listOfPosts);
      } else {
        setButtonDisplay(false);
        setListOfPosts(responce.data.listOfPosts);
      }
      
    })
    
  }, [filter, countOfDisplay]);
  

  return (
    <>
      <NavBar/>
      <div style={{padding: "5% 0 0 0"}}>

        <Container >
          <Row style={{margin: '2% 0'}} >
            <Col>
              <InputGroup className="mb-3">
                <DropdownButton
                  variant="outline-primary"
                  title={language.filter}
                  drop='end'
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item onClick={() => {
                    setFilter('new');
                  }}>{language.latest}</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setFilter('Rating');
                  }}>{language.highRating}</Dropdown.Item>
                  <NavDropdown.Divider />
                  <Dropdown.Item onClick={() => {
                    setFilter('Films');
                  }}>Films</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setFilter('Books');
                  }}>Books</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setFilter('Games');
                  }}>Games</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Col>
            <Col>
            
            </Col>
          </Row>


        
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
                            <Col>
                              <Card.Title>{post.title}</Card.Title>
                            </Col>
                            <Col >
                              <Button variant="warning" onClick={(e) => {
                                e.preventDefault();
                                setFilter(post.category);
                              }} style={{float: 'right'}}>{post.category}</Button>
                            </Col>
                          </Row>
                          {/* <Card.Text>
                            
                          </Card.Text> */}
                          <Row style={{margin: '2% 0'}} onClick={() => navigate(`/posts/${post.id}`)}>
                            <ReactMarkdown>{post.postText.length > 500 ? `${post.postText.substr(0, 500)}...` : post.postText}</ReactMarkdown>
                          </Row>

                          <Row onClick={() => navigate(`/posts/${post.id}`)}>
                            <div>
                              {
                                post.Tags.map((tag, key) => {
                                  return (
                                    <Badge style={{margin: '0 10px 0 10px'}} bg="info" key={key}>{tag.tag}</Badge>
                                  )
                                })
                              }
                            </div>
                          </Row>

                          <Container>
                            <Row xs={1} sm={1} lg={3} onClick={() => navigate(`/posts/${post.id}`)} className="text-center"  style={{fontWeight: "bold", margin: '2% 0'}}> 
                              <Col>
                                <Row><p>{language.likes}</p></Row>
                                <Row><p>{post.Likes.length}</p></Row>
                              </Col>

                              <Col>
                                <Row><p>{language.userRating}</p></Row>
                                <Row>
                                  {
                                    <StarRatingStatic rating={totalRating(post)}/>
                                  }
                                </Row>
                              </Col>

                              <Col>
                                <Row><p>{language.authorRating}</p></Row>
                                <Row >
                                  {
                                    <StarRatingStatic rating={ownerRating(post)}/>
                                  }
                                </Row>
                              </Col>
                      
                            </Row>
                          </Container>
                          <Row>
                            <Button onClick={(e) => {
                              e.preventDefault();
                              navigate(`/profile/${post.UserId}`)
                            }}>{post.username} </Button>
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
              <div className="d-grid gap-2" style={{marginTop: '5%'}} >
                <Button variant="success"  size="lg" onClick={() => setCountOfDisplay(countOfDisplay + 4)}>
                  {language.morePosts}
                </Button>
                </div> : ''
            }
          </Row>
        </Container>
      </div>
    </>
  )
}
  
export default MainPage;