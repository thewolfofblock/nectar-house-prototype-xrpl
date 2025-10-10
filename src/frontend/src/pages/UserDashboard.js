import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Eco,
  Token,
  Gavel,
  History,
  AttachMoney,
  Security,
} from '@mui/icons-material';
import axios from 'axios';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock wallet address - in real app, get from connected wallet
  const walletAddress = '0x1234567890abcdef1234567890abcdef12345678';

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/portfolio/${walletAddress}`);
      setPortfolio(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch portfolio data');
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
        }}
      >
        Portfolio Dashboard
      </Typography>

      {/* Portfolio Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Value</Typography>
              </Box>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                ${portfolio?.totalValue.toLocaleString() || '0'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +{portfolio?.totalGains.toLocaleString() || '0'} gains
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Staking Rewards</Typography>
              </Box>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                ${portfolio?.stakingRewards.toLocaleString() || '0'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Annual yield: 8.5%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Eco color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Restoration Fund</Typography>
              </Box>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
                ${portfolio?.restorationContributions.toLocaleString() || '0'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contributed to preservation
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Token color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Holdings</Typography>
              </Box>
              <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 700 }}>
                {portfolio?.holdings.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Artifact positions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Holdings" icon={<Token />} />
          <Tab label="Staking" icon={<TrendingUp />} />
          <Tab label="Transactions" icon={<History />} />
          <Tab label="Restoration" icon={<Eco />} />
        </Tabs>
      </Box>

      {/* Holdings Tab */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Your Artifact Holdings
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Artifact</TableCell>
                  <TableCell>Shares</TableCell>
                  <TableCell>Ownership %</TableCell>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>Current Value</TableCell>
                  <TableCell>Gain/Loss</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio?.holdings.map((holding, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {holding.artifactTitle}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {holding.artifactId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{holding.shares}</TableCell>
                    <TableCell>{holding.ownershipPercentage}%</TableCell>
                    <TableCell>${holding.purchasePrice.toLocaleString()}</TableCell>
                    <TableCell>${holding.currentValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="body2"
                          color={holding.gain >= 0 ? 'success.main' : 'error.main'}
                        >
                          {holding.gain >= 0 ? '+' : ''}${holding.gain.toLocaleString()}
                        </Typography>
                        <Chip
                          label={`${holding.gainPercentage}%`}
                          size="small"
                          color={holding.gain >= 0 ? 'success' : 'error'}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Staking Tab */}
      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Active Staking Positions
          </Typography>
          <Grid container spacing={3}>
            {portfolio?.stakingPositions.map((position, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{position.tokenId}</Typography>
                      <Chip label="Active" color="success" size="small" />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Staked Amount
                      </Typography>
                      <Typography variant="h6">
                        ${position.stakedAmount.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        APY
                      </Typography>
                      <Typography variant="h6" color="success.main">
                        {position.apy}%
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Expected Rewards
                      </Typography>
                      <Typography variant="h6">
                        ${position.expectedRewards.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Maturity Date
                      </Typography>
                      <Typography variant="body2">
                        {new Date(position.maturityDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      75% complete
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Transactions Tab */}
      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Transaction History
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Artifact/Token</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Shares</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio?.transactionHistory.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip
                        label={transaction.type}
                        color={transaction.type === 'purchase' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{transaction.artifactId || transaction.tokenId}</TableCell>
                    <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{transaction.shares || '-'}</TableCell>
                    <TableCell>
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status}
                        color={transaction.status === 'completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Restoration Tab */}
      {activeTab === 3 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Restoration Fund Contributions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Eco color="info" sx={{ mr: 1 }} />
                    <Typography variant="h6">Total Contributed</Typography>
                  </Box>
                  <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
                    ${portfolio?.restorationContributions.toLocaleString() || '0'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Supporting cultural heritage preservation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Security color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6">Impact</Typography>
                  </Box>
                  <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Artifacts restored with your contributions
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Current Restoration Projects
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Jaina Figurine Conservation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Professional conservation of ceramic surface and structural stabilization
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Progress</Typography>
                        <Typography variant="body2">$3,200 / $5,000</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={64} />
                    </Box>
                    <Button size="small" variant="outlined">
                      Contribute
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Obsidian Mirror Restoration
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Expert restoration of obsidian surface and frame reconstruction
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Progress</Typography>
                        <Typography variant="body2">$1,800 / $3,000</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={60} />
                    </Box>
                    <Button size="small" variant="outlined">
                      Contribute
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default UserDashboard;