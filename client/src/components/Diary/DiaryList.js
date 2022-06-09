import React, { useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled, { keyframes } from 'styled-components';
import Modal from '../common/Modal';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import parrot9 from '../../Assets/parrot9.gif';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from '../common/Loading';
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

//? ------------------------------------- 현민 작업 히스토리 리스트
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
//? ------------------------------------- 현민 작업 히스토리 리스트

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
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2500);

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
      title: `🦜 를 누르면 기록을 남길 수 있어요

      제목/내용을 검색할 수 있어요 🐟

      🥔 해시태그를 누르면 무슨일이 일어날까요?`,
      html: '사라지기까지 앞으로 <b></b>!',
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

  //? ------------------------------------- 현민 작업 2차원배열 만들기
  function addOneDay(date) {
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    const newDate = new Date(Number(year), Number(month) - 1, Number(day) + 1);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;
    const newDay = newDate.getDate();
    return `${newYear}-${String(newMonth).padStart(2, '0')}-${String(
      newDay,
    ).padStart(2, '0')}`;
  }

  let minDate = '9999-99-99';
  let maxDate = '0000-00-00';
  const allDates = diaryList.map(diary => diary.write_date);
  allDates.forEach(data => {
    if (typeof data === 'object') {
      data = `${data.getFullYear()}-${String(data.getMonth()).padStart(
        2,
        '0',
      )}-${String(data.getDate()).padStart(2, '0')}`;
    }
    const ymd = data.split(' ')[0];
    const year = ymd.split('-')[0];
    const month = ymd.split('-')[1];
    const day = ymd.split('-')[2];

    const minYear = minDate.split('-')[0];
    const minMonth = minDate.split('-')[1];
    const minDay = minDate.split('-')[2];

    const maxYear = maxDate.split('-')[0];
    const maxMonth = maxDate.split('-')[1];
    const maxDay = maxDate.split('-')[2];

    if (Number(year) < Number(minYear)) {
      minDate = ymd;
    } else if (Number(month) < Number(minMonth)) {
      minDate = ymd;
    } else if (Number(day) < Number(minDay)) {
      minDate = ymd;
    }

    if (Number(year) > Number(maxYear)) {
      maxDate = ymd;
    } else if (Number(month) > Number(maxMonth)) {
      maxDate = ymd;
    } else if (Number(day) > Number(maxDay)) {
      maxDate = ymd;
    }
  });

  var dateArray = [];

  var newArr = [];

  if (minDate === '9999-99-99') {
    newArr = [diaryList];
  } else {
    while (minDate !== maxDate) {
      dateArray.push(minDate);
      minDate = addOneDay(minDate);
    }

    dateArray.push(maxDate);

    dateArray.forEach(date => {
      const filtered = diaryList.filter(diary => {
        const filteredDate = diary.write_date.split(' ')[0];
        return filteredDate === date;
      });
      newArr.push(filtered);
    });
  }

  //? ------------------------------------- 현민 작업

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
            태초마을로 가기 🌱
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
                placeholder="검색하세요"
                onKeyPress={changeInput}
              />
              <div>
                <input
                  type="radio"
                  name="searchType"
                  value="title"
                  onClick={getSearchType}
                />{' '}
                제목
                <input
                  type="radio"
                  name="searchType"
                  value="content"
                  onClick={getSearchType}
                />{' '}
                기록
              </div>
            </div>
          </DiaryBox>

          {loading ? (
            <Loading />
          ) : (
            <>
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
                  <p style={{ textAlign: 'center' }}>개의 일기가 있습니다.</p>
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
                  {newArr.map((dateFiltered, idx) => {
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
                  {/* {diaryList.map(it => (
                <DiaryEditor
                  key={it.id}
                  {...it}
                  onCreate={onCreate}
                  onEdit={onEdit}
                  onRemove={onRemove}
                  toggleClicked={toggleClicked}
                  search={search}
                  searchType={searchType}
                />
              ))} */}
                </DiaryListBox>
                <TopBtn marginBottom={1} />
                {/* </DiarySplitBox> */}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
