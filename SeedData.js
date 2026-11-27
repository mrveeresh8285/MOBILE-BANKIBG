/**
 * Mobile Banking Application - Software Engineering Assignment 2 (Team 7)
 * seedData.js - Default Datasets, Initial State & Academic Demonstration Mock Data
 */

const SEED_DATA = {
  account: {
    holderName: "Alex J. Morgan",
    accountNumber: "ACC-8839-2041-7712",
    maskedNumber: "•••• •••• •••• 7712",
    routingNumber: "MBANK-004921",
    swiftCode: "MBUSUS33NYC",
    branchName: "Metropolitan Financial Center, Downtown",
    accountType: "Platinum Savings & Checking",
    currency: "USD ($)",
    balance: 18500.75,
    ledgerBalance: 18500.75,
    onHoldAmount: 0.00,
    dailyLimit: 5000.00,
    dailyUsed: 620.00,
    interestRate: "4.25% APY",
    status: "Active / KYC Verified",
    openDate: "January 14, 2022",
    lastUpdated: new Date().toISOString()
  },

  transactions: [
    {
      id: "TXN-902481",
      date: "2026-11-18 14:32",
      type: "Fund Transfer",
      category: "transfer",
      title: "Transfer to Sarah Connor",
      accountOrBiller: "ACC-4491-0023-8812",
      amount: 350.00,
      flow: "debit",
      status: "SUCCESS",
      reference: "Apartment maintenance share"
    },
    {
      id: "TXN-902480",
      date: "2026-11-18 10:15",
      type: "Electricity Bill",
      category: "bill",
      title: "National Power Grid Corp",
      accountOrBiller: "ELEC-CONSUMER-991823",
      amount: 142.50,
      flow: "debit",
      status: "SUCCESS",
      reference: "Nov 2026 Residential Power Bill"
    },
    {
      id: "TXN-902479",
      date: "2026-11-17 18:45",
      type: "Mobile Recharge",
      category: "bill",
      title: "Telecom Express 5G",
      accountOrBiller: "+1 (555) 382-9102",
      amount: 45.00,
      flow: "debit",
      status: "SUCCESS",
      reference: "30-Day Unlimited 5G Data Pack"
    },
    {
      id: "TXN-902478",
      date: "2026-11-16 09:00",
      type: "Salary Deposit",
      category: "deposit",
      title: "Global Systems Inc - Payroll",
      accountOrBiller: "CORP-PAYROLL-AUTO",
      amount: 4250.00,
      flow: "credit",
      status: "SUCCESS",
      reference: "Direct Deposit Bi-Weekly Net Pay"
    },
    {
      id: "TXN-902477",
      date: "2026-11-15 16:20",
      type: "Internet Bill",
      category: "bill",
      title: "FiberNet Ultra Broadband",
      accountOrBiller: "ISP-FIBER-88231",
      amount: 79.99,
      flow: "debit",
      status: "SUCCESS",
      reference: "1 Gbps Symmetrical Fiber Plan"
    },
    {
      id: "TXN-902476",
      date: "2026-11-14 11:10",
      type: "Fund Transfer",
      category: "transfer",
      title: "Transfer to David Miller",
      accountOrBiller: "ACC-9921-3312-5544",
      amount: 120.00,
      flow: "debit",
      status: "SUCCESS",
      reference: "Dinner split reimbursement"
    },
    {
      id: "TXN-902475",
      date: "2026-11-13 13:05",
      type: "Fund Transfer",
      category: "transfer",
      title: "Attempted Wire to Offshore",
      accountOrBiller: "ACC-0000-9999-1111",
      amount: 25000.00,
      flow: "debit",
      status: "FAILED",
      reference: "Declined: Amount exceeds available balance & daily limits"
    },
    {
      id: "TXN-902474",
      date: "2026-11-10 00:05",
      type: "Interest Credit",
      category: "deposit",
      title: "High-Yield Interest Accrual",
      accountOrBiller: "MBANK-AUTO-INTEREST",
      amount: 65.50,
      flow: "credit",
      status: "SUCCESS",
      reference: "Monthly Compound Interest"
    }
  ],

  savedBeneficiaries: [
    { name: "Sarah Connor", account: "ACC-4491-0023-8812", bank: "Chase Horizon", email: "sarah.c@fintech.io" },
    { name: "David Miller", account: "ACC-9921-3312-5544", bank: "Metropolitan Bank", email: "d.miller@tech.org" },
    { name: "Emma Watson", account: "ACC-7712-4409-1234", bank: "Barclays Direct", email: "emma.w@creatives.co" },
    { name: "Michael Chang", account: "ACC-3388-9910-6621", bank: "Silicon Valley Alliance", email: "mchang@venture.io" }
  ],

  billers: {
    electricity: [
      { id: "ELE-01", name: "National Power Grid Corp", state: "Central Zone", unitRate: "$0.14 / kWh" },
      { id: "ELE-02", name: "Metro Electric & Lighting", state: "Urban Metro", unitRate: "$0.16 / kWh" },
      { id: "ELE-03", name: "CleanEnergy Solar & Wind Co.", state: "Green Valley", unitRate: "$0.12 / kWh" }
    ],
    mobile: [
      { id: "MOB-01", name: "Telecom Express 5G", plans: ["$25 (5GB/mo)", "$45 (Unlimited 5G)", "$75 (Family 5G)"] },
      { id: "MOB-02", name: "SwiftTel Wireless", plans: ["$20 (3GB)", "$40 (Unlimited)", "$60 (Global Roaming)"] },
      { id: "MOB-03", name: "Horizon Mobile Networks", plans: ["$30 (10GB)", "$50 (Unlimited Pro)"] }
    ],
    internet: [
      { id: "NET-01", name: "FiberNet Ultra Broadband", plans: ["$49.99 (300 Mbps)", "$79.99 (1 Gbps Gig)", "$109.99 (2 Gbps)"] },
      { id: "NET-02", name: "CityLink Gigabit Fiber", plans: ["$55.00 (500 Mbps)", "$85.00 (1 Gbps)"] },
      { id: "NET-03", name: "SkyLink Satellite Internet", plans: ["$69.00 (100 Mbps)", "$120.00 (High Priority)"] }
    ]
  },

  performanceBenchmarks: {
    users_10: {
      users: 10,
      avgResponseTimeMs: 78,
      p95LatencyMs: 110,
      p99LatencyMs: 145,
      throughputTps: 118,
      errorRate: "0.00%",
      cpuUtilization: "14%",
      memoryUsageMb: 85,
      verdict: "OPTIMAL",
      statusClass: "status-pass"
    },
    users_50: {
      users: 50,
      avgResponseTimeMs: 142,
      p95LatencyMs: 198,
      p99LatencyMs: 250,
      throughputTps: 342,
      errorRate: "0.00%",
      cpuUtilization: "32%",
      memoryUsageMb: 140,
      verdict: "EXCELLENT",
      statusClass: "status-pass"
    },
    users_100: {
      users: 100,
      avgResponseTimeMs: 265,
      p95LatencyMs: 380,
      p99LatencyMs: 460,
      throughputTps: 388,
      errorRate: "0.20%",
      cpuUtilization: "61%",
      memoryUsageMb: 245,
      verdict: "HEALTHY",
      statusClass: "status-pass"
    },
    users_200: {
      users: 200,
      avgResponseTimeMs: 485,
      p95LatencyMs: 690,
      p99LatencyMs: 880,
      throughputTps: 412,
      errorRate: "0.75%",
      cpuUtilization: "84%",
      memoryUsageMb: 390,
      verdict: "ACCEPTABLE UNDER PEAK",
      statusClass: "status-warn"
    }
  },

  releaseTests: [
    {
      id: "REL-TC-01",
      name: "Authentication & Authorization Security Check",
      module: "Security & Login",
      description: "Verifies session creation for admin/1234, token generation, and rejection of invalid passwords.",
      status: "PASS",
      executionTimeMs: 45,
      expected: "HTTP 200 equivalent / Session token stored & state set to authenticated.",
      actual: "Valid session created, localStorage user object loaded, unauthorized routes guarded.",
      criticality: "High"
    },
    {
      id: "REL-TC-02",
      name: "Real-time Balance Enquiry & Precision Validation",
      module: "Account Services",
      description: "Verifies that account balance is read accurately from storage without rounding errors.",
      status: "PASS",
      executionTimeMs: 32,
      expected: "Balance exact floating precision ($18,500.75) and ledger consistency.",
      actual: "Balance correctly rendered, refresh timestamp synced, zero discrepancy.",
      criticality: "Critical"
    },
    {
      id: "REL-TC-03",
      name: "Peer-to-Peer Fund Transfer & Debit Execution",
      module: "Fund Transfer",
      description: "Validates beneficiary account validation, sufficient balance check, and atomicity.",
      status: "PASS",
      executionTimeMs: 68,
      expected: "Debit balance by transfer amount, generate unique TXN ID, append to ledger.",
      actual: "Balance decremented accurately, transfer logged in history with SUCCESS status.",
      criticality: "Critical"
    },
    {
      id: "REL-TC-04",
      name: "Multi-Utility Bill Payment & Receipt Generation",
      module: "Bill Payments",
      description: "Tests bill payment validation for Electricity, Mobile, and Internet billers.",
      status: "PASS",
      executionTimeMs: 52,
      expected: "Bill validation passes, balance deducted, digital payment receipt rendered.",
      actual: "All 3 biller categories validated, balance updated, receipt modal triggered.",
      criticality: "High"
    },
    {
      id: "REL-TC-05",
      name: "Transaction History Ledger & Query Filters",
      module: "Audit & Ledger",
      description: "Tests persistence, search query matching, and category filtering.",
      status: "PASS",
      executionTimeMs: 38,
      expected: "All transactions persisted to localStorage, searchable by ID and type.",
      actual: "LocalStorage store intact, filtering by debit/credit and category returns exact matches.",
      criticality: "Medium"
    }
  ],

  alphaTests: [
    {
      id: "ALPHA-01",
      title: "Login Form Boundary & SQL Injection Sanitization",
      tester: "Internal QA (Team 7)",
      category: "Security Testing",
      prerequisite: "User is on the login view",
      inputData: "Username: admin' OR '1'='1 -- | Password: <script>alert(1)</script>",
      expected: "Input sanitized, authentication fails safely with invalid credentials toast.",
      actual: "Strict equality check executed, malicious characters escaped, safe rejection.",
      severity: "Resolved - High",
      result: "PASS"
    },
    {
      id: "ALPHA-02",
      title: "Balance Check Synchronization & Floating Point Precision",
      tester: "Internal QA (Team 7)",
      category: "Data Integrity",
      prerequisite: "Logged in user with balance $18,500.75",
      inputData: "Multiple rapid refresh clicks (5 clicks in 2 seconds)",
      expected: "Debounced refresh request, animated spin, accurate balance formatting.",
      actual: "Debounce handled cleanly, no memory leak, balance verified against localStorage.",
      severity: "Resolved - Low",
      result: "PASS"
    },
    {
      id: "ALPHA-03",
      title: "Fund Transfer Boundary & Negative/Overdraft Testing",
      tester: "Internal QA (Team 7)",
      category: "Functional Testing",
      prerequisite: "Available Balance: $18,500.75",
      inputData: "Transfer Amount: $19,000.00 (Exceeds Balance) & -$50.00 (Negative)",
      expected: "System raises validation error: 'Insufficient balance' & 'Amount must be positive'.",
      actual: "Form validation blocked submission, visual alert shown, balance unaffected.",
      severity: "Resolved - Critical",
      result: "PASS"
    },
    {
      id: "ALPHA-04",
      title: "Bill Payment Double-Submission Protection",
      tester: "Internal QA (Team 7)",
      category: "Concurrency",
      prerequisite: "Electricity payment form filled with $142.50",
      inputData: "Double rapid clicks on 'Pay Bill Now' button",
      expected: "Button disabled upon first click, exactly one transaction processed.",
      actual: "State locked during processing, single transaction TXN logged, no duplicate debit.",
      severity: "Resolved - Medium",
      result: "PASS"
    },
    {
      id: "ALPHA-05",
      title: "Storage Corrupt State Graceful Fallback",
      tester: "Internal QA (Team 7)",
      category: "Fault Tolerance",
      prerequisite: "Simulate empty or malformed localStorage key",
      inputData: "localStorage.setItem('mbank_account', 'INVALID_JSON')",
      expected: "System detects JSON parse error, catches exception, and resets to safe seed default.",
      actual: "Try/catch recovered gracefully, seeded default loaded, zero application crash.",
      severity: "Resolved - High",
      result: "PASS"
    }
  ],

  betaFeedback: [
    {
      id: "BETA-REV-01",
      userName: "Dr. Evelyn Reed",
      role: "External Academic Reviewer",
      date: "2026-11-17",
      ratings: { ui: 5, navigation: 5, speed: 5, experience: 5 },
      averageRating: 5.0,
      comment: "The fintech aesthetic is clean and intuitive. Fast responsive transitions between banking services and testing dashboards.",
      badge: "Verified Beta Tester"
    },
    {
      id: "BETA-REV-02",
      userName: "Marcus Vance",
      role: "Student Tester (SE Cohort)",
      date: "2026-11-16",
      ratings: { ui: 4, navigation: 5, speed: 5, experience: 4 },
      averageRating: 4.5,
      comment: "Fund transfer validation works smoothly. The real-time balance update and receipt modal makes testing very realistic.",
      badge: "Early Adopter"
    },
    {
      id: "BETA-REV-03",
      userName: "Priya Sharma",
      role: "Fintech QA Specialist",
      date: "2026-11-15",
      ratings: { ui: 5, navigation: 4, speed: 5, experience: 5 },
      averageRating: 4.8,
      comment: "The performance simulation with concurrent user benchmarks (10, 50, 100, 200 users) provides exceptional demonstration value.",
      badge: "Power Tester"
    }
  ],

  uatCases: [
    {
      id: "UAT-TC-001",
      scenario: "Secure Customer Authentication",
      reqRef: "BR-SEC-01",
      precondition: "User has registered credentials (admin / 1234)",
      steps: "1. Navigate to Login Page\n2. Enter 'admin' and '1234'\n3. Click 'Sign In'",
      inputData: "User: admin | Pass: 1234",
      expectedResult: "User is authenticated, redirected to Dashboard, customer name & account details displayed.",
      actualResult: "User logged in successfully; Welcome 'Alex J. Morgan' and balance displayed on Dashboard.",
      status: "PASS",
      signoffBy: "Lead Business Analyst",
      signoffDate: "Nov 18, 2026"
    },
    {
      id: "UAT-TC-002",
      scenario: "Account Balance Real-time Enquiry & Refresh",
      reqRef: "BR-ACC-02",
      precondition: "Active session with valid account ACC-8839-2041-7712",
      steps: "1. Open Balance Enquiry view\n2. Inspect Available, Ledger, and Daily Limit\n3. Click 'Refresh Balance'",
      inputData: "Account: ACC-8839-2041-7712",
      expectedResult: "All account parameters rendered with 2 decimal precision; refresh updates timestamp without lag.",
      actualResult: "Balance $18,500.75 displayed accurately; refresh animation spins and updates sync timestamp.",
      status: "PASS",
      signoffBy: "Senior Product Owner",
      signoffDate: "Nov 18, 2026"
    },
    {
      id: "UAT-TC-003",
      scenario: "End-to-End Peer Fund Transfer Execution",
      reqRef: "BR-TRF-03",
      precondition: "Account has available balance > $500.00",
      steps: "1. Open Fund Transfer\n2. Enter Beneficiary: Sarah Connor, Acc: ACC-4491-0023-8812\n3. Amount: $500.00\n4. Submit Transfer",
      inputData: "Beneficiary: ACC-4491-0023-8812 | Amount: $500.00 | Mode: Instant IMPS",
      expectedResult: "Balance deducted by $500.00 ($18,500.75 -> $18,000.75), TXN ID issued, added to History.",
      actualResult: "Transfer confirmed immediately; balance updated to $18,000.75; TXN receipt generated; verified in history.",
      status: "PASS",
      signoffBy: "Quality Assurance Director",
      signoffDate: "Nov 18, 2026"
    },
    {
      id: "UAT-TC-004",
      scenario: "Utility Bill Settlement (Electricity / Mobile / Internet)",
      reqRef: "BR-BIL-04",
      precondition: "Customer selects valid utility operator with pending dues",
      steps: "1. Navigate to Bill Payment\n2. Select Electricity Biller: National Power Grid\n3. Enter Consumer No: 882910\n4. Amount: $142.50\n5. Confirm Payment",
      inputData: "Biller: National Power Grid | Acc: 882910 | Amount: $142.50",
      expectedResult: "Validation passes, balance deducted, digital payment receipt issued, ledger updated.",
      actualResult: "Payment processed successfully; receipt generated with reference code; balance deducted.",
      status: "PASS",
      signoffBy: "Operations Manager",
      signoffDate: "Nov 18, 2026"
    },
    {
      id: "UAT-TC-005",
      scenario: "Transaction Audit Trail & Search Filtering",
      reqRef: "BR-AUD-05",
      precondition: "Account has multiple historical credit/debit records",
      steps: "1. Open Transaction History\n2. Type search keyword 'Salary'\n3. Filter by 'Credit'\n4. Verify results",
      inputData: "Filter: Credit | Search: Salary",
      expectedResult: "Only salary deposit records displayed; accurate date, amount, and reference verified.",
      actualResult: "Instant search and category filter returned matching record; export to CSV generated valid output.",
      status: "PASS",
      signoffBy: "Compliance & Audit Officer",
      signoffDate: "Nov 18, 2026"
    }
  ],

  detailedTestResults: [
    {
      testNumber: 1,
      title: "Test 1: Successful Login",
      category: "Authentication & Session Security",
      objective: "Verify that valid user credentials grant system access and generate authenticated state.",
      inputs: {
        username: "admin",
        password: "•••• (1234)",
        authMechanism: "SHA-256 / Secure Local Auth Handshake"
      },
      expectedOutput: {
        authStatus: "SUCCESS",
        sessionToken: "VALID_TOKEN_GENERATED",
        redirectTarget: "#dashboard",
        feedbackMessage: "Welcome back! Login successful."
      },
      actualOutput: {
        authStatus: "SUCCESS",
        sessionToken: "mbank_token_9f82a17b",
        redirectTarget: "#dashboard",
        feedbackMessage: "Authentication verified. Access granted."
      },
      executionTrace: [
        "1. Captured input username: 'admin'",
        "2. Sanitized string against XSS & injection patterns",
        "3. Validated password hash against authorized demo store",
        "4. Stored 'mbank_session' in browser localStorage",
        "5. Dispatched AUTH_STATE_CHANGED event and loaded Dashboard"
      ],
      durationMs: 42,
      status: "PASS"
    },
    {
      testNumber: 2,
      title: "Test 2: Successful Balance Enquiry",
      category: "Account Services & Synchronization",
      objective: "Verify accurate balance retrieval, multi-parameter display, and responsive refresh trigger.",
      inputs: {
        accountNumber: "ACC-8839-2041-7712",
        queryAction: "FETCH_BALANCE_AND_LEDGER",
        forceSync: true
      },
      expectedOutput: {
        availableBalance: "$18,500.75",
        ledgerBalance: "$18,500.75",
        status: "Active / KYC Verified",
        syncLatency: "< 100ms"
      },
      actualOutput: {
        availableBalance: "$18,500.75",
        ledgerBalance: "$18,500.75",
        status: "Active / KYC Verified",
        syncLatency: "38ms"
      },
      executionTrace: [
        "1. Queried 'mbank_account' storage partition",
        "2. Verified floating point precision format to 2 decimal places",
        "3. Computed daily limit consumption ($620.00 / $5,000.00)",
        "4. Triggered CSS spin animation on refresh icon",
        "5. Rendered live balance cards with last updated timestamp"
      ],
      durationMs: 38,
      status: "PASS"
    },
    {
      testNumber: 3,
      title: "Test 3: Successful Fund Transfer",
      category: "Transaction Processing & Double-Entry Accounting",
      objective: "Verify end-to-end fund transfer with validation, balance deduction, and audit log generation.",
      inputs: {
        beneficiaryAccount: "ACC-4491-0023-8812 (Sarah Connor)",
        amount: 350.00,
        transferMode: "Instant IMPS",
        remarks: "Apartment maintenance share"
      },
      expectedOutput: {
        preTransferBalance: "$18,500.75",
        postTransferBalance: "$18,150.75",
        transactionStatus: "SUCCESS",
        ledgerUpdate: "DEBIT record inserted into transaction history"
      },
      actualOutput: {
        preTransferBalance: "$18,500.75",
        postTransferBalance: "$18,150.75",
        transactionStatus: "SUCCESS",
        ledgerUpdate: "TXN-902481 logged with timestamp, amount -$350.00"
      },
      executionTrace: [
        "1. Validated beneficiary account format (minimum 10 alphanumeric chars)",
        "2. Verified amount ($350.00) > 0 and <= available balance ($18,500.75)",
        "3. Checked daily transfer limit threshold ($620 + $350 <= $5000) -> OK",
        "4. Atomically updated balance in 'mbank_account'",
        "5. Generated unique TXN identifier 'TXN-902481'",
        "6. Appended record to 'mbank_transactions' array in localStorage",
        "7. Rendered confirmation receipt modal with transaction metadata"
      ],
      durationMs: 64,
      status: "PASS"
    }
  ]
};

// Make SEED_DATA available globally
window.SEED_DATA = SEED_DATA;
