import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowForward,
  ArtTrack,
  Gavel,
  Token,
  TrendingUp,
  Security,
  Eco,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const featuredArtifacts = [
    {
      id: 'art_001',
      title: 'Jaina-Style Maya Figurine - Noble Warrior',
      culture: 'Maya',
      period: 'Classic Period',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      value: '$92,000',
      tokenized: true,
    },
    {
      id: 'art_003',
      title: 'Olmec Jade Mask - Were-Jaguar',
      culture: 'Olmec',
      period: 'Formative',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      value: '$195,000',
      tokenized: true,
    },
    {
      id: 'art_008',
      title: 'Aztec Gold Pendant - Eagle Warrior',
      culture: 'Aztec',
      period: 'Post-Classic',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      value: '$135,000',
      tokenized: false,
    },
  ];

  const features = [
    {
      icon: <ArtTrack sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Curated Collection',
      description: 'Exquisite Mesoamerican artifacts from Nobel Laureate collections and prestigious institutions.',
    },
    {
      icon: <Token sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'RWA Tokenization',
      description: 'Fractional ownership of cultural heritage through XRPL-based Real World Assets.',
    },
    {
      icon: <Gavel sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Live Auctions',
      description: 'Transparent, blockchain-enabled auctions for rare and valuable artifacts.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'DeFi Features',
      description: 'Stake tokens for yields, participate in governance, and earn rewards.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Provenance Tracking',
      description: 'Immutable provenance records stored on IPFS and linked to blockchain tokens.',
    },
    {
      icon: <Eco sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'ESG Impact',
      description: 'Portion of yields dedicated to artifact restoration and cultural preservation.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #DAA520 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              mb: 3,
            }}
          >
            Preserve History Through Blockchain
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Nectar House is the premier marketplace for tokenizing cultural heritage 
            artifacts as Real World Assets on the XRP Ledger. Own a piece of history.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/gallery')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Explore Gallery
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/about')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Artifacts */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontFamily: 'Playfair Display',
            fontWeight: 600,
          }}
        >
          Featured Artifacts
        </Typography>
        <Grid container spacing={4}>
          {featuredArtifacts.map((artifact) => (
            <Grid item xs={12} md={4} key={artifact.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => navigate(`/artifact/${artifact.id}`)}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={artifact.image}
                  alt={artifact.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    {artifact.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={artifact.culture} size="small" color="primary" />
                    <Chip label={artifact.period} size="small" variant="outlined" />
                    {artifact.tokenized && (
                      <Chip label="Tokenized" size="small" color="secondary" />
                    )}
                  </Box>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                    {artifact.value}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/artifact/${artifact.id}`)}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontFamily: 'Playfair Display',
              fontWeight: 600,
            }}
          >
            Why Choose Nectar House?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #DAA520 0%, #F4A460 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              fontFamily: 'Playfair Display',
              fontWeight: 600,
            }}
          >
            Ready to Own a Piece of History?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join our community of collectors, investors, and cultural heritage enthusiasts.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/gallery')}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Start Exploring
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;