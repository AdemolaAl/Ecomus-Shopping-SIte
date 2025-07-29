import SftpClient from 'ssh2-sftp-client';
import path from 'path';
import fs from 'fs';

const sftp = new SftpClient();

const config = {
  host: '162.0.215.192',       // Or server IP
  port: 21098,                      // Or 21 if FTP
  username: 'alameen',
  password: 'adedollarzA1?',
};

const localFilePath = '/public/apple-iphone-12-r1.jpg'; // Local path

const buffer = fs.readFileSync('./public/apple-iphone-12-r1.jpg'); // Or use actual Buffer
const remoteFilePath = '/home/alameen/EcomusUploads/app.jpg'; // Remote path on cPanel



async function uploadFile() {
  try {
    await sftp.connect(config);
    await sftp.put(buffer, remoteFilePath);

    console.log('✅ Upload successful!');
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
  } finally {
    sftp.end();
  }
}

uploadFile();
