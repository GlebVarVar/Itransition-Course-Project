// import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, firebaseLogin } from '../../services/firebase';


// const LoginForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [user, loading, error] = useAuthState(auth);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       if (loading) {
//         // maybe trigger a loading screen
//         return;
//       }
//       if (user) navigate("/");
//       console.log(user);
//     }, [user, loading]);

//     return (
//         <Form>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control type="email" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)}/>
//                 <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//                 </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
//             </Form.Group>
//             <Button variant="primary" type="submit"  onClick={() => firebaseLogin(email, password)}>
//                 Submit
//             </Button>
//         </Form>
//     )
// }

// export default LoginForm;