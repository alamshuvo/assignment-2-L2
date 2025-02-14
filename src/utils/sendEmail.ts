import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string, time: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production' ? true : false,
    auth: {
      user: 'iftakharalamshuvo11@gmail.com',
      pass: 'cfyx mmqh qwtb gapi',
    },
  })
  await transporter.sendMail({
    from: 'iftakharalamshuvo11@gmail.com', // sender address
    to: `${to}`, // list of receivers
    subject: `reset your password within ${time} min`, // Subject line
    text: `reset your password within ${time} min`,
    // plain text body
    html, // html body
  })
}
