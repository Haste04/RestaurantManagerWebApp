import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Waiter from "./pages/WaiterPage/Waiter.jsx";
import Manager from "./pages/ManagerPage/Manager.jsx";
import Kitchen from "./pages/KitchenPage/Kitchen.jsx";

function App() {
  return (
    <div className="bg-[#101e3c]">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/waiter" replace />} />

          <Route path="/waiter" element={<Waiter />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/kitchen" element={<Kitchen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
