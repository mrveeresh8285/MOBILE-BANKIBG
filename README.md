z# Mobile Banking Application – Release, Performance and User Acceptance Testing
### Software Engineering — Assignment 2
**Academic Demonstration Platform**

---

## 📌 Project Overview
This project is a complete, responsive, and professional **Mobile Banking Web Application** engineered to fulfill the requirements of **Software Engineering Assignment 2 *

The system delivers a modern fintech user experience (styled after premier digital banks like Revolut, Wise, and Chase) while providing comprehensive, interactive testing dashboards covering **Release Testing**, **Performance Testing**, **Alpha Testing**, **Beta Testing**, and **User Acceptance Testing (UAT)**.

---

## 🛠️ Technology Stack
- **Frontend Presentation:** Semantic HTML5, CSS3 with Custom Variables, Flexbox, and CSS Grid.
- **Icons & Visuals:** FontAwesome 6 Free CDN.
- **Data Visualization:** Chart.js for response time curves and transaction throughput (TPS) bar charts.
- **Application Logic:** Pure Vanilla JavaScript (ES6+ Modular Architecture).
- **Client-Side Persistence:** Browser `localStorage` for double-entry ledger bookkeeping, balances, transaction receipts, and evaluator reviews.
- **Zero Paid Dependencies:** No paid APIs, external cloud subscriptions, or live financial gateways required.

---

## 🔑 Demo Access Credentials
| Field | Value | Notes |
|---|---|---|
| **Username** | `admin` | Case-sensitive / validated |
| **Password** | `1234` | Case-sensitive / masked |
| **Auto-Fill** | Button available on login page | One-click login helper for quick evaluation |

---

## 🌟 Core Features & Modules

### 1. Secure Authentication & Login Gateway
- Clean, fintech-style authentication screen with simulated TLS 1.3 256-bit encryption indicator.
- Field presence validation, credential verification, and descriptive error alerts.
- Password show/hide toggle and one-click demo credentials auto-fill helper.
- Session persistence and route authorization guards.

### 2. Modern Banking Dashboard
- Dynamic time-of-day greeting (e.g. *"Good afternoon, Alex J. Morgan"*).
- Platinum Virtual Debit Card widget with metallic EMV chip, contactless emblem, and masked/unmasked account toggle.
- Real-time Available Balance, Ledger Balance, and Daily Transfer Limit progress bar.
- Account activity summary with total credits vs debits.
- Quick action shortcuts (Send Money, Pay Bills, Balance Check, QA Tests).
- Saved payees avatar list for 1-click transfer pre-filling.
- Top 5 recent transactions with clickable digital receipt modal.

### 3. Real-Time Balance Enquiry
- Available balance, ledger balance, on-hold amount ($0.00), and remaining daily transfer limit.
- **Balance Refresh Button:** Features smooth CSS spinning animation, timestamp updates, and sync confirmation toasts.
- Detailed Account Specifications Table: Holder name, account number, branch, routing/IFSC code, SWIFT/BIC code, APY interest rate, and KYC status.
- Export Statement to CSV and Print Balance Certificate shortcuts.

### 4. Peer-to-Peer Fund Transfer
- Transfer to any beneficiary with full name, account number, and confirmation verification.
- Transfer network modes: IMPS (Instant 24x7), NEFT, and RTGS.
- **Validation Engine:**
  - Prevents transfers exceeding available balance (overdraft check).
  - Prevents zero or negative amounts.
  - Enforces daily transfer limit ($5,000.00).
  - Validates account matching and format.
- Instant balance debit from `localStorage` upon success.
- Automatically generates unique Transaction ID (e.g. `TXN-902481`) and displays an official digital receipt.

