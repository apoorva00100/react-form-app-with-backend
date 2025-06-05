const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

console.log('Loading user routes...');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1
  },
  fileFilter: fileFilter
});

// In-memory storage for demo (replace with database in production)
let users = [];
let nextId = 1;

// Validation middleware
const validateUserData = (req, res, next) => {
  const { name, email, category, rating } = req.body;
  const errors = {};

  // Validate name
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.name = 'Name is required and must be a valid string';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Valid email address is required';
  }

  // Validate category
  const validCategories = ['technology', 'design', 'marketing', 'business', 'other'];
  if (!category || !validCategories.includes(category)) {
    errors.category = 'Valid category is required';
  }

  // Validate rating
  const ratingNum = parseInt(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
    errors.rating = 'Rating must be a number between 1 and 10';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Routes

// GET /api/users - Get all users with pagination
router.get('/users', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';

    let filteredUsers = users;

    // Filter by search term (name or email)
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filteredUsers = filteredUsers.filter(user => user.category === category);
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        hasNextPage: endIndex < filteredUsers.length,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
});

// GET /api/user/:id - Get specific user
router.get('/user/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message
    });
  }
});

// POST /api/user - Create new user
router.post('/user', upload.single('image'), validateUserData, (req, res) => {
  try {
    const { name, email, category, rating } = req.body;

    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      // Clean up uploaded file if email exists
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user object
    const newUser = {
      id: nextId++,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      category,
      rating: parseInt(rating),
      imageUrl: req.file ? `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}` : null,
      imagePath: req.file ? req.file.path : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// PUT /api/user/:id - Update user
router.put('/user/:id', upload.single('image'), (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { name, email, category, rating } = req.body;
    const user = users[userIndex];

    // Update fields if provided
    if (name) user.name = name.trim();
    if (email) user.email = email.toLowerCase().trim();
    if (category) user.category = category;
    if (rating) user.rating = parseInt(rating);

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (user.imagePath && fs.existsSync(user.imagePath)) {
        fs.unlink(user.imagePath, (err) => {
          if (err) console.error('Error deleting old file:', err);
        });
      }
      user.imageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
      user.imagePath = req.file.path;
    }

    user.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
});

// DELETE /api/user/:id - Delete user
router.delete('/user/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[userIndex];

    // Delete associated image file
    if (user.imagePath && fs.existsSync(user.imagePath)) {
      fs.unlink(user.imagePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    users.splice(userIndex, 1);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
});

// GET /api/stats - Get user statistics
router.get('/stats', (req, res) => {
  try {
    const totalUsers = users.length;
    const categoryStats = {};
    const ratingStats = {
      average: 0,
      distribution: {}
    };

    users.forEach(user => {
      // Category statistics
      categoryStats[user.category] = (categoryStats[user.category] || 0) + 1;
      
      // Rating statistics
      ratingStats.distribution[user.rating] = (ratingStats.distribution[user.rating] || 0) + 1;
    });

    // Calculate average rating
    if (totalUsers > 0) {
      const totalRating = users.reduce((sum, user) => sum + user.rating, 0);
      ratingStats.average = (totalRating / totalUsers).toFixed(1);
    }

    res.json({
      success: true,
      data: {
        totalUsers,
        categoryStats,
        ratingStats,
        recentUsers: users.slice(-5).reverse() // Last 5 users
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics',
      error: error.message
    });
  }
});

module.exports = router;