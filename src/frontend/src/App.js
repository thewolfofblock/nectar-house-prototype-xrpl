import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArtifactGallery from './pages/ArtifactGallery';
import ArtifactDetail from './pages/ArtifactDetail';
import UserDashboard from './pages/UserDashboard';
import AuctionPage from './pages/AuctionPage';
import TokenizationPage from './pages/TokenizationPage';
import AboutPage from './pages/AboutPage';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Saddle brown for cultural heritage
      light: '#A0522D',
      dark: '#654321',
    },
    secondary: {
      main: '#DAA520', // Goldenrod for luxury/premium
      light: '#F4A460',
      dark: '#B8860B',
    },
    background: {
      default: '#FAF8F5', // Warm off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1810',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<ArtifactGallery />} />
              <Route path="/artifact/:id" element={<ArtifactDetail />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/auctions" element={<AuctionPage />} />
              <Route path="/tokenize" element={<TokenizationPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;