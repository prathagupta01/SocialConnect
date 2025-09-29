document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            try {
                const response = await api.login({ email, password });
                api.setToken(response.token);
                
                // Redirect to feed page
                window.location.href = 'feed.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            
            try {
                const response = await api.register({ username, email, password });
                api.setToken(response.token);
                
                // Redirect to feed page
                window.location.href = 'feed.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            api.clearToken();
            window.location.href = 'index.html';
        });
    }
});