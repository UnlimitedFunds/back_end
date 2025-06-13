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
exports.sendForgotPasswordResetSuccessfullyEmail = exports.sendForgotPasswordEmail = exports.sendContactUsEmail = exports.sendCreditAlert = exports.sendDebitAlert = exports.sendAccountActivatedEmailToUser = exports.sendAccountSuspendedmailToUser = exports.sendAccountApprovedEmailToUser = exports.sendEmail = void 0;
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
        console.log(`email response ==> sent to ${input.receiverEmail} info reponse ${info.response}`);
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
});
exports.sendAccountApprovedEmailToUser = sendAccountApprovedEmailToUser;
const sendAccountSuspendedmailToUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.receiverEmail,
        subject: "ACCOUNT SUSPENDED",
        emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Account Suspended</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin: 20px auto; background:#ffffff; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center;">
                <img src="${clientUrl}/image/logo.png" alt="UnlimitedFunds Logo" style="max-width:150px;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:20px; text-align:center;">
                <h2 style="margin:0; font-size:22px; color:#cc0000;">Your Account Has Been Suspended</h2>
                <p style="font-size:15px; color:#333; margin-top:8px;">
                  We regret to inform you that your UnlimitedFunds account has been temporarily suspended.
                </p>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding: 0 20px 20px;">
                <div style="background:#fff3f3; padding:20px; border-left:5px solid #cc0000; border-radius:6px;">
                  <p style="margin:0; font-size:15px; color:#660000;">
                    This action may have been taken due to suspicious activity or a violation of our terms of service. For your security, we have restricted access to your account until this matter is resolved.
                  </p>
                </div>

                <p style="font-size:15px; color:#333; margin-top:20px;">
                  Please contact our customer care team as soon as possible to resolve the issue.
                </p>

                <div style="text-align:center; margin-top:20px;">
                  <a href="mailto:${contactUsEmail}" style="background:#cc0000; color:#fff; padding:12px 25px; border-radius:5px; text-decoration:none; font-size:15px;">
                    Contact Customer Care
                  </a>
                </div>

                <p style="font-size:13px; color:#999; text-align:center; margin-top:20px;">
                  If you believe this was an error, we sincerely apologize for the inconvenience.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center; color:#fff; font-size:13px;">
                <strong>UnlimitedFunds Bank Ltd.</strong><br />
                Protecting your account is our top priority.<br /><br />
                &copy; ${new Date().getFullYear()} UnlimitedFunds – All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });
});
exports.sendAccountSuspendedmailToUser = sendAccountSuspendedmailToUser;
const sendAccountActivatedEmailToUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.receiverEmail,
        subject: "ACCOUNT ACTIVATED",
        emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Account Approved</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; margin:20px auto; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
            <!-- Header -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center;">
                <img src="${clientUrl}/image/logo.png" alt="UnlimitedFunds Logo" style="max-width:150px;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:20px;">
                <h2 style="margin:0; font-size:20px; color:#004080;">Account Approved</h2>
                <p style="margin:10px 0 0; font-size:15px; color:#333;">
                  Dear <strong>${input.fullName}</strong>,<br />
                  Your UnlimitedFunds Bank account has been successfully approved.
                </p>
              </td>
            </tr>

            <!-- Details Section -->
            <tr>
              <td style="padding:20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9; border:1px solid #ddd; border-radius:6px;">
                  <tr>
                    <td style="padding:15px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px; color:#333;">
                        <tr>
                          <td style="padding:8px 0;">Account Holder:</td>
                          <td align="right" style="padding:8px 0;"><strong>${input.fullName}</strong></td>
                        </tr>
                      
                        <tr>
                          <td style="padding:8px 0;">Account Status:</td>
                          <td align="right" style="padding:8px 0;"><strong style="color:green;">Approved</strong></td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;">Access:</td>
                          <td align="right" style="padding:8px 0;"><a href="${clientUrl}/logins.html" style="color:#004080; text-decoration:none;"><strong>Login to Dashboard</strong></a></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>


            <!-- Support Info -->
            <tr>
              <td style="padding:20px; font-size:14px; color:#555;">
                For enquiries, contact our support team at
                <strong>${contactUsEmail}</strong> or call
                <strong>+44 77 3185 0821</strong>.<br /><br />
                Thank you for choosing UnlimitedFunds.
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center; color:#fff; font-size:13px;">
                <strong>UnlimitedFunds Bank Ltd.</strong><br />
                Secure and innovative banking solutions for your future.<br /><br />
                &copy; ${new Date().getFullYear()} UnlimitedFunds Bank – All rights reserved.<br />
                Email: ${contactUsEmail}
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });
});
exports.sendAccountActivatedEmailToUser = sendAccountActivatedEmailToUser;
const sendDebitAlert = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sending debit");
    return (0, exports.sendEmail)({
        receiverEmail: input.senderEmail,
        subject: "Transaction Alert",
        emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Transaction Alert</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; margin:20px auto; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
            <!-- Header -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center;">
                <img src="${clientUrl}/image/logo.png" alt="UnlimitedFunds Logo" style="max-width:150px;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:20px;">
                <h2 style="margin:0; font-size:20px; color:#004080;">Debit Transaction Alert</h2>
                <p style="margin:10px 0 0; font-size:15px; color:#333;">
                  Dear <strong>${input.senderFullName}</strong>,<br />
                  Your account <strong>${(0, _1.maskNumber)(input.accountNumber)}</strong> has been debited with <strong>$${(0, _1.formatAmount)(input.amount)}</strong>.
                </p>
              </td>
            </tr>

            <!-- Transaction Details -->
            <tr>
              <td style="padding:20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9; border:1px solid #ddd; border-radius:6px;">
                  <tr>
                    <td style="padding:15px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px; color:#333;">
                        <tr>
                          <td>Transaction Number:</td>
                          <td align="right"><strong>${input.transactionNumber}</strong></td>
                        </tr>
                        <tr>
                          <td>Transaction Date:</td>
                          <td align="right">${(0, _1.formatDate)(input.transactionDate)}</td>
                        </tr>
                        <tr>
                          <td>To:</td>
                          <td align="right">${input.receiverFullName}</td>
                        </tr>
                        <tr>
                          <td>Total Amount:</td>
                          <td align="right"><strong>$${(0, _1.formatAmount)(input.amount)}</strong></td>
                        </tr>
                        <tr>
                          <td>Payment Method:</td>
                          <td align="right">${input.paymentMethod} Transfer</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Support Message -->
            <tr>
              <td style="padding:20px; font-size:14px; color:#555;">
                For enquiries, contact our support team at
                <strong>${contactUsEmail}</strong> or call
                <strong>+44 77 3185 0821</strong>.<br /><br />
                Thank you for choosing UnlimitedFunds.
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center; color:#fff; font-size:13px;">
                <strong>UnlimitedFunds Bank Ltd.</strong><br />
                Secure and innovative banking solutions for your future.<br /><br />
                &copy; ${new Date().getFullYear()} UnlimitedFunds Bank - All rights reserved.<br />
                Email: ${contactUsEmail}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
    });
});
exports.sendDebitAlert = sendDebitAlert;
const sendCreditAlert = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: input.senderEmail,
        subject: "Transaction Alert",
        emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Transaction Alert</title>
  </head>‰]‰]
  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; margin:20px auto; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
            <!-- Header -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center;">
                <img src="${clientUrl}/image/logo.png" alt="UnlimitedFunds Logo" style="max-width:150px;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:20px;">
                <h2 style="margin:0; font-size:20px; color:#004080;">Credit Transaction Alert</h2>
                <p style="margin:10px 0 0; font-size:15px; color:#333;">
                  Dear <strong>${input.receiverFullName}</strong>,<br />
                  Your account <strong>${(0, _1.maskNumber)(input.accountNumber)}</strong> has been credited with <strong>$${(0, _1.formatAmount)(input.amount)}</strong>.
                </p>
              </td>
            </tr>

            <!-- Transaction Details -->
            <tr>
              <td style="padding:20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9; border:1px solid #ddd; border-radius:6px;">
                  <tr>
                    <td style="padding:15px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px; color:#333;">
                        <tr>
                          <td>Transaction Number:</td>
                          <td align="right"><strong>${input.transactionNumber}</strong></td>
                        </tr>
                        <tr>
                          <td>Transaction Date:</td>
                          <td align="right">${(0, _1.formatDate)(input.transactionDate)}</td>
                        </tr>
                        <tr>
                          <td>From:</td>
                          <td align="right">${input.senderFullName}</td>
                        </tr>
                        <tr>
                          <td>Total Amount:</td>
                          <td align="right"><strong>$${(0, _1.formatAmount)(input.amount)}</strong></td>
                        </tr>
                        <tr>
                          <td>Payment Method:</td>
                          <td align="right">${input.paymentMethod} Transfer</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Support Message -->
            <tr>
              <td style="padding:20px; font-size:14px; color:#555;">
                For enquiries, contact our support team at
                <strong>${contactUsEmail}</strong> or call
                <strong>+44 77 3185 0821</strong>.<br /><br />
                Thank you for choosing UnlimitedFunds.
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center; color:#fff; font-size:13px;">
                <strong>UnlimitedFunds Bank Ltd.</strong><br />
                Secure and innovative banking solutions for your future.<br /><br />
                &copy; ${new Date().getFullYear()} UnlimitedFunds Bank – All rights reserved.<br />
                Email: ${contactUsEmail}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });
});
exports.sendCreditAlert = sendCreditAlert;
const sendContactUsEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.sendEmail)({
        receiverEmail: adminEmail,
        subject: "Contact Form Submission",
        emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Contact Form Submission</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; margin:20px auto; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
            
            <!-- Header -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center;">
                <img src="${clientUrl}/image/logo.png" alt="UnlimitedFunds Logo" style="max-width:150px;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:20px;">
                <h2 style="margin:0; font-size:20px; color:#004080;">New Contact Form Submission</h2>
                <p style="margin:10px 0 0; font-size:15px; color:#333;">
                  A new message has been received through the UnlimitedFunds website contact form.
                </p>
              </td>
            </tr>

            <!-- Contact Info -->
            <tr>
              <td style="padding:20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f9f9; border:1px solid #ddd; border-radius:6px;">
                  <tr>
                    <td style="padding:15px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px; color:#333;">
                        <tr>
                          <td style="padding:8px 0;">First Name:</td>
                          <td align="right" style="padding:8px 0;"><strong>${input.firstName}</strong></td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;">Last Name:</td>
                          <td align="right" style="padding:8px 0;"><strong>${input.lastName}</strong></td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;">Email:</td>
                          <td align="right" style="padding:8px 0;">
                            <a href="mailto:${input.senderEmail}" style="color:#004080; text-decoration:none;">${input.senderEmail}</a>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top:15px;">
                            <strong>Message:</strong>
                            <div style="background:#fff; padding:12px; border:1px solid #ccc; margin-top:5px; font-size:14px; white-space:pre-line;">
                             ${input.message}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td style="padding:20px; text-align:center;">
                <a href="${contactUsEmail}" style="display:inline-block; padding:12px 20px; background-color:#004080; color:#fff; text-decoration:none; border-radius:4px; font-size:15px;">
                  Reply to Email
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center; color:#fff; font-size:13px;">
                <strong>UnlimitedFunds Bank Ltd.</strong><br />
                Making financial services more accessible, secure, and innovative.<br /><br />
                &copy; ${new Date().getFullYear()} UnlimitedFunds Bank – All rights reserved.<br />
                Email: ${contactUsEmail}
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });
});
exports.sendContactUsEmail = sendContactUsEmail;
const sendForgotPasswordEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const email = input.email;
    const otp = input.otp;
    const verificationLink = `${clientUrl}/password.html/?token=${otp}&email=${email}`;
    return (0, exports.sendEmail)({
        receiverEmail: email,
        subject: "Password Reset Request",
        emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset Request</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin: 20px auto; background:#ffffff; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center;">
                <img src="${clientUrl}/image/logo.png" alt="UnlimitedFunds Logo" style="max-width:150px;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:20px; text-align:center;">
                <h2 style="margin:0; font-size:22px; color:#004080;">Password Reset Request</h2>
                <p style="font-size:15px; color:#333; margin-top:8px;">
                  A request to reset your password was received.
                </p>
              </td>
            </tr>

            <!-- Message Box -->
            <tr>
              <td style="padding: 0 20px 20px;">
                <div style="background:#f9f9f9; padding:20px; border-radius:6px; border:1px solid #ddd;">
                  <p style="margin:0 0 10px; font-size:15px; color:#333;">
                    Please click the link below to reset your password:
                  </p>
                  <a href="${verificationLink}"
                    style="display:inline-block; word-break:break-all; background-color:#004080; color:#fff; padding:10px 18px; border-radius:4px; text-decoration:none; font-size:15px; margin-top:10px;">
                    Reset Password
                  </a>
                  <p style="margin-top:15px; font-size:13px; color:#666;">
                    Or use this link:<br />
                    <a href="${verificationLink}" style="color:#004080; text-decoration:none;">
                     "${verificationLink}
                    </a>
                  </p>
                  <p style="margin-top:15px; font-size:13px; color:#999;">
                    Note: This link will expire in <strong>10 minutes</strong>.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Safety Note -->
            <tr>
              <td style="padding: 0 20px 20px;">
                <p style="font-size:14px; color:#333;">
                  If you did not request a password reset, you can safely ignore this email. If you believe your account has been compromised, please contact our support team immediately.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center; color:#fff; font-size:13px;">
                <strong>UnlimitedFunds Bank Ltd.</strong><br />
                Secure banking made simple.<br /><br />
                Need help? Contact us at <a href="mailto:support@unlimitedfundsbank.com" style="color:#fff; text-decoration:underline;">support@unlimitedfundsbank.com</a><br />
                &copy; ${new Date().getFullYear()} UnlimitedFunds – All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });
});
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
const sendForgotPasswordResetSuccessfullyEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const email = input.email;
    return (0, exports.sendEmail)({
        receiverEmail: email,
        subject: "Password Reset Successful",
        emailTemplate: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset Successful</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin: 20px auto; background:#ffffff; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center;">
                <img src="${clientUrl}image/logo.png" alt="UnlimitedFunds Logo" style="max-width:150px;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:20px; text-align:center;">
                <h2 style="margin:0; font-size:22px; color:#004080;">Password Reset Successful</h2>
                <p style="font-size:15px; color:#333; margin-top:8px;">
                  Your account password has been changed successfully.
                </p>
              </td>
            </tr>

            <!-- Message Box -->
            <tr>
              <td style="padding: 0 20px 20px;">
                <p style="font-size:15px; color:#333;">
                  Dear <strong>John Doe</strong>,
                </p>
                <p style="font-size:15px; color:#333;">
                  Your password has been updated. If you did not authorize this action, please contact our support team immediately.
                </p>
                <div style="background:#f9f9f9; padding:20px; border-radius:6px; border:1px solid #ddd;">
                  <p style="margin:0 0 10px; font-size:15px; color:#333;"><strong>Account Security Tips:</strong></p>
                  <ul style="font-size:14px; color:#444; padding-left: 20px;">
                    <li>Use a strong, unique password.</li>
                    <li>Enable two-factor authentication (2FA).</li>
                    <li>Never share your login credentials.</li>
                  </ul>
                </div>
                <p style="font-size:14px; color:#333; margin-top:15px;">
                  If you have questions or concerns, reach us at 
                  <a href="mailto:${contactUsEmail}" style="color:#004080; text-decoration:none;">Contact us</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#004080" style="padding:20px; text-align:center; color:#fff; font-size:13px;">
                <strong>UnlimitedFunds Bank Ltd.</strong><br />
                Your trusted digital banking partner.<br /><br />
                &copy; ${new Date().getFullYear()} UnlimitedFunds – All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });
});
exports.sendForgotPasswordResetSuccessfullyEmail = sendForgotPasswordResetSuccessfullyEmail;
