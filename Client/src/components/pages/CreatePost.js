
import { useEffect, useState, useContext } from "react";
import {userContext, languageContext} from "../Contexts/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import { InputGroup, DropdownButton, Dropdown, Toast, FormControl, Tabs, Tab, Form,Carousel, Container, FloatingLabel, Col, Row, ButtonGroup, Button } from "react-bootstrap";
import NavBar from "../Nav/NavBar"
import DropdownExampleMultipleSearchSelection from "../Search/Search";
import {Image} from 'cloudinary-react';

import { postCreatePostAPI } from "../../services/Posts";

import './Style/DragAndDrop.css'
import './CreatePost.css'

const CreatePost = () => {

  const navigate = useNavigate();
  const context = useContext(userContext);
  const {language} = useContext(languageContext);


  const [alltags, setAlltags] = useState([]);

  const [tags, setTags] = useState([]); // Post tags
  const [postText, setPostText] = useState(''); // PostText
  const [title, setTitle] = useState(''); // title
  const [Rating, setRating] = useState(''); // rating
  const [category, setCategory] = useState(language.choosePostCategory); // category


  const [errorCreate, setErrorCreate] = useState({
    errorMessage: '',
    error: false
  });

  const [PhotosToUpload, setPhotosToUpload] = useState([]); // photos to upload

  const [photos, setPhotos] = useState([{
    profileIng: 'https://crankwheel.com/uploads/2019/06/12/CW_How%20to%20deliver%20the%20perfect%20instant%20online%20product%20demo.jpg'
  }]); // photos to display

  const [ImageLinks, setImageLinks] = useState([]); // image links for db


  // console.log(tags);

  const getAllTags = async() => {
    const options = await axios.get(`http://localhost:3001/api/tags/all`);
    const listOfTags = options.data ;
    setAlltags(listOfTags.map((tag, key) => {
      return {key: key, text: tag.tag, value: tag.tag}
  }));
    
  }
  // console.log(ImageLinks);
    
  useEffect(() => {
    if (!context) navigate(-1); 
    
    getAllTags();
    
    return;
    
  }, [context]);


    const createPost = async (e) => {
      e.preventDefault();


      if (category === language.choosePostCategory ) {
        setErrorCreate({error: true, errorMessage: 'Please choose category'})
      } else if(tags.length === 0) {
        setErrorCreate({error: true, errorMessage: 'Please choose at least one tag'})
      } else if(title.length === 0) {
        setErrorCreate({error: true, errorMessage: 'Please enter a title'})
      } else if(Rating == '') {
        setErrorCreate({error: true, errorMessage: 'Please enter rating'})
      } else {
        const email = context.email;

        

        functionsAfterSubmit(email);
        
      }
    }


    const updateForm = () => {
      setTitle('');
        setPostText('');
        
        setRating('')
        setCategory(language.choosePostCategory);

        setImageLinks([]);
        setPhotos([{
          profileIng: 'https://cdn.mos.cms.futurecdn.net/CAZ6JXi6huSuN4QGE627NR.jpg'
        }]);
        setPhotosToUpload([]);
        setTags([]);
    }

    const functionsAfterSubmit = async (email) => {
      const res = await postCreatePostAPI(title, postText, email, category );
      const PostId = res.data;
      console.log(tags);

      await axios.post('http://localhost:3001/api/tags/', {tags, PostId});
      await axios.post('http://localhost:3001/api/rating/', {Rating, email, PostId});
      uploadImage(PostId);
      

      const newAlltags = alltags.map((tag) => {
        return tag.text
      });


      console.log(tags, newAlltags);
      tags.forEach((tag) => {
        if(newAlltags.includes(tag)  !== true){
          axios.post('http://localhost:3001/api/tags/all', {tag}).then((res) => console.log(res))
        } 
      });
      


      updateForm();
    }

    const uploadImage = async (PostId) => {
      let mas = []
      for (let i = 0; i < PhotosToUpload.length; i++) {
        if (PhotosToUpload[i] !==undefined) {
          const formData = new FormData();
          formData.append('file', PhotosToUpload[i]);
          formData.append('upload_preset', 'kiqfxzx7');
          const res = await axios.post('https://api.cloudinary.com/v1_1/dh3b8rkyd/image/upload', formData);
           mas.push(res.data.url);
        } else {
          
        }
        
      }
      
      console.log(mas);
      setImageLinks(mas);
      await axios.post('http://localhost:3001/api/photos/', {PostId, mas});
    }



    const imageHandler =  async (e) => {
      const reader = new FileReader();
      for (const item of e.target.files) {
        reader.readAsDataURL(item);
        reader.onload = async () => {
          if (reader.readyState === 2) {
            if(photos[0].profileIng === 'https://cdn.mos.cms.futurecdn.net/CAZ6JXi6huSuN4QGE627NR.jpg') {
              setPhotos([{profileIng: reader.result}]);
            } else {
              setPhotos([...photos, {profileIng: reader.result}]);
            }
            
          }
        }
      }
      

      
      
      
    }

    return (
        <>
        <NavBar/>
        <div  style={{padding: "5% 5% 0 5%"}}>

          <Row>
            <Col md={6} className="mb-2">
              <Toast show={errorCreate.error} onClose={() => setErrorCreate({error: !errorCreate.error})}>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Itransitions</strong>
                </Toast.Header>
                <Toast.Body>{errorCreate.errorMessage}</Toast.Body>
              </Toast>
            </Col>
          </Row> 
        
        <Container>
        
          <Row>

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
            
          </Row>

          <Row xs={1} sm={1} lg={2}>
            <Col >
              <Row className="g-2">
                <Col md>
                  <FloatingLabel controlId="floatingInputGrid" label="Title">
                    <Form.Control onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Iron Man" />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel controlId="floatingSelectGrid" label="Rating">
                    <Form.Select aria-label="Floating label select example" value={Rating} onChange={(e) => setRating(e.target.value)}>
                      <option>Open this select menu</option>
                      <option value="5">5 - Awesome!</option>
                      <option value="4">4 - Great!</option>
                      <option value="3">3 - Okay</option>
                      <option value="2">2 - bad</option>
                      <option value="1">1 - horrible</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Carousel>
                  {
                    photos.map((photo, key) => {
                      return (
                        <Carousel.Item key={key}>
                          <img
                            className="d-block w-100"
                            src={photo.profileIng}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      )
                    })
                  }
                </Carousel>
              </Row>
                  
              <Row>

              </Row>
              <Row>
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

                  }} 
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp" />
                  <Button onClick={createPost}>Submit</Button>
                </Form.Group>
              </Row>
              <Row>

              </Row>
            </Col>
            


            <Col>
              <Row>
                <Tabs defaultActiveKey="Edit" id="uncontrolled-tab-example" className="mb-3">
                  <Tab eventKey="Edit" title="Edit">
                    <FloatingLabel controlId="floatingTextarea2" label="Your text here">
                      <Form.Control
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                      />
                    </FloatingLabel>
                  </Tab>
                  <Tab eventKey="Preview" title="Preview">
                  <ReactMarkdown>{postText}</ReactMarkdown>
                  </Tab>
                </Tabs>
              </Row>
            </Col>
          </Row>
        </Container>
        
        </div>
      </>
    )
}

    
  
  
export default CreatePost