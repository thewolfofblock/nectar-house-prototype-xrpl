import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Token,
  CloudUpload,
  Security,
  AttachMoney,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TokenizationPage = () => {
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [tokenizeDialogOpen, setTokenizeDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [tokenizationData, setTokenizationData] = useState({
    walletAddress: '',
    totalShares: 1000,
    pricePerShare: 0,
  });

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/artifacts?tokenized=false');
      setArtifacts(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch artifacts');
      console.error('Error fetching artifacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenizeClick = (artifact) => {
    setSelectedArtifact(artifact);
    setTokenizationData(prev => ({
      ...prev,
      pricePerShare: artifact.estimatedValue / prev.totalShares,
    }));
    setTokenizeDialogOpen(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setTokenizationData({
      walletAddress: '',
      totalShares: 1000,
      pricePerShare: 0,
    });
  };

  const handleTokenizationSubmit = async () => {
    try {
      // Step 1: Mint NFT
      const nftResponse = await axios.post('/api/tokenization/mint', {
        artifactId: selectedArtifact.id,
        walletAddress: tokenizationData.walletAddress,
      });

      // Step 2: Create fractional ownership
      const fractionalResponse = await axios.post('/api/tokenization/fractionalize', {
        artifactId: selectedArtifact.id,
        totalShares: tokenizationData.totalShares,
        pricePerShare: tokenizationData.pricePerShare,
      });

      // Refresh artifacts
      fetchArtifacts();
      setTokenizeDialogOpen(false);
      handleReset();
    } catch (err) {
      console.error('Error tokenizing artifact:', err);
    }
  };

  const tokenizationSteps = [
    {
      label: 'Connect Wallet',
      description: 'Connect your XRPL wallet to begin the tokenization process',
      icon: <Security />,
    },
    {
      label: 'Verify Ownership',
      description: 'Confirm you are the legal owner of this artifact',
      icon: <CheckCircle />,
    },
    {
      label: 'Upload to IPFS',
      description: 'Upload artifact metadata and images to decentralized storage',
      icon: <CloudUpload />,
    },
    {
      label: 'Mint NFT',
      description: 'Create a unique NFT representing this artifact on XRPL',
      icon: <Token />,
    },
    {
      label: 'Create Fractional Shares',
      description: 'Set up fractional ownership for trading and investment',
      icon: <AttachMoney />,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 2,
          fontFamily: 'Playfair Display',
          fontWeight: 600,
        }}
      >
        Tokenize Your Artifacts
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Transform your cultural heritage artifacts into tradeable Real World Assets on the XRP Ledger.
      </Typography>

      {/* Process Overview */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Tokenization Process
        </Typography>
        <Grid container spacing={2}>
          {tokenizationSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 1, color: 'primary.main' }}>
                  {step.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  {step.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Available Artifacts */}
      <Typography variant="h6" sx={{ mb: 3 }}>
        Available for Tokenization
      </Typography>

      {artifacts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Token sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            No Artifacts Available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            All artifacts have been tokenized or no artifacts are available for tokenization.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/gallery')}>
            Browse Gallery
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {artifacts.map((artifact) => (
            <Grid item xs={12} sm={6} md={4} key={artifact.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box
                  component="img"
                  height="200"
                  src={artifact.images[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'}
                  alt={artifact.title}
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    {artifact.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={artifact.culture} size="small" color="primary" />
                    <Chip label={artifact.period} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {artifact.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                    ${artifact.estimatedValue.toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<Token />}
                    onClick={() => handleTokenizeClick(artifact)}
                    fullWidth
                  >
                    Tokenize
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Tokenization Dialog */}
      <Dialog open={tokenizeDialogOpen} onClose={() => setTokenizeDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tokenize Artifact</DialogTitle>
        <DialogContent>
          {selectedArtifact && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedArtifact.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Estimated Value: ${selectedArtifact.estimatedValue.toLocaleString()}
              </Typography>

              <Stepper activeStep={activeStep} orientation="vertical">
                {tokenizationSteps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {step.description}
                      </Typography>
                      
                      {index === 0 && (
                        <TextField
                          fullWidth
                          label="Wallet Address"
                          value={tokenizationData.walletAddress}
                          onChange={(e) => setTokenizationData(prev => ({
                            ...prev,
                            walletAddress: e.target.value,
                          }))}
                          sx={{ mb: 2 }}
                        />
                      )}
                      
                      {index === 4 && (
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Total Shares"
                                type="number"
                                value={tokenizationData.totalShares}
                                onChange={(e) => setTokenizationData(prev => ({
                                  ...prev,
                                  totalShares: parseInt(e.target.value),
                                  pricePerShare: selectedArtifact.estimatedValue / parseInt(e.target.value),
                                }))}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Price per Share"
                                type="number"
                                value={tokenizationData.pricePerShare}
                                onChange={(e) => setTokenizationData(prev => ({
                                  ...prev,
                                  pricePerShare: parseFloat(e.target.value),
                                }))}
                                InputProps={{
                                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Alert severity="info" sx={{ mt: 2 }}>
                            Total value: ${(tokenizationData.totalShares * tokenizationData.pricePerShare).toLocaleString()}
                          </Alert>
                        </Box>
                      )}

                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="contained"
                          onClick={index === tokenizationSteps.length - 1 ? handleTokenizationSubmit : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === tokenizationSteps.length - 1 ? 'Complete Tokenization' : 'Continue'}
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
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTokenizeDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TokenizationPage;