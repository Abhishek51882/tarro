import Queue from 'bull';
import { sendEmail } from './email.middleware.js';
const emailQueue = new Queue('email', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

emailQueue.process(async (job) => {
    const { email, subject, text } = job.data;
    await sendEmail(email, subject, text);
});

export default emailQueue;