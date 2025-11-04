# 📘 Digital Financial Management System (DFMS) – Cavendish University Zambia  

## 📖 Overview  
The **Digital Financial Management System (DFMS)** is a web-based solution designed to reduce queues and improve financial operations at **Cavendish University Zambia (CUZ)**.  
It allows students to make tuition payments, check account balances, and view payment histories online, minimizing the need to physically visit the financial office.  

---

## 🛠️ Tech Stack

| Layer               | Technology                                                                 |
|--------------------|---------------------------------------------------------------------------|
| Frontend           | React.js, HTML, CSS (Tailwind / Bootstrap), JavaScript                     |
| Backend            | Node.js (Express) OR Python (Django / Flask)                               |
| Database           | MySQL / PostgreSQL / SQLite                                                |
| Payment Integration| Mobile Money APIs (MTN, Airtel) and Bank Payment Gateways                  |
| Security           | HTTPS, SSL/TLS, Password Hashing (bcrypt), JWT Authentication 

---

## ✨ Features  
- ✅ **Student Portal** – Online payments, account balance checks, transaction history  
- ✅ **Finance Office Dashboard** – Reconciliation reports, real-time transaction monitoring  
- ✅ **Secure Login System** – Role-based access control (Student, Finance Officer, Admin)  
- ✅ **Automated Receipts** – Email confirmation and downloadable receipts  
- ✅ **Reporting Module** – Generate monthly/annual financial reports  

---

## 📂 Project Structure  
DFMS/
├── frontend/ # React.js code (components, pages, assets)
├── backend/ # Node.js (Express) OR Django code (controllers, models, APIs)
├── database/ # SQL scripts (schema, sample data)
├── public/ # Static assets (images, CSS, JS)
├── .env # Environment variables (DB credentials, API keys)
└── README.md # Project documentation


---

## 🚀 Installation & Setup  

### **1. Prerequisites**
- PHP >= 8.0 OR Python >= 3.9  
- MySQL / PostgreSQL  
- Composer (for Laravel projects) OR pip (for Django)  
- Web server (Apache/Nginx)  

### **2. Setup Steps (Laravel Example)**  
```bash
# Clone the project
git clone https://github.com/yourusername/DFMS.git

# Navigate into project folder
cd DFMS

# Install dependencies
composer install

# Create environment file
cp .env.example .env

# Configure your database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dfms
DB_USERNAME=root
DB_PASSWORD=

# Run database migrations
php artisan migrate

# Start the local server
php artisan serve

🧪 Testing

User Testing: Students and finance officers will test the system for usability.

Load Testing: Simulate peak registration week to ensure system performance.

Security Testing: Verify authentication, encryption, and role-based permissions.

📊 Evaluation Metrics

Queue Reduction: Compare average waiting times before and after implementation.

System Uptime: Ensure >99% availability during registration periods.

User Satisfaction: Collect student feedback (target ≥ 85% satisfaction).

👥 Contributors

Samson Kwizela – 104-789
Racheal Milele – 104-719
