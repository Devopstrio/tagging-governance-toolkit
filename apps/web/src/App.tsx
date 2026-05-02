import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import GovernanceDashboard from './pages/GovernanceDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The tagging governance engine is currently validating global resource metadata and calculating compliance scores. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<GovernanceDashboard />} />
          <Route path="/policies" element={<Placeholder name="Policy Management Studio" />} />
          <Route path="/inventory" element={<Placeholder name="Multi-Cloud Resource Inventory" />} />
          <Route path="/remediation" element={<Placeholder name="Automated Remediation Hub" />} />
          <Route path="/cost" element={<Placeholder name="Financial Cost Allocation Analytics" />} />
          <Route path="/compliance" element={<Placeholder name="Tagging Compliance Intelligence" />} />
          <Route path="/audit" element={<Placeholder name="Metadata Audit & Drift History" />} />
          <Route path="/reports" element={<Placeholder name="Executive Governance Reporting" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
