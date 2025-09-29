# SocialConnect
# Project Features

# User Authentication:
        User registration and login
        JWT-based authentication
        Protected routes

# Social Features:
        Create, view, and delete posts
        Like and comment on posts
        User profiles with posts
        Follow other users

# UI Components:
        Responsive navigation bar
        Login and signup forms
        Post creation form
        Post display with actions
        User profile page

# API Integration:
        Frontend communicates with backend via REST API
        Token-based authentication
        CRUD operations for posts


# project structure

social-media-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Like.js
│   │   ├── Comment.js
│   │   └── Follow.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── posts.js
│   │   ├── likes.js
│   │   └── comments.js
│   ├── middleware/
│   │   └── auth.js
│   ├── package.json
│   ├── app.js
│   └── server.js
└── frontend/
    ├── public/
    │   ├── index.html
    │   ├── css/
    │   │   └── style.css
    │   └── js/
    │       ├── auth.js
    │       ├── feed.js
    │       ├── profile.js
    │       ├── post.js
    │       └── api.js
    └── package.json