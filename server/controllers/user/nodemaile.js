const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");

exports.sendEmail = (email, newPassword, subject) => {
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
    subject: subject,
    html:
      `<h1>${subject} : ${newPassword}</h1>` +
      `<h3><div>저희 프로젝트의 Git 레포입니다</div> <div>아래 이미지를 눌러주세요</div></h3><a href="https://github.com/codestates/just-moment-trip">` +
      '<img src="https://user-images.githubusercontent.com/89363516/165240860-f200568c-6e65-4c88-ab04-d2789e29c8f1.png" height="250" width="250"/></p></a>',
  };

  smtpTransport.sendMail(mailOption, (err, response) => {
    // 메일을 보내는 코드
    if (err) {
      console.log(err);
      throw err;
    }
  });
};
