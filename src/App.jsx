import { useState } from 'react'
import ContactUsPage from './components/ContactUsPage'
import HomepageContactForm from './components/HomepageContactForm'

function App() {
  const [currentPage, setCurrentPage] = useState('homepage') // State to manage which page to display

  const renderPage = () => {
    if (currentPage === 'homepage') {
      // In a real homepage, you'd have other content. Here we just show the homepage form.
      return (
        <div className="container mt-4">
          <h1>Welcome to the Homepage</h1>
          <p>This is some homepage content.</p>
          <HomepageContactForm />
        </div>
      );
    } else if (currentPage === 'contact') {
      return <ContactUsPage />;
    }
    return null; // Or a 404 component
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light mb-4">
        <div className="container">
          <button
            onClick={() => setCurrentPage('homepage')}
            className={`btn ${currentPage === 'homepage' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          >
            Homepage (with form)
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className={`btn ${currentPage === 'contact' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Dedicated Contact Page
          </button>
        </div>
      </nav>
      {renderPage()}
      {/* Removed previous component includes */}
      {/* <ContactUsPage /> */}
      {/* <HomepageContactForm /> */}
    </>
  )
}

export default App
