import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/common/Navbar';
import './Home.css';

function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Navbar />
      <div className="Home">
        <div className="HomeH1">{/* <h1>Remember Trip</h1> */}</div>
        <div className="somediv">
          <section className="section">
            <div className="masthead-image" id="master-container">
              <div className="content center">
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
            <Link to="/sign-up">
              <span>함께하기</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
