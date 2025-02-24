import dotenv from "dotenv";
import nodemailer from "nodemailer";

import { AccountApproved, ISendEmail, TransactionAlert } from "./interface";
import { formatAmount, formatDate, maskNumber } from ".";
import { IContactUs } from "../contact_us/interface";
dotenv.config();

const smtpSender = process.env.EMAILSENDER;
const smtpPassword = process.env.EMAILSENDERPASSWORD;
const smtpEmailFrom = process.env.EMAILFROM;
const clientUrl = process.env.CLIENT_URL;
const adminEmail = process.env.ADMIN_EMAIL ?? "";
const contactUsEmail = process.env.CONTACTUS_EMAIL;

dotenv.config();

export const sendEmail = async (input: ISendEmail) => {
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

    const transporter = nodemailer.createTransport({
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

    const info = await transporter.sendMail(mailOptions);

    console.log(
      `email response ==> sent to ${input.receiverEmail} info reponse ${info.response}`
    );
    return info.response;
  } catch (error) {
    console.error("Email sending error:", error);
    // throw error;
  }
};

export const sendAccountApprovedEmailToUser = async (
  input: AccountApproved
) => {
  return sendEmail({
    receiverEmail: input.receiverEmail,
    subject: "Account Approved",
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
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px; /* Add padding for smaller screens */
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

      .header img {
        max-width: 100%; /* Make logo responsive */
        height: auto;
      }

      .email-title {
        text-align: center;
        margin: 20px 0;
      }

      .email-title h2 {
        font-size: 1.5rem; /* Use relative units */
        font-weight: bold;
      }

      .email-content {
        padding: 20px 0;
        text-align: center;
      }

      .email-content p {
        font-size: 1rem; /* Use relative units */
        line-height: 1.5;
        margin: 10px 0; /* Add spacing between paragraphs */
      }

      .btn {
        display: inline-block;
        padding: 12px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 1rem; /* Use relative units */
        margin-top: 20px;
        width: 100%; /* Make button full width on small screens */
        max-width: 200px; /* Limit button width on larger screens */
      }

      .btn:hover {
        background-color: #0056b3;
      }

      .enquiries {
        text-align: center;
        padding-top: 20px;
        font-size: 0.875rem; /* Use relative units */
        color: #555;
      }

      .footer {
        background-color: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 0.875rem; /* Use relative units */
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
        font-size: 1rem; /* Use relative units */
      }
    </style>
  </head>
  <body>
    <main>
      <div class="email-container">
        <div class="header">
          <img src="image/logo.png" alt="logo" width="150" />
        </div>
        <div class="email-title">
          <h2>Account Approved</h2>
        </div>
        <div class="email-content">
          <p>Dear <strong>${input.fullName}</strong>,</p>
          <p>Your account has been approved.</p>
          <p>You can proceed to your dashboard using the link below or by logging in with your email and password.</p>
          <a href="${clientUrl}/login.html" class="btn">Go to Dashboard</a>
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
</html>`,
  });
};

export const sendAccountSuspendedmailToUser = async (
  input: AccountApproved
) => {
  return sendEmail({
    receiverEmail: input.receiverEmail,
    subject: "ACCOUNT SUSPENDED",
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
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px; /* Add padding for smaller screens */
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

      .header img {
        max-width: 100%; /* Make logo responsive */
        height: auto;
      }

      .email-title {
        text-align: center;
        margin: 20px 0;
      }

      .email-title h2 {
        font-size: 1.5rem; /* Use relative units */
        font-weight: bold;
      }

      .email-content {
        padding: 20px 0;
        text-align: center;
      }

      .email-content p {
        font-size: 1rem; /* Use relative units */
        line-height: 1.5;
        margin: 10px 0; /* Add spacing between paragraphs */
      }

      .btn {
        display: inline-block;
        padding: 12px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 1rem; /* Use relative units */
        margin-top: 20px;
        width: 100%; /* Make button full width on small screens */
        max-width: 200px; /* Limit button width on larger screens */
      }

      .btn:hover {
        background-color: #0056b3;
      }

      .enquiries {
        text-align: center;
        padding-top: 20px;
        font-size: 0.875rem; /* Use relative units */
        color: #555;
      }

      .footer {
        background-color: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 0.875rem; /* Use relative units */
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
        font-size: 1rem; /* Use relative units */
      }
    </style>
  </head>
  <body>
    <main>
      <div class="email-container">
        <div class="header">
          <img src="image/logo.png" alt="logo" width="150" />
        </div>
        <div class="email-title">
          <h2>Account Approved</h2>
        </div>
        <div class="email-content">
          <p>Dear <strong>${input.fullName}</strong>,</p>
          <p>Your account has been suspended.</p>
          <p>Contact customer care.</p>

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
</html>`,
  });
};

export const sendAccountActivatedEmailToUser = async (
  input: AccountApproved
) => {
  return sendEmail({
    receiverEmail: input.receiverEmail,
    subject: "ACCOUNT ACTIVATED",
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
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px; /* Add padding for smaller screens */
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

      .header img {
        max-width: 100%; /* Make logo responsive */
        height: auto;
      }

      .email-title {
        text-align: center;
        margin: 20px 0;
      }

      .email-title h2 {
        font-size: 1.5rem; /* Use relative units */
        font-weight: bold;
      }

      .email-content {
        padding: 20px 0;
        text-align: center;
      }

      .email-content p {
        font-size: 1rem; /* Use relative units */
        line-height: 1.5;
        margin: 10px 0; /* Add spacing between paragraphs */
      }

      .btn {
        display: inline-block;
        padding: 12px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 1rem; /* Use relative units */
        margin-top: 20px;
        width: 100%; /* Make button full width on small screens */
        max-width: 200px; /* Limit button width on larger screens */
      }

      .btn:hover {
        background-color: #0056b3;
      }

      .enquiries {
        text-align: center;
        padding-top: 20px;
        font-size: 0.875rem; /* Use relative units */
        color: #555;
      }

      .footer {
        background-color: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 0.875rem; /* Use relative units */
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
        font-size: 1rem; /* Use relative units */
      }
    </style>
  </head>
  <body>
    <main>
      <div class="email-container">
        <div class="header">
          <img src="image/logo.png" alt="logo" width="150" />
        </div>
        <div class="email-title">
          <h2>Account Approved</h2>
        </div>
        <div class="email-content">
          <p>Dear <strong>${input.fullName}</strong>,</p>
          <p>Congratulations your account has been reactivated.</p>
          <p>You can proceed to your dashboard using the link below or by logging in with your email and password.</p>
          <a href="${clientUrl}/login.html" class="btn">Go to Dashboard</a>
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
</html>`,
  });
};

export const sendDebitAlert = async (input: TransactionAlert) => {
  console.log("sending debit");
  return sendEmail({
    receiverEmail: input.senderEmail,
    subject: "Transaction Alert",
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
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px; /* Add padding for smaller screens */
      }

      .email-container {
        width: 90%;
        max-width: 595px;
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
        max-width: 100%; /* Make logo responsive */
        height: auto;
      }

      .email-title {
        padding: 30px 0 20px;
      }

      .discription {
        font-size: 1rem; /* Use relative units */
        font-weight: 500;
        color: #333;
      }

      .username {
        font-size: 1.125rem; /* Use relative units */
        font-weight: 600;
        margin-top: 10px;
      }

      .email-content h3 {
        font-size: 1.25rem; /* Use relative units */
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
        font-size: 1rem; /* Use relative units */
        font-weight: 500;
        color: #555;
      }

      .enquiries {
        padding-bottom: 15px;
        font-size: 0.875rem; /* Use relative units */
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
        font-size: 1.125rem; /* Use relative units */
        font-weight: 700;
      }

      .flex1 p {
        font-size: 0.875rem; /* Use relative units */
        font-weight: 400;
        color: #ddd;
      }

      footer h4 {
        font-size: 1rem; /* Use relative units */
        font-weight: 600;
      }

      footer p {
        font-size: 0.875rem; /* Use relative units */
        font-weight: 400;
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
            <p class="discription">Debit Transaction Alert On${maskNumber(
              input.accountNumber
            )}</p>
            <p class="username">
              <span>Dear ${input.senderFullName},</span>
              your transfer of $${formatAmount(input.amount)} is successful.
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
                <p>${formatDate(input.date)}</p>
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
};

export const sendCreditAlert = async (input: TransactionAlert) => {
  console.log("sending credit");

  return sendEmail({
    receiverEmail: input.senderEmail,
    subject: "Transaction Alert",
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
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px; /* Add padding for smaller screens */
      }

      .email-container {
        width: 90%;
        max-width: 595px;
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
        max-width: 100%; /* Make logo responsive */
        height: auto;
      }

      .email-title {
        padding: 30px 0 20px;
      }

      .discription {
        font-size: 1rem; /* Use relative units */
        font-weight: 500;
        color: #333;
      }

      .username {
        font-size: 1.125rem; /* Use relative units */
        font-weight: 600;
        margin-top: 10px;
      }

      .email-content h3 {
        font-size: 1.25rem; /* Use relative units */
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
        font-size: 1rem; /* Use relative units */
        font-weight: 500;
        color: #555;
      }

      .enquiries {
        padding-bottom: 15px;
        font-size: 0.875rem; /* Use relative units */
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
        font-size: 1.125rem; /* Use relative units */
        font-weight: 700;
      }

      .flex1 p {
        font-size: 0.875rem; /* Use relative units */
        font-weight: 400;
        color: #ddd;
      }

      footer h4 {
        font-size: 1rem; /* Use relative units */
        font-weight: 600;
      }

      footer p {
        font-size: 0.875rem; /* Use relative units */
        font-weight: 400;
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
            <p class="discription">Credit Transaction Alert On${maskNumber(
              input.accountNumber
            )}</p>
            <p class="username">
              <span>Dear ${
                input.senderFullName
              }</span>, <br />Your account has been
              credited with  $${formatAmount(input.amount)}
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
                <p>${formatDate(input.date)}</p>
              </div>
              <div class="details">
                <p>From</p>
                <p>${input.receiverFullName}</p>
              </div>
              <div class="details">
                <p>Total Amount</p>
                <p>$${input.amount}</p>
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
              <p>>&copy; ${new Date().getFullYear()} UnlimitedSfunds Bank - All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>`,
  });
};

export const sendContactUsEmail = async (input: IContactUs) => {
  return sendEmail({
    receiverEmail: adminEmail,
    subject: "Contact Form Submission",
    emailTemplate: `
    <!DOCTYPE html>
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
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px; /* Add padding for smaller screens */
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

      .header img {
        max-width: 100%; /* Make logo responsive */
        height: auto;
      }

      .email-title {
        text-align: center;
        margin: 20px 0;
      }

      .email-title h2 {
        font-size: 1.5rem; /* Use relative units */
        font-weight: bold;
      }

      .email-content {
        padding: 20px 0;
        text-align: center;
      }

      .email-content p {
        font-size: 1rem; /* Use relative units */
        line-height: 1.5;
        margin: 10px 0; /* Add spacing between paragraphs */
      }

      .message-box {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 6px;
        margin-top: 15px;
        font-size: 1rem; /* Use relative units */
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
        font-size: 1rem; /* Use relative units */
        margin-top: 20px;
        width: 100%; /* Make button full width on small screens */
        max-width: 200px; /* Limit button width on larger screens */
      }

      .btn:hover {
        background-color: #0056b3;
      }

      .footer {
        background-color: #000;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-size: 0.875rem; /* Use relative units */
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
        font-size: 1rem; /* Use relative units */
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
            <p>>&copy; ${new Date().getFullYear()} UnlimitedSfunds Bank - All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>`,
  });
};
