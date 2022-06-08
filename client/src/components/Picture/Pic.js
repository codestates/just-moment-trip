import React from 'react';
import styled from 'styled-components';
import AWS from 'aws-sdk';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Upload = styled.input`
  width: 10px !important;
  height: 10px !important;
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
  width: 40px !important;
  height: 40px !important;
  font-size: 30px;
  min-width: 0 !important;
  outline: none;
  background: rgb(178, 178, 255);
  cursor: inherit;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border-radius: 50% !important;
  cursor: pointer;
`;
const icon = <FontAwesomeIcon icon={faImage} style={{ fontSize: '20px' }} />;

const Pic = ({ picName, picUploadHandler }) => {
  AWS.config.update({
    region: 'ap-northeast-2',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_IDENTITYPOOLID,
    }),
  });

  const deleteHandler = name => {
    if (name === 'profile.jpeg') {
      return;
    }

    var s3 = new AWS.S3();
    var params = { Bucket: process.env.REACT_APP_BUCKET, Key: name };
    s3.deleteObject(params).promise();
  };

  const handleFileInput = async e => {
    // input 태그를 통해 선택한 파일 객체
    const file = e.target.files[0];

    deleteHandler(picName);

    // S3 SDK에 내장된 업로드 함수
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: process.env.REACT_APP_BUCKET, // 업로드할 대상 버킷명
        Key: file.name, // 업로드할 파일명
        Body: file, // 업로드할 파일 객체
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        picUploadHandler(file.name);
        Swal.fire({
          backdrop: ` rgba(0,0,110,0.5)`,
          text: '이미지 업로드에 성공했습니다',
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
        <span>{icon}</span>
      </Label>
    </Container>
  );
};

export default Pic;
