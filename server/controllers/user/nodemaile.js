const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");

exports.sendEmail = (email, newPassword) => {
  //이메일 보내기
  var smtpTransport = nodemailer.createTransport(
    smtpTransporter({
      service: "Naver",
      host: "smtp.naver.com",
      auth: {
        user: process.env.NAVER_EMAIL, //보내는 분의 메일계정
        pass: process.env.NAVER_PASSWORD,
      },
    })
  );

  var mailOption = {
    from: process.env.NAVER_EMAIL, // 보내는 분의 메일계정
    to: email, // 받는 분의 메일계정 (여러 개 가능)
    subject: "임시 비밀번호",
    text: newPassword,
  };

  smtpTransport.sendMail(mailOption, (err, response) => {
    // 메일을 보내는 코드
    if (err) {
      console.log(err);
      throw err;
    }
  });
};