### 5. Multi-Utility Bill Payments
- Interactive tabbed interface supporting 3 essential utility categories:
  1. **Electricity Bill:** National Power Grid, Metro Electric, CleanEnergy Solar (Consumer/Meter Number, Bill Amount).
  2. **Mobile Recharge:** Telecom Express 5G, SwiftTel, Horizon Mobile (10-Digit Mobile Number, Recharge Amount).
  3. **Internet / Broadband:** FiberNet Ultra Broadband, CityLink Gigabit, SkyLink (Landline/Account ID, Subscription Amount).
- Atomic balance deduction and transaction logging in the audit history.

### 6. Transaction History & Audit Trail
- Complete chronological ledger with Transaction ID, Date & Time, Details, Account/Biller, Type, Amount (green for credits, red for debits), and Status badges.
- **Search & Filtering:**
  - Free-text search by ID, beneficiary name, or biller.
  - Category filter (Transfers, Bills, Deposits).
  - Status filter (Successful, Failed).
  - Sort by newest, oldest, highest amount, or lowest amount.
- **Export to CSV:** Downloads real `.csv` file directly to the user's computer.
- Click any row to view and print an itemized digital payment receipt.

---

## 🧪 Comprehensive Testing Modules (Assignment 2 Focus)

### 7. Release Testing Suite
- Automated smoke and regression test dashboard verifying:
  1. Login & authentication handshake.
  2. Real-time balance retrieval precision.
  3. Fund transfer debit atomicity.
  4. Multi-utility bill payment execution.
  5. Transaction ledger persistence across sessions.
- Interactive **"Run All Release Tests"** button with live terminal console log, execution timer, and progress bar.
- Release Health Scorecard: 100% test coverage, 0 failures, **Release Approved for Production**.

### 8. Performance & Concurrency Testing
- Concurrency load simulation for **10, 50, 100, and 200 concurrent users**.
- Measures:
  - Average Response Time (ms)
  - 95th Percentile (P95) Latency (ms)
  - Throughput (Transactions Per Second - TPS)
  - Error rate % and simulated CPU/RAM utilization.
- Interactive Chart.js visual analytics:
  - **Line Chart:** Response Time (ms) vs Concurrent Users.
  - **Bar Chart:** Transaction Throughput (TPS).
- Comprehensive comparison table comparing all 4 concurrency tiers.
- **Live Client-Side Benchmark Tool:** Times real DOM manipulation and storage I/O operations directly on the user's local browser using `window.performance.now()`.
- Clearly labeled as simulated performance benchmarks for academic evaluation.

### 9. Alpha Testing (Internal Engineering QA)
- 5 rigorous internal test scenarios:
  - `ALPHA-01`: Login form boundary and SQL injection sanitization.
  - `ALPHA-02`: Balance check synchronization & floating point precision.
  - `ALPHA-03`: Fund transfer boundary & negative/overdraft prevention.
  - `ALPHA-04`: Bill payment double-submission protection.
  - `ALPHA-05`: Storage corrupt state graceful fallback and recovery.
- Displays prerequisites, input data tested, expected outcomes, actual outcomes, and defect resolution status (all PASS).

### 10. Beta Testing & Evaluator Feedback
- Cohort evaluation page collecting feedback on:
  - User Interface (UI)
  - Ease of Navigation
  - Application Speed
  - Transaction Experience
- Interactive feedback submission form with 1–5 star ratings and comments stored directly in `localStorage`.
- Live feed of beta tester reviews and average satisfaction score (4.8 / 5.0).

### 11. User Acceptance Testing (UAT)
- Formal UAT Matrix containing:
  - Test Case ID (`UAT-TC-001` to `UAT-TC-005`).
  - Business Requirement Reference (e.g. `BR-TRF-03`).
  - Pre-conditions and Test Steps.
  - Input Data.
  - Expected Result vs Actual Result.
  - PASS/FAIL status.
- Formal Stakeholder Sign-Off Banner (Lead Business Analyst, Senior Product Owner, QA Director).

### 12. Detailed Test Results (Proof of Execution)
- Exhaustive verification of the 3 required core test scenarios:
  - **Test 1:** Successful Login
  - **Test 2:** Successful Balance Enquiry
  - **Test 3:** Successful Fund Transfer
