import { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password || !confirm || !name) {
        return alert("Please Fill all fields");
    }

    try {
        const response = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                name, 
                confirm,
            }),
        });

        const data = await response.text();

        console.log(data);
        alert("User Created Successfully ✅");

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="text-center mb-6">
          <span className='text-2xl'>🎓</span>
          <h2 className="text-2xl fw-7 font-display mt-1">Create Account</h2>
          <p className="text-sm c-muted mt-1">Track your academics from day one</p>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input className="form-input" placeholder="Krishna Sharma" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Student Email *</label>
          <input className="form-input" type="email" placeholder="2024umt1234@mnit.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <div className="form-group">
            <label className="form-label">Password *</label>
            <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input className="form-input" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-full" onClick={handleSubmit}>Create Account →</button>

        <div className="divider" />
        <p className="text-sm text-center c-muted">
          Already have an account?{" "}
          <span className="c-indigo fw-6 cursor-pointer" onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}