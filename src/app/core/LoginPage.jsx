import React, { useState } from 'react';
import Slider from 'react-slick';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/LoginPage.css'; // Custom styles
import alkemLogo from './logo.png'; // Replace with your company logo
import pharma1 from './LoginImages/pharma1.jpg'; // Replace with your company logo
import pharma2 from './LoginImages/pharma2.jpg'; // Replace with your company logo
import pharma3 from './LoginImages/pharma3.jpg';
import login_validation from './login_validation';
import { useFormik } from 'formik';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../src/actions/loginactions';

const initialValues = {
  emailid: '',
  password: '',
  keepSignIn: false,
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const { data, isAuthorized, isLoading } = useSelector((state) => {
    return state.app;
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const [errorMessage, setErrorMessage] = useState(''); // To display API errors

  const navigate = useNavigate();

  // Check for token in localStorage and validate expiry
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT (assume JWT structure: header.payload.signature)
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check for exp (expiry) in seconds
        if (payload.exp && Date.now() < payload.exp * 1000) {
          // Token is valid, redirect user
          // You can add more logic here if needed
          navigate('/mainLayout/SalesPortal');
        } else {
          // Token expired, remove it
          //localStorage.removeItem('token');
        }
      } catch (e) {
        // Invalid token, remove it
        //localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  const sliderSettings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: login_validation,
    onSubmit: async (e) => {
      try {
        setLoading(true); // Show loading state
        setErrorMessage(''); // Clear any previous errors
        dispatch(loginUser(e))
          .unwrap()
          .then((f) => {
            if (f.code === 1) {
              if (f.data[0].enetsale === 'ALL') {
                navigate('/mainLayout/SalesPortal');
              } else {
                navigate('/mainLayout/dashboard');
              }
            } else {
              alert(f.message);
            }
          })
          .catch(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage(
          error.response?.data?.message || 'Failed to login. Please try again.'
        );
      } finally {
        setLoading(false); // Hide loading state
        //navigate("/dashboard");
      }
    },
  });

  const handleBlurEmail = async (e) => {
    const email = e.target.value;
    try {
      // Example: Replace with your actual API endpoint and logic
      // const response = await axios.post(
      //   `https://192.168.120.64/React_Login_api/api/User/userEmailId?user_id=${email}`
      // );
      const response = await axios.post(
        `https://alkemcrm.com/salesapi/api/User/userEmailId?user_id=${email}`
      );
      const data = await response.data;

      if (data.data[0].emailid) setFieldValue('emailid', data.data[0].emailid);
      else setFieldValue('emailid', 'undefine');
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  return (
    <Container fluid className="login-page vh-100 d-flex align-items-center">
      <Row className="w-100 clsportal">
        {/* Left Section */}
        <Col
          md={6}
          className="bg-light p-5 d-flex flex-column align-items-center justify-content-center"
        >
          <div className="text-center mb-4">
            <img
              //src={`${process.env.PUBLIC_URL}/logo.png`}
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="Company Logo"
              className="mb-3"
              style={{ width: '120px' }}
            />
            <h2>Sales Portal Login</h2>
          </div>
          <Form className="w-75" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="emailid"
                placeholder="Enter your Emailid"
                value={values.emailid}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                  handleBlurEmail(e);
                }}
              />
              {touched.emailid && errors.emailid ? (
                // toast.error(errors.emailid)
                <p className="form-error">{errors.emailid}</p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCheckbox">
              <Form.Check
                type="checkbox"
                name="keepSignIn"
                label="Keep me signed in"
                onChange={handleChange}

              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
            <div className="text-center">
              <Button className="w-100 mb-2 btn-onelogin flex-grow">
                Login with onelogin
              </Button>
            </div>
          </Form>
        </Col>

        {/* Right Section */}
        <Col md={6} className="d-none d-md-flex p-0">
          <Slider {...sliderSettings} className="w-100">
            <div>
              <img
                src={pharma1}
                alt="Slide 1"
                className="img-fluid"
                style={{ height: '100vh', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src={pharma2}
                alt="Slide 2"
                className="img-fluid"
                style={{ height: '100vh', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src={pharma3}
                alt="Slide 3"
                className="img-fluid"
                style={{ height: '100vh', objectFit: 'cover' }}
              />
            </div>
          </Slider>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
