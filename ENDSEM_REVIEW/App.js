import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Ticket, Mail, User, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';

const EVENT_DETAILS = {
  name: "National Tech Conclave 2026",
  dept: "Dept. of Computer Science",
  date: "May 25, 2026",
  time: "09:00 AM",
  venue: "Grand Convention Hall",
  price: 500
};

function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [available, setAvailable] = useState(50);
  
  const [form, setForm] = useState({
    name: '', email: '', dept: '', tickets: 1, otp: ''
  });

  const sendOTP = async () => {
    if (!form.email.includes('@')) return setError('Enter a valid email');
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/send-otp', { email: form.email });
      setStep(2);
      setError('');
    } catch (err) { setError('Failed to send OTP'); }
    setLoading(false);
  };

  const handleBooking = async () => {
    if (!form.name || !form.dept || form.tickets < 1) return setError('All fields are mandatory');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/book', form);
      setAvailable(res.data.remaining);
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
    setLoading(false);
  };

  return (
    <div className="glass-container">
      {step < 4 && (
        <div className="event-header">
          <span className="badge">{EVENT_DETAILS.dept}</span>
          <h1 style={{ margin: '10px 0' }}>{EVENT_DETAILS.name}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.85rem', color: '#94a3b8' }}>
            <span><Calendar size={14} /> {EVENT_DETAILS.date}</span>
            <span><Clock size={14} /> {EVENT_DETAILS.time}</span>
          </div>
          <p><MapPin size={14} /> {EVENT_DETAILS.venue}</p>
          <div style={{ fontWeight: 'bold', color: '#10b981' }}>
            Seats left: {available} | Price: ₹{EVENT_DETAILS.price}
          </div>
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}

      {step === 1 && (
        <div className="input-group">
          <label>College Email ID</label>
          <input type="email" placeholder="name@college.edu" onChange={e => setForm({...form, email: e.target.value})} />
          <button className="btn-primary" onClick={sendOTP} disabled={loading}>
            {loading ? 'Processing...' : 'Request OTP'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="input-group">
          <label>Enter 6-Digit OTP</label>
          <input type="text" placeholder="Check your inbox" onChange={e => setForm({...form, otp: e.target.value})} />
          <button className="btn-primary" onClick={() => setStep(3)}>Verify OTP</button>
        </div>
      )}

      {step === 3 && (
        <div className="booking-form">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Your Department</label>
            <select onChange={e => setForm({...form, dept: e.target.value})}>
              <option value="">Select Dept</option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ME">Mechanical</option>
            </select>
          </div>
          <div className="input-group">
            <label>Number of Tickets</label>
            <input type="number" min="1" max={available} onChange={e => setForm({...form, tickets: parseInt(e.target.value)})} />
          </div>
          <button className="btn-primary" onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: 'center' }}>
          <CheckCircle size={60} color="#10b981" style={{ marginBottom: '20px' }} />
          <h2 style={{ color: '#10b981' }}>Booking Successful!</h2>
          <p>Confirmation sent to {form.email}</p>
          <div className="summary-card">
            <p><strong>Ticket Holder:</strong> {form.name}</p>
            <p><strong>Event:</strong> {EVENT_DETAILS.name}</p>
            <p><strong>Quantity:</strong> {form.tickets}</p>
            <hr style={{ border: '0.5px solid rgba(255,255,255,0.1)' }} />
            <h3>Total Paid: ₹{form.tickets * EVENT_DETAILS.price}</h3>
          </div>
          <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => window.location.reload()}>
            New Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default App;