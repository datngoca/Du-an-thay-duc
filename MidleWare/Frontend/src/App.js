import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Admin from './components/admin';
import Employee from './components/employee';

import CreateEmployee from './components/createEmployee';
import EditEmployee from './components/editEmployee';

import DetailEmployee from './components/detailEmployee';
import DeleteEmployee from './components/deleteEmployee';
import BenefitPlans from './components/BenefitPlans';
import JobHistory from './components/JobHistory'
import { useParams } from 'react-router-dom';

const App = () => {
  const { id } = useParams();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/'>
          <Route index element={<Admin />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />

          <Route path="/detailEmployee/:id" element={<DetailEmployee />} />
          <Route path="/deleteEmployee/:id" element={<DeleteEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />

          <Route path="/BenefitPlans" element={<BenefitPlans />} />
          <Route path="/JobHistory" element={<JobHistory />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;