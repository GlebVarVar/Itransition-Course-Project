import { userContext } from '../Contexts/Contexts';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Utils
import { ownerRating, totalRating } from '../utils/Functions';
// Components
import { Accordion, Container, Table, Button, Col, Row, ButtonGroup } from 'react-bootstrap';
import { NavBar } from '@/components/Nav';
import { StarRatingStatic } from '../Stars/Stars';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

// API
import { putAdminAPI, getIsUserAdminAPI } from '../../services/Admin';
import { deleteUserPostsAPI, deleteUserPostAPI } from '../../services/Posts';
import { getAllUsersAPI } from '../../services/Users';



import { useTranslation } from 'react-i18next';

export const AdminPage = () => {
  const context = useContext(userContext);

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!context) navigate(-1);
  }, [context]);

  const verifyAdmin = async () => {
    const isAdmin = await getIsUserAdminAPI(context.email).then((responce) => {
      if (responce.data.userType === 'admin') {
        return true;
      }
      return false;
    });

    setAdmin(isAdmin);
    getAllUsers();
  };

  const getAllUsers = async () => {
    const response = await getAllUsersAPI(context.email);
    setData(response.data);
  };

  const AdminTable = () => {
    return (
      <Accordion>
        {data.map((user, key) => {
          const isDisabled = user.userType == 'admin' ? true : false;

          return (
            <Accordion.Item key={key} eventKey={key}>
              <Accordion.Header>{user.email}</Accordion.Header>
              <Accordion.Body>
                <ButtonGroup size="sm" className="mb-2">
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteUserPosts(user.email);
                      getAllUsers();
                    }}>
                    {t("deletePosts")}
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => putAdminAPI(user.email)}
                    disabled={isDisabled}>
                    {t("appointAdmin")}
                  </Button>
                  <Button onClick={() => navigate(`/users/${user.id}`)}>{t("userLink")}</Button>
                  <Button variant="success" onClick={getAllUsers}>
                    {t("refresh")}
                  </Button>
                </ButtonGroup>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>{t("postId")}</th>
                      <th>{t("category")}</th>
                      <th>{t("title")}</th>
                      <th>{t("userRating")}</th>
                      <th>{t("authorRating")}</th>
                      <th>{t("likes")}</th>
                      <th>{t("сreated")}</th>
                      <th>{t("deletePostText")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {user.Posts.map((post, key) => {
                      const { id, category, createdAt, title, Likes } = post;

                      return (
                        <tr key={key}>
                          <td onClick={() => navigate(`/posts/${post.id}`)}>{id}</td>
                          <td onClick={() => navigate(`/posts/${post.id}`)}>{category}</td>
                          <td onClick={() => navigate(`/posts/${post.id}`)}>{title}</td>
                          <td onClick={() => navigate(`/posts/${post.id}`)}>
                            {<StarRatingStatic rating={totalRating(post)} />}
                          </td>
                          <td onClick={() => navigate(`/posts/${post.id}`)}>
                            {<StarRatingStatic rating={ownerRating(post)} />}{' '}
                          </td>
                          <td onClick={() => navigate(`/posts/${post.id}`)}>
                            {Likes.length}{' '}
                            <ThumbUpAltIcon
                              style={{ color: Likes.length > 0 ? '#2193F9' : '#3FF4FC' }}
                            />
                          </td>
                          <td onClick={() => navigate(`/posts/${post.id}`)}>
                            {createdAt.slice(0, 10)}
                          </td>
                          <td>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteUserPostAPI(id);
                              }}>
                              {t("deletePost")}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '5% 5% 0 5%' }}>
        <Row className="justify-content-md-center">
          {!admin && (
            <Col md="auto">
              <Button size="lg" onClick={verifyAdmin}>
                {t("verify")}
              </Button>
            </Col>
          )}
        </Row>
        <Row>
          <Container>{admin && AdminTable()}</Container>
        </Row>
      </div>
    </>
  );
};
