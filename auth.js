/**
 * Mobile Banking Application - Software Engineering Assignment 2 (Team 7)
 * auth.js - User Authentication, Credential Validation & Session Handling
 */

const AuthModule = (function () {
  const SESSION_KEY = "mbank_session";
  const DEMO_USER = "admin";
  const DEMO_PASS = "1234";

  // Check if user is authenticated
  function isAuthenticated() {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      return !!(session && session.isLoggedIn);
    } catch (e) {
      return false;
    }
  }

  // Get current session object
  function getCurrentUser() {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      return session || null;
    } catch (e) {
      return null;
    }
  }

  // Login handler
  function login(username, password, remember = false) {
    const trimmedUser = (username || "").trim();
    const trimmedPass = (password || "").trim();

    // Field presence validation
    if (!trimmedUser && !trimmedPass) {
      return {
        success: false,
        error: "Please enter your username and password."
      };
    }
    if (!trimmedUser) {
      return {
        success: false,
        error: "Username is required. (Demo: admin)"
      };
    }
    if (!trimmedPass) {
      return {
        success: false,
        error: "Password is required. (Demo: 1234)"
      };
    }

    // Credential check
    if (trimmedUser === DEMO_USER && trimmedPass === DEMO_PASS) {
      const sessionData = {
        isLoggedIn: true,
        username: DEMO_USER,
        displayName: "Alex J. Morgan",
        role: "Account Holder / Administrator",
        loginTime: new Date().toISOString(),
        rememberMe: remember,
        token: "MBANK-AUTH-" + Math.random().toString(36).substring(2, 10).toUpperCase()
      };

      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

      return {
        success: true,
        message: "Login successful! Welcome back, Alex J. Morgan.",
        session: sessionData
      };
    } else {
      // Descriptive invalid credential feedback
      let reason = "Invalid username or password.";
      if (trimmedUser !== DEMO_USER && trimmedPass === DEMO_PASS) {
        reason = "Unrecognized username. Use demo username: admin";
      } else if (trimmedUser === DEMO_USER && trimmedPass !== DEMO_PASS) {
        reason = "Incorrect password. Use demo password: 1234";
      }

      return {
        success: false,
        error: reason
      };
    }
  }

  // Logout handler
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    return {
      success: true,
      message: "You have been logged out securely."
    };
  }

  // Auto-fill demo credentials helper for easy evaluation
  function autoFillDemo() {
    const userField = document.getElementById("login-username");
    const passField = document.getElementById("login-password");
    if (userField && passField) {
      userField.value = DEMO_USER;
      passField.value = DEMO_PASS;
      userField.classList.remove("input-error");
      passField.classList.remove("input-error");
      const errEl = document.getElementById("login-error-message");
      if (errEl) errEl.style.display = "none";
    }
  }

  // Initialize event listeners on login form
  function setupLoginForm() {
    const form = document.getElementById("login-form");
    const demoBtn = document.getElementById("btn-autofill-demo");
    const togglePassBtn = document.getElementById("btn-toggle-password");
    const passField = document.getElementById("login-password");

    if (demoBtn) {
      demoBtn.addEventListener("click", function (e) {
        e.preventDefault();
        autoFillDemo();
        App.showToast("Demo credentials loaded: admin / 1234", "info");
      });
    }

    if (togglePassBtn && passField) {
      togglePassBtn.addEventListener("click", function () {
        const isPassword = passField.type === "password";
        passField.type = isPassword ? "text" : "password";
        const icon = togglePassBtn.querySelector("i");
        if (icon) {
          icon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
        }
      });
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
        const remember = document.getElementById("login-remember") ? document.getElementById("login-remember").checked : false;
        const errEl = document.getElementById("login-error-message");
        const submitBtn = document.getElementById("login-submit-btn");

        // UI loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        }

        setTimeout(() => {
          const result = login(username, password, remember);

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-lock"></i> Sign In to Account';
          }

          if (result.success) {
            if (errEl) errEl.style.display = "none";
            App.showToast(result.message, "success");
            App.onAuthSuccess();
          } else {
            if (errEl) {
              errEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${result.error}`;
              errEl.style.display = "flex";
            }
            App.showToast(result.error, "error");
          }
        }, 400); // realistic brief auth verification delay
      });
    }
  }

  return {
    isAuthenticated,
    getCurrentUser,
    login,
    logout,
    autoFillDemo,
    setupLoginForm
  };
})();

window.AuthModule = AuthModule;
