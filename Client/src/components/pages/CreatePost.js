import NavBar from "../Nav/NavBar"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from "../Contexts/Contexts";
import { useContext } from "react";
import SearchBar from "../forms/SearchBar";
import { Spinner } from "react-bootstrap";

import { InputGroup, DropdownButton, Dropdown, FormControl, Form, Container } from "react-bootstrap";

import axios from "axios";


const CreatePost = () => {

  const navigate = useNavigate();
  const context = useContext(userContext)  

  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [category, setCategory] = useState('Choose category');
  const [tags, setTags] = useState([]);
  
  const [alltags, setAlltags] = useState([]);

  const [dataDisplay, setDataDisplay] = useState([]);

  const [error, serError] = useState(false);

  useEffect(() => {
    if (!context) navigate(-1); 
    return;
  }, [context]);

    const crPost = async (e) => {
      e.preventDefault();
      if (category === "Choose category") {
        return 
      }
      const email = context.email;
      await axios.post("http://localhost:3001/api/posts", {title, postText, email }).then((res) => {
        console.log(res);
      });

      setTitle('');
      setPostText('');
    }
    

    const search = async (e) => {
      e.preventDefault();
      const lisOFTags = await axios.get('http://localhost:3001/api/tags');
      setAlltags(lisOFTags.data);

    }

    const findTag = (e) => {
      const searchword = e.target.value;
      if (searchword=== '')  {
        setDataDisplay([...dataDisplay]);
        console.log(dataDisplay);
      }

      const newFilter = alltags.filter((value) => {
        return value.tag.toLowerCase().includes(searchword.toLowerCase());
      });
      setDataDisplay(newFilter);

    } 

    const addTagToPage = (e) => {
      e.preventDefault();
      setTags([...tags, e.target.innerText]);
    }

    const clear = () => {
      setDataDisplay([]);
    }

    return (
      <div >
        <NavBar/>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={category}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={() => setCategory('Films')}>Films</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory('Books')}>Books</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory('Games')}>Games</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        <Container style={{width: "10%", float: 'right', margin: '100px 100px 0px 0px'}}> 
          <Form className="justify-content-" onClick={(e) => search(e)}>
            <FormControl
            onChange={(e) => findTag(e)}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
                
          </Form>
        </Container>
        {dataDisplay.length != 0 ? (
        <div className="dataResult" style={{width: "10%", float: 'right'}}>
          {dataDisplay.slice(0, 15).map((value, key) => {
            return (
              <button className="dataItem" onClick={(e) => addTagToPage(e)} target="_blank" key={key}>
                {value.tag}
              </button>
            );
          })}
        </div> 
      ): ""}
      
        {
          tags.map((tag, key) => {
            return <p key={key} >{tag}</p>
          })
        }
        <div>CreatePost</div>
        
        <input value={title}  onChange={(e) => setTitle(e.target.value)} placeholder="title"/>
        <input value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="postText"/>
        <button onClick={(e) =>  crPost(e)}> Submit</button>
      </div>
    )
}

    
  
  
export default CreatePost