import React, { useState } from "react";
import Map1 from "../../assets/images/Map1.jpg";
import Map2 from "../../assets/images/map.png";
import { FaArrowRightLong } from "react-icons/fa6";

function HomepageContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null); // State to track submission status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error for the field when user types (basic example)
    setSubmitStatus(null); // Clear status on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus("submitting"); // Indicate submission is in progress

    // Basic client-side validation for homepage form
    if (!formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus("error");
      alert("Email and message are required.");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      setSubmitStatus("error");
      alert("Invalid email format.");
      return;
    }

    try {
      // Note: The backend /contact endpoint requires name.
      // For this simplified homepage form, we might need to add a default name
      // or modify the backend validation to make name optional, or create a new endpoint.
      // For now, let's add a placeholder name.
      const dataToSend = { ...formData, name: "Homepage User" };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/contact`,
        {
          // Use environment variable for backend URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        console.log("Homepage form submitted successfully:", data);
        // Clear the form after successful submission
        setFormData({
          email: "",
          message: "",
          phone: "",
          name: ""
        });
        setTimeout(() => {
          setSubmitStatus(null);
        },3000)
      } else {
        setSubmitStatus("error");
        console.error("Error submitting homepage form:", data);
        alert(
          `Submission failed: ${
            data.message ||
            (data.errors && data.errors[0].msg) ||
            "Unknown error"
          }`
        );
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error during homepage form submission:", error);
      alert("Submission failed: Could not connect to the server.");
    }
  };

  return (
    <div className="w-full h-[92vh] md:h-[90vh] py-10">

      {/* Container div */}
      <div className="mt-4 px-10 mb-6">

        {/* Image div */}
        <div className="hidden lg:block -z-1 absolute top-20 bottom-10 left-0 right-0 bg-black">
            <img className="h-full" src={Map2} alt="map_img" />
            <div className="sm:absolute sm:top-0 sm:left-0 sm:w-full sm:h-full sm:bg-gradient-to-l sm:from-black/95 sm:to-transparent"></div>
        </div>

        {/* Form main div */}
        <div className="lg:w-[325px] flex flex-col lg:absolute lg:right-5 lg:bottom-25">

          {/* Header Div */}
          <div className="flex flex-col items-center lg:items-start mb-6">
            <h1 className="text-2xl lg:text-4xl lg:text-red-400 text-teal-500 mb-5">GET IN TOUCH</h1>
            <p className="text-[15px] mb-1.5">Have some questions?</p>
            <p className="text-[15px]">Feel free to ask them anytime.</p>
          </div>

          {/* Form div */}
          <div>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="w-full">
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
                />
              </div>

              {/* Email */}
              <div className="w-full">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
                />
              </div>

              {/* Phone */}
              <div className="w-full">
                <input
                  placeholder="Phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-lg bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
                />
              </div>

              {/* Message */}
              <div className="w-full">
                <input
                  placeholder="Message"
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full text-lg bg-transparent border-b-2 border-white placeholder:text-white placeholder:font-thin text-white focus:outline-none my-6"
                ></input>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="flex items-center gap-1.5 text-yellow-500"
                disabled={submitStatus === "submitting"}
              >
                {submitStatus === "submitting" ? "Sending..." : "Send Message"}
                {submitStatus === "submitting" ? (
                  "."
                ) : (
                  <FaArrowRightLong className="pt-1" />
                )}
              </button>

              {submitStatus === "success" && (
                <p className="text-success mt-2 text-center">Message sent!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-danger mt-2 text-center">
                  Failed to send message.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Image Div */}
      <div className="sm:absolute sm:bottom-25 sm:top-22 sm:-z-1 lg:hidden">
        <img className="h-full" src={Map1} alt="map_image" />
        <div className="sm:absolute sm:top-0 sm:left-0 sm:w-full sm:h-full sm:bg-gradient-to-l sm:from-black/95 sm:to-transparent"></div>
      </div>
    </div>
  );
}

export default HomepageContactForm;
