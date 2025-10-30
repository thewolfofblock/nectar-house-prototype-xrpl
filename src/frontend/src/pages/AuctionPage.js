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
  Chip,
  TextField,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Gavel,
  AccessTime,
  AttachMoney,
  Person,
  TrendingUp,
  Timer,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuctionPage = () => {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidderName, setBidderName] = useState('');

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/auctions?active=true');
      setAuctions(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch auctions');
      console.error('Error fetching auctions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBidClick = (auction) => {
    setSelectedAuction(auction);
    setBidAmount(auction.currentPrice + auction.minimumBidIncrement);
    setBidDialogOpen(true);
  };

  const handleBidSubmit = async () => {
    try {
      const response = await axios.post(`/api/auctions/${selectedAuction.id}/bid`, {
        bidAmount: parseFloat(bidAmount),
        bidderWallet: '0x1234567890abcdef1234567890abcdef12345678', // Mock wallet
        bidderName: bidderName || 'Anonymous',
      });
      
      // Refresh auctions
      fetchAuctions();
      setBidDialogOpen(false);
      setBidAmount('');
      setBidderName('');
    } catch (err) {
      console.error('Error placing bid:', err);
    }
  };

  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getProgressPercentage = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    const total = end - start;
    const elapsed = now - start;
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

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
          mb: 4,
          fontFamily: 'Playfair Display',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Live Auctions
      </Typography>

      {auctions.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Gavel sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            No Active Auctions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Check back later for new auction listings.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/gallery')}>
            Browse Artifacts
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {auctions.map((auction) => (
            <Grid item xs={12} md={6} key={auction.id}>
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" component="h3">
                      {auction.title}
                    </Typography>
                    <Chip
                      label={auction.status === 'active' ? 'Live' : 'Ended'}
                      color={auction.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {auction.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Current Bid
                      </Typography>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                        ${auction.currentPrice.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Reserve Price
                      </Typography>
                      <Typography variant="body2">
                        ${auction.reservePrice.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Minimum Bid
                      </Typography>
                      <Typography variant="body2">
                        ${(auction.currentPrice + auction.minimumBidIncrement).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Bids
                      </Typography>
                      <Typography variant="body2">
                        {auction.bidCount}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Time Remaining
                      </Typography>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                        {getTimeRemaining(auction.endTime)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressPercentage(auction.startTime, auction.endTime)}
                      sx={{ mb: 1 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        Started: {new Date(auction.startTime).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ends: {new Date(auction.endTime).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  {auction.highestBidder && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Highest Bidder
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {auction.highestBidder}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/artifact/${auction.artifactId}`)}
                  >
                    View Artifact
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Gavel />}
                    onClick={() => handleBidClick(auction)}
                    disabled={auction.status !== 'active'}
                  >
                    Place Bid
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Bid Dialog */}
      <Dialog open={bidDialogOpen} onClose={() => setBidDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Place Auction Bid</DialogTitle>
        <DialogContent>
          {selectedAuction && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedAuction.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Current bid: ${selectedAuction.currentPrice.toLocaleString()}
              </Typography>
              
              <TextField
                autoFocus
                margin="dense"
                label="Your Name (Optional)"
                fullWidth
                variant="outlined"
                value={bidderName}
                onChange={(e) => setBidderName(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="dense"
                label="Bid Amount (USD)"
                type="number"
                fullWidth
                variant="outlined"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                inputProps={{
                  min: selectedAuction.currentPrice + selectedAuction.minimumBidIncrement,
                }}
                helperText={`Minimum bid: $${(selectedAuction.currentPrice + selectedAuction.minimumBidIncrement).toLocaleString()}`}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBidDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleBidSubmit}
            variant="contained"
            disabled={!bidAmount || parseFloat(bidAmount) < (selectedAuction?.currentPrice + selectedAuction?.minimumBidIncrement)}
          >
            Place Bid
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AuctionPage;