import NavBar from "../Nav/NavBar"

import { userContext } from "../Contexts/Contexts";
import { useContext } from "react";
import axios from "axios";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Accordion, Container, Table } from "react-bootstrap";

const AdminPage = () => {
  const context = useContext(userContext);

  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!context) navigate(-1);
    
    
  }, [context]);

  
  const table = (admin) => {
    if (admin === true) {
      return(
        <div>AMIN</div>
      )
    }
    return <div></div>
  }

  const verifyAdmin = async () => {
    const isAdmin = await axios.get("http://localhost:3001/api/users/admin", 
      {headers: {email: context.email}})

      .then((responce) => {
        if (responce.data.userType === 'admin') {
          return true
        }
        return false;

      })

    console.log(isAdmin);
    setAdmin(isAdmin);

    allUsers();
  }

  const allUsers = async () => {
    const responce = await axios.get("http://localhost:3001/api/users/", {headers: {email: context.email}})
    .then((res) => {
      return res}
    );

    console.log(responce.data);
  } 

  return (

    <div>
      <NavBar/>
      <Container>
        {

        }
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>





      {
        table(admin)
      }
      <button onClick={verifyAdmin}> Verify admin</button>
      
    </div>
  )
}

export default AdminPage