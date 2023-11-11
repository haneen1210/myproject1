import nodemailer from "nodemailer"
export async function sendEmail(to,subject,html) {
const transporter = nodemailer.createTransport({
 service:'gmail',
  auth: {

   
    user: "haneen.sweet56@gmail.com",
    pass: "wfda aken nvuq uink",
  },
  tls: {
    rejectUnauthorized: false
}
});

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <haneen.sweet56@gmail.com>',// sender address
    to, 
    subject, 
    html,
  });

  return info;
}
