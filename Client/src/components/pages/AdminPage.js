

import { userContext, languageContext } from "../Contexts/Contexts";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Utils
import { ownerRating, totalRating } from "../utils/Functions";
// Components
import { Accordion, Container, Table, Button, Col, Row, ButtonGroup } from "react-bootstrap";
import NavBar from "../Nav/NavBar"
import {StarRatingStatic} from "../Stars/Stars";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

// API
import {putAdminAPI, getIsUserAdminAPI} from '../../services/Admin'
import { deleteUserPostsAPI } from "../../services/Posts";
import {getAllUsersAPI} from "../../services/Users";

const AdminPage = () => {
  const context = useContext(userContext);
  const {language} = useContext(languageContext);

  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState([])

  useEffect(() => {
    if (!context) navigate(-1);
    
    
  }, [context]);


  const verifyAdmin = async () => {
    const isAdmin = await getIsUserAdminAPI(context.email)
      .then((responce) => {
        if (responce.data.userType === 'admin') {
          return true
        }
        return false;
      })

    console.log(isAdmin);
    setAdmin(isAdmin);
    getAllUsers();
  }

  const getAllUsers = async () => {
    const response = await getAllUsersAPI(context.email);
    setData(response.data);
  } 


  const AdminTable = () => {
    return (
      
      <Accordion>
      {
        data.map((user, key) => {
          const isDisabled = user.userType == 'admin' ? true : false

          return (
            <Accordion.Item key={key} eventKey={key}>
              <Accordion.Header>{user.email}</Accordion.Header>
              <Accordion.Body>
                <ButtonGroup size="sm" className="mb-2">
                  <Button variant="danger" onClick={() => {
                    deleteUserPosts(user.email);
                    getAllUsers();
                  }}>{language.deletePosts}</Button>
                  <Button variant="warning" onClick={() => putAdminAPI(user.email)} disabled={isDisabled} >
                    {language.appointAdmin}
                  </Button>
                  <Button onClick={() => navigate(`/users/${user.id}`)} >
                    {language.userLink}
                  </Button>
                  <Button variant="success" onClick={getAllUsers}>
                    {language.refresh}
                  </Button>
                </ButtonGroup>
                <Table striped bordered hover>

                  <thead>
                    <tr>
                      <th>{language.postId}</th>
                      <th>{language.category}</th>
                      <th>{language.title}</th>
                      <th>{language.userRating}</th>
                      <th>{language.authorRating}</th>
                      <th>{language.likes}</th>
                      <th>{language.сreated}</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {
                    user.Posts.map((post, key) => {
                      const {id, category, createdAt, title, Likes} = post;
                      
                      return (
                        <tr key={key} onClick={() => navigate(`/posts/${post.id}`)}>
                          <td>{id}</td>
                          <td>{category}</td>
                          <td>{title}</td>
                          <td>{<StarRatingStatic rating={totalRating(post)} />}</td>
                          <td>{<StarRatingStatic rating={ownerRating(post)} />} </td>
                          <td>
                            {Likes.length} <ThumbUpAltIcon style={{color: Likes.length > 0 ? '#2193F9' : '#3FF4FC' }}/>
                          </td>
                          <td>{createdAt.slice(0, 10)}</td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item> 
          )
        })
      }
      </Accordion> 
    )
  }



  return (
    <>
      <NavBar/>
      <div  style={{padding: "5% 5% 0 5%"}}>
        <Row className="justify-content-md-center">
          {
            !admin &&  
            <Col md="auto">
              <Button size="lg" onClick={verifyAdmin}>{language.verify}</Button>
            </Col> 
          }
          
        </Row>
        <Row>
          <Container>
            {
              admin &&  AdminTable() 
            }
          </Container>
        </Row>     
      </div>
    </>
  )
}

export default AdminPage