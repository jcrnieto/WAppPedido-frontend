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
import DetailProduct from './components/PublicStore/page/DetailProduct';
import PublicLayout from './components/PublicStore/page/PublicLayout';
import SearchResults from './components/PublicStore/components/Navbar/SearchResult';

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

          {/* Rutas públicas con el mismo navbar */}
          <Route path="/:slug" element={<PublicLayout />}>
            <Route index element={<PublicStore />}           />
            <Route path=":userId/category/:categoryId" element={<CategoryProducts />} />
            <Route path=":userId/product/:productId" element={<DetailProduct />}/>
            <Route path=":userId/search" element={<SearchResults />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
