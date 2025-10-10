const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock data for Mesoamerican artifacts from Nectar House collections
const mockArtifacts = [
  {
    id: 'art_001',
    title: 'Jaina-Style Maya Figurine - Noble Warrior',
    description: 'Exceptional Jaina-style ceramic figurine depicting a Maya noble warrior in ceremonial regalia, circa 600-900 CE. From the Nobel Laureate Roger Guillemin collection. This piece represents the pinnacle of Maya ceramic artistry with intricate details and exceptional preservation.',
    provenance: 'Roger Guillemin Collection → Private Estate → Nectar House',
    culture: 'Maya',
    period: 'Classic Period (600-900 CE)',
    material: 'Polychrome Ceramic',
    dimensions: '15.2 x 9.8 x 5.4 cm',
    condition: 'Excellent',
    estimatedValue: 85000,
    currentValue: 92000,
    tokenized: true,
    fractionalOwnership: true,
    tokenId: 'NFT_001_2024',
    totalShares: 1000,
    availableShares: 180,
    pricePerShare: 92,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmJainaWarrior001',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'art_002',
    title: 'Aztec Obsidian Mirror - Tezcatlipoca',
    description: 'Rare Aztec obsidian mirror dedicated to Tezcatlipoca, the Smoking Mirror god. Used in ceremonial contexts and divination practices. Exceptional craftsmanship with intricate carved frame and polished obsidian surface.',
    provenance: 'Museo Nacional de Antropología Deaccession → Private Collection → Nectar House',
    culture: 'Aztec',
    period: 'Post-Classic Period (1200-1521 CE)',
    material: 'Obsidian, Cedar Wood',
    dimensions: '18.5 x 18.5 x 3.2 cm',
    condition: 'Very Good',
    estimatedValue: 65000,
    currentValue: 68000,
    tokenized: false,
    fractionalOwnership: false,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmAztecMirror002',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 'art_003',
    title: 'Olmec Jade Mask - Were-Jaguar',
    description: 'Stunning Olmec jade mask featuring the characteristic were-jaguar transformation motif. One of the finest examples of Olmec lapidary work in private hands. The piece demonstrates the sophisticated understanding of jade carving techniques.',
    provenance: 'Museum Deaccession → Private Collection → Nectar House',
    culture: 'Olmec',
    period: 'Formative Period (1200-400 BCE)',
    material: 'Nephrite Jade',
    dimensions: '22.1 x 16.8 x 4.5 cm',
    condition: 'Excellent',
    estimatedValue: 180000,
    currentValue: 195000,
    tokenized: true,
    fractionalOwnership: true,
    tokenId: 'NFT_003_2024',
    totalShares: 1000,
    availableShares: 120,
    pricePerShare: 195,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmOlmecJade003',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'art_004',
    title: 'Zapotec Urn - Cocijo God',
    description: 'Magnificent Zapotec funerary urn depicting Cocijo, the rain god. This piece represents the sophisticated ceramic traditions of the Zapotec civilization with intricate modeling and symbolic imagery.',
    provenance: 'Monte Albán Excavation → Private Collection → Nectar House',
    culture: 'Zapotec',
    period: 'Classic Period (200-800 CE)',
    material: 'Grayware Ceramic',
    dimensions: '28.4 x 18.7 x 16.2 cm',
    condition: 'Very Good',
    estimatedValue: 45000,
    currentValue: 48000,
    tokenized: false,
    fractionalOwnership: false,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmZapotecUrn004',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'art_005',
    title: 'Mixtec Codex-Style Vase',
    description: 'Rare Mixtec codex-style polychrome vase with narrative scenes. This piece represents the sophisticated artistic traditions of the Mixtec people with intricate painted designs and historical significance.',
    provenance: 'Private Collection → Nectar House',
    culture: 'Mixtec',
    period: 'Post-Classic Period (900-1521 CE)',
    material: 'Polychrome Ceramic',
    dimensions: '24.6 x 19.3 x 19.3 cm',
    condition: 'Good',
    estimatedValue: 35000,
    currentValue: 38000,
    tokenized: true,
    fractionalOwnership: true,
    tokenId: 'NFT_005_2024',
    totalShares: 1000,
    availableShares: 300,
    pricePerShare: 38,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmMixtecVase005',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: 'art_006',
    title: 'Teotihuacan Stone Mask',
    description: 'Exceptional Teotihuacan stone mask representing a deity or high-ranking individual. This piece demonstrates the sophisticated stone carving techniques of the Teotihuacan civilization.',
    provenance: 'Teotihuacan Excavation → Museum Collection → Nectar House',
    culture: 'Teotihuacan',
    period: 'Classic Period (200-600 CE)',
    material: 'Volcanic Stone',
    dimensions: '16.8 x 13.2 x 8.4 cm',
    condition: 'Excellent',
    estimatedValue: 75000,
    currentValue: 82000,
    tokenized: false,
    fractionalOwnership: false,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmTeotihuacanMask006',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: 'art_007',
    title: 'Maya Stela Fragment - Royal Portrait',
    description: 'Rare Maya stela fragment depicting a royal portrait with hieroglyphic text. This piece provides valuable insights into Maya royal iconography and epigraphic traditions.',
    provenance: 'Palenque Excavation → Private Collection → Nectar House',
    culture: 'Maya',
    period: 'Classic Period (600-900 CE)',
    material: 'Limestone',
    dimensions: '45.2 x 32.1 x 12.8 cm',
    condition: 'Good',
    estimatedValue: 95000,
    currentValue: 105000,
    tokenized: true,
    fractionalOwnership: true,
    tokenId: 'NFT_007_2024',
    totalShares: 1000,
    availableShares: 150,
    pricePerShare: 105,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmMayaStela007',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: 'art_008',
    title: 'Aztec Gold Pendant - Eagle Warrior',
    description: 'Exquisite Aztec gold pendant depicting an eagle warrior. This piece represents the sophisticated metalworking traditions of the Aztec civilization and their military elite.',
    provenance: 'Templo Mayor Excavation → Private Collection → Nectar House',
    culture: 'Aztec',
    period: 'Post-Classic Period (1200-1521 CE)',
    material: 'Gold',
    dimensions: '8.7 x 6.2 x 1.8 cm',
    condition: 'Excellent',
    estimatedValue: 120000,
    currentValue: 135000,
    tokenized: false,
    fractionalOwnership: false,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmAztecGold008',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
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