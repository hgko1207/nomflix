import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 4px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 20px;
`;

const Title = styled.h3`
  font-size: 40px;
`;

const ItemContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Link = styled.a`
  all: unset;
  width: 20px;
  height: 10px;
  background-color: rgb(245, 197, 24);
  color: rgb(0, 0, 0);
  font-weight: 900;
  text-transform: capitalize;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 5px;
`;

const TabStyle = {
  marginTop: "20px",
  width: "50%"
};

const TabPanelStyle = {
  padding: "10px",
  fontSize: "12px"
};

const VideoContent = styled.div`
  margin-bottom: 12px;
  transition: all 0.3s ease-in-out 0s;
  &:hover {
    font-size: 14px;
  }
`;

const TabContent = styled.div`
  margin-bottom: 10px;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <Title>Loading | Komflix</Title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name} | Nomflix
        </title>
      </Helmet>
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{result.original_title ? result.original_title : result.original_name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>.</Divider>
            <Item>{result.runtime ? result.runtime : result.episode_run_time[0]} min</Item>
            <Divider>.</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                )}
            </Item>
            <Divider>.</Divider>
            <Item>
              <Link
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
                bgImage={require("../../assets/logoImdb.png")}
              >
                Imdb
              </Link>
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Tabs style={TabStyle}>
            <TabList>
              <Tab>Youtube</Tab>
              <Tab>Production Company</Tab>
              <Tab>Production Countries</Tab>
            </TabList>

            <TabPanel style={TabPanelStyle}>
              {result.videos.results
                ? result.videos.results.map(video => (
                    <VideoContent>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {video.name}
                      </a>
                    </VideoContent>
                  ))
                : ""}
            </TabPanel>
            <TabPanel style={TabPanelStyle}>
              {result.production_companies
                ? result.production_companies.map(company => (
                    <TabContent>{company.name}</TabContent>
                  ))
                : ""}
            </TabPanel>
            <TabPanel style={TabPanelStyle}>
              {result.production_countries
                ? result.production_countries.map(country => (
                    <TabContent>{country.name}</TabContent>
                  ))
                : ""}
            </TabPanel>
          </Tabs>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
