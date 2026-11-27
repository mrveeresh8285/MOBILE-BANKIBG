/**
 * Mobile Banking Application - Software Engineering Assignment 2 (Team 7)
 * app.js - Main Application Controller, Router, Event Listeners & UI Helpers
 */

const App = (function () {
  let currentRoute = "dashboard";

  // Available routes in application
  const ROUTES = [
    "dashboard",
    "balance-enquiry",
    "fund-transfer",
    "bill-payment",
    "transaction-history",
    "release-testing",
    "performance-testing",
    "alpha-testing",
    "beta-testing",
    "uat",
    "test-results",
    "about-project"
  ];

  // Route titles for topbar header
  const ROUTE_TITLES = {
    "dashboard": "Account Overview & Dashboard",
    "balance-enquiry": "Real-time Balance Enquiry",
    "fund-transfer": "Secure Peer-to-Peer Fund Transfer",
    "bill-payment": "Multi-Utility Bill Payments & Recharge",
    "transaction-history": "Transaction Ledger & Audit Trail",
    "release-testing": "Automated Release Testing Suite",
    "performance-testing": "Performance & Concurrency Benchmarking",
    "alpha-testing": "Alpha Verification & Defect Prevention",
    "beta-testing": "Beta Testing Feedback & Evaluator Ratings",
    "uat": "User Acceptance Testing (UAT) Matrix",
    "test-results": "Detailed Test Case Executions & Proof",
    "about-project": "About Project • Team 7 Specifications"
  };

  // Toast Notification System
  function showToast(message, type = "info", duration = 4000) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "fa-info-circle";
    if (type === "success") icon = "fa-check-circle";
    else if (type === "error") icon = "fa-exclamation-triangle";
    else if (type === "warn") icon = "fa-exclamation-circle";

    toast.innerHTML = `
      <div class="toast-icon"><i class="fas ${icon}"></i></div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      toast.classList.add("toast-fadeout");
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  // Router / Navigation Controller
  function navigateTo(routeId) {
    if (!AuthModule.isAuthenticated()) {
      showAuthScreen();
      return;
    }

    if (!ROUTES.includes(routeId)) {
      routeId = "dashboard";
    }

    currentRoute = routeId;
    window.location.hash = `#${routeId}`;

    // Hide all view screens
    const views = document.querySelectorAll(".view-section");
    views.forEach(v => v.classList.remove("view-active"));

    // Show target view
    const targetView = document.getElementById(`view-${routeId}`);
    if (targetView) {
      targetView.classList.add("view-active");
    }

    // Update Topbar Title
    const titleEl = document.getElementById("topbar-page-title");
    if (titleEl) {
      titleEl.textContent = ROUTE_TITLES[routeId] || "Mobile Banking Application";
    }

    // Update sidebar active link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      const target = link.getAttribute("data-route");
      if (target === routeId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close mobile drawer if open
    closeMobileSidebar();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Route-specific triggers
    handleRouteActivation(routeId);
  }

  function handleRouteActivation(routeId) {
    if (routeId === "dashboard") {
      BankingModule.renderDashboard();
    } else if (routeId === "balance-enquiry") {
      BankingModule.renderBalanceEnquiry();
    } else if (routeId === "transaction-history") {
      BankingModule.renderTransactionHistory();
    } else if (routeId === "performance-testing") {
      setTimeout(() => {
        PerformanceModule.initCharts();
      }, 100);
    }
  }

  // Auth Screen Visibility
  function showAuthScreen() {
    const authWrapper = document.getElementById("auth-view-wrapper");
    const appWrapper = document.getElementById("app-main-wrapper");
    if (authWrapper) authWrapper.style.display = "flex";
    if (appWrapper) appWrapper.style.display = "none";
  }

  function showAppScreen() {
    const authWrapper = document.getElementById("auth-view-wrapper");
    const appWrapper = document.getElementById("app-main-wrapper");
    if (authWrapper) authWrapper.style.display = "none";
    if (appWrapper) appWrapper.style.display = "flex";

    // Update user profile badges
    const user = AuthModule.getCurrentUser();
    const account = BankingModule.getAccount();

    const nameBadge = document.getElementById("topbar-user-name");
    if (nameBadge && user) nameBadge.textContent = user.displayName;

    const quickBalBadge = document.getElementById("topbar-quick-balance");
    if (quickBalBadge && account) quickBalBadge.textContent = BankingModule.formatCurrency(account.balance);
  }

  function onAuthSuccess() {
    showAppScreen();
    // Navigate to hash or dashboard
    const hash = window.location.hash.replace("#", "");
    navigateTo(hash && ROUTES.includes(hash) ? hash : "dashboard");
  }

  function handleLogout() {
    AuthModule.logout();
    showAuthScreen();
    showToast("You have been signed out safely.", "info");
    window.location.hash = "#login";
  }

  // Mobile sidebar drawer
  function toggleMobileSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar) sidebar.classList.toggle("sidebar-open");
    if (backdrop) backdrop.classList.toggle("backdrop-open");
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar) sidebar.classList.remove("sidebar-open");
    if (backdrop) backdrop.classList.remove("backdrop-open");
  }

  // Live Clock updater
  function initClock() {
    function update() {
      const clockEl = document.getElementById("topbar-clock");
      if (clockEl) {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
    }
    update();
    setInterval(update, 1000);
  }

  // Setup Form Handlers (Fund Transfer, Bills, Feedback)
  function setupForms() {
    // 1. Fund Transfer Form
    const transferForm = document.getElementById("fund-transfer-form");
    if (transferForm) {
      transferForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const btn = document.getElementById("transfer-submit-btn");
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authorizing Transfer...';
        }

        const formData = {
          beneficiaryName: document.getElementById("transfer-beneficiary-name").value,
          beneficiaryAcc: document.getElementById("transfer-beneficiary-acc").value,
          confirmAcc: document.getElementById("transfer-confirm-acc").value,
          transferMode: document.getElementById("transfer-mode-select").value,
          amount: document.getElementById("transfer-amount").value,
          remarks: document.getElementById("transfer-remarks").value
        };

        setTimeout(() => {
          const res = BankingModule.processFundTransfer(formData);

          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane mr-1"></i> Confirm & Transfer Funds';
          }

          if (res.success) {
            showToast(res.message, "success");
            transferForm.reset();
            // Show receipt
            BankingModule.showTransactionReceipt(res.transaction.id);
          } else {
            showToast(res.error, "error");
          }
        }, 500);
      });
    }

    // Quick transfer amount buttons helper
    const quickAmtBtns = document.querySelectorAll(".quick-amt-chip");
    quickAmtBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const amt = this.getAttribute("data-amount");
        const amtInput = document.getElementById("transfer-amount");
        if (amtInput) amtInput.value = amt;
      });
    });

    // 2. Bill Payment Forms (Electricity, Mobile, Internet)
    const billForms = ["electricity", "mobile", "internet"];
    billForms.forEach(cat => {
      const form = document.getElementById(`bill-form-${cat}`);
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const btn = form.querySelector('button[type="submit"]');
          if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Bill...';
          }

          const billerEl = document.getElementById(`${cat}-biller-select`);
          const numEl = document.getElementById(`${cat}-number-input`);
          const amtEl = document.getElementById(`${cat}-amount-input`);

          const formData = {
            biller: billerEl ? billerEl.value : "",
            billNumber: numEl ? numEl.value : "",
            amount: amtEl ? amtEl.value : 0
          };

          setTimeout(() => {
            const res = BankingModule.processBillPayment(cat, formData);

            if (btn) {
              btn.disabled = false;
              btn.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Pay Bill Now';
            }

            if (res.success) {
              showToast(res.message, "success");
              form.reset();
              BankingModule.showTransactionReceipt(res.transaction.id);
            } else {
              showToast(res.error, "error");
            }
          }, 500);
        });
      }
    });

    // Bill category tabs
    const billTabs = document.querySelectorAll(".bill-category-tab");
    billTabs.forEach(tab => {
      tab.addEventListener("click", function () {
        billTabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
        const target = this.getAttribute("data-target");
        document.querySelectorAll(".bill-tab-pane").forEach(p => p.classList.remove("active"));
        const targetPane = document.getElementById(`pane-${target}`);
        if (targetPane) targetPane.classList.add("active");
      });
    });

    // 3. Transaction Filter Form Elements
    const searchInput = document.getElementById("txn-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        BankingModule.updateTxnFilters("search", e.target.value);
      });
    }

    const catFilter = document.getElementById("txn-filter-category");
    if (catFilter) {
      catFilter.addEventListener("change", function (e) {
        BankingModule.updateTxnFilters("category", e.target.value);
      });
    }

    const statFilter = document.getElementById("txn-filter-status");
    if (statFilter) {
      statFilter.addEventListener("change", function (e) {
        BankingModule.updateTxnFilters("status", e.target.value);
      });
    }

    const sortFilter = document.getElementById("txn-sort-select");
    if (sortFilter) {
      sortFilter.addEventListener("change", function (e) {
        BankingModule.updateTxnFilters("sort", e.target.value);
      });
    }

    // 4. Beta Feedback Form
    const feedbackForm = document.getElementById("beta-feedback-form");
    if (feedbackForm) {
      feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = {
          name: document.getElementById("beta-input-name").value,
          role: document.getElementById("beta-input-role").value,
          comment: document.getElementById("beta-input-comment").value,
          ratingUi: document.getElementById("beta-rating-ui").value,
          ratingNav: document.getElementById("beta-rating-nav").value,
          ratingSpeed: document.getElementById("beta-rating-speed").value,
          ratingExp: document.getElementById("beta-rating-exp").value
        };
        TestingModule.submitBetaFeedback(data);
      });
    }
  }

  // App Initialization entry point
  function init() {
    initClock();
    AuthModule.setupLoginForm();
    setupForms();

    // Check authentication state
    if (AuthModule.isAuthenticated()) {
      showAppScreen();
      BankingModule.renderAllBankingViews();
      TestingModule.init();
      PerformanceModule.init();

      // Read Hash or default to dashboard
      const hash = window.location.hash.replace("#", "");
      if (ROUTES.includes(hash)) {
        navigateTo(hash);
      } else {
        navigateTo("dashboard");
      }
    } else {
      showAuthScreen();
      window.location.hash = "#login";
    }

    // Hash change listener
    window.addEventListener("hashchange", function () {
      const hash = window.location.hash.replace("#", "");
      if (hash === "login" && !AuthModule.isAuthenticated()) {
        showAuthScreen();
        return;
      }
      if (ROUTES.includes(hash)) {
        navigateTo(hash);
      }
    });
  }

  return {
    init,
    navigateTo,
    showToast,
    onAuthSuccess,
    handleLogout,
    toggleMobileSidebar,
    closeMobileSidebar
  };
})();

// Initialize when DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  App.init();
});

window.App = App;
