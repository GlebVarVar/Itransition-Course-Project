import { userContext } from '../Contexts/Contexts';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Utils
import { ownerRating, totalRating } from '../utils/Functions';
// Components
import { Accordion, Container, Table, Button, Col, Row, ButtonGroup } from 'react-bootstrap';
import { NavBar } from '@/components/Nav';
import { StarRatingStatic } from '../Stars/Stars';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

// API
import { deleteUserPostAPI } from '../../services/Posts';
import { getUserAPI } from '../../services/Users';


import { useTranslation } from 'react-i18next';

export const Profile = () => {
  const context = useContext(userContext);
  const { t } = useTranslation();
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!context) {
      navigate(-1);
    } else {
      getUserAPI(profileId).then((res) => {
        setData(res.data);
      });
    }
  }, [context]);

  const PostsTable = () => {
    if (Object.keys(data).length) {
      return (
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{data.email}</Accordion.Header>
            <Accordion.Body>
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
                    {context.email == data.email ? <th>{t("deletePostText")}</th> : null}
                  </tr>
                </thead>

                <tbody>
                  {data.Posts.map((post, key) => {
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
                        {context.email == data.email ? (
                          <td>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteUserPostAPI(id);
                                () => {
                                  getUserAPI(profileId).then((res) => {
                                    setData(res.data);
                                  });
                                };
                              }}>
                              {t("deletePost")}
                            </Button>
                          </td>
                        ) : null}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '5% 5% 0 5%' }}>
        <Container>
          <PostsTable />
        </Container>
      </div>
    </>
  );
};
