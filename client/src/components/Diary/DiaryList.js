import React, { useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled, { keyframes } from 'styled-components';
import Modal from '../common/Modal';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import parrot9 from '../../Assets/parrot9.gif';
import 'aos/dist/aos.css';

import TopBtn from '../common/TopBtn';

const AnimationBox = keyframes`
50% {
    border-top-color: rgb(201, 199, 237);
    border-right-color: rgb(201, 199, 237);
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  99% {
    border-bottom-color: rgb(201, 199, 237);
    border-left-color: rgb(201, 199, 237);
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
  }
  100% {
    border-color: rgb(201, 199, 237);
  }
`;

const ChangeColor = keyframes`
14% {color:red}
28% {color:orange}
42% {color:yellow}
56% {color:green}
70% {color:blue}
84% {color:navy}
98% {color:purple}

`;

const DiaryModalBtnAnimation = keyframes`
  50% {top: 0; opacity: 1}
  100% {top: -300px; opacity: 0}
  `;

const IconBtn = styled.div`
  animation-name: ${DiaryModalBtnAnimation};
  animation-duration: 0.5s;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  padding: 30px 0;
  display: flex;
  font-size: 2em;
`;

const Wrapper2 = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px 0;
  display: flex;
  font-size: 2em;
`;

const PBox = styled.p`
  padding: 10px;
  font-size: 50px;
  border-radius: 20px;
  border: 2px solid transparent;
  animation-name: ${AnimationBox};
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-duration: 6s;
  animation-timing-function: initial;
`;

const SearchInput = styled.input`
  border-bottom: 0.8px solid rgb(201, 199, 237);
  width: 50vw;
  height: 50px;
  align-items: center;
  text-align: center;
  font-family: SsurroundFont;
  font-size: 1em;
  background-color: transparent;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;

  :hover {
    z-index: 1;
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const FilterBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-family: ManfuMedium;
  font-size: 1.5em;
  :hover {
    z-index: 1;
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const HelpBtnBox = styled.button`
  outline: none;
  border: none;
  size: 50px;
  padding: 5vw 5vh;
  background-color: transparent;
  font-size: 20px;
  :hover {
    transition: all 0.2s linear;
    transform-origin: 0% 100%;
    animation: ${ChangeColor} 1.5s linear infinite;
  }
`;

//? ------------------------------------- ???????????? ?????????
const HistoryList = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(minmax(25vw, 1fr));
  text-align: center;

  > .Date {
    margin: 25px 0;
    font-size: 40px;
  }
`;

const HistoryListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
//? ------------------------------------- ???????????? ?????????

const doveIcon = (
  <IconBtn>
    <FontAwesomeIcon icon={faDove} style={{ fontSize: '60px' }} />
  </IconBtn>
);

function DiaryList({
  onCreate,
  onEdit,
  onRemove,
  diaryList,
  changeInput,
  search,
  getSearchType,
  searchType,
}) {
  const DiaryListBox = styled.div`
    display: grid;
    grid-template-columns: repeat(minmax(25vw, 1fr));
    text-align: center;
  `;

  const FilterListBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 75vh;
    justify-content: center;
    align-items: center;
    text-align: center;
  `;

  const DiaryBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(211, 226, 244);
    padding-bottom: 40px;
    align-items: center;
  `;
  const [clickedHashtag, setClickedHashtag] = useState('');
  const [clicked, setClicked] = useState(false);

  const toggleClicked = event => {
    setClicked(true);
    setClickedHashtag(event.target.innerText);
    // console.log('------------- clicked?', clicked);
    // console.log('------------- clickedHashtag', clickedHashtag);
  };

  function filterDiary() {
    return diaryList.filter(it => {
      let test = false;
      it.hashtags.forEach(element => {
        if (element === clickedHashtag) test = true;
      });
      return test;
    });
  }

  //!-----------------
  const helpBtnFx = () => {
    let timerInterval;
    Swal.fire({
      width: 800,
      height: 900,
      title: `???? ??? ????????? ????????? ?????? ??? ?????????

      ??????/????????? ????????? ??? ????????? ????

      ???? ??????????????? ????????? ???????????? ????????????????`,
      html: '?????????????????? ????????? <b></b>!',
      timer: 2000,
      timerProgressBar: true,
      backdrop: `
      rgba(0,0,110,0.5)
      url(${parrot9})
      top
      no-repeat
    `,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(result => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('I was closed by the timer');
      }
    });
  };
  //!-----------

  //? ------------------------------------- ?????? ??????
  const dateSortedArray = [];
  let container = [];

  for (let i = 0; i < diaryList.length; i++) {
    const currDate = diaryList[i].write_date.split(' ')[0];
    if (container.length === 0) {
    } else if (
      currDate !== container[container.length - 1].write_date.split(' ')[0]
    ) {
      dateSortedArray.push(container);
      container = [];
    }
    container.push(diaryList[i]);
  }
  dateSortedArray.push(container);

  //? ------------------------------------- ?????? ??????

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {clicked ? (
        <>
          <p
            style={{ fontSize: '3em', fontFamily: 'ManfuMedium' }}
          >{`#${clickedHashtag}`}</p>
          <FilterListBox>
            {filterDiary().map(it => (
              <DiaryEditor
                key={it.id}
                {...it}
                diaryList={diaryList}
                onCreate={onCreate}
                onEdit={onEdit}
                onRemove={onRemove}
                toggleClicked={toggleClicked}
                search={search}
                searchType={searchType}
              />
            ))}
          </FilterListBox>
          <FilterBtn
            onClick={() => {
              setClicked(false);
            }}
          >
            ??????????????? ?????? ????
          </FilterBtn>
        </>
      ) : (
        <>
          <DiaryBox>
            <div>
              <Modal name={doveIcon}>
                <DiaryWriteUp onCreate={onCreate} />
              </Modal>
            </div>
            <div style={{ padding: '20px 0' }}>
              <SearchInput
                type="text"
                placeholder="???????????????"
                onKeyPress={changeInput}
              />
              <div>
                <input
                  type="radio"
                  name="searchType"
                  value="title"
                  onChange={getSearchType}
                  checked={searchType === 'title'}
                />{' '}
                ??????
                <input
                  type="radio"
                  name="searchType"
                  value="content"
                  onChange={getSearchType}
                  checked={searchType === 'content'}
                />{' '}
                ??????
              </div>
            </div>
          </DiaryBox>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Wrapper2>
              <PBox>{diaryList.length}</PBox>
              <p style={{ textAlign: 'center' }}>?????? ????????? ????????????.</p>
            </Wrapper2>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <HelpBtnBox onClick={helpBtnFx}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ fontSize: '60px' }}
              />
            </HelpBtnBox>
          </div>
          <div>
            <DiaryListBox>
              {dateSortedArray.map((dateFiltered, idx) => {
                return (
                  <HistoryList
                    key={idx}
                    data-aos="fade-up"
                    data-aos-offset="-400"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="firse"
                    data-aos-anchor-placement="top-center"
                  >
                    {dateFiltered.length > 0 ? (
                      <div
                        className="Date"
                        style={{
                          fontFamily: 'ManfuMedium',
                        }}
                      >
                        {dateFiltered[0].write_date.split(' ')[0]}
                      </div>
                    ) : null}
                    <HistoryListBox>
                      {dateFiltered.map(diary => (
                        <DiaryEditor
                          key={diary.id}
                          {...diary}
                          onCreate={onCreate}
                          onEdit={onEdit}
                          onRemove={onRemove}
                          toggleClicked={toggleClicked}
                          search={search}
                          searchType={searchType}
                        />
                      ))}
                    </HistoryListBox>
                  </HistoryList>
                );
              })}
            </DiaryListBox>
            <TopBtn marginBottom={1} />
          </div>
        </>
      )}
    </>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
