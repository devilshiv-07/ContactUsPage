import React, { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FaPhoneVolume } from "react-icons/fa6";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({}); // State to store validation errors
  const [submitStatus, setSubmitStatus] = useState(null); // State to track submission status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error for the field when user types
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length > 1000) {
      errors.message = "Message cannot exceed 1000 characters";
    }
    // Add more validation rules if needed (e.g., phone format)
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus("error"); // Indicate validation errors occurred
      return; // Prevent submission if there are validation errors
    }

    setFormErrors({}); // Clear previous errors if validation passes
    setSubmitStatus("submitting"); // Indicate submission is in progress

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/contact`,
        {
          // Use environment variable for backend URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        console.log("Contact form submitted successfully:", data);
        // Optionally clear the form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("Error submitting contact form:", data);
        // Display specific error messages if available from backend validation
        // alert(`Submission failed: ${data.message || (data.errors && data.errors[0].msg) || 'Unknown error'}`);
        // Update formErrors state with backend validation errors if structure matches
        if (data.errors) {
          const backendErrors = {};
          data.errors.forEach((err) => {
            backendErrors[err.param] = err.msg;
          });
          setFormErrors(backendErrors);
        } else {
          alert(`Submission failed: ${data.message || "Unknown error"}`);
        }
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error during form submission:", error);
      alert("Submission failed: Could not connect to the server.");
    }
  };

  return (
    <div className="h-[92vh] md:[90vh] px-8 lg:px-20 py-10 lg:py-16 lg:flex lg:justify-between lg:gap-30">
      {/* Banner div */}
      <div className="mb-14 lg:w-1/2">
        <div className="mb-14">
          <h1 className="text-3xl font-semibold mb-5">
            Contact Us, We're Ready to Help!
          </h1>
          <p className="text-[#aaa] mb-2">
            We strive to provide you with the best experience and the best
            platform to find your choice.
          </p>
          <p className="text-[#aaa] mb-2">
            Post us any queries and we'll get back to you.
          </p>
        </div>

        <div className="flex gap-4 mb-14 flex items-center">
          <BsChatDots className="border-2 p-3 rounded-xl" size={58} />
          <div>
            <h1 className="text-xl mb-1.5">Chat with us !!</h1>
            <p className="text-[#8a8a8a]">Our friendly team is ready to help</p>
            <p className="text-teal-400">hello@toletglobe.in</p>
          </div>
        </div>

        <div className="flex gap-4 flex items-center">
          <FaPhoneVolume className="p-3 rounded-xl text-black bg-white" size={58} />
          <div>
            <h1 className="text-xl mb-1.5">Call us...</h1>
            <p className="text-[#8a8a8a]">Mon - Sat, 8 AM to 10PM</p>
            <p className="text-teal-400">+91 8707727347</p>
          </div>
        </div>
      </div>

      {/* Form Div */}
      <div className="text-[#9a9a9a] pb-10 lg:pb-0 lg:w-1/2">
        <form onSubmit={handleSubmit}>
          
          {/* Topic div */}
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="topic">Topic</label>
            <input
              placeholder="select a topic"
              type="text"
              className={`border px-4 py-2 rounded-lg ${formErrors.topic ? "is-invalid" : ""}`}
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            />
            {formErrors.topic && (
              <div className="error-message">{formErrors.topic}</div>
            )}
          </div>

          {/* Name div */}
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="name">Name</label>
            <input
              placeholder="johndoe"
              type="text"
              className={`border px-4 py-2 rounded-lg ${formErrors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {formErrors.name && (
              <div className="error-message">{formErrors.name}</div>
            )}
          </div>

          {/* Email div */}
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="email">Email</label>
            <input
              placeholder="name@provider.com"
              type="email"
              className={`border px-4 py-2 rounded-lg ${formErrors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && (
              <div className="error-message">{formErrors.email}</div>
            )}
          </div>

          {/* Message div */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="message">Message</label>
            <textarea
              placeholder="Type your message..."
              id="message"
              className={`border px-4 py-2 rounded-lg ${
                formErrors.message ? "is-invalid" : ""
              }`}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="3"
            ></textarea>
            {formErrors.message && (
              <div className="error-message">{formErrors.message}</div>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full text-black bg-teal-300 rounded py-2 font-bold"
            disabled={submitStatus === "submitting"}
          >
            {submitStatus === "submitting" ? "Sending..." : "Send Message"}
          </button>
          {submitStatus === "success" && (
            <p className="success-message">Message sent successfully!</p>
          )}
          {submitStatus === "error" && Object.keys(formErrors).length === 0 && (
            <p className="error-message">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
