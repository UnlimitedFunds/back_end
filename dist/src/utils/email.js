"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactUsEmail = exports.sendCreditAlert = exports.sendDebitAlert = exports.sendAccountDeactivatedEmailToUser = exports.sendAccountSuspendedmailToUser = exports.sendAccountApprovedEmailToUser = exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const _1 = require(".");
dotenv_1.default.config();
const smtpSender = process.env.EMAILSENDER;
const smtpPassword = process.env.EMAILSENDERPASSWORD;
const smtpEmailFrom = process.env.EMAILFROM;
const clientUrl = process.env.CLIENT_URL;
const adminEmail = (_a = process.env.ADMIN_EMAIL) !== null && _a !== void 0 ? _a : "";
const contactUsEmail = process.env.CONTACTUS_EMAIL;
dotenv_1.default.config();
const sendEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    //   var transport = nodemailer.createTransport({
    //     host: "smtp.zeptomail.com",
    //     port: 587,
    //     auth: {
    //       user: smtpSender,
    //       pass: smtpPassword,
    //     },
    //   });
    //   var mailOptions = {
    //     from: `"Kingsway Team" <${smtpEmailFrom}>`,
    //     to: input.receiverEmail,
    //     replyTo: smtpEmailFrom,
    //     subject: input.subject,
    //     html: input.emailTemplate,
    //   };
    //   transport.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log("Successfully sent");
    //   });
    try {
        // const transporter = nodemailer.createTransport({
        //   host: 'smtp-relay.sendinblue.com',
        //   port: 587,
        //   secure: false,
        //   auth: {
        //     user: smtpSender,
        //     pass: smtpPassword,
        //   },
        // });
        // const mailOptions = {
        //   from: `Kingsway <${smtpEmailFrom}>`,
        //   to: input.receiverEmail,
        //   subject: input.subject,
        //   html: input.emailTemplate,
        // };
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: smtpSender,
                pass: smtpPassword,
            },
        });
        const mailOptions = {
            from: `Unlimted funds <${smtpEmailFrom}>`,
            to: input.receiverEmail,
            subject: input.subject,
            html: input.emailTemplate,
        };
        const info = yield transporter.sendMail(mailOptions);
        return info.response;
    }
    catch (error) {
        console.error("Email sending error:", error);
        // throw error;
    }
});
exports.sendEmail = sendEmail;
const sendAccountApprovedEmailToUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.receiverEmail,
        subject: "ACCOUNT APPROVED",
        emailTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Approved</title>
    <style>
      body {
        border: none;
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      }

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      main {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .email-container {
        width: 90%;
        max-width: 595px;
        background: #fff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 30px;
      }

      .header {
        text-align: center;
        border-bottom: 1px solid #000;
        padding-bottom: 20px;
      }

      .email-title {
        text-align: center;
        margin: 20px 0;
      }

      .email-title h2 {
        font-size: 22px;
        font-weight: bold;
      }

      .email-content {
        padding: 20px 0;
        text-align: center;
      }

      .email-content p {
        font-size: 16px;
        line-height: 1.5;
      }

      .btn {
        display: inline-block;
        padding: 12px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 20px;
      }

      .btn:hover {
        background-color: #0056b3;
      }

      .enquiries {
        text-align: center;
        padding-top: 20px;
        font-size: 15px;
        color: #555;
      }

      .footer {
        background-color: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        border-radius: 0 0 8px 8px;
        margin-top: 10px;
      }

      .footer p {
        margin-bottom: 10px;
      }

      .footer-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .footer h4 {
        margin-bottom: 8px;
      }

      @media (max-width: 768px) {
        .email-container {
          width: 95%;
          padding: 20px;
        }
      }

      @media (max-width: 480px) {
        .email-container {
          width: 100%;
          padding: 15px;
          border-radius: 0;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="email-container">
        <div class="header">
          <img src="${clientUrl}/image/logo.png" alt="logo" width="150" />
        </div>
        <div class="email-title">
          <h2>Account Approved</h2>
        </div>
        <div class="email-content">
          <p>Dear <strong>${input.fullName}</strong>,</p>
          <p>Your account has been approved.</p>
          <p>You can proceed to your dashboard using the link below or by logging in with your email and password.</p>
          <a href="${clientUrl}/login.html" class="btn">Login</a>
        </div>
        <div class="enquiries">
          <p>
            For more enquiries, please contact our customer service at
            <strong>${contactUsEmail}</strong>
          </p>
        </div>
        <footer class="footer">
          <div class="footer-flex">
            <h4>UnlimitedSfunds Bank Ltd.</h4>
            <p>
              Making the world a better place through constructive financial
              solutions. Our innovative banking services empower individuals and
              businesses worldwide.
            </p>
            <p>&copy; ${new Date().getFullYear()} UnlimitedSfundsBank - All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>
	`,
    });
});
exports.sendAccountApprovedEmailToUser = sendAccountApprovedEmailToUser;
const sendAccountSuspendedmailToUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.receiverEmail,
        subject: "ACCOUNT SUSPENDED",
        emailTemplate: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Suspended</title>
      <style>
        body {
          border: none;
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #f4f4f4;
          font-family: Arial, Helvetica, sans-serif;
        }
  
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
  
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        .email-container {
          width: 90%;
          max-width: 595px;
          background: #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 30px;
        }
  
        .header {
          text-align: center;
          border-bottom: 1px solid #000;
          padding-bottom: 20px;
        }
  
        .email-title {
          text-align: center;
          margin: 20px 0;
        }
  
        .email-title h2 {
          font-size: 22px;
          font-weight: bold;
        }
  
        .email-content {
          padding: 20px 0;
          text-align: center;
        }
  
        .email-content p {
          font-size: 16px;
          line-height: 1.5;
        }
  
        .btn {
          display: inline-block;
          padding: 12px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          margin-top: 20px;
        }
  
        .btn:hover {
          background-color: #0056b3;
        }
  
        .enquiries {
          text-align: center;
          padding-top: 20px;
          font-size: 15px;
          color: #555;
        }
  
        .footer {
          background-color: #000;
          color: #fff;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          border-radius: 0 0 8px 8px;
          margin-top: 10px;
        }
  
        .footer p {
          margin-bottom: 10px;
        }
  
        .footer-flex {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        .footer h4 {
          margin-bottom: 8px;
        }
  
        @media (max-width: 768px) {
          .email-container {
            width: 95%;
            padding: 20px;
          }
        }
  
        @media (max-width: 480px) {
          .email-container {
            width: 100%;
            padding: 15px;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <main>
        <div class="email-container">
          <div class="header">
            <img src="${clientUrl}/image/logo.png" alt="logo" width="150" />
          </div>
          <div class="email-title">
            <h2>Account Suspended</h2>
          </div>
          <div class="email-content">
            <p>Dear <strong>${input.fullName}</strong>,</p>
            <p>Your account has been suspended.</p>
      
          </div>
          <div class="enquiries">
            <p>
              For more enquiries, please contact our customer service at
              <strong>${contactUsEmail}</strong>
            </p>
          </div>
          <footer class="footer">
            <div class="footer-flex">
              <h4>UnlimitedSfunds Bank Ltd.</h4>
              <p>
                Making the world a better place through constructive financial
                solutions. Our innovative banking services empower individuals and
                businesses worldwide.
              </p>
              <p>&copy; ${new Date().getFullYear()} UnlimitedSfundsBank - All rights reserved.</p>
            </div>
          </footer>
        </div>
      </main>
    </body>
  </html>
      `,
    });
});
exports.sendAccountSuspendedmailToUser = sendAccountSuspendedmailToUser;
const sendAccountDeactivatedEmailToUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.receiverEmail,
        subject: "ACCOUNT DEACTIVATED",
        emailTemplate: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Deactivated</title>
      <style>
        body {
          border: none;
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #f4f4f4;
          font-family: Arial, Helvetica, sans-serif;
        }
  
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
  
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        .email-container {
          width: 90%;
          max-width: 595px;
          background: #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 30px;
        }
  
        .header {
          text-align: center;
          border-bottom: 1px solid #000;
          padding-bottom: 20px;
        }
  
        .email-title {
          text-align: center;
          margin: 20px 0;
        }
  
        .email-title h2 {
          font-size: 22px;
          font-weight: bold;
        }
  
        .email-content {
          padding: 20px 0;
          text-align: center;
        }
  
        .email-content p {
          font-size: 16px;
          line-height: 1.5;
        }
  
        .btn {
          display: inline-block;
          padding: 12px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          margin-top: 20px;
        }
  
        .btn:hover {
          background-color: #0056b3;
        }
  
        .enquiries {
          text-align: center;
          padding-top: 20px;
          font-size: 15px;
          color: #555;
        }
  
        .footer {
          background-color: #000;
          color: #fff;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          border-radius: 0 0 8px 8px;
          margin-top: 10px;
        }
  
        .footer p {
          margin-bottom: 10px;
        }
  
        .footer-flex {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        .footer h4 {
          margin-bottom: 8px;
        }
  
        @media (max-width: 768px) {
          .email-container {
            width: 95%;
            padding: 20px;
          }
        }
  
        @media (max-width: 480px) {
          .email-container {
            width: 100%;
            padding: 15px;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <main>
        <div class="email-container">
          <div class="header">
            <img src="${clientUrl}/image/logo.png" alt="logo" width="150" />
          </div>
          <div class="email-title">
            <h2>Account Approved</h2>
          </div>
          <div class="email-content">
            <p>Dear <strong>${input.fullName}</strong>,</p>
            <p>Your account has been deactivated.</p>
            <p>You can proceed to your dashboard using the link below or by logging in with your email and password.</p>
            <a href="${clientUrl}/login.html" class="btn">Login/a>
          </div>
          <div class="enquiries">
            <p>
              For more enquiries, please contact our customer service at
              <strong>${contactUsEmail}</strong>
            </p>
          </div>
          <footer class="footer">
            <div class="footer-flex">
              <h4>UnlimitedSfunds Bank Ltd.</h4>
              <p>
                Making the world a better place through constructive financial
                solutions. Our innovative banking services empower individuals and
                businesses worldwide.
              </p>
              <p>&copy; ${new Date().getFullYear()} UnlimitedSfundsBank - All rights reserved.</p>
            </div>
          </footer>
        </div>
      </main>
    </body>
  </html>
      `,
    });
});
exports.sendAccountDeactivatedEmailToUser = sendAccountDeactivatedEmailToUser;
const sendDebitAlert = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.senderEmail,
        subject: "ACCOUNT APPROVED",
        emailTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Transaction Alert</title>
    <style>
      body {
        border: none;
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      }

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      main {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      .email-container {
        width: 90%;
        max-width: 595px;
        height: auto;
        background: #fff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      .main-content {
        padding: 40px;
      }

      .headear {
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid #000;
      }

      .headear img {
        max-width: 150px;
      }

      .email-title {
        padding: 30px 0 20px;
      }

      .discription {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }

      .username {
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px;
      }

      .email-content h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      .details-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-bottom: 30px;
      }

      .details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: #555;
      }

      .enquiries {
        padding-bottom: 15px;
        font-size: 14px;
        color: #666;
      }

      footer {
        background-color: #000;
        color: #fff;
        padding: 15px 20px;
      }

      .footer-flex {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .flex1 h1 {
        font-size: 18px;
        font-weight: 700;
      }

      .flex1 p {
        font-size: 14px;
        font-weight: 400;
        color: #ddd;
      }

      footer h4 {
        font-size: 16px;
        font-weight: 600;
      }

      footer p {
        font-size: 14px;
        font-weight: 400;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .main-content {
          padding: 25px;
        }

        .email-title {
          padding: 20px 0;
        }

        .email-content h3 {
          font-size: 18px;
        }

        .details {
          font-size: 14px;
        }

        .footer-flex {
          gap: 10px;
        }
      }

      @media (max-width: 480px) {
        .email-container {
          width: 100%;
          border-radius: 0;
        }

        .main-content {
          padding: 20px;
        }

        .email-title {
          padding: 15px 0;
        }

        .discription {
          font-size: 14px;
        }

        .username {
          font-size: 16px;
        }

        .email-content h3 {
          font-size: 16px;
        }

        .details {
          font-size: 13px;
        }

        .enquiries {
          font-size: 13px;
        }

        footer {
          padding: 12px 15px;
        }

        footer h4 {
          font-size: 14px;
        }

        footer p {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="email-container">
        <div class="main-content">
          <div class="headear">
            <img src="${clientUrl}/image/logo.png" alt="logo" />
          </div>
          <div class="email-title">
            <p class="discription">Debit Transaction Alert on ${(0, _1.maskNumber)(input.accountNumber)}</p>
            <p class="username">
              <span>Dear ${input.senderFullName},</span>
              your transfer of $${(0, _1.formatAmount)(input.amount)} successful.
            </p>
          </div>
          <div class="email-content">
            <h3>Debit Transaction Details</h3>
            <div class="details-container">
              <div class="details">
                <p>Transaction Number</p>
                <p>${input.transactionNumber}</p>
              </div>
              <div class="details">
                <p>Transaction Date</p>
                <p>${(0, _1.formatDate)(input.date)}</p>
              </div>
              <div class="details">
                <p>Beneficiary</p>
                <p>${input.receiverFullName}</p>
              </div>
              <div class="details">
                <p>Total Amount</p>
                <p>${input.amount}</p>
              </div>
            </div>
          </div>
          <div>
            <p class="enquiries">
              For more enquiries, please contact our customer service at ${contactUsEmail}
            </p>
            <p>Thanks for choosing UnlimitedSfunds.</p>
          </div>
        </div>
        <footer>
          <div class="footer-flex">
            <div class="flex1">
              <h1>UnlimitedSfunds Bank Ltd.</h1>
              <p>
                Making the world a better place through constructive elegant
                hierarchies. Innovations enabled by UnlimitedSfunds Bank result
                in products that assist workers.
              </p>
            </div>
            <h4>Contact Us</h4>
            <p>Email: ${contactUsEmail}</p>
            <div>
              <p>&copy; ${new Date().getFullYear()} UnlimitedSfunds Bank - All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>`,
    });
});
exports.sendDebitAlert = sendDebitAlert;
const sendCreditAlert = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.senderEmail,
        subject: "ACCOUNT APPROVED",
        emailTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Transaction Alert</title>
    <style>
      body {
        border: none;
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      }

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      main {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      .email-container {
        width: 90%;
        max-width: 595px;
        height: auto;
        background: #fff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      .main-content {
        padding: 40px;
      }

      .headear {
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid #000;
      }

      .headear img {
        max-width: 150px;
      }

      .email-title {
        padding: 30px 0 20px;
      }

      .discription {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }

      .username {
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px;
      }

      .email-content h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      .details-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-bottom: 30px;
      }

      .details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: #555;
      }

      .enquiries {
        padding-bottom: 15px;
        font-size: 14px;
        color: #666;
      }

      footer {
        background-color: #000;
        color: #fff;
        padding: 15px 20px;
      }

      .footer-flex {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .flex1 h1 {
        font-size: 18px;
        font-weight: 700;
      }

      .flex1 p {
        font-size: 14px;
        font-weight: 400;
        color: #ddd;
      }

      footer h4 {
        font-size: 16px;
        font-weight: 600;
      }

      footer p {
        font-size: 14px;
        font-weight: 400;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .main-content {
          padding: 25px;
        }

        .email-title {
          padding: 20px 0;
        }

        .email-content h3 {
          font-size: 18px;
        }

        .details {
          font-size: 14px;
        }

        .footer-flex {
          gap: 10px;
        }
      }

      @media (max-width: 480px) {
        .email-container {
          width: 100%;
          border-radius: 0;
        }

        .main-content {
          padding: 20px;
        }

        .email-title {
          padding: 15px 0;
        }

        .discription {
          font-size: 14px;
        }

        .username {
          font-size: 16px;
        }

        .email-content h3 {
          font-size: 16px;
        }

        .details {
          font-size: 13px;
        }

        .enquiries {
          font-size: 13px;
        }

        footer {
          padding: 12px 15px;
        }

        footer h4 {
          font-size: 14px;
        }

        footer p {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="email-container">
        <div class="main-content">
          <div class="headear">
            <img src="${clientUrl}/image/logo.png" alt="logo" />
          </div>
           <div class="email-title">
            <p class="discription">Credit Transaction Alert on ${(0, _1.maskNumber)(input.accountNumber)}</p>
            <p class="username">
              <span>Dear ${input.senderFullName},</span>
              your transfer of $${(0, _1.formatAmount)(input.amount)} successful.
            </p>
          </div>
          <div class="email-content">
            <h3>Credit Transaction Details</h3>
            <div class="details-container">
               <div class="details">
                <p>Transaction Number</p>
                <p>${input.transactionNumber}</p>
              </div>
              <div class="details">
                <p>Transaction Date</p>
                <p>${(0, _1.formatDate)(input.date)}</p>
              </div>
              <div class="details">
                <p>Beneficiary</p>
                <p>${input.receiverFullName}</p>
              </div>
              <div class="details">
                <p>Total Amount</p>
                <p>${input.amount}</p>
              </div>
            
            </div>
          </div>
          <div>
            <p class="enquiries">
              For more enquiries, please contact our customer service at
              ${contactUsEmail}
            </p>
            <p>Thanks for choosing UnlimitedSfunds.</p>
          </div>
        </div>
        <footer>
          <div class="footer-flex">
            <div class="flex1">
              <h1>UnlimitedSfunds Bank Ltd.</h1>
              <p>
                Making the world a better place through constructive elegant
                hierarchies. Innovations enabled by UnlimitedSfunds Bank result
                in products that assist workers.
              </p>
            </div>
            <h4>Contact Us</h4>
            <p>Email: ${contactUsEmail}</p>
            <div>
              <p>&copy; ${new Date().getFullYear()} UnlimitedSfunds Bank - All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>`,
    });
});
exports.sendCreditAlert = sendCreditAlert;
const sendContactUsEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: adminEmail,
        subject: "A USER HAS A MESSGE FOR YOU",
        emailTemplate: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Form Submission</title>
    <style>
      body {
        border: none;
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      }

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      main {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .email-container {
        width: 90%;
        max-width: 595px;
        background: #fff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 30px;
      }

      .header {
        text-align: center;
        border-bottom: 1px solid #000;
        padding-bottom: 20px;
      }

      .email-title {
        text-align: center;
        margin: 20px 0;
      }

      .email-title h2 {
        font-size: 22px;
        font-weight: bold;
      }

      .email-content {
        padding: 20px 0;
        text-align: center;
      }

      .email-content p {
        font-size: 16px;
        line-height: 1.5;
      }

      .message-box {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 6px;
        margin-top: 15px;
        font-size: 16px;
        text-align: left;
        white-space: pre-line;
      }

      .btn {
        display: inline-block;
        padding: 12px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 20px;
      }

      .btn:hover {
        background-color: #0056b3;
      }

      .footer {
        background-color: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        border-radius: 0 0 8px 8px;
        margin-top: 10px;
      }

      .footer p {
        margin-bottom: 10px;
      }

      .footer-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .footer h4 {
        margin-bottom: 8px;
      }

      @media (max-width: 768px) {
        .email-container {
          width: 95%;
          padding: 20px;
        }
      }

      @media (max-width: 480px) {
        .email-container {
          width: 100%;
          padding: 15px;
          border-radius: 0;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="email-container">
        <div class="header">
          <img src="${clientUrl}/image/logo.png" alt="logo" width="150" />
        </div>
        <div class="email-title">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="email-content">
          <p><strong>First Name:</strong> ${input.firstName}</p>
          <p><strong>Last Name:</strong> ${input.lastName}</p>
          <p><strong>Email:</strong> ${input.senderEmail}</p>
          <div class="message-box">
            <p><strong>Message:</strong></p>
            <p>${input.message}</p>
          </div>
          <a href="mailto:${contactUsEmail}" class="btn">Reply to Email</a>
        </div>
        <footer class="footer">
          <div class="footer-flex">
            <h4> UnlimitedSfunds Bank</h4>
            <p>Thank you for reaching out to us. We will get back to you soon.</p>
             <p>&copy; ${new Date().getFullYear()} UnlimitedSfunds Bank - All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>`,
    });
});
exports.sendContactUsEmail = sendContactUsEmail;
