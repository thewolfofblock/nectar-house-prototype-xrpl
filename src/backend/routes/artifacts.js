const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock data for artifacts from Nectar House collections
const mockArtifacts = [
  {
    id: 'art_001',
    title: 'Sepik River Spirit Mask, Papua New Guinea',
    description: 'This ceremonial spirit mask originates from the Middle Sepik River region of Papua New Guinea, where masks function as vessels of ancestral presence and markers of ritual identity. Hand-carved from lightweight tropical hardwood, the form is distinguished by its bold forehead projection and stylized features — an abstracted geometry that reverberates across generations of Sepik River ceremony. Subtle traces of mineral-based pigment remain embedded within the carved planes, offering evidence of its life within cycles of veneration and display. Time has imparted a quiet authority to the surface: a luminous patina, a network of fine fissures, and the imprint of the tropical climate in which it was kept.',
    provenance: 'Private collection of Dr. Roger Guillemin, Nobel Laureate, La Jolla, California, USA',
    culture: 'Sepik River',
    period: 'Mid-20th Century (c. 1940–1960)',
    material: 'Hand-carved tropical hardwood with mineral-based pigment residues',
    dimensions: '11.5" H × 8.5" W × 8.5" D',
    condition: 'Stable with age-related fissures, insect exposure, and residual pigment; later cord attached for suspended display',
    estimatedValue: 100000,
    currentValue: 100000,
    tokenized: true,
    fractionalOwnership: true,
    tokenId: 'NFT_001_2024',
    totalShares: 1000,
    availableShares: 200,
    pricePerShare: 100,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmSepikMask001',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'art_002',
    title: 'Zapotec Effigy Vessel, Monte Albán, Mexico',
    description: 'This hand-formed ceramic effigy vessel features a seated human figure with stylized limbs and white slip decoration — an expressive form that bridges ritual function and figural symbolism. Likely originating from the Zapotec culture of Monte Albán, its geometric surface design and hollow body suggest ceremonial use, possibly as a funerary object or offering vessel. Time has softened its edges and lifted areas of slip, yet the figure endures with quiet authority. Rooted in the sacred traditions of early Mesoamerican life, it remains a compelling presence — evocative of memory, devotion, and the abstraction of identity.',
    provenance: 'Private collection of Dr. Roger Guillemin, Nobel Laureate, La Jolla, California, USA',
    culture: 'Zapotec',
    period: 'Monte Albán II–IIIA (c. 200 BCE–500 CE)',
    material: 'Terracotta with white slip decoration',
    dimensions: '11.875" H × 6.25" W × 4.5" D',
    condition: 'Chipped opening at the top; surface wear and flaking slip; possible break or loss to the left arm; discoloration from age and use; no visible restoration; structurally stable',
    estimatedValue: 100000,
    currentValue: 100000,
    tokenized: false,
    fractionalOwnership: false,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmZapotecVessel002',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 'art_003',
    title: 'Yoruba Ibeji Twin Figures, Nigeria',
    description: 'These conjoined talismans invite the discerning collector into a sacred union of duality — where Yoruba rituals of twin reverence and spiritual balance converge with a visionary embrace of cultural continuity. Their abstracted grace, adorned with indigo crests, beaded finery, and metal rings, embodies the profound interplay of life and afterlife. As vigilant guardians, they nurture ancestral heritage while inspiring ethical renewal, prosperous legacies, and deeper reflection on our shared existence. Traces of pigment and surface wear speak to a long life in ceremonial or symbolic use. The forms, modest in scale yet potent in presence, echo the enduring strength of Yoruba artistry and cosmology.',
    provenance: 'Private collection of Dr. Roger Guillemin, Nobel Laureate, La Jolla, California, USA',
    culture: 'Yoruba',
    period: 'Mid-20th Century (c. 1940–1970)',
    material: 'Carved wood with indigo blue pigment on headdresses, metal rings, beaded accessories, and dark patina',
    dimensions: '9.25" H × 3.125" W × 2.375" D (each)',
    condition: 'Visible wear and patina on surfaces; minor chipping and pigment loss; structurally stable; no visible adhesive or filler; restoration history unknown',
    estimatedValue: 100000,
    currentValue: 100000,
    tokenized: true,
    fractionalOwnership: true,
    tokenId: 'NFT_003_2024',
    totalShares: 1000,
    availableShares: 150,
    pricePerShare: 100,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    ],
    ipfsHash: 'QmYorubaIbeji003',
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