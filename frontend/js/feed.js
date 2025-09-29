document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    if (!api.token) {
        window.location.href = 'index.html';
        return;
    }

    // Create post form
    const createPostForm = document.getElementById('create-post-form');
    if (createPostForm) {
        createPostForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const content = document.getElementById('post-content').value;
            
            try {
                await api.createPost({ content });
                document.getElementById('post-content').value = '';
                loadFeed();
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Load feed
    async function loadFeed() {
        try {
            const posts = await api.getFeed();
            const feedContainer = document.getElementById('feed-container');
            
            if (feedContainer) {
                feedContainer.innerHTML = '';
                
                if (posts.length === 0) {
                    feedContainer.innerHTML = '<p>No posts yet. Follow some users to see their posts!</p>';
                    return;
                }
                
                posts.forEach(post => {
                    const postElement = createPostElement(post);
                    feedContainer.appendChild(postElement);
                });
            }
        } catch (error) {
            console.error('Error loading feed:', error);
        }
    }

    // Create post element
    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.dataset.postId = post.id;
        
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
        const likeBtn = postDiv.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => toggleLike(post.id));
        
        const deleteBtn = postDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deletePost(post.id));
        
        return postDiv;
    }

    // Toggle like
    async function toggleLike(postId) {
        try {
            // In a real app, you would check if the post is already liked
            await api.likePost(postId);
            // Update UI
            loadFeed();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    }

    // Delete post
    async function deletePost(postId) {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await api.deletePost(postId);
                loadFeed();
            } catch (error) {
                alert(error.message);
            }
        }
    }

    // Initial load
    loadFeed();
});