import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
      !form.subject ||
      !form.message
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api";

      const response = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log("CONTACT RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message"
        );
      }

      alert(
        "Your message has been sent successfully! 🎉"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("CONTACT ERROR:", error);

      alert(
        error.message ||
          "Unable to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="page-hero">
        <div>
          <span>CONTACT US</span>

          <h1>We'd Love To Hear From You</h1>

          <p>
            Have a question about admissions, academics or
            school facilities? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}

      <section className="content-section">
        <div className="contact-grid">

          {/* ================= CONTACT INFO ================= */}

          <div className="contact-info">

            <span className="section-label">
              GET IN TOUCH
            </span>

            <h2>
              Let's Start a
              <span> Conversation</span>
            </h2>

            <p>
              Our team is available to answer your questions
              and help you with any information you need.
            </p>

            {/* Address */}

            <div className="contact-item">
              <div>📍</div>

              <section>
                <strong>Address</strong>

                <p>
                  AXIS School Campus,
                  New Delhi, India
                </p>
              </section>
            </div>

            {/* Phone */}

            <div className="contact-item">
              <div>📞</div>

              <section>
                <strong>Phone</strong>

                <p>+91 98765 43210</p>
              </section>
            </div>

            {/* Email */}

            <div className="contact-item">
              <div>✉️</div>

              <section>
                <strong>Email</strong>

                <p>info@axisschool.edu</p>
              </section>
            </div>

            {/* Office Hours */}

            <div className="contact-item">
              <div>🕐</div>

              <section>
                <strong>Office Hours</strong>

                <p>
                  Monday – Saturday,
                  8:00 AM – 4:00 PM
                </p>
              </section>
            </div>

          </div>

          {/* ================= CONTACT FORM ================= */}

          <div className="contact-form-card">

            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>

              {/* Name + Email */}

              <div className="form-row">

                <div>
                  <label htmlFor="name">
                    Your Name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">
                    Email *
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              {/* Phone */}

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
              />

              {/* Subject */}

              <label htmlFor="subject">
                Subject *
              </label>

              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={form.subject}
                onChange={handleChange}
                required
              />

              {/* Message */}

              <label htmlFor="message">
                Message *
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                required
              />

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Message →"}
              </button>

            </form>

          </div>

        </div>
      </section>
    </>
  );
}

export default Contact;