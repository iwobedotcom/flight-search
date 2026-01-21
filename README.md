# ✈️ Flight Search Engine (Interview Task)

A responsive flight search application built with **React** and **Material UI**, focused on usability, clean architecture, and real-world data handling.
This project was completed as part of a technical interview task and demonstrates frontend engineering, UX thinking, and state management best practices.

---

## 🚀 Features

### 🔍 Flight Search

- Search flights using **IATA airport codes**
- Supports **origin**, **destination**, **departure**, and **return** dates
- Inputs persist across page refresh and browser close (with TTL storage)

### 📊 Results & Data Display

- Flights displayed in a **custom MUI table** with:
  - Expandable (collapsible) rows for detailed flight information
  - Cabin class
  - One-way / return indicator
  - Number of bookable seats
  - Flight duration & stops
  - Checked baggage & cabin baggage allowance

- Rich UI elements such as **badges, icons, and avatars** for better readability

### 🧠 Smart Filtering

- Filter flights by:
  - Price
  - Stops
  - Airline
  - Cabin class (derived dynamically from available data)

- Filters update results instantly
- Filter state is persisted between sessions

### 💰 Cheapest Flights Highlights

- Automatically computes and displays the **3 cheapest flights per search**
- Shown as interactive chips using:
  - Origin → destination (IATA codes)
  - Price

- Derived from live search results (no hardcoding)

### 🧩 UX & Product Polish

- Loading skeletons during data fetch
- Empty state when no flights are available
- Error state handling for failed requests
- Reset functionality clears search, filters, and stored data
- Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

- **React** (with Hooks)
- **TypeScript**
- **Material UI (MUI)**
- **MUI Tables & Components**
- **Day.js** (date handling)
- **LocalStorage with TTL** (state persistence)

---

## 📦 Data Source

- Designed to work with the **Amadeus Self-Service API**
- During development, **dummy/mock data** is used to ensure UI completeness and stability
- API integration can be re-enabled without changing UI logic

---

## 🧱 Architecture Highlights

- Clean separation of concerns:
  - `hooks/` → data fetching & filtering logic
  - `components/` → reusable UI components
  - `utils/` → storage helpers with expiration

- No hardcoded business logic (e.g. name of airlines are derived from API data)
- Emphasis on reusable, composable components

---

## ▶️ Running the Project

```bash
npm install
npm run dev
```

---

## 📝 Notes

This project prioritizes:

- Real-world UX decisions over static demos
- Honest data representation (no dead filters)
- Maintainability and extensibility

It was built to reflect how a production-ready flight search experience would behave, not just to satisfy a checklist.
