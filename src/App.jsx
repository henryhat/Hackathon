import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AuctionsPage from './pages/AuctionsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ArtistPage from './pages/ArtistPage'
import CheckoutPage from './pages/CheckoutPage'
import { LoginPage, RegisterPage } from './pages/AuthPages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  const noChrome = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      <ScrollToTop />
      {!noChrome && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/auctions"       element={<AuctionsPage />} />
          <Route path="/collections"    element={<AuctionsPage />} />
          <Route path="/collections/:id" element={<AuctionsPage />} />
          <Route path="/artists"        element={<AuctionsPage />} />
          <Route path="/artwork/:id"    element={<ProductDetailPage />} />
          <Route path="/artist/:id"     element={<ArtistPage />} />
          <Route path="/checkout"       element={<CheckoutPage />} />
          <Route path="/login"          element={<LoginPage />} />
          <Route path="/register"       element={<RegisterPage />} />
        </Routes>
      </AnimatePresence>
      {!noChrome && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
