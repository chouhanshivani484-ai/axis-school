import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!form.password) {
      alert("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", response);

      // Login failed
      if (!response || response.success !== true) {
        throw new Error(
          response?.message || "Invalid email or password"
        );
      }

      // Save login status
      localStorage.setItem("isLoggedIn", "true");

      // Save user
      if (response.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
      }

      // Save token if backend sends one
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      alert("Login successful! 🎉");

      // Get user role
      const role = response.user?.role?.toLowerCase();

      // Role based navigation
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;

        case "parent":
          navigate("/parent/dashboard");
          break;

        case "teacher":
          navigate("/teacher/dashboard");
          break;

        case "student":
          navigate("/student/dashboard");
          break;

        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      alert(
        error?.message ||
          "Unable to login. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* ================================
            LEFT SECTION
        ================================= */}

        <div className="login-info">

          <div className="school-logo">
            <span>AXIS</span>
            <small>SCHOOL</small>
          </div>

          <h1>
            Welcome Back! 👋
          </h1>

          <p>
            Login to your AXIS School account and manage
            your school activities, academics and
            information.
          </p>

          <div className="login-features">

            <div>
              <span>✓</span>
              <p>Secure Login</p>
            </div>

            <div>
              <span>✓</span>
              <p>Easy Access</p>
            </div>

            <div>
              <span>✓</span>
              <p>Manage Your Account</p>
            </div>

          </div>
        </div>

        {/* ================================
            LOGIN CARD
        ================================= */}

        <div className="login-card">

          <div className="login-card-header">

            <h2>
              Sign In
            </h2>

            <p>
              Enter your details to continue
            </p>

          </div>

          <form onSubmit={handleSubmit}>

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

            {/* PASSWORD */}

            <div className="input-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* REMEMBER ME */}

            <div className="remember-row">

              <label>

                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading
                ? "Signing In..."
                : "Sign In"}

            </button>

          </form>

          {/* REGISTER */}

          <div className="register-link">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create Account
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;