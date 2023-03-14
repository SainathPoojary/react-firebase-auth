import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseConfig";

const Button = styled.button`
  padding: 1rem 1rem;
  margin-bottom: 1.2rem;
  width: 100%;
  background: #10a37f;
  color: white;
  &:active {
    background: #0f8d6e;
  }
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  @media (max-width: 500px) {
    width: 80%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #343541;
`;

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, []);

  function logout() {
    signOut(auth).then(() => {
      navigate("/");
    });
  }

  return (
    <Container>
      <Form>
        <Button onClick={logout}>Logout</Button>
      </Form>
    </Container>
  );
}

export default Home;
