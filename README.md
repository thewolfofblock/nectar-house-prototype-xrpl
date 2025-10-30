# Nectar House MVP - Cultural Heritage RWA Marketplace

A curated marketplace for tokenizing cultural heritage artifacts as Real World Assets (RWAs) on the XRP Ledger (XRPL) Mainnet.

## 🏛️ Overview

Nectar House is a blockchain-enabled Sotheby's-like platform for sourcing, showcasing, and tokenizing elite Mesoamerican artifacts. The platform enables fractional ownership, provenance preservation, DeFi features (staking for yields, auctions), and ESG elements (restoration funding).

## ✨ Features

- **Curated Collection**: Exquisite Mesoamerican artifacts from Nobel Laureate collections
- **RWA Tokenization**: Fractional ownership through XRPL-based Real World Assets
- **Live Auctions**: Transparent, blockchain-enabled auctions
- **DeFi Features**: Staking rewards, governance participation
- **Provenance Tracking**: Immutable records on IPFS and blockchain
- **ESG Impact**: Restoration funding for cultural preservation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Start development servers:
   ```bash
   npm run dev
   ```

This will start both the frontend (React) and backend (Node.js/Express) servers concurrently.

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 🏗️ Architecture

```
Frontend (React) → Backend API (Express) → XRPL Mainnet
                        ↓
                    IPFS (Metadata)
```

### Technology Stack

**Frontend:**
- React 18
- Material-UI (MUI)
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- XRPL.js (for blockchain integration)
- IPFS (for metadata storage)

**Blockchain:**
- XRP Ledger (XRPL) Mainnet
- XLS-20 (NFT standard)
- AMMs (Automated Market Makers)
- Hooks (Smart contracts)

## 📁 Project Structure

```
src/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── public/        # Static assets
├── backend/           # Node.js backend API
│   ├── routes/        # API route handlers
│   ├── middleware/    # Express middleware
│   ├── models/        # Data models
│   └── server.js      # Main server file
└── utils/             # Shared utilities
```

## 🔧 API Endpoints

### Artifacts
- `GET /api/artifacts` - List all artifacts
- `GET /api/artifacts/:id` - Get artifact details
- `POST /api/artifacts` - Create new artifact
- `PUT /api/artifacts/:id` - Update artifact
- `DELETE /api/artifacts/:id` - Delete artifact

### Tokenization
- `POST /api/tokenization/mint` - Mint NFT for artifact
- `POST /api/tokenization/fractionalize` - Create fractional ownership
- `POST /api/tokenization/purchase-shares` - Purchase fractional shares
- `POST /api/tokenization/stake` - Stake tokens for yield

### Auctions
- `GET /api/auctions` - List all auctions
- `GET /api/auctions/:id` - Get auction details
- `POST /api/auctions` - Create new auction
- `POST /api/auctions/:id/bid` - Place bid

### Users
- `GET /api/users/profile/:walletAddress` - Get user profile
- `POST /api/users/profile` - Create/update user profile
- `GET /api/users/portfolio/:walletAddress` - Get user portfolio

## 🎨 UI Features

- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Material-UI components with custom theming
- **Cultural Heritage Theme**: Warm colors and typography reflecting Mesoamerican culture
- **Interactive Components**: Galleries, auctions, tokenization wizards
- **Real-time Updates**: Live auction data and portfolio tracking

## 🔐 Security & Compliance

- **KYC/AML**: User verification system
- **Provenance Verification**: Immutable artifact history
- **Smart Contracts**: Automated compliance and escrow
- **IPFS Storage**: Decentralized metadata storage

## 🌱 ESG Impact

- **Restoration Funding**: Portion of yields dedicated to artifact restoration
- **Cultural Preservation**: Supporting museums and cultural institutions
- **Transparent Impact**: Trackable contributions to preservation projects

## 🚧 Development Status

This is an MVP (Minimum Viable Product) with the following status:

✅ **Completed:**
- Project structure and setup
- Backend API with mock data
- React frontend with all major pages
- Responsive UI design
- Mock tokenization system
- Auction functionality
- User dashboard and portfolio

🔄 **In Progress:**
- XRPL integration (currently mocked)
- IPFS integration for metadata
- Real wallet connectivity
- Advanced DeFi features

## 📝 License

MIT License - see LICENSE file for details

## 👥 Team

- **Christian Nunez** (Co-Founder) - Blockchain/AI expertise
- **Julia Aramouni** (Co-Founder) - Marketing/GTM expertise

## 🤝 Contributing

This is currently a private project. For collaboration opportunities, please contact the team.

## 📞 Support

For technical support or questions, please open an issue in this repository.

---

Built with ❤️ for cultural heritage preservation and blockchain innovation.