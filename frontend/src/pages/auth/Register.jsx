import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.phone
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (form.phone.length !== 10) {
      alert("Please enter a valid 10 digit phone number");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
      });

      console.log("REGISTER RESPONSE:", response);

      alert("Registration successful! 🎉");

      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      alert(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* LEFT SECTION */}
        <div className="register-info">

          <div className="school-logo">
            <span>AXIS</span>
            <small>SCHOOL</small>
          </div>

          <h1>Join AXIS School 🎓</h1>

          <p>
            Create your AXIS School account and get access
            to academics, activities and school information.
          </p>

          <div className="register-features">

            <div>
              <span>✓</span>
              <p>Secure Account</p>
            </div>

            <div>
              <span>✓</span>
              <p>Easy Access</p>
            </div>

            <div>
              <span>✓</span>
              <p>School Portal</p>
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="register-card">

          <div className="register-card-header">

            <h2>Create Account</h2>

            <p>
              Enter your details to register
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="input-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />

            </div>

            {/* EMAIL */}
            <div className="input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>

            {/* PHONE */}
            <div className="input-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter 10 digit phone number"
                value={form.phone}
                onChange={handleChange}
                maxLength="10"
                autoComplete="tel"
                required
              />

            </div>

            {/* ROLE */}
            <div className="input-group">

              <label htmlFor="role">
                Select Role
              </label>

              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >

                <option value="student">
                  Student
                </option>

                <option value="parent">
                  Parent
                </option>

                <option value="teacher">
                  Teacher
                </option>

              </select>

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="password-wrapper">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* TERMS */}
            <div className="terms-row">

              <label>

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the terms and conditions
                </span>

              </label>

            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="login-link">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign In
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;