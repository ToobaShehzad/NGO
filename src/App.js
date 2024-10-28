import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importing components
import Home from './components/Home';
import MorePage from './components/MorePage';
import AddNewPackage from './components/Add-new-package';
import AddNewImpactee from './components/Add-new-impactee';
import ViewPackages from './components/ViewPackages';
import ViewImpactees from './components/ViewImpactees';
import ImpacteeDetails from './components/ImpacteeDetails';
import PaymentMethod from './components/PaymentMethod';
import AddNewCause from './components/AddNewCause';
import ViewListOfCauses from './components/ViewListOfCauses';
import History from './components/History';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/add-new-package" element={<AddNewPackage />} />
      <Route path="/add-new-impactee" element={<AddNewImpactee />} />
      <Route path="/view-list-packages" element={<ViewPackages />} />
      <Route path="/view-impactees" element={<ViewImpactees />} />
      <Route path="/impactee-details/:id" element={<ImpacteeDetails />} />
      <Route path="/payment-method" element={<PaymentMethod />} />
      <Route path="/add-new-cause" element={<AddNewCause />} />
      <Route path="/view-list-causes" element={<ViewListOfCauses />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
