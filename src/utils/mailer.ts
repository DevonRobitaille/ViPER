import nodemailer from 'nodemailer'

export async function sendLoginEmail({
    email,
    url,
    token,
}: {
    email: string
    url: string
    token: string
}) {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })

    const info = await transporter.sendMail({
        from: '"John Smith" <john.smith@business.com>',
        to: email,
        subject: 'Log into your account',
        html: `Login by clicking <a href="${url}/#token=${token}">HERE</a>`,
    })

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}

export async function sendVerifyEmail({
    email,
    url,
    token,
}: {
    email: string
    url: string
    token: string
}) {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })

    const info = await transporter.sendMail({
        from: '"John Smith" <john.smith@business.com>',
        to: email,
        subject: 'Activate your account',
        html: `Activate by clicking <a href="${url}/activate#token=${token}">HERE</a>`,
    })

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}