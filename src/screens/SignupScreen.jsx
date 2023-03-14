import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseConfig";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #343541;
`;

const Input = styled.input`
  padding: 1rem 1rem;
  margin-bottom: 1.2rem;
  width: 100%;
  background: #40414f;
  color: #fafafa;
  border: 0;
  outline: none;
  font-size: 0.9rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  color: #fafafa;
`;
const Button = styled.input`
  padding: 1rem 1rem;
  margin-bottom: 1.2rem;
  width: 100%;
  background: #10a37f;
  color: #fafafa;
  &:active {
    background: #0f8d6e;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  @media (max-width: 500px) {
    width: 80%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Message = styled.p`
  color: #fafafa;
  padding: 0 1rem;
  margin-bottom: 1.2rem;
`;

const ErrorMessage = styled.p`
  color: #ed767a;
  margin-bottom: 1.2rem;
  font-weight: 300;
  font-size: 0.9rem;
  display: none;
`;

const GoogleAuthButton = styled.button`
  padding: 1rem 1rem;
  margin-bottom: 1.2rem;
  width: 100%;
  background: #4e5160;
  color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  &:active {
    background: #4e5160;
  }
`;
function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function signup(e) {
    e.preventDefault();
    setPersistence(auth, browserLocalPersistence).then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log("Sign up successful");
          navigate("/home");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("The email address you entered is already in use.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessage("The email address you entered is not valid.");
          } else if (error.code === "auth/weak-password") {
            setErrorMessage("The password you entered is not strong enough.");
          } else {
            setErrorMessage("An error occurred. Please try again later.");
          }
        });
    });
  }

  function googleAuth() {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log("Google auth successful");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Container>
        <Form onSubmit={signup}>
          <Title>Create your account</Title>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <ErrorMessage style={{ display: errorMessage ? "block" : "none" }}>
            {errorMessage}
          </ErrorMessage>
          <Button type="submit" value="Continue"></Button>
        </Form>
        <Message>
          Already have an account?
          <Link
            style={{
              color: "#10a37f",
              textDecoration: "none",
              marginLeft: "0.5rem",
            }}
            to="/"
          >
            Login
          </Link>
        </Message>
        <Message>OR</Message>
        <GoogleAuthButton onClick={googleAuth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            style={{
              marginRight: "1rem",
            }}
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg>
          Continue with Google
        </GoogleAuthButton>
      </Container>
    </Wrapper>
  );
}

export default SignupScreen;
