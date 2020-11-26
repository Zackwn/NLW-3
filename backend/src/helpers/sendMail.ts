import nodemailer from 'nodemailer'

interface IMailContent {
    html: string,
    subject: string
}

export async function sendMail(to: string, mailContent: IMailContent) {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    let info = await transporter.sendMail({
        from: 'Rafael <rafael@gmail.com>',
        to,
        subject: mailContent.subject,
        html: mailContent.html
    })

    console.log(`Mail Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}