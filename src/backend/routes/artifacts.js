const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock data for Mesoamerican artifacts
const mockArtifacts = [
  {
    id: 'art_001',
    title: 'Jaina-Style Maya Figurine - Warrior',
    description: 'Exquisite Jaina-style ceramic figurine depicting a Maya warrior, circa 600-900 CE. From the Nobel Laureate Roger Guillemin collection.',
    provenance: 'Roger Guillemin Collection → Private Estate → Nectar House',
    culture: 'Maya',
    period: 'Classic Period (600-900 CE)',
    material: 'Ceramic',
    dimensions: '12.5 x 8.2 x 4.1 cm',
    condition: 'Excellent',
    estimatedValue: 45000,
    currentValue: 45000,
    tokenized: false,
    fractionalOwnership: false,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmMockHash001',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'art_002',
    title: 'Aztec Obsidian Mirror',
    description: 'Rare Aztec obsidian mirror with intricate carved frame, used in ceremonial contexts. Exceptional craftsmanship and historical significance.',
    provenance: 'Private Collection → Nectar House',
    culture: 'Aztec',
    period: 'Post-Classic Period (1200-1521 CE)',
    material: 'Obsidian, Wood',
    dimensions: '15.2 x 15.2 x 2.1 cm',
    condition: 'Very Good',
    estimatedValue: 32000,
    currentValue: 32000,
    tokenized: false,
    fractionalOwnership: false,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmMockHash002',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 'art_003',
    title: 'Olmec Jade Mask',
    description: 'Stunning Olmec jade mask with characteristic features. One of the finest examples of Olmec lapidary work in private hands.',
    provenance: 'Museum Deaccession → Private Collection → Nectar House',
    culture: 'Olmec',
    period: 'Formative Period (1200-400 BCE)',
    material: 'Jade',
    dimensions: '18.7 x 14.3 x 3.2 cm',
    condition: 'Excellent',
    estimatedValue: 125000,
    currentValue: 125000,
    tokenized: true,
    fractionalOwnership: true,
    tokenId: 'NFT_003_2024',
    totalShares: 1000,
    availableShares: 250,
    pricePerShare: 125,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmMockHash003',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  }
];

// GET /api/artifacts - Get all artifacts
router.get('/', (req, res) => {
  const { culture, period, tokenized, minValue, maxValue, search } = req.query;
  
  let filteredArtifacts = [...mockArtifacts];
  
  if (culture) {
    filteredArtifacts = filteredArtifacts.filter(artifact => 
      artifact.culture.toLowerCase().includes(culture.toLowerCase())
    );
  }
  
  if (period) {
    filteredArtifacts = filteredArtifacts.filter(artifact => 
      artifact.period.toLowerCase().includes(period.toLowerCase())
    );
  }
  
  if (tokenized !== undefined) {
    filteredArtifacts = filteredArtifacts.filter(artifact => 
      artifact.tokenized === (tokenized === 'true')
    );
  }
  
  if (minValue) {
    filteredArtifacts = filteredArtifacts.filter(artifact => 
      artifact.currentValue >= parseInt(minValue)
    );
  }
  
  if (maxValue) {
    filteredArtifacts = filteredArtifacts.filter(artifact => 
      artifact.currentValue <= parseInt(maxValue)
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredArtifacts = filteredArtifacts.filter(artifact => 
      artifact.title.toLowerCase().includes(searchLower) ||
      artifact.description.toLowerCase().includes(searchLower) ||
      artifact.culture.toLowerCase().includes(searchLower)
    );
  }
  
  res.json({
    success: true,
    data: filteredArtifacts,
    count: filteredArtifacts.length
  });
});

// GET /api/artifacts/:id - Get single artifact
router.get('/:id', (req, res) => {
  const artifact = mockArtifacts.find(a => a.id === req.params.id);
  
  if (!artifact) {
    return res.status(404).json({
      success: false,
      error: 'Artifact not found'
    });
  }
  
  res.json({
    success: true,
    data: artifact
  });
});

// POST /api/artifacts - Create new artifact (admin only)
router.post('/', (req, res) => {
  const {
    title,
    description,
    provenance,
    culture,
    period,
    material,
    dimensions,
    condition,
    estimatedValue,
    images
  } = req.body;
  
  if (!title || !description || !culture || !estimatedValue) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }
  
  const newArtifact = {
    id: `art_${uuidv4().substring(0, 8)}`,
    title,
    description,
    provenance: provenance || 'Unknown',
    culture,
    period: period || 'Unknown',
    material: material || 'Unknown',
    dimensions: dimensions || 'Unknown',
    condition: condition || 'Unknown',
    estimatedValue: parseInt(estimatedValue),
    currentValue: parseInt(estimatedValue),
    tokenized: false,
    fractionalOwnership: false,
    images: images || [],
    ipfsHash: `QmMockHash${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockArtifacts.push(newArtifact);
  
  res.status(201).json({
    success: true,
    data: newArtifact
  });
});

// PUT /api/artifacts/:id - Update artifact
router.put('/:id', (req, res) => {
  const artifactIndex = mockArtifacts.findIndex(a => a.id === req.params.id);
  
  if (artifactIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Artifact not found'
    });
  }
  
  const updatedArtifact = {
    ...mockArtifacts[artifactIndex],
    ...req.body,
    id: req.params.id,
    updatedAt: new Date()
  };
  
  mockArtifacts[artifactIndex] = updatedArtifact;
  
  res.json({
    success: true,
    data: updatedArtifact
  });
});

// DELETE /api/artifacts/:id - Delete artifact
router.delete('/:id', (req, res) => {
  const artifactIndex = mockArtifacts.findIndex(a => a.id === req.params.id);
  
  if (artifactIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Artifact not found'
    });
  }
  
  mockArtifacts.splice(artifactIndex, 1);
  
  res.json({
    success: true,
    message: 'Artifact deleted successfully'
  });
});

module.exports = router;