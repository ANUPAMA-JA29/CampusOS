import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "./pages/public/SplashScreen";
import Welcome from "./pages/public/Welcome";
import Login from "./pages/public/Login";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />

      <Route path="/login/:role" element={<Login />} />

      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}

export default App;