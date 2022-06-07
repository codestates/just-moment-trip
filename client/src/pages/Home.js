import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/common/Navbar';
import './Home.css';

const Box = styled.div`
  position: fixed;
  padding: ${props => props.padding};
  display: flex;
  justify-content: ${props => props.display};
  font-size: 40px;
  font-family: ManfuMedium;
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
  var style = [
    'padding : 30px 20px',
    'margin : 20px 0',
    'background : linear-gradient(#9370e5, #FFE8F3)',
    'font-size : 20px',
    'font-weight : bold',
    'text-align : center',
    'color : #ffffff',
  ].join(';');
  useEffect(() => {
    setTimeout(() => {
      console.log('%c 안녕하세요! HELLO! 你好 ! こんにちは ! 🦜', style);
    }, 2000);
  }, []);
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
                        MOMENT
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        REMEMBER
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
                        FRIENDLY
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        MUKBANG
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        GO
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        ENJOY
                      </a>
                    </div>
                    <div className="master-container-scroller_item">
                      <a className="cta-link" href="#">
                        UNIVERSAL
                      </a>
                    </div>
                    <div className="master-container-scroller_item">SAVE</div>
                  </div>
                  <div>TRIP</div>
                </h1>
                <div className="SignLinkBox">
                  <div className="SigninLinkBox">
                    {isLoggedIn ? (
                      <Box display="center" padding="120px 0 0 108px">
                        <StyledLink className="LoginSpan" to="/trip">
                          <span>시작하기</span>
                        </StyledLink>
                      </Box>
                    ) : (
                      <Box display="space - evenly" padding="120px 0 0 0">
                        <StyledLink className="LoginSpan" to="/sign/up">
                          <span
                            className="LoginSpan"
                            style={{ marginRight: '90px' }}
                          >
                            함께하기
                          </span>
                        </StyledLink>
                        <StyledLink className="LoginSpan" to="/sign/in">
                          <span>시작하기</span>
                        </StyledLink>
                      </Box>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