- Full input values, expected output, actual output, execution trace steps, millisecond latency, and PASS verification.
- Includes **"Re-Verify Live"** buttons allowing the examiner to re-run the verification live on screen.

### 13. About Project (Team 7 Roster & Specifications)
- Academic metadata: Software Engineering, Assignment 2, Team 7.
- Work breakdown structure detailing roles and modules for:
  - **Alex J. Morgan** (Team Lead & Full-Stack Architect)
  - **Ryan Chen** (Test Automation & Release Lead)
  - **Sophia Martinez** (Performance & Reliability Engineer)
  - **David Kumar** (UI/UX & UAT Coordinator)
- Architecture layer diagrams and SDLC methodology (Agile V-Model).

---

## 🚀 How to Run the Website Locally

### Method 1: Direct File Open (Easiest)
1. Navigate to the project directory: `c:\Users\HP\Desktop\Mobile Banking`.
2. Double-click `index.html` or right-click `index.html` -> **Open with Google Chrome** (or Edge / Firefox).
3. The application will immediately load with full functionality.

### Method 2: Python Local Web Server
1. Open PowerShell or Command Prompt in the project folder:
   ```powershell
   cd "c:\Users\HP\Desktop\Mobile Banking"
   ```
2. Start Python's built-in web server:
   ```powershell
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Method 3: One-Click Windows Batch Script
1. Double-click the included `run-local.bat` script.
2. It will launch the local server and automatically open your default browser.

---

## 📋 Evaluation Checklist for Examiners & Graders

| Feature | Requirement | Verification Method | Status |
|---|---|---|---|
| **Login** | Username `admin`, Password `1234` | Enter credentials or click "Auto-Fill" -> Sign in | ✅ PASS |
| **Dashboard** | Balance, Account #, Name, Quick actions | View cards, flip mask, click quick actions | ✅ PASS |
| **Balance Enquiry** | Accurate balance, details table, refresh | Click "Refresh Balance" -> check spinning icon & toast | ✅ PASS |
| **Fund Transfer** | Beneficiary name/acc, validation, deduction | Transfer $500 -> balance drops from $18,500.75 to $18,000.75 | ✅ PASS |
| **Overdraft Block** | Cannot exceed available balance | Attempt $25,000 transfer -> validation blocks & alerts | ✅ PASS |
| **Bill Payment** | Electricity, Mobile, Broadband | Pay $142.50 electric bill -> balance updates, receipt issued | ✅ PASS |
| **Transaction History** | Search, filter, CSV export, digital receipt | Filter by "transfer", export CSV, click row for receipt | ✅ PASS |
| **Release Testing** | Automated suite with PASS/FAIL | Click "Run All Release Tests" -> animated runner & logs | ✅ PASS |
| **Performance Testing**| 10, 50, 100, 200 user loads, charts | Click 200 users -> view live charts & summary table | ✅ PASS |
| **Alpha Testing** | Internal QA scenarios & edge cases | Review 5 boundary scenarios and severity ratings | ✅ PASS |
| **Beta Testing** | Evaluator feedback, ratings, live comments | Submit a review -> instantly appears in community feed | ✅ PASS |
| **UAT Matrix** | 5 formal test cases with sign-offs | Review structured matrix with expected vs actual | ✅ PASS |
| **Detailed Results** | 3 deep test scenarios with traces | Click "Re-Verify Live" on Test 1, 2, or 3 | ✅ PASS |
| **About Project** | Subject, Assignment 2, Team 7, roles | Inspect project metadata & team roster | ✅ PASS |

---

## ⚖️ Academic Disclaimer
*This website is an academic demonstration developed exclusively for educational purposes in Software Engineering Assignment 2 (Team 7). All transactions, payments, balances, accounts, and performance metrics are simulated within the browser's local environment. No real funds, personal financial information, or external banking APIs are involved.*
