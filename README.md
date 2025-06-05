# Full stack react submition form

A modern, multi-step React form application with user management, image uploads, and real-time statistics dashboard.

## Features

### 🎯 Core Functionality
- **Multi-step Form**: Clean, wizard-style form with validation
- **Image Upload**: Profile picture upload with preview and file size validation
- **User Management**: Create, view, and delete users
- **Real-time Statistics**: Dashboard showing user analytics
- **Responsive Design**: Mobile-friendly interface with modern gradients

### 📋 Form Fields
- Full Name (required)
- Email Address (required, validated)
- Profile Image (optional, max 5MB)
- Category Selection (Technology, Design, Marketing, Business, Other)
- Rating Slider (1-10 scale)

### 📊 Statistics Dashboard
- Total Users Count
- Average Rating
- Top Category
- Category Distribution

## Tech Stack

- **Frontend**: React 18+ with Hooks
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **File Handling**: FileReader API for image previews

## Prerequisites

Before running this application, ensure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API server running on `http://localhost:5000`

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd form-demo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Required Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.0.0"
  }
}
```

## Backend API Requirements

The application expects a REST API with the following endpoints:

### 📡 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/users` | Get paginated users | Query: `page`, `limit` |
| `POST` | `/api/user` | Create new user | FormData with user fields |
| `DELETE` | `/api/user/:id` | Delete user by ID | - |
| `GET` | `/api/stats` | Get user statistics | - |

### 📥 Expected API Response Format

**GET /api/users**
```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "category": "technology",
      "rating": 8,
      "imageUrl": "http://example.com/image.jpg",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**GET /api/stats**
```json
{
  "success": true,
  "data": {
    "totalUsers": 25,
    "ratingStats": {
      "average": 7.5
    },
    "categoryStats": {
      "technology": 10,
      "design": 8,
      "marketing": 4,
      "business": 2,
      "other": 1
    }
  }
}
```

## Application Flow

1. **Form Page**: Users fill out the multi-step form with validation
2. **Summary Page**: Review submitted information before final submission
3. **Gallery Page**: View all users with statistics and management options

## Form Validation

- **Name**: Required field, cannot be empty
- **Email**: Required field with email format validation
- **Category**: Must select from available options
- **Image**: Optional, maximum 5MB file size
- **Rating**: Slider input, defaults to 5/10

## File Upload Handling

- Accepts all image formats (`image/*`)
- Maximum file size: 5MB
- Generates preview using FileReader API
- Sends as FormData in multipart/form-data format

## Styling Features

- **Gradient Backgrounds**: Different color schemes for each page
- **Responsive Grid**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Loading States**: Spinners and disabled states during API calls
- **Error Handling**: User-friendly error messages

## Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

Update the API_BASE_URL in the component:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
```

## Usage Examples

### Creating a New User
1. Fill out the form on page 1
2. Review information on page 2
3. Submit to create the user
4. View the user in the gallery

### Managing Users
- View all users in the gallery with pagination
- Delete users with the delete button
- Refresh data to get latest statistics

## Error Handling

The application handles various error scenarios:
- Network connection issues
- Server errors (4xx, 5xx responses)
- File upload errors (size limits)
- Form validation errors

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Note**: This application requires a compatible backend API to function properly. Ensure your backend server is running and accessible at the configured URL.
