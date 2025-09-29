document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    if (!api.token) {
        window.location.href = 'index.html';
        return;
    }

    // Load user profile
    async function loadProfile() {
        try {
            // Get user ID from token (in a real app, you would decode the token)
            const userId = 1; // Placeholder
            
            const user = await api.getUserProfile(userId);
            
            // Update profile UI
            document.getElementById('profile-avatar').src = user.avatar || 'https://via.placeholder.com/120';
            document.getElementById('profile-name').textContent = user.username;
            document.getElementById('profile-bio').textContent = user.bio || 'No bio yet';
            document.getElementById('posts-count').textContent = user.posts_count || 0;
            document.getElementById('followers-count').textContent = user.followers_count || 0;
            document.getElementById('following-count').textContent = user.following_count || 0;
            
            // Load user posts
            loadUserPosts(userId);
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    // Load user posts
    async function loadUserPosts(userId) {
        try {
            const posts = await api.getPosts();
            const userPosts = posts.filter(post => post.user_id === userId);
            const postsContainer = document.getElementById('user-posts');
            
            if (postsContainer) {
                postsContainer.innerHTML = '';
                
                if (userPosts.length === 0) {
                    postsContainer.innerHTML = '<p>No posts yet.</p>';
                    return;
                }
                
                userPosts.forEach(post => {
                    const postElement = createPostElement(post);
                    postsContainer.appendChild(postElement);
                });
            }
        } catch (error) {
            console.error('Error loading user posts:', error);
        }
    }

    // Create post element
    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        const formattedDate = new Date(post.created_at).toLocaleString();
        
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar || 'https://via.placeholder.com/40'}" alt="${post.username}" class="post-avatar">
                <div class="post-user-info">
                    <h3>${post.username}</h3>
                    <span class="post-time">${formattedDate}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            </div>
            <div class="post-actions">
                <button class="post-action-btn like-btn">
                    <i class="far fa-heart"></i> Like
                </button>
                <button class="post-action-btn comment-btn">
                    <i class="far fa-comment"></i> Comment
                </button>
                <button class="post-action-btn delete-btn">
                    <i class="far fa-trash-alt"></i> Delete
                </button>
            </div>
        `;
        
        // Add event listeners
        const deleteBtn = postDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deletePost(post.id));
        
        return postDiv;
    }

    // Delete post
    async function deletePost(postId) {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await api.deletePost(postId);
                loadProfile(); // Reload profile to update posts
            } catch (error) {
                alert(error.message);
            }
        }
    }

    // Initial load
    loadProfile();
});