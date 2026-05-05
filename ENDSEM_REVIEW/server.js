const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Temporary data store
let availableTickets = 50;
let otpStore = {}; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to send OTP
app.post('/api/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Event Login OTP',
        html: `<div style="font-family: Arial; padding: 20px; border: 1px solid #ddd;">
                <h2>Login Verification</h2>
                <p>Your OTP for the Department Event Booking is:</p>
                <h1 style="color: #3b82f6;">${otp}</h1>
              </div>`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ error: "Failed to send email" });
        res.json({ message: "OTP sent successfully!" });
    });
});

// Route to Confirm Booking
app.post('/api/book', (req, res) => {
    const { name, email, dept, tickets, otp } = req.body;

    if (otpStore[email] != otp) return res.status(400).json({ error: "Invalid OTP" });
    if (tickets > availableTickets) return res.status(400).json({ error: "Not enough tickets" });

    availableTickets -= tickets;

    const confirmationMail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Booking Confirmed! 🎉',
        html: `<h2>Booking Successful, ${name}!</h2>
               <p><b>Event:</b> Annual Tech Symposium 2026</p>
               <p><b>Tickets:</b> ${tickets}</p>
               <p><b>Department:</b> ${dept}</p>
               <p>Show this email at the venue.</p>`
    };

    transporter.sendMail(confirmationMail);
    res.json({ success: true, remaining: availableTickets });
});

app.listen(5000, () => console.log("Server running on port 5000"));