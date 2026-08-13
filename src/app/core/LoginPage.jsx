import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../css/LoginPage.css';
import pharma1 from './LoginImages/pharma1.jpg';
import pharma2 from './LoginImages/pharma2.jpg';
import pharma3 from './LoginImages/pharma3.jpg';
import login_validation from './login_validation';
import { useFormik } from 'formik';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../src/actions/loginactions';
import { API_REQUEST } from '../lib/fetchApi';
import { setAccessToken, useTimestampValidation } from '../lib/authToken';
import BouncingLoader from '../common/BouncingLoader';

const initialValues = {
  emailid: '',
  password: '',
  keepSignIn: true,
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const hasParam = params.get('para') !== null;

  const [loading, setLoading] = useState(hasParam);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const para = params.get('para');
    const para_id = params.get('para_id');
    const para_ts = params.get('para_ts');

    if (para && para_id) {
      autoLogin(para, para_id, para_ts);
    } else {
      tryRefreshLogin();
    }
  }, [location.search]);

  const decryptEmail = async (encryptedEmail, key) => {
    try {
      const response = await fetch(
        `${API_REQUEST}GetDecryptAndEncodeVal?value=${encodeURIComponent(encryptedEmail)}&key=${encodeURIComponent(key)}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to decrypt email: ' + response.statusText);
      }

      const data = await response.json();
      return decodeURIComponent(data.decryptEmail || '');
    } catch (error) {
      setErrorMessage('Auto login validation failed.');
      throw error;
    }
  };

  const autoLogin = async (para, para_id, para_ts) => {
    try {
      setErrorMessage('');
      setLoading(true);

      const decryptedTs = await decryptEmail(para_ts, para_id);
      const isTimestampValid = useTimestampValidation(decryptedTs);

      if (!isTimestampValid) {
        setErrorMessage('Invalid or expired auto-login link.');
        setLoading(false);
        return;
      }

      const decryptedEmail = await decryptEmail(para, para_id);

      const response = await dispatch(loginUser({
        emailid: decryptedEmail,
        password: 'demand',
        keepSignIn: true,
      })).unwrap();

      if (response.code === 1) {
        redirectUser(response);
      } else {
        setErrorMessage(response.message || 'Auto-login failed');
      }
    } catch (error) {
      setErrorMessage('Auto-login failed. Please sign in manually.');
    } finally {
      setLoading(false);
    }
  };

  const tryRefreshLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_REQUEST}refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data?.token) {
        setAccessToken(data.token);
        navigate('/mainLayout/SalesPortal', { replace: true });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Session renewal failed. Please log in.');
    }
  };

  const redirectUser = (response) => {
    const isAll = response.data?.[0]?.enetsale === 'ALL';
    const destination = isAll ? '/mainLayout/SalesPortal' : '/mainLayout/dashboard';
    navigate(destination, { replace: true });
  };

  const handleBlurEmail = async (e) => {
    const email = e.target.value;
    if (!email) return;

    try {
      const response = await fetch(
        `${API_REQUEST.replace('api/Sales/', 'api/')}User/userEmailId?user_id=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) return;
      const data = await response.json();

      if (data.data?.[0]?.emailid) {
        setFieldValue('emailid', data.data[0].emailid);
      }
    } catch {
      // Ignore lookup failures in UI
    }
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
    initialValues,
    validationSchema: login_validation,
    onSubmit: async (formValues) => {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await dispatch(loginUser(formValues)).unwrap();
        if (response.code === 1) {
          redirectUser(response);
        } else {
          setErrorMessage(response.message || 'Login failed');
        }
      } catch (error) {
        setErrorMessage(error?.message || 'Failed to login. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const sliderSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  if (loading) {
    return <BouncingLoader />;
  }

  return (
    <Container fluid className="login-page vh-100 d-flex align-items-center">
      <Row className="w-100 clsportal">
        <Col
          md={6}
          className="bg-light p-5 d-flex flex-column align-items-center justify-content-center"
        >
          <div className="text-center mb-4">
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="Company Logo"
              className="mb-3"
              style={{ width: '120px' }}
            />
            <h2>Sales Portal Login</h2>
          </div>

          <Form className="w-75" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
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
                checked={values.keepSignIn}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
            <div className="text-center">
              <Button className="w-100 mb-2 btn-onelogin flex-grow" type="button">
                Login with onelogin
              </Button>
            </div>
          </Form>
        </Col>

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
