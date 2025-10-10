import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  ArrowBack,
  Share,
  Favorite,
  Gavel,
  Token,
  TrendingUp,
  Security,
  History,
  AttachMoney,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArtifactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [tokenizeDialogOpen, setTokenizeDialogOpen] = useState(false);
  const [auctionDialogOpen, setAuctionDialogOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetchArtifact();
  }, [id]);

  const fetchArtifact = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/artifacts/${id}`);
      setArtifact(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch artifact details');
      console.error('Error fetching artifact:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTokenize = () => {
    setTokenizeDialogOpen(true);
  };

  const handleAuctionBid = () => {
    setAuctionDialogOpen(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const tokenizationSteps = [
    'Connect Wallet',
    'Verify Ownership',
    'Upload to IPFS',
    'Mint NFT',
    'Create Fractional Shares',
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !artifact) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Artifact not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/gallery')}
        sx={{ mb: 3 }}
      >
        Back to Gallery
      </Button>

      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={artifact.images[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600'}
              alt={artifact.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {artifact.images.map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    height="80"
                    image={image}
                    alt={`${artifact.title} ${index + 1}`}
                    sx={{
                      width: 80,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Artifact Information */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 2,
              fontFamily: 'Playfair Display',
              fontWeight: 600,
            }}
          >
            {artifact.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            <Chip label={artifact.culture} color="primary" />
            <Chip label={artifact.period} variant="outlined" />
            <Chip label={artifact.material} variant="outlined" />
            {artifact.tokenized && (
              <Chip label="Tokenized" color="secondary" />
            )}
            {artifact.fractionalOwnership && (
              <Chip label="Fractional Ownership" color="success" />
            )}
          </Box>

          <Typography variant="h3" color="primary.main" sx={{ mb: 3, fontWeight: 700 }}>
            ${artifact.currentValue.toLocaleString()}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            {artifact.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Token />}
              onClick={handleTokenize}
              disabled={artifact.tokenized}
            >
              {artifact.tokenized ? 'Already Tokenized' : 'Tokenize Artifact'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Gavel />}
              onClick={handleAuctionBid}
            >
              Place Bid
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Share />}
            >
              Share
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Favorite />}
            >
              Save
            </Button>
          </Box>

          {/* Quick Stats */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="primary.main">
                  {artifact.condition}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Condition
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="primary.main">
                  {artifact.dimensions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dimensions
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Detailed Information Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Details" icon={<History />} />
          <Tab label="Provenance" icon={<Security />} />
          <Tab label="Tokenization" icon={<Token />} />
          <Tab label="Market Data" icon={<TrendingUp />} />
        </Tabs>

        {tabValue === 0 && (
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Artifact Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Culture:</Typography>
                    <Typography variant="body2">{artifact.culture}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Period:</Typography>
                    <Typography variant="body2">{artifact.period}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Material:</Typography>
                    <Typography variant="body2">{artifact.material}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Dimensions:</Typography>
                    <Typography variant="body2">{artifact.dimensions}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Condition:</Typography>
                    <Typography variant="body2">{artifact.condition}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Valuation
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Estimated Value:</Typography>
                    <Typography variant="body2">${artifact.estimatedValue.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Current Value:</Typography>
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                      ${artifact.currentValue.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Appreciation:</Typography>
                    <Typography 
                      variant="body2" 
                      color={artifact.currentValue > artifact.estimatedValue ? 'success.main' : 'error.main'}
                    >
                      {((artifact.currentValue - artifact.estimatedValue) / artifact.estimatedValue * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}

        {tabValue === 1 && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Provenance Chain
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {artifact.provenance}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Security color="primary" />
              <Typography variant="body2" color="text.secondary">
                Verified on IPFS: {artifact.ipfsHash}
              </Typography>
            </Box>
          </Card>
        )}

        {tabValue === 2 && (
          <Card sx={{ p: 3 }}>
            {artifact.tokenized ? (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Tokenization Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">NFT ID:</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {artifact.tokenId || 'NFT_001_2024'}
                    </Typography>
                  </Grid>
                  {artifact.fractionalOwnership && (
                    <>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">Total Shares:</Typography>
                        <Typography variant="body2">{artifact.totalShares}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">Available Shares:</Typography>
                        <Typography variant="body2">{artifact.availableShares}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">Price per Share:</Typography>
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                          ${artifact.pricePerShare}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Token sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Not Yet Tokenized
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  This artifact can be tokenized to enable fractional ownership and trading.
                </Typography>
                <Button variant="contained" onClick={handleTokenize}>
                  Start Tokenization
                </Button>
              </Box>
            )}
          </Card>
        )}

        {tabValue === 3 && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Market Performance
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary.main">
                    +12.5%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    30-day change
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary.main">
                    $45,000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current price
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary.main">
                    24
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total trades
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}
      </Box>

      {/* Tokenization Dialog */}
      <Dialog open={tokenizeDialogOpen} onClose={() => setTokenizeDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tokenize Artifact</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {tokenizationSteps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {index === 0 && 'Connect your XRPL wallet to begin the tokenization process.'}
                    {index === 1 && 'Verify that you are the legal owner of this artifact.'}
                    {index === 2 && 'Upload artifact metadata and images to IPFS for decentralized storage.'}
                    {index === 3 && 'Mint a unique NFT representing this artifact on the XRPL.'}
                    {index === 4 && 'Create fractional ownership shares for trading and investment.'}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === tokenizationSteps.length - 1 ? 'Complete' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTokenizeDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Auction Bid Dialog */}
      <Dialog open={auctionDialogOpen} onClose={() => setAuctionDialogOpen(false)}>
        <DialogTitle>Place Auction Bid</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Bid Amount (USD)"
            type="number"
            fullWidth
            variant="outlined"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuctionDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setAuctionDialogOpen(false)} variant="contained">
            Place Bid
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ArtifactDetail;