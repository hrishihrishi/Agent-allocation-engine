// seedAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      email: 'admin@example.com',
      password: hashedPassword
    });
    await admin.save();
    console.log('✅ Admin user created');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
