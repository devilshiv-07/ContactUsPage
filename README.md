# Contact Form Frontend

A modern, responsive React frontend for the contact form application, built with Vite and React.

## Features

- Modern React components with functional components and hooks
- Responsive design that works on all devices
- Form validation using React state and custom validation logic
- Real-time error feedback
- Loading states and success/error messages
- Clean and modern UI design
- Integration with backend API

## Tech Stack

- React 18+
- Vite
- React Router
- Axios for API calls
- ESLint for code quality
- Modern CSS with custom styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the backend API URL:
```
VITE_BACKEND_API_URL=http://localhost:5000
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Runs the built app in production mode. This command must be run after `npm run build`.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── ContactUsPage.jsx
│   │   └── HomepageContactForm.jsx
│   ├── App.jsx          # Main application component
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json         # Project dependencies and scripts
```

## Development

### Environment Variables

The frontend uses environment variables for configuration:

- `VITE_BACKEND_API_URL`: URL of the backend API server

### Development Server

The development server runs on port 5173 by default. It includes:

- Hot Module Replacement (HMR)
- Automatic code reloading
- Development-specific optimizations
- Error overlay

### Building for Production

The production build is optimized with:

- Code splitting
- Tree-shaking
- Minification
- Asset optimization

## Styling

The frontend uses custom CSS with:

- CSS variables for theming
- Responsive design principles
- Modern CSS features
- Custom animations and transitions
- Mobile-first approach

## Form Validation

The contact form includes validation for:

- Required fields
- Email format validation
- Phone number format
- Message length
- Real-time error feedback

## Error Handling

The application includes:

- API error handling
- Network error handling
- Validation error handling
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License(IGNORE) 

This project is licensed under the MIT License - see the LICENSE file for details.
