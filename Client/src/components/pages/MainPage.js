import { Link } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import {userContext} from "../Contexts/Contexts";
import { useNavigate } from "react-router-dom";

import { useContext, useState, useEffect } from "react";

import axios from "axios";

import { Row, Col, Card, Container} from "react-bootstrap";

const MainPage = () => {
  const context = useContext(userContext) 
  const navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts").then((responce) => {
      setListOfPosts(responce.data.listOfPosts);
    })
  }, []);
  

  return (
      <div>
        <NavBar/>
        <Container >
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="https://media.price.ua/wp-content/uploads/2019/06/starwars_main.jpg" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {listOfPosts.map((value, key) => {
          return (
            <div className="post" key={key}>
              <div className="title"> {value.title} </div>
              <div className="body" onClick={() => {navigate(`/posts/${value.id}`)}}>{value.postText}</div>
              <div className="footer">
                <div className="username"><Link to={`/profile/${value.UserId}`}>{value.username}</Link></div>
                {/* <div className="buttons">
                  <ThumbUpAltIcon className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"} onClick={() => likePost(value.id)}/>
                </div>
                <label>{value.Likes.length}</label> */}
              </div>
            </div>
          );
        })}
        
        
      </div>
  )
}
  
export default MainPage;