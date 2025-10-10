import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Gavel,
  Token,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArtifactGallery = () => {
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    culture: '',
    period: '',
    tokenized: '',
    minValue: '',
    maxValue: '',
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchArtifacts();
  }, [filters, page]);

  const fetchArtifacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await axios.get(`/api/artifacts?${params.toString()}`);
      setArtifacts(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch artifacts');
      console.error('Error fetching artifacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedArtifacts = artifacts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(artifacts.length / itemsPerPage);

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
        Artifact Gallery
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search artifacts..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Culture</InputLabel>
              <Select
                value={filters.culture}
                onChange={(e) => handleFilterChange('culture', e.target.value)}
                label="Culture"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Maya">Maya</MenuItem>
                <MenuItem value="Aztec">Aztec</MenuItem>
                <MenuItem value="Olmec">Olmec</MenuItem>
                <MenuItem value="Zapotec">Zapotec</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Period</InputLabel>
              <Select
                value={filters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
                label="Period"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Formative">Formative</MenuItem>
                <MenuItem value="Classic">Classic</MenuItem>
                <MenuItem value="Post-Classic">Post-Classic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.tokenized}
                onChange={(e) => handleFilterChange('tokenized', e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Tokenized</MenuItem>
                <MenuItem value="false">Not Tokenized</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilters({
                search: '',
                culture: '',
                period: '',
                tokenized: '',
                minValue: '',
                maxValue: '',
              })}
              fullWidth
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {artifacts.length} artifacts found
          </Typography>

          <Grid container spacing={3}>
            {paginatedArtifacts.map((artifact) => (
              <Grid item xs={12} sm={6} md={4} key={artifact.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => navigate(`/artifact/${artifact.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={artifact.images[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'}
                    alt={artifact.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                      {artifact.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {artifact.description.substring(0, 100)}...
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip label={artifact.culture} size="small" color="primary" />
                      <Chip label={artifact.period} size="small" variant="outlined" />
                      {artifact.tokenized && (
                        <Chip label="Tokenized" size="small" color="secondary" />
                      )}
                      {artifact.fractionalOwnership && (
                        <Chip label="Fractional" size="small" color="success" />
                      )}
                    </Box>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                      ${artifact.currentValue.toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/artifact/${artifact.id}`);
                      }}
                    >
                      View
                    </Button>
                    {artifact.tokenized && (
                      <Button
                        size="small"
                        startIcon={<Token />}
                        color="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/artifact/${artifact.id}#tokenization`);
                        }}
                      >
                        Trade
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ArtifactGallery;