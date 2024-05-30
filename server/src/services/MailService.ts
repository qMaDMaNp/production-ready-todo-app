import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
    }

    async sendActivationMail(email: string, activationLink: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Activate your account' + process.env.API_URL,
            text: '',
            html: 
                `
                    <div>
                        <h1>Activate your account</h1>
                        <a href="${activationLink}">Activate your account</a>
                    </div>
                `,
        });
    }
}

export default new MailService();