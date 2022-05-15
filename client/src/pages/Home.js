import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/common/Navbar';
import './Home.css';

const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 40px;
  font-family: SsurroundFont;
  text-decoration: none;
  margin-top: 40px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ff6670;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;
function Home() {
  const isLoggedIn = useSelector(state => state.sign.isLoggedIn);
  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="somediv">
          <section className="section">
            <div className="masthead-image" id="master-container">
              <div className="content-center">
                <h1 id="master">
                  <div>JUST</div>
                  <div id="master-container-scroller">
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        MISSING
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        MOMENT
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        FLEX
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        LOVELY
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        FRIEND
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        FAMILY
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        NEW WORLD
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        PRESENT
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        EVERYTHING
                      </a>
                    </div>
                    <div className="master-container-scroller_item">SAVE</div>
                  </div>
                  <div>TRIP</div>
                </h1>
              </div>
            </div>
          </section>
        </div>
        <div className="SignLinkBox">
          <div className="SigninLinkBox">
            {isLoggedIn ? (
              <Box>
                <StyledLink to="/trip">
                  <span>Start</span>
                </StyledLink>
              </Box>
            ) : (
              <Box>
                <StyledLink to="/sign-up">
                  <span>함께하기</span>
                </StyledLink>
                <StyledLink to="/sign-in">
                  <span>Start</span>
                </StyledLink>
              </Box>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
