import { useState } from "react";
import './Login.css'
import { FaGraduationCap } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
        toast.warning("Please fill all fields");
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.success) {
            console.log(data);
            localStorage.setItem("token", data.token); 
            toast.success("Login Succesful ✅")
            navigate(`/dashboard`);
        }
        if(!data.success){
            toast.info(data.message);
        }

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
        <div className="auth-wrap">
        <div className="auth-card">
            <div className="text-center mb-6">
            {/* <FaGraduationCap size={25}/> */}
            <h2 className="text-2xl fw-7 font-display mt-2">🎓 
                <br />Welcome Back</h2>
            <p className="text-sm c-muted mt-1">Sign in to your AcadTrack account</p>
            </div>

            <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="2024umt1234@mnit.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="text-right mb-4">
            <span className="text-sm c-indigo cursor-pointer fw-5">Forgot password?</span>
            </div>

            <button className="btn btn-primary btn-lg btn-full" onClick={handleSubmit}>Sign In →</button>

            <div className="divider" />
            <p className="text-sm text-center c-muted">
            Don't have an account?{" "}
            <span className="c-indigo fw-6 cursor-pointer" onClick={() => navigate('/register')}>Create one</span>
            </p>
        </div>
        </div>
    </>
    
  );
}
