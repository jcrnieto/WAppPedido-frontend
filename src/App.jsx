import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SignedIn, SignedOut } from '@clerk/clerk-react';

import LayoutMain from './layout/LayoutMain';
import Home from './page/Home';
import Login from './page/Login';
import PostLoginRedirect from './page/PostLoginRedirect';
import FormDataPersonal from './page/admin/FormDataPersonal';
import Admin from './page/admin/Admin';
import Register from './page/Register';
import PublicStore from './page/PublicStore';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/post-login" element={<PostLoginRedirect />} />

          <Route
            path="/completar-perfil"
            element={
              <SignedIn>
                <FormDataPersonal />
              </SignedIn>
            }
          />

          <Route
            path="/admin/:slug"
            element={
              <SignedIn>
                <Admin />
              </SignedIn>
            }
          />

          <Route
            path="/:slug"
            element={<PublicStore />} 
          />

        </Routes>
      </Router>
    </>
  )
}

export default App
