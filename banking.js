/**
 * Mobile Banking Application - Software Engineering Assignment 2 (Team 7)
 * banking.js - Core Banking Logic: Balance, Transfers, Bill Payments & Transactions
 */

const BankingModule = (function () {
  const ACCOUNT_KEY = "mbank_account";
  const TRANSACTIONS_KEY = "mbank_transactions";
  const BENEFICIARIES_KEY = "mbank_beneficiaries";

  // Initialize or fetch account state from localStorage
  function getAccount() {
    try {
      const data = localStorage.getItem(ACCOUNT_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading account from localStorage:", e);
    }
    // Seed default if empty or corrupt
    const initial = JSON.parse(JSON.stringify(window.SEED_DATA.account));
    saveAccount(initial);
    return initial;
  }

  function saveAccount(account) {
    account.lastUpdated = new Date().toISOString();
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    return account;
  }

  // Get transactions from localStorage
  function getTransactions() {
    try {
      const data = localStorage.getItem(TRANSACTIONS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading transactions from localStorage:", e);
    }
    const initial = JSON.parse(JSON.stringify(window.SEED_DATA.transactions));
    saveTransactions(initial);
    return initial;
  }

  function saveTransactions(transactions) {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    return transactions;
  }

  // Reset all data to default seed
  function resetDemoData() {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(window.SEED_DATA.account));
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(window.SEED_DATA.transactions));
    renderAllBankingViews();
    App.showToast("Demo data successfully restored to factory defaults.", "info");
  }

  // Currency Formatter
  function formatCurrency(amount) {
    const num = parseFloat(amount) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  // Format Date Helper
  function formatDate(isoOrString) {
    try {
      const d = new Date(isoOrString);
      if (isNaN(d.getTime())) return isoOrString;
      return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return isoOrString;
    }
  }

  // Generate Unique Transaction ID
  function generateTxnId() {
    const random = Math.floor(100000 + Math.random() * 900000);
    return "TXN-" + random;
  }

  // ----------------------------------------------------
  // FEATURE 2: DASHBOARD RENDERING
  // ----------------------------------------------------
  let isAccountMasked = true;

  function renderDashboard() {
    const account = getAccount();
    const transactions = getTransactions();

    // Welcome greeting based on time of day
    const hour = new Date().getHours();
    let greeting = "Good morning";
    if (hour >= 12 && hour < 17) greeting = "Good afternoon";
    else if (hour >= 17) greeting = "Good evening";

    const greetingEl = document.getElementById("dash-greeting");
    if (greetingEl) greetingEl.textContent = `${greeting}, ${account.holderName}`;

    // Account Number & Masking
    const accNumEl = document.getElementById("dash-account-number");
    if (accNumEl) {
      accNumEl.textContent = isAccountMasked ? account.maskedNumber : account.accountNumber;
    }

    // Balances
    const balEl = document.getElementById("dash-balance");
    if (balEl) balEl.textContent = formatCurrency(account.balance);

    const ledgerEl = document.getElementById("dash-ledger-balance");
    if (ledgerEl) ledgerEl.textContent = formatCurrency(account.ledgerBalance);

    // Metrics summary
    let totalCredits = 0;
    let totalDebits = 0;
    transactions.forEach(t => {
      if (t.status === "SUCCESS") {
        if (t.flow === "credit") totalCredits += t.amount;
        else if (t.flow === "debit") totalDebits += t.amount;
      }
    });

    const totalTxnCountEl = document.getElementById("dash-total-txns");
    if (totalTxnCountEl) totalTxnCountEl.textContent = transactions.length;

    const totalCreditsEl = document.getElementById("dash-total-credits");
    if (totalCreditsEl) totalCreditsEl.textContent = formatCurrency(totalCredits);

    const totalDebitsEl = document.getElementById("dash-total-debits");
    if (totalDebitsEl) totalDebitsEl.textContent = formatCurrency(totalDebits);

    // Limit progress
    const limitPct = Math.min(100, Math.round((account.dailyUsed / account.dailyLimit) * 100));
    const limitProgressEl = document.getElementById("dash-limit-progress");
    if (limitProgressEl) limitProgressEl.style.width = `${limitPct}%`;

    const limitTextEl = document.getElementById("dash-limit-text");
    if (limitTextEl) {
      limitTextEl.textContent = `${formatCurrency(account.dailyUsed)} / ${formatCurrency(account.dailyLimit)} (${limitPct}%)`;
    }

    // Top 5 recent transactions
    renderRecentTransactions(transactions.slice(0, 5));
    renderQuickBeneficiaries();
  }

  function renderRecentTransactions(recentList) {
    const listEl = document.getElementById("dash-recent-transactions-list");
    if (!listEl) return;

    if (recentList.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-receipt"></i>
          <p>No transactions recorded yet.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = recentList.map(t => {
      const isCredit = t.flow === "credit";
      const isSuccess = t.status === "SUCCESS";
      const sign = isCredit ? "+" : "-";
      const badgeClass = isSuccess ? "badge-success" : "badge-danger";
      const amountClass = isCredit ? "text-emerald" : "text-slate";
      let iconClass = "fa-exchange-alt";

      if (t.type.toLowerCase().includes("electric")) iconClass = "fa-bolt";
      else if (t.type.toLowerCase().includes("mobile")) iconClass = "fa-mobile-alt";
      else if (t.type.toLowerCase().includes("internet")) iconClass = "fa-wifi";
      else if (t.type.toLowerCase().includes("salary")) iconClass = "fa-briefcase";
      else if (t.type.toLowerCase().includes("transfer")) iconClass = "fa-paper-plane";

      return `
        <div class="transaction-item" onclick="BankingModule.showTransactionReceipt('${t.id}')">
          <div class="txn-icon-wrapper ${isCredit ? 'icon-credit' : 'icon-debit'}">
            <i class="fas ${iconClass}"></i>
          </div>
          <div class="txn-info">
            <h4 class="txn-title">${t.title}</h4>
            <div class="txn-meta">
              <span><i class="far fa-clock"></i> ${formatDate(t.date)}</span>
              <span class="dot-separator">•</span>
              <span class="txn-id-code">${t.id}</span>
            </div>
          </div>
          <div class="txn-amount-status">
            <div class="txn-amount ${amountClass}">${sign}${formatCurrency(t.amount)}</div>
            <span class="status-badge ${badgeClass}">${t.status}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderQuickBeneficiaries() {
    const container = document.getElementById("dash-quick-payees");
    if (!container) return;

    const beneficiaries = window.SEED_DATA.savedBeneficiaries;
    container.innerHTML = beneficiaries.map(b => {
      const initials = b.name.split(" ").map(n => n[0]).join("");
      return `
        <div class="quick-payee-card" onclick="BankingModule.prefillTransfer('${b.name}', '${b.account}')">
          <div class="payee-avatar">${initials}</div>
          <div class="payee-name">${b.name}</div>
          <div class="payee-bank">${b.bank}</div>
        </div>
      `;
    }).join("");
  }

  function toggleAccountMask() {
    isAccountMasked = !isAccountMasked;
    const account = getAccount();
    const accNumEl = document.getElementById("dash-account-number");
    const eyeIcon = document.getElementById("dash-mask-toggle-icon");
    if (accNumEl) {
      accNumEl.textContent = isAccountMasked ? account.maskedNumber : account.accountNumber;
    }
    if (eyeIcon) {
      eyeIcon.className = isAccountMasked ? "fas fa-eye" : "fas fa-eye-slash";
    }
  }

  function copyAccountNumber() {
    const account = getAccount();
    navigator.clipboard.writeText(account.accountNumber).then(() => {
      App.showToast("Account number copied to clipboard!", "success");
    }).catch(() => {
      App.showToast(`Account number: ${account.accountNumber}`, "info");
    });
  }

  // ----------------------------------------------------
  // FEATURE 3: BALANCE ENQUIRY
  // ----------------------------------------------------
  function renderBalanceEnquiry() {
    const account = getAccount();

    const balDisplay = document.getElementById("enquiry-available-balance");
    if (balDisplay) balDisplay.textContent = formatCurrency(account.balance);

    const ledgerDisplay = document.getElementById("enquiry-ledger-balance");
    if (ledgerDisplay) ledgerDisplay.textContent = formatCurrency(account.ledgerBalance);

    const holdDisplay = document.getElementById("enquiry-on-hold");
    if (holdDisplay) holdDisplay.textContent = formatCurrency(account.onHoldAmount);

    const limitRemainDisplay = document.getElementById("enquiry-limit-remain");
    if (limitRemainDisplay) {
      const remaining = Math.max(0, account.dailyLimit - account.dailyUsed);
      limitRemainDisplay.textContent = formatCurrency(remaining);
    }

    // Account details table
    const details = [
      { label: "Account Holder Name", value: account.holderName },
      { label: "Account Number", value: account.accountNumber },
      { label: "Account Type", value: account.accountType },
      { label: "Branch Name", value: account.branchName },
      { label: "Routing Number / IFSC", value: account.routingNumber },
      { label: "SWIFT / BIC Code", value: account.swiftCode },
      { label: "Annual Percentage Yield (APY)", value: account.interestRate },
      { label: "Account Status", value: `<span class="badge-success">${account.status}</span>` },
      { label: "Daily Transfer Limit", value: `${formatCurrency(account.dailyLimit)} (Used: ${formatCurrency(account.dailyUsed)})` },
      { label: "Account Opening Date", value: account.openDate },
      { label: "Last Core Ledger Sync", value: formatDate(account.lastUpdated) }
    ];

    const tableBody = document.getElementById("enquiry-details-table-body");
    if (tableBody) {
      tableBody.innerHTML = details.map(d => `
        <tr>
          <td class="enquiry-label"><i class="fas fa-chevron-right text-primary mr-2"></i> ${d.label}</td>
          <td class="enquiry-val font-semibold">${d.value}</td>
        </tr>
      `).join("");
    }

    const timestampEl = document.getElementById("enquiry-last-sync-timestamp");
    if (timestampEl) {
      timestampEl.textContent = `Last synchronized: ${new Date(account.lastUpdated).toLocaleTimeString()}`;
    }
  }

  function refreshBalance() {
    const refreshBtn = document.getElementById("btn-refresh-balance");
    const icon = refreshBtn ? refreshBtn.querySelector("i") : null;

    if (icon) icon.classList.add("fa-spin");
    if (refreshBtn) refreshBtn.disabled = true;

    // Simulate network round-trip to banking core
    setTimeout(() => {
      const account = getAccount();
      account.lastUpdated = new Date().toISOString();
      saveAccount(account);

      renderBalanceEnquiry();
      renderDashboard();

      if (icon) icon.classList.remove("fa-spin");
      if (refreshBtn) refreshBtn.disabled = false;

      App.showToast("Account balance refreshed and synced with core ledger.", "success");
    }, 600);
  }

  // ----------------------------------------------------
  // FEATURE 4: FUND TRANSFER
  // ----------------------------------------------------
  function prefillTransfer(name, account) {
    App.navigateTo("fund-transfer");
    setTimeout(() => {
      const nameInput = document.getElementById("transfer-beneficiary-name");
      const accInput = document.getElementById("transfer-beneficiary-acc");
      const confirmAccInput = document.getElementById("transfer-confirm-acc");
      if (nameInput) nameInput.value = name;
      if (accInput) accInput.value = account;
      if (confirmAccInput) confirmAccInput.value = account;
      const amtInput = document.getElementById("transfer-amount");
      if (amtInput) amtInput.focus();
    }, 100);
  }

  function processFundTransfer(formData) {
    const account = getAccount();
    const beneficiaryName = (formData.beneficiaryName || "").trim();
    const beneficiaryAcc = (formData.beneficiaryAcc || "").trim();
    const confirmAcc = (formData.confirmAcc || "").trim();
    const transferMode = formData.transferMode || "IMPS (Instant Transfer)";
    const remarks = (formData.remarks || "Personal Fund Transfer").trim();
    const amount = parseFloat(formData.amount);

    // Validations
    if (!beneficiaryName) {
      return { success: false, error: "Please enter the beneficiary's full name." };
    }
    if (!beneficiaryAcc) {
      return { success: false, error: "Beneficiary account number is required." };
    }
    if (beneficiaryAcc.length < 8) {
      return { success: false, error: "Account number must be at least 8 alphanumeric characters." };
    }
    if (beneficiaryAcc !== confirmAcc) {
      return { success: false, error: "Confirmation account number does not match beneficiary account." };
    }
    if (beneficiaryAcc === account.accountNumber) {
      return { success: false, error: "Cannot transfer funds to the source account itself." };
    }
    if (isNaN(amount) || amount <= 0) {
      return { success: false, error: "Please enter a valid transfer amount greater than $0.00." };
    }
    if (amount > account.balance) {
      // Over balance prevention
      logFailedTransaction("Fund Transfer", beneficiaryName, beneficiaryAcc, amount, `Insufficient funds. Available: ${formatCurrency(account.balance)}`);
      return {
        success: false,
        error: `Insufficient available balance! You attempted to transfer ${formatCurrency(amount)}, but your available balance is ${formatCurrency(account.balance)}.`
      };
    }
    if (account.dailyUsed + amount > account.dailyLimit) {
      const remainingLimit = account.dailyLimit - account.dailyUsed;
      return {
        success: false,
        error: `Daily transfer limit exceeded! Your remaining transfer limit today is ${formatCurrency(remainingLimit)}.`
      };
    }

    // Deduct balance and update daily used
    account.balance = parseFloat((account.balance - amount).toFixed(2));
    account.ledgerBalance = parseFloat((account.ledgerBalance - amount).toFixed(2));
    account.dailyUsed = parseFloat((account.dailyUsed + amount).toFixed(2));
    saveAccount(account);

    // Create Transaction Record
    const txnId = generateTxnId();
    const newTxn = {
      id: txnId,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: "Fund Transfer",
      category: "transfer",
      title: `Transfer to ${beneficiaryName}`,
      accountOrBiller: beneficiaryAcc,
      amount: amount,
      flow: "debit",
      status: "SUCCESS",
      reference: `${transferMode} - ${remarks}`
    };

    const transactions = getTransactions();
    transactions.unshift(newTxn);
    saveTransactions(transactions);

    // Refresh all views
    renderAllBankingViews();

    return {
      success: true,
      transaction: newTxn,
      newBalance: account.balance,
      message: `Successfully transferred ${formatCurrency(amount)} to ${beneficiaryName}.`
    };
  }

  function logFailedTransaction(type, beneficiary, accOrBiller, amount, reason) {
    const txnId = generateTxnId();
    const failedTxn = {
      id: txnId,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: type,
      category: "transfer",
      title: `Failed Transfer to ${beneficiary}`,
      accountOrBiller: accOrBiller,
      amount: amount,
      flow: "debit",
      status: "FAILED",
      reference: `Declined: ${reason}`
    };

    const transactions = getTransactions();
    transactions.unshift(failedTxn);
    saveTransactions(transactions);
    renderAllBankingViews();
  }

  // ----------------------------------------------------
  // FEATURE 5: BILL PAYMENT
  // ----------------------------------------------------
  function processBillPayment(category, formData) {
    const account = getAccount();
    const biller = (formData.biller || "").trim();
    const billNumber = (formData.billNumber || "").trim();
    const amount = parseFloat(formData.amount);
    let typeTitle = "Bill Payment";
    let categoryKey = "bill";

    if (category === "electricity") {
      typeTitle = "Electricity Bill";
    } else if (category === "mobile") {
      typeTitle = "Mobile Recharge";
    } else if (category === "internet") {
      typeTitle = "Internet Bill";
    }

    if (!biller) {
      return { success: false, error: "Please select a service provider." };
    }
    if (!billNumber) {
      return { success: false, error: "Please provide the consumer / mobile / account number." };
    }
    if (category === "mobile" && billNumber.replace(/\D/g, "").length < 10) {
      return { success: false, error: "Please enter a valid 10-digit mobile number." };
    }
    if (isNaN(amount) || amount <= 0) {
      return { success: false, error: "Please enter a valid bill amount greater than $0.00." };
    }
    if (amount > account.balance) {
      logFailedTransaction(typeTitle, biller, billNumber, amount, `Insufficient balance for bill payment.`);
      return {
        success: false,
        error: `Insufficient balance! Bill amount ${formatCurrency(amount)} exceeds your balance of ${formatCurrency(account.balance)}.`
      };
    }

    // Deduct balance
    account.balance = parseFloat((account.balance - amount).toFixed(2));
    account.ledgerBalance = parseFloat((account.ledgerBalance - amount).toFixed(2));
    saveAccount(account);

    // Log transaction
    const txnId = generateTxnId();
    const newTxn = {
      id: txnId,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      type: typeTitle,
      category: categoryKey,
      title: `${typeTitle} - ${biller}`,
      accountOrBiller: billNumber,
      amount: amount,
      flow: "debit",
      status: "SUCCESS",
      reference: `Utility Payment confirmation code: REF-${Math.floor(100000 + Math.random() * 900000)}`
    };

    const transactions = getTransactions();
    transactions.unshift(newTxn);
    saveTransactions(transactions);

    renderAllBankingViews();

    return {
      success: true,
      transaction: newTxn,
      newBalance: account.balance,
      message: `${typeTitle} of ${formatCurrency(amount)} to ${biller} paid successfully.`
    };
  }

  // ----------------------------------------------------
  // FEATURE 6: TRANSACTION HISTORY & FILTERING
  // ----------------------------------------------------
  let currentTxnFilter = {
    search: "",
    category: "all",
    status: "all",
    sort: "newest"
  };

  function renderTransactionHistory() {
    const transactions = getTransactions();
    const tbody = document.getElementById("transactions-table-body");
    const countBadge = document.getElementById("txn-count-badge");
    if (!tbody) return;

    // Filter list
    let filtered = transactions.filter(t => {
      const q = currentTxnFilter.search.toLowerCase();
      const matchQuery =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.accountOrBiller.toLowerCase().includes(q) ||
        (t.reference && t.reference.toLowerCase().includes(q));

      const matchCategory =
        currentTxnFilter.category === "all" ||
        t.category === currentTxnFilter.category ||
        (currentTxnFilter.category === "transfer" && t.type.toLowerCase().includes("transfer")) ||
        (currentTxnFilter.category === "bill" && t.category === "bill") ||
        (currentTxnFilter.category === "deposit" && t.flow === "credit");

      const matchStatus =
        currentTxnFilter.status === "all" ||
        t.status.toUpperCase() === currentTxnFilter.status.toUpperCase();

      return matchQuery && matchCategory && matchStatus;
    });

    // Sort
    if (currentTxnFilter.sort === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentTxnFilter.sort === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (currentTxnFilter.sort === "amount-high") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (currentTxnFilter.sort === "amount-low") {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    if (countBadge) {
      countBadge.textContent = `${filtered.length} of ${transactions.length} transactions`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-8">
            <div class="empty-state">
              <i class="fas fa-search fa-2x text-muted mb-2"></i>
              <p class="font-medium text-slate">No transactions found matching your filter criteria.</p>
              <button class="btn btn-outline btn-sm mt-3" onclick="BankingModule.clearTxnFilters()">Reset Filters</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(t => {
      const isCredit = t.flow === "credit";
      const isSuccess = t.status === "SUCCESS";
      const sign = isCredit ? "+" : "-";
      const amountColor = isCredit ? "text-emerald font-semibold" : "text-slate font-semibold";
      const badgeClass = isSuccess ? "badge-success" : "badge-danger";
      let typeIcon = "fa-exchange-alt";

      if (t.type.toLowerCase().includes("electric")) typeIcon = "fa-bolt";
      else if (t.type.toLowerCase().includes("mobile")) typeIcon = "fa-mobile-alt";
      else if (t.type.toLowerCase().includes("internet")) typeIcon = "fa-wifi";
      else if (t.type.toLowerCase().includes("salary")) typeIcon = "fa-briefcase";
      else if (t.type.toLowerCase().includes("transfer")) typeIcon = "fa-paper-plane";

      return `
        <tr>
          <td><span class="txn-code font-mono">${t.id}</span></td>
          <td class="text-sm whitespace-nowrap">${formatDate(t.date)}</td>
          <td>
            <div class="flex items-center gap-2">
              <span class="txn-row-icon"><i class="fas ${typeIcon}"></i></span>
              <div>
                <div class="font-medium text-dark">${t.title}</div>
                <div class="text-xs text-muted">${t.reference || t.type}</div>
              </div>
            </div>
          </td>
          <td class="text-sm font-mono">${t.accountOrBiller}</td>
          <td><span class="badge-pill ${t.category}">${t.type}</span></td>
          <td class="${amountColor} text-right whitespace-nowrap">${sign}${formatCurrency(t.amount)}</td>
          <td class="text-center"><span class="status-badge ${badgeClass}">${t.status}</span></td>
          <td class="text-right">
            <button class="btn btn-ghost btn-sm" title="View Digital Receipt" onclick="BankingModule.showTransactionReceipt('${t.id}')">
              <i class="fas fa-receipt"></i>
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  function updateTxnFilters(key, value) {
    currentTxnFilter[key] = value;
    renderTransactionHistory();
  }

  function clearTxnFilters() {
    currentTxnFilter = { search: "", category: "all", status: "all", sort: "newest" };
    const searchInput = document.getElementById("txn-search-input");
    const categorySelect = document.getElementById("txn-filter-category");
    const statusSelect = document.getElementById("txn-filter-status");
    const sortSelect = document.getElementById("txn-sort-select");

    if (searchInput) searchInput.value = "";
    if (categorySelect) categorySelect.value = "all";
    if (statusSelect) statusSelect.value = "all";
    if (sortSelect) sortSelect.value = "newest";

    renderTransactionHistory();
  }

  function exportTransactionsCSV() {
    const transactions = getTransactions();
    if (transactions.length === 0) {
      App.showToast("No transactions available to export.", "warn");
      return;
    }

    const headers = ["Transaction ID", "Date", "Type", "Title", "Account/Biller", "Amount", "Flow", "Status", "Reference"];
    const rows = transactions.map(t => [
      `"${t.id}"`,
      `"${t.date}"`,
      `"${t.type}"`,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.accountOrBiller}"`,
      t.amount,
      `"${t.flow}"`,
      `"${t.status}"`,
      `"${(t.reference || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mobile_Banking_Statement_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    App.showToast("Transaction history exported to CSV successfully!", "success");
  }

  // ----------------------------------------------------
  // TRANSACTION RECEIPT MODAL
  // ----------------------------------------------------
  function showTransactionReceipt(txnId) {
    const transactions = getTransactions();
    const txn = transactions.find(t => t.id === txnId);
    if (!txn) return;

    const modalBody = document.getElementById("receipt-modal-body");
    const modal = document.getElementById("receipt-modal");
    if (!modalBody || !modal) return;

    const isCredit = txn.flow === "credit";
    const sign = isCredit ? "+" : "-";
    const isSuccess = txn.status === "SUCCESS";

    modalBody.innerHTML = `
      <div class="receipt-card">
        <div class="receipt-header">
          <div class="receipt-logo">
            <i class="fas fa-university"></i>
            <span>Team 7 Mobile Banking</span>
          </div>
          <div class="receipt-status-icon ${isSuccess ? 'success' : 'failed'}">
            <i class="fas ${isSuccess ? 'fa-check' : 'fa-times'}"></i>
          </div>
          <h3 class="receipt-status-text">${isSuccess ? 'Transaction Completed' : 'Transaction Failed'}</h3>
          <div class="receipt-amount ${isCredit ? 'text-emerald' : 'text-slate'}">
            ${sign}${formatCurrency(txn.amount)}
          </div>
          <p class="receipt-subtitle">${txn.title}</p>
        </div>

        <div class="receipt-divider"></div>

        <div class="receipt-details">
          <div class="receipt-row">
            <span>Transaction ID</span>
            <strong class="font-mono">${txn.id}</strong>
          </div>
          <div class="receipt-row">
            <span>Timestamp</span>
            <span>${formatDate(txn.date)}</span>
          </div>
          <div class="receipt-row">
            <span>Transaction Type</span>
            <span>${txn.type}</span>
          </div>
          <div class="receipt-row">
            <span>Beneficiary / Biller</span>
            <span class="font-mono">${txn.accountOrBiller}</span>
          </div>
          <div class="receipt-row">
            <span>Status</span>
            <span class="status-badge ${isSuccess ? 'badge-success' : 'badge-danger'}">${txn.status}</span>
          </div>
          <div class="receipt-row">
            <span>Reference Note</span>
            <span>${txn.reference || 'Standard Processing'}</span>
          </div>
          <div class="receipt-row">
            <span>Issuing Channel</span>
            <span>Online Mobile Web Gateway (Team 7 Demo)</span>
          </div>
        </div>

        <div class="receipt-footer-note">
          <i class="fas fa-info-circle mr-1"></i> Academic Demonstration Only • Software Engineering Assignment 2
        </div>
      </div>
    `;

    modal.classList.add("modal-open");
  }

  function closeReceiptModal() {
    const modal = document.getElementById("receipt-modal");
    if (modal) modal.classList.remove("modal-open");
  }

  // Master render for all banking views
  function renderAllBankingViews() {
    renderDashboard();
    renderBalanceEnquiry();
    renderTransactionHistory();
  }

  return {
    getAccount,
    saveAccount,
    getTransactions,
    resetDemoData,
    formatCurrency,
    formatDate,
    renderDashboard,
    toggleAccountMask,
    copyAccountNumber,
    renderBalanceEnquiry,
    refreshBalance,
    prefillTransfer,
    processFundTransfer,
    processBillPayment,
    renderTransactionHistory,
    updateTxnFilters,
    clearTxnFilters,
    exportTransactionsCSV,
    showTransactionReceipt,
    closeReceiptModal,
    renderAllBankingViews
  };
})();

window.BankingModule = BankingModule;
