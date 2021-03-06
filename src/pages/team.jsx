import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Header, HomeHeader } from 'components';
import { Layout, Container } from 'layouts';
import theme from '../../config/theme';
import { graphql } from 'gatsby';
import TeamList from '../components/TeamList';


const Text = styled.div`
  margin: 2rem 10rem;
`;

const GridWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 400px 400px;
  grid-template-rows: 400px;
  grid-row-gap: 20px;
  width: 75%;
  justify-content: space-around;
  align-content: space-around;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 90%;
    grid: 400px 400px 400px/ 300px 300px;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    width: 95%;
    grid: repeat(6, 400px) / 300px;
  }
  max-width: ${props => props.theme.layout[props.type]};
  height: 100%;
`;

const Card = styled.div`
  box-shadow: ${theme.shadow.navbar};
`;

const HeaderTitle = styled.h1`
  margin: 0;
  padding: 20px;
  padding-bottom: 80px;
  text-align: center;
  font-weight: bold;
`

const Team = ({ data }) => {
  const { missionControlMembers } = data.missionControl;
  const { wellingtonMembers } = data.wellington;
  return (
    <Layout>
      <Helmet title={'Team Page'} />
      <Header title="Our Team"></Header>

      <Container>
        <HeaderTitle>Mission Control</HeaderTitle>
        <GridWrapper>
          {data.missionControl.edges.map(({ node }) => (
            <TeamList
              key={node.id}
              title={node.frontmatter.title}
              name={node.frontmatter.name}
              pic={node.frontmatter.cover.childImageSharp.fluid}
              excerpt={node.excerpt}
              link={node.frontmatter.link}
            />
          ))}
        </GridWrapper>
      </Container>

      <Container>
        <HeaderTitle>Wellington Colony</HeaderTitle>
        <GridWrapper>
          {data.wellington.edges.map(({ node }) => (
            <TeamList
              key={node.id}
              title={node.frontmatter.title}
              name={node.frontmatter.name}
              pic={node.frontmatter.cover.childImageSharp.fluid}
              excerpt={node.excerpt}
              link={node.frontmatter.link}
            />
          ))}
        </GridWrapper>
      </Container>

      <Container>
        <HeaderTitle>Christchurch Colony</HeaderTitle>
        <GridWrapper>
          {data.christchurch.edges.map(({ node }) => (
            <TeamList
              key={node.id}
              title={node.frontmatter.title}
              name={node.frontmatter.name}
              pic={node.frontmatter.cover.childImageSharp.fluid}
              excerpt={node.excerpt}
              link={node.frontmatter.link}
            />
          ))}
        </GridWrapper>
      </Container>

    </Layout>
  );
};

export default Team;

Container.propTypes = {
  center: PropTypes.object,
};

export const query = graphql`
query {
  missionControl: allMarkdownRemark(filter: {fileAbsolutePath: { regex: "/(/content/members/missionControl)/.*\\.md$/" }}sort: { order: ASC, fields: [frontmatter___date] }) {
    edges {
      node {
        ...memberFields
      }
    }
  }

  wellington: allMarkdownRemark(filter: {fileAbsolutePath: { regex: "/(/content/members/wellington)/.*\\.md$/" }}sort: { order: ASC, fields: [frontmatter___date] }) {
    edges {
      node {
        ...memberFields
      }
    }
  }
  
  christchurch: allMarkdownRemark(filter: {fileAbsolutePath: { regex: "/(/content/members/christchurch)/.*\\.md$/" }}sort: { order: ASC, fields: [frontmatter___date] }) {
    edges {
      node {
        ...memberFields
      }
    }
  }
}
fragment memberFields on MarkdownRemark {
  id
  excerpt
    frontmatter {
      title
      name
      link
      date
      cover {
        childImageSharp {
          fluid(
            maxWidth: 1000
            quality: 90
            traceSVG: { color: "#2B2B2F" }
          ) {
            base64
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
            presentationWidth
            presentationHeight
          }
        }
      }
  }
}
`;
