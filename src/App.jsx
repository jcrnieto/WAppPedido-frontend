import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SignedIn, SignedOut } from '@clerk/clerk-react';

import LayoutMain from './components/home/layout/LayoutMain';
import Home from './components/home/page/Home';
import Login from './components/home/page/Login';
import PostLoginRedirect from './components/PublicStore/page/PostLoginRedirect';
import FormDataPersonal from './components/admin/page/FormDataPersonal';
import Admin from './components/admin/page/Admin';
import Register from './components/home/page/Register';
import PublicStore from './components/PublicStore/page/PublicStore';
import CategoryProducts from './components/PublicStore/page/AllProductsByCategory';

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

          <Route path="/store/:slug/:userId/category/:categoryId" element={<CategoryProducts />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
