import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import {
  Security,
  Eco,
  TrendingUp,
  ArtTrack,
  Gavel,
  Token,
  Verified,
  School,
  Business,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ArtTrack sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Curated Collection',
      description: 'Exquisite Mesoamerican artifacts from Nobel Laureate collections and prestigious institutions, carefully authenticated and verified.',
    },
    {
      icon: <Token sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'RWA Tokenization',
      description: 'Transform cultural heritage into tradeable Real World Assets on the XRP Ledger, enabling fractional ownership and global access.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Provenance Tracking',
      description: 'Immutable provenance records stored on IPFS and linked to blockchain tokens, ensuring authenticity and ownership history.',
    },
    {
      icon: <Gavel sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Transparent Auctions',
      description: 'Blockchain-enabled auctions provide transparent, fair, and secure bidding processes for rare and valuable artifacts.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'DeFi Features',
      description: 'Stake tokens for yields, participate in governance, and earn rewards while supporting cultural heritage preservation.',
    },
    {
      icon: <Eco sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'ESG Impact',
      description: 'A portion of yields is dedicated to artifact restoration and cultural preservation, creating positive social impact.',
    },
  ];

  const teamMembers = [
    {
      name: 'Christian Nunez',
      title: 'Co-Founder',
      bio: 'Prominent in blockchain/AI with experience at AnChain.AI, Workato, Salesforce, Analytics Ventures, VeChain, & NBC.',
      companies: ['AnChain.AI', 'Workato', 'Salesforce', 'VeChain', 'NBC'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      name: 'Julia Aramouni',
      title: 'Co-Founder',
      bio: 'Prominent in marketing/GTM with experience at Backlight, Art Blocks, Pinanta Cloud, 1848 Ventures, Lattice, Shiseido, BlueNalu, Colorscience.',
      companies: ['Art Blocks', 'Backlight', 'Lattice', 'Shiseido', 'BlueNalu'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    },
  ];

  const stats = [
    { label: 'Artifacts Tokenized', value: '3+', icon: <ArtTrack /> },
    { label: 'Total Value', value: '$300K+', icon: <TrendingUp /> },
    { label: 'Active Users', value: '1,200+', icon: <Verified /> },
    { label: 'Restoration Projects', value: '12+', icon: <Eco /> },
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
            variant="h3"
            component="h1"
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              mb: 3,
            }}
          >
            Preserving History Through Innovation
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Nectar House is revolutionizing cultural heritage preservation by combining 
            blockchain technology with traditional art collecting, creating new opportunities 
            for ownership, investment, and cultural appreciation.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 3,
                fontFamily: 'Playfair Display',
                fontWeight: 600,
              }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              We believe that cultural heritage should be accessible, preservable, and valuable 
              to everyone. By tokenizing rare Mesoamerican artifacts as Real World Assets on 
              the XRP Ledger, we're creating a new paradigm for cultural preservation and 
              investment.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Our platform enables fractional ownership of historically significant artifacts, 
              democratizing access to cultural treasures while ensuring their preservation 
              through blockchain-verified provenance and restoration funding.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/gallery')}
            >
              Explore Our Collection
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600"
              alt="Cultural Heritage"
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 4,
              }}
            />
          </Grid>
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
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
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
          Our Impact
        </Typography>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
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
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={member.avatar}
                      sx={{ width: 80, height: 80, mr: 3 }}
                    />
                    <Box>
                      <Typography variant="h6" component="h3">
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {member.bio}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {member.companies.map((company, companyIndex) => (
                      <Chip
                        key={companyIndex}
                        label={company}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Technology Section */}
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
          Built on XRP Ledger
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              XLS-20 NFT Standard
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              We utilize the XRP Ledger's native NFT capabilities to create unique, 
              tradeable tokens representing each artifact. This ensures authenticity, 
              provenance, and seamless trading across the XRPL ecosystem.
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              AMM Integration
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Our platform integrates with XRPL's Automated Market Makers (AMMs) to 
              provide liquidity for fractional ownership shares, enabling efficient 
              trading and price discovery.
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Hooks for Smart Contracts
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We leverage XRPL Hooks to create conditional payments and escrow systems, 
              ensuring secure transactions and automated compliance with our platform rules.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Future Integrations
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School color="inherit" />
                  <Typography variant="body2">Credentials for KYC/AML</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Business color="inherit" />
                  <Typography variant="body2">XChainBridge for Interoperability</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="inherit" />
                  <Typography variant="body2">Advanced Security Features</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

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
            Join the Cultural Heritage Revolution
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Be part of the future of cultural preservation and investment.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/gallery')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Start Exploring
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/tokenize')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Tokenize Artifacts
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;