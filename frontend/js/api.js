class API {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.token = localStorage.getItem('token');
    }

    // Set auth token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Clear auth token
    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['x-auth-token'] = this.token;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth methods
    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    // Post methods
    async getPosts() {
        return this.request('/posts');
    }

    async getFeed() {
        return this.request('/posts/feed');
    }

    async createPost(postData) {
        return this.request('/posts', {
            method: 'POST',
            body: JSON.stringify(postData)
        });
    }

    async deletePost(postId) {
        return this.request(`/posts/${postId}`, {
            method: 'DELETE'
        });
    }

    // User methods
    async getUserProfile(userId) {
        return this.request(`/users/${userId}`);
    }

    async updateUserProfile(userId, userData) {
        return this.request(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    // Like methods
    async likePost(postId) {
        return this.request(`/likes`, {
            method: 'POST',
            body: JSON.stringify({ post_id: postId })
        });
    }

    async unlikePost(postId) {
        return this.request(`/likes/${postId}`, {
            method: 'DELETE'
        });
    }

    // Comment methods
    async getComments(postId) {
        return this.request(`/comments/post/${postId}`);
    }

    async addComment(postId, content) {
        return this.request(`/comments`, {
            method: 'POST',
            body: JSON.stringify({ post_id: postId, content })
        });
    }
}

// Export API instance
const api = new API();