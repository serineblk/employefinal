import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Page d'accueil
import AdditionalServicesPage from "./pages/AdditionalServicesPage"; // Page des services additionnels
import ServiceDetailsPage from "./pages/ServiceDetailsPage"; // Page des détails d'un service
import "../src/components/sidebar.css"; // Importez les styles de la barre latérale
import AccountingDashboard from "./pages/AccountingDashboard"; // Tableau de bord de la comptabilité
import HousekeepingDashboard from "./pages/HousekeepingDashboard"; // Tableau de bord du personnel de ménage
import ReceptionistDashboard from "./pages/ReceptionistDashboard"; // Tableau de bord du réceptionniste

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<HomePage />} />

        {/* Tableaux de bord */}
        <Route path="/accounting" element={<AccountingDashboard />} /> {/* Comptabilité */}
        <Route path="/housekeeping" element={<HousekeepingDashboard />} /> {/* Personnel de ménage */}
        <Route path="/receptionist/*" element={<ReceptionistDashboard />} /> {/* Réceptionniste */}

        {/* Pages des services */}
        <Route path="/additional-services-page" element={<AdditionalServicesPage />} /> {/* Page des services additionnels */}
        <Route path="/service-details/:serviceId" element={<ServiceDetailsPage />} /> {/* Détails d'un service */}

        {/* Redirection vers la page d'accueil pour toute URL inconnue */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;