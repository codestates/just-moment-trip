import React from 'react';
import styled from 'styled-components';
import AWS from 'aws-sdk';
import Swal from 'sweetalert2';

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const Upload = styled.input`
  width: 50px !important;
  height: 50px !important;
  font-size: 100px;
  text-align: right;
  min-width: 0 !important;
  outline: none;
  background: rgb(0, 0, 0);
  cursor: inherit;
  display: block !important;
  border-radius: 50% !important;
  cursor: pointer;
  position: absolute;
  margin: 0 !important;
  z-index: -1;
`;

const Label = styled.label`
  position: inherit;
  width: 50px !important;
  height: 50px !important;
  font-size: 30px;
  min-width: 0 !important;
  outline: none;
  background: rgb(255, 255, 255);
  cursor: inherit;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border-radius: 50% !important;
  cursor: pointer;
  border: 2px solid grey;
`;

const Pic = ({ picName, picUploadHandler }) => {
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:8a8d19df-b498-40fe-8b68-719bd6b315c6',
    }),
  });

  const deleteHandler = async name => {
    if (name === 'profile.jpeg') {
      return;
    }

    var s3 = new AWS.S3();
    var params = { Bucket: 'jmtpictures', Key: name };
    await s3.deleteObject(params).promise();
  };

  const handleFileInput = async e => {
    // input 태그를 통해 선택한 파일 객체
    const file = e.target.files[0];

    await deleteHandler(file.name);

    // S3 SDK에 내장된 업로드 함수
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'jmtpictures', // 업로드할 대상 버킷명
        Key: file.name, // 업로드할 파일명 (* 확장자를 추가해야 합니다!)
        Body: file, // 업로드할 파일 객체
      },
    });

    if (picName === file.name) {
      return Swal.fire({
        backdrop: ` rgba(0,0,110,0.5)`,
        text: '같은 파일을 사용할수없습니다. 파일명을 바꿔주세요',
      });
    }

    const promise = upload.promise();

    promise.then(
      function (data) {
        Swal.fire({
          backdrop: ` rgba(0,0,110,0.5)`,
          text: '이미지 업로드에 성공했습니다, 5초만 기다려주시면 바뀝니다',
        }).then(() => {
          picUploadHandler(file.name);
        });
      },
      function (err) {
        return Swal.fire({
          backdrop: ` rgba(0,0,110,0.5)`,
          text: '에러가났습니다 다시 시도해주세요',
        });
      },
    );
  };
  return (
    <Container>
      <Upload type="file" id="upload" onChange={handleFileInput} />
      <Label htmlFor="upload" className="image-upload-wrapper">
        🖼
      </Label>
    </Container>
  );
};

export default Pic;
