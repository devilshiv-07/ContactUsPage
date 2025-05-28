import React, { useState } from 'react';

function ContactUsPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        topic: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState({}); // State to store validation errors
    const [submitStatus, setSubmitStatus] = useState(null); // State to track submission status

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear validation error for the field when user types
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        } else if (formData.message.length > 1000) {
            errors.message = 'Message cannot exceed 1000 characters';
        }
        // Add more validation rules if needed (e.g., phone format)
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setSubmitStatus('error'); // Indicate validation errors occurred
            return; // Prevent submission if there are validation errors
        }

        setFormErrors({}); // Clear previous errors if validation passes
        setSubmitStatus('submitting'); // Indicate submission is in progress

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/contact`, { // Use environment variable for backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                console.log('Contact form submitted successfully:', data);
                // Optionally clear the form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    topic: '',
                    message: '',
                });
            } else {
                setSubmitStatus('error');
                console.error('Error submitting contact form:', data);
                // Display specific error messages if available from backend validation
                // alert(`Submission failed: ${data.message || (data.errors && data.errors[0].msg) || 'Unknown error'}`);
                // Update formErrors state with backend validation errors if structure matches
                if (data.errors) {
                    const backendErrors = {};
                    data.errors.forEach(err => {
                        backendErrors[err.param] = err.msg;
                    });
                    setFormErrors(backendErrors);
                } else {
                    alert(`Submission failed: ${data.message || 'Unknown error'}`);
                }
            }

        } catch (error) {
            setSubmitStatus('error');
            console.error('Network error during form submission:', error);
            alert('Submission failed: Could not connect to the server.');
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-card">
                <h2 className="contact-title">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic">Topic:</label>
                        <input
                            type="text"
                            className={`form-control ${formErrors.topic ? 'is-invalid' : ''}`}
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                        />
                        {formErrors.topic && <div className="error-message">{formErrors.topic}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                        ></textarea>
                        {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                    </div>
                    <button type="submit" className="submit-btn" disabled={submitStatus === 'submitting'}>
                        {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                    {submitStatus === 'success' && <p className="success-message">Message sent successfully!</p>}
                    {submitStatus === 'error' && Object.keys(formErrors).length === 0 && <p className="error-message">Failed to send message. Please try again.</p>}
                </form>
            </div>
        </div>
    );
}

export default ContactUsPage;