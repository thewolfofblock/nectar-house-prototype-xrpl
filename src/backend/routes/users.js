const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock user data
const users = new Map();
const userWallets = new Map();

// Mock user profiles
const mockUsers = [
  {
    id: 'user_001',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    username: 'art_collector_2024',
    email: 'collector@example.com',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    bio: 'Passionate collector of Mesoamerican artifacts with 15+ years experience.',
    verified: true,
    kycStatus: 'verified',
    totalSpent: 125000,
    totalEarned: 8500,
    stakingRewards: 3200,
    restorationContributions: 1500,
    joinedAt: new Date('2023-06-15'),
    lastActive: new Date('2024-01-25')
  },
  {
    id: 'user_002',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    username: 'heritage_enthusiast',
    email: 'heritage@example.com',
    firstName: 'James',
    lastName: 'Chen',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Blockchain enthusiast and cultural heritage advocate.',
    verified: true,
    kycStatus: 'verified',
    totalSpent: 45000,
    totalEarned: 2100,
    stakingRewards: 850,
    restorationContributions: 300,
    joinedAt: new Date('2023-09-20'),
    lastActive: new Date('2024-01-24')
  }
];

// Initialize mock data
mockUsers.forEach(user => {
  users.set(user.id, user);
  userWallets.set(user.walletAddress, user.id);
});

// GET /api/users/profile/:walletAddress - Get user profile
router.get('/profile/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  
  const userId = userWallets.get(walletAddress);
  if (!userId) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  const user = users.get(userId);
  
  res.json({
    success: true,
    data: user
  });
});

// POST /api/users/profile - Create or update user profile
router.post('/profile', (req, res) => {
  const {
    walletAddress,
    username,
    email,
    firstName,
    lastName,
    bio
  } = req.body;
  
  if (!walletAddress) {
    return res.status(400).json({
      success: false,
      error: 'Wallet address is required'
    });
  }
  
  const existingUserId = userWallets.get(walletAddress);
  
  if (existingUserId) {
    // Update existing user
    const user = users.get(existingUserId);
    const updatedUser = {
      ...user,
      username: username || user.username,
      email: email || user.email,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      bio: bio || user.bio,
      lastActive: new Date()
    };
    
    users.set(existingUserId, updatedUser);
    
    res.json({
      success: true,
      data: updatedUser
    });
  } else {
    // Create new user
    const newUser = {
      id: `user_${uuidv4().substring(0, 8)}`,
      walletAddress,
      username: username || `user_${Date.now()}`,
      email: email || '',
      firstName: firstName || '',
      lastName: lastName || '',
      profileImage: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
      bio: bio || '',
      verified: false,
      kycStatus: 'pending',
      totalSpent: 0,
      totalEarned: 0,
      stakingRewards: 0,
      restorationContributions: 0,
      joinedAt: new Date(),
      lastActive: new Date()
    };
    
    users.set(newUser.id, newUser);
    userWallets.set(walletAddress, newUser.id);
    
    res.status(201).json({
      success: true,
      data: newUser
    });
  }
});

// GET /api/users/portfolio/:walletAddress - Get user portfolio
router.get('/portfolio/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  
  const userId = userWallets.get(walletAddress);
  if (!userId) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  // Mock portfolio data
  const portfolio = {
    walletAddress,
    totalValue: 125000,
    totalInvested: 85000,
    totalGains: 40000,
    stakingRewards: 3200,
    restorationContributions: 1500,
    holdings: [
      {
        artifactId: 'art_001',
        artifactTitle: 'Jaina-Style Maya Figurine',
        shares: 100,
        totalShares: 1000,
        ownershipPercentage: 10,
        currentValue: 4500,
        purchasePrice: 4000,
        gain: 500,
        gainPercentage: 12.5
      },
      {
        artifactId: 'art_003',
        artifactTitle: 'Olmec Jade Mask',
        shares: 50,
        totalShares: 1000,
        ownershipPercentage: 5,
        currentValue: 6250,
        purchasePrice: 6000,
        gain: 250,
        gainPercentage: 4.2
      }
    ],
    stakingPositions: [
      {
        tokenId: 'FRAC_art_001',
        stakedAmount: 10000,
        apy: 8.5,
        maturityDate: new Date('2024-06-15'),
        expectedRewards: 425
      }
    ],
    transactionHistory: [
      {
        id: 'tx_001',
        type: 'purchase',
        artifactId: 'art_001',
        amount: 4000,
        shares: 100,
        timestamp: new Date('2024-01-15'),
        status: 'completed'
      },
      {
        id: 'tx_002',
        type: 'stake',
        tokenId: 'FRAC_art_001',
        amount: 10000,
        duration: 180,
        timestamp: new Date('2024-01-20'),
        status: 'active'
      }
    ]
  };
  
  res.json({
    success: true,
    data: portfolio
  });
});

// GET /api/users/leaderboard - Get user leaderboard
router.get('/leaderboard', (req, res) => {
  const { type = 'totalValue', limit = 10 } = req.query;
  
  const allUsers = Array.from(users.values());
  
  let sortedUsers;
  switch (type) {
    case 'totalSpent':
      sortedUsers = allUsers.sort((a, b) => b.totalSpent - a.totalSpent);
      break;
    case 'totalEarned':
      sortedUsers = allUsers.sort((a, b) => b.totalEarned - a.totalEarned);
      break;
    case 'stakingRewards':
      sortedUsers = allUsers.sort((a, b) => b.stakingRewards - a.stakingRewards);
      break;
    case 'restorationContributions':
      sortedUsers = allUsers.sort((a, b) => b.restorationContributions - a.restorationContributions);
      break;
    default:
      sortedUsers = allUsers.sort((a, b) => b.totalSpent - a.totalSpent);
  }
  
  const leaderboard = sortedUsers.slice(0, parseInt(limit)).map((user, index) => ({
    rank: index + 1,
    username: user.username,
    profileImage: user.profileImage,
    value: user[type] || user.totalSpent,
    verified: user.verified
  }));
  
  res.json({
    success: true,
    data: {
      type,
      leaderboard,
      totalUsers: allUsers.length
    }
  });
});

// POST /api/users/kyc - Submit KYC information
router.post('/kyc', (req, res) => {
  const { walletAddress, kycData } = req.body;
  
  if (!walletAddress || !kycData) {
    return res.status(400).json({
      success: false,
      error: 'Wallet address and KYC data are required'
    });
  }
  
  const userId = userWallets.get(walletAddress);
  if (!userId) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  const user = users.get(userId);
  
  // Mock KYC processing
  const kycResult = {
    status: 'pending',
    submittedAt: new Date(),
    estimatedProcessingTime: '24-48 hours'
  };
  
  // Update user KYC status
  user.kycStatus = 'pending';
  user.kycData = kycData;
  user.kycSubmittedAt = new Date();
  
  res.json({
    success: true,
    data: {
      kycResult,
      message: 'KYC information submitted successfully'
    }
  });
});

// GET /api/users/restoration-fund - Get restoration fund information
router.get('/restoration-fund', (req, res) => {
  const restorationFund = {
    totalContributions: 25000,
    totalArtifactsRestored: 12,
    currentProjects: [
      {
        id: 'restore_001',
        artifactId: 'art_001',
        title: 'Jaina Figurine Conservation',
        description: 'Professional conservation of ceramic surface and structural stabilization',
        targetAmount: 5000,
        currentAmount: 3200,
        contributors: 45,
        status: 'active',
        deadline: new Date('2024-03-15')
      },
      {
        id: 'restore_002',
        artifactId: 'art_002',
        title: 'Obsidian Mirror Restoration',
        description: 'Expert restoration of obsidian surface and frame reconstruction',
        targetAmount: 3000,
        currentAmount: 1800,
        contributors: 28,
        status: 'active',
        deadline: new Date('2024-04-01')
      }
    ],
    completedProjects: [
      {
        id: 'restore_003',
        title: 'Maya Vase Conservation',
        description: 'Complete restoration of painted ceramic vessel',
        amount: 2500,
        completedAt: new Date('2024-01-10'),
        contributors: 32
      }
    ]
  };
  
  res.json({
    success: true,
    data: restorationFund
  });
});

module.exports = router;