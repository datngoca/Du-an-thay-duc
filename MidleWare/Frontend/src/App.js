import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Admin from './components/admin';
import Employee from './components/employee';
import CreateEmployee from './components/createEmployee';
import BenefitPlans from './components/BenefitPlans';
import JobHistory from './components/JobHistory'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/'>
        <Route index element={<Admin />}></Route>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/createEmployee" element={<CreateEmployee />}></Route>
        <Route path="/BenefitPlans" element={<BenefitPlans />}></Route>
        <Route path="/JobHistory" element={<JobHistory />}></Route>

        
      </Route>
    </Route>
  )
)

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
