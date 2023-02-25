import { NextApiRequest, NextApiResponse } from "next";

const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGIRD_DAFOXDESIGN_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
  `;

  const data = {
    to: "info@dafoxdesign.com",
    from: "info@dafoxdesign.com",
    subject: `Wiadomość od ${body.name}`,
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  try {
    await mail.send(data);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}
