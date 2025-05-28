import React, { useState } from 'react';
// import './HomepageContactForm.css'; // Removed: Using Bootstrap for styling
// import styles from './HomepageContactForm.module.css'; // Removed: Using Tailwind CSS

function HomepageContactForm() {
    const [formData, setFormData] = useState({
        email: '',
        message: '',
    });
    const [submitStatus, setSubmitStatus] = useState(null); // State to track submission status

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear validation error for the field when user types (basic example)
        setSubmitStatus(null); // Clear status on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitStatus('submitting'); // Indicate submission is in progress

        // Basic client-side validation for homepage form
        if (!formData.email.trim() || !formData.message.trim()) {
            setSubmitStatus('error');
            alert('Email and message are required.');
            return;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            setSubmitStatus('error');
            alert('Invalid email format.');
            return;
        }

        try {
            // Note: The backend /contact endpoint requires name. 
            // For this simplified homepage form, we might need to add a default name 
            // or modify the backend validation to make name optional, or create a new endpoint.
            // For now, let's add a placeholder name.
            const dataToSend = { ...formData, name: 'Homepage User' };

            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/contact`, { // Use environment variable for backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                console.log('Homepage form submitted successfully:', data);
                // Clear the form after successful submission
                setFormData({
                    email: '',
                    message: '',
                });
            } else {
                setSubmitStatus('error');
                console.error('Error submitting homepage form:', data);
                alert(`Submission failed: ${data.message || (data.errors && data.errors[0].msg) || 'Unknown error'}`);
            }

        } catch (error) {
            setSubmitStatus('error');
            console.error('Network error during homepage form submission:', error);
            alert('Submission failed: Could not connect to the server.');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-3">Quick Contact</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="homepage-email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="homepage-email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="homepage-message" className="form-label">Message:</label>
                                    <textarea
                                        id="homepage-message"
                                        className="form-control"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-success w-100" disabled={submitStatus === 'submitting'}>
                                    {submitStatus === 'submitting' ? 'Sending...' : 'Send'}
                                </button>
                                {submitStatus === 'success' && <p className="text-success mt-2 text-center">Message sent!</p>}
                                {submitStatus === 'error' && <p className="text-danger mt-2 text-center">Failed to send message.</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomepageContactForm; 