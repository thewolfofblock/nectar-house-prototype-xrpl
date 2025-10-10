const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock auction data
const auctions = new Map();
const bids = new Map();

// Mock auction data
const mockAuctions = [
  {
    id: 'auction_001',
    artifactId: 'art_002',
    title: 'Aztec Obsidian Mirror - Tezcatlipoca Auction',
    description: 'Live auction for rare Aztec obsidian mirror dedicated to Tezcatlipoca, the Smoking Mirror god. Exceptional craftsmanship with intricate carved frame.',
    startPrice: 60000,
    currentPrice: 68000,
    reservePrice: 70000,
    startTime: new Date('2024-02-01T18:00:00Z'),
    endTime: new Date('2024-02-15T18:00:00Z'),
    status: 'active', // active, ended, cancelled
    highestBidder: 'wallet_0x123...',
    bidCount: 15,
    minimumBidIncrement: 2000,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'auction_002',
    artifactId: 'art_006',
    title: 'Teotihuacan Stone Mask Auction',
    description: 'Exceptional Teotihuacan stone mask representing a deity or high-ranking individual. Demonstrates sophisticated stone carving techniques.',
    startPrice: 70000,
    currentPrice: 82000,
    reservePrice: 85000,
    startTime: new Date('2024-02-05T20:00:00Z'),
    endTime: new Date('2024-02-20T20:00:00Z'),
    status: 'active',
    highestBidder: 'wallet_0x456...',
    bidCount: 12,
    minimumBidIncrement: 1500,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: 'auction_003',
    artifactId: 'art_008',
    title: 'Aztec Gold Pendant - Eagle Warrior Auction',
    description: 'Exquisite Aztec gold pendant depicting an eagle warrior. Represents sophisticated metalworking traditions of the Aztec military elite.',
    startPrice: 110000,
    currentPrice: 135000,
    reservePrice: 140000,
    startTime: new Date('2024-02-10T19:00:00Z'),
    endTime: new Date('2024-02-25T19:00:00Z'),
    status: 'active',
    highestBidder: 'wallet_0x789...',
    bidCount: 8,
    minimumBidIncrement: 5000,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-30')
  }
];

// Initialize mock data
mockAuctions.forEach(auction => {
  auctions.set(auction.id, auction);
  bids.set(auction.id, []);
});

// GET /api/auctions - Get all auctions
router.get('/', (req, res) => {
  const { status, active } = req.query;
  
  let filteredAuctions = Array.from(auctions.values());
  
  if (status) {
    filteredAuctions = filteredAuctions.filter(auction => 
      auction.status === status
    );
  }
  
  if (active === 'true') {
    const now = new Date();
    filteredAuctions = filteredAuctions.filter(auction => 
      auction.status === 'active' && 
      new Date(auction.startTime) <= now && 
      new Date(auction.endTime) > now
    );
  }
  
  res.json({
    success: true,
    data: filteredAuctions,
    count: filteredAuctions.length
  });
});

// GET /api/auctions/:id - Get single auction
router.get('/:id', (req, res) => {
  const auction = auctions.get(req.params.id);
  
  if (!auction) {
    return res.status(404).json({
      success: false,
      error: 'Auction not found'
    });
  }
  
  const auctionBids = bids.get(req.params.id) || [];
  
  res.json({
    success: true,
    data: {
      ...auction,
      bids: auctionBids
    }
  });
});

// POST /api/auctions - Create new auction
router.post('/', (req, res) => {
  const {
    artifactId,
    title,
    description,
    startPrice,
    reservePrice,
    startTime,
    endTime,
    minimumBidIncrement
  } = req.body;
  
  if (!artifactId || !title || !startPrice || !reservePrice || !endTime) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }
  
  const newAuction = {
    id: `auction_${uuidv4().substring(0, 8)}`,
    artifactId,
    title,
    description: description || '',
    startPrice: parseFloat(startPrice),
    currentPrice: parseFloat(startPrice),
    reservePrice: parseFloat(reservePrice),
    startTime: startTime ? new Date(startTime) : new Date(),
    endTime: new Date(endTime),
    status: 'active',
    highestBidder: null,
    bidCount: 0,
    minimumBidIncrement: parseFloat(minimumBidIncrement) || 100,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  auctions.set(newAuction.id, newAuction);
  bids.set(newAuction.id, []);
  
  res.status(201).json({
    success: true,
    data: newAuction
  });
});

// POST /api/auctions/:id/bid - Place a bid
router.post('/:id/bid', (req, res) => {
  const { auctionId } = req.params;
  const { bidAmount, bidderWallet, bidderName } = req.body;
  
  if (!bidAmount || !bidderWallet) {
    return res.status(400).json({
      success: false,
      error: 'Bid amount and bidder wallet are required'
    });
  }
  
  const auction = auctions.get(auctionId);
  if (!auction) {
    return res.status(404).json({
      success: false,
      error: 'Auction not found'
    });
  }
  
  // Check if auction is active
  const now = new Date();
  if (auction.status !== 'active' || new Date(auction.startTime) > now || new Date(auction.endTime) <= now) {
    return res.status(400).json({
      success: false,
      error: 'Auction is not active'
    });
  }
  
  // Check minimum bid
  const minimumBid = auction.currentPrice + auction.minimumBidIncrement;
  if (parseFloat(bidAmount) < minimumBid) {
    return res.status(400).json({
      success: false,
      error: `Minimum bid is ${minimumBid}`
    });
  }
  
  // Create bid
  const bid = {
    id: `bid_${uuidv4().substring(0, 8)}`,
    auctionId,
    bidAmount: parseFloat(bidAmount),
    bidderWallet,
    bidderName: bidderName || 'Anonymous',
    bidTime: new Date(),
    status: 'active'
  };
  
  // Add bid to auction
  const auctionBids = bids.get(auctionId) || [];
  auctionBids.push(bid);
  bids.set(auctionId, auctionBids);
  
  // Update auction
  auction.currentPrice = bid.bidAmount;
  auction.highestBidder = bidderWallet;
  auction.bidCount += 1;
  auction.updatedAt = new Date();
  
  res.json({
    success: true,
    data: {
      bid,
      auction: {
        currentPrice: auction.currentPrice,
        highestBidder: auction.highestBidder,
        bidCount: auction.bidCount
      }
    }
  });
});

// GET /api/auctions/:id/bids - Get auction bids
router.get('/:id/bids', (req, res) => {
  const { id } = req.params;
  
  const auctionBids = bids.get(id) || [];
  
  // Sort by bid amount (highest first)
  auctionBids.sort((a, b) => b.bidAmount - a.bidAmount);
  
  res.json({
    success: true,
    data: auctionBids,
    count: auctionBids.length
  });
});

// POST /api/auctions/:id/end - End auction (admin only)
router.post('/:id/end', (req, res) => {
  const { id } = req.params;
  
  const auction = auctions.get(id);
  if (!auction) {
    return res.status(404).json({
      success: false,
      error: 'Auction not found'
    });
  }
  
  if (auction.status !== 'active') {
    return res.status(400).json({
      success: false,
      error: 'Auction is not active'
    });
  }
  
  // End auction
  auction.status = 'ended';
  auction.updatedAt = new Date();
  
  // Determine winner
  const auctionBids = bids.get(id) || [];
  const highestBid = auctionBids.reduce((max, bid) => 
    bid.bidAmount > max.bidAmount ? bid : max, 
    { bidAmount: 0 }
  );
  
  const result = {
    auction,
    winner: highestBid.bidAmount > 0 ? highestBid : null,
    totalBids: auctionBids.length
  };
  
  res.json({
    success: true,
    data: result
  });
});

// GET /api/auctions/user/:walletAddress - Get user's auction activity
router.get('/user/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  
  const userBids = [];
  const userAuctions = [];
  
  // Find all bids by user
  for (const [auctionId, auctionBids] of bids.entries()) {
    const userBidsInAuction = auctionBids.filter(bid => bid.bidderWallet === walletAddress);
    userBids.push(...userBidsInAuction.map(bid => ({
      ...bid,
      auction: auctions.get(auctionId)
    })));
  }
  
  // Find auctions created by user (if we had that field)
  // For now, just return bids
  
  res.json({
    success: true,
    data: {
      walletAddress,
      bids: userBids,
      totalBidValue: userBids.reduce((sum, bid) => sum + bid.bidAmount, 0)
    }
  });
});

module.exports = router;