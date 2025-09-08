# URL Shortener Microservice

A **full-stack URL Shortener Microservice** built with **Node.js + Express** backend and **React + Material UI** frontend.  
This project allows users to create shortened URLs with optional custom codes and validity periods, view analytics for each shortened URL, and integrates a **mandatory logging middleware** for auditing.

---

## 📁 Project Structure

url-shortener-microservice/
├── backend/ # Node.js + Express microservice
│ ├── package.json
│ ├── server.js # Entry point
│ ├── middleware/
│ │ ├── loggingMiddleware.js
│ │ └── errorHandler.js
│ ├── routes/
│ │ └── shorturls.js
│ ├── controllers/
│ │ └── shorturlController.js
│ ├── services/
│ │ └── urlService.js
│ ├── utils/
│ │ ├── shortcode.js
│ │ ├── validators.js
│ │ └── time.js
│ ├── models/
│ │ └── store.js
│ ├── data/
│ │ └── store.json
│ └── config/
│ └── config.js
├── frontend/ # React + Material UI client app
│ ├── package.json
│ ├── public/
│ │ └── index.html
│ └── src/
│ ├── index.js
│ ├── App.js
│ ├── pages/
│ │ ├── ShortenerPage.js
│ │ └── StatsPage.js
│ ├── components/
│ │ ├── UrlForm.js
│ │ ├── UrlList.js
│ │ └── StatsTable.js
│ ├── services/
│ │ └── api.js
│ ├── utils/
│ │ └── validators.js
│ └── styles/
│ └── App.css
├── loginMiddleware/ # Custom logging middleware
│ ├── package.json
│ └── loggingMiddleware.js
└── README.md


---

## ⚙️ Features

- Shorten long URLs with optional **custom shortcodes**.
- Default link validity of **30 minutes**, or set custom duration.
- **Redirection** to original URL when visiting a short link.
- Retrieve **analytics**:
  - Total clicks
  - Click timestamps
  - Referrer/source
  - Geolocation (coarse-grained)
- Fully **responsive frontend** using React + Material UI.
- Custom **logging middleware** tracks all API requests.
- Robust **error handling** for invalid, expired, or duplicate links.

---

## 🛠 Technologies

- **Backend:** Node.js, Express.js, RESTful API
- **Frontend:** React.js, Material UI
- **Data Storage:** In-memory / JSON file (store.json)
- **Logging:** Custom middleware (no console.log)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/22ht1a6147/22HT1A6147.git
cd url-shortener-microservice

2. Backend Setup
cd backend
npm install
node server.js


Server will run on http://localhost:5000 (default port).

3. Frontend Setup
cd ../frontend
npm install
npm start


Frontend runs on http://localhost:3000.

📝 API Endpoints
Create Short URL
POST /shorturls
Body: {
  "url": "https://example.com/very-long-url",
  "validity": 30,         # optional
  "shortcode": "abc123"   # optional
}
Response: {
  "shortLink": "http://localhost:5000/abc123",
  "expiry": "2025-01-01T00:30:00Z"
}

Retrieve Short URL Statistics
GET /shorturls/:shortcode
Response: {
  "originalUrl": "https://example.com/very-long-url",
  "createdAt": "...",
  "expiry": "...",
  "clicks": [
    {
      "timestamp": "...",
      "referrer": "...",
      "location": "..."
    }
  ],
  "totalClicks": 5
}

💡 Notes

The backend must be running for the frontend to work.

Logging middleware is mandatory, no console.log allowed.

Default short link validity: 30 minutes.

Maximum 5 concurrent URLs can be shortened from the frontend.

For backend
# Go to backend folder
cd "C:\Users\VENKATSAI\Desktop\FULL STACK PROJECT\url-shortener-microservice\backend"

# Install dependencies (only first time)
npm install

# Start backend server
node server.js  or  npm run dev


for frontend
# Go to frontend folder

cd "C:\Users\VENKATSAI\Desktop\FULL STACK PROJECT\url-shortener-microservice\frontend"
# Install dependencies (only first time)
npm install

# Start React app
npm start


