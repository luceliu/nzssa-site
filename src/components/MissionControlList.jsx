import React from 'react';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import { Container } from 'layouts';

const Wrapper = styled.article`
  margin: 0 3rem;
`;

const MissionControlList = ({ id }) => (
  <Container>
    <Wrapper>
      <p>Id is: {id}</p>
    </Wrapper>
  </Container>
);

export default MissionControlList;
