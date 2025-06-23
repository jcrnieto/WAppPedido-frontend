import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LayoutAdmin from './layout/LayoutAdmin';
import LayoutMain from './layout/LayoutMain';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Home from './page/Home';
import Login from './page/Login';
import Admin from './page/admin/Admin';

import { useLocalStorage } from 'react-use';

function App() {
  const [user] = useLocalStorage('user')

  return (
    <>
      <Router>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute canActivate={user} />} >
            <Route element={<LayoutAdmin />}>
              <Route path="/admin" element={<Admin />} />

            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
