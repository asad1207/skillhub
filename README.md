# SkillHub — Campus Skill Marketplace

A peer-to-peer skill marketplace for university students.

## Folder Structure

```
src/
├── types/
│   └── index.ts              # All TypeScript interfaces
├── lib/
│   ├── mockData.ts            # Mock data for all features
│   └── utils.ts               # Utility/helper functions
├── hooks/
│   ├── useWallet.ts           # Wallet state management
│   └── useOrders.ts           # Orders state management
├── components/
│   ├── ui/
│   │   ├── Badge.tsx          # Reusable badge with variants
│   │   ├── Stars.tsx          # Star rating display
│   │   ├── Avatar.tsx         # User avatar/initials
│   │   └── MetricCard.tsx     # Summary metric card
│   ├── layout/
│   │   └── Navbar.tsx         # Top navigation bar
│   ├── browse/
│   │   └── ServiceCard.tsx    # Service listing card
│   ├── orders/
│   │   ├── OrderTracker.tsx   # 6-step order progress tracker
│   │   └── OrderRow.tsx       # Order list row
│   ├── chat/
│   │   ├── ChatWindow.tsx     # Message thread window
│   │   └── ConversationList.tsx # Chat sidebar list
│   └── wallet/
│       └── TransactionRow.tsx # Transaction history row
└── pages/
    ├── App.tsx                # Root app — routing + state
    ├── BrowsePage.tsx         # Browse & filter services
    ├── OrdersPage.tsx         # Active & past orders
    ├── ChatPage.tsx           # Messaging interface
    ├── WalletPage.tsx         # Balance, escrow & transactions
    ├── ProfilePage.tsx        # Student profile & earnings
    └── AdminPage.tsx          # Admin panel
```

## Setup

```bash
# Create Vite + React + TS project
npm create vite@latest skillhub -- --template react-ts
cd skillhub

# Install dependencies
npm install

# Copy all src/ files from this folder into your project
# Then run:
npm run dev
```

## Tech Stack (current)
- React 18 + TypeScript
- Vite
- Tailwind CSS

## Backend Integration (next steps)
1. **Supabase** — Auth, database, realtime chat
2. **Razorpay** — Payments + escrow via Razorpay Route
3. **Supabase Realtime** — Live chat messages

## Supabase Tables Needed
- `users` — profile, skills, ratings
- `services` — listings
- `orders` — order lifecycle
- `messages` — chat messages
- `transactions` — wallet history
- `disputes` — admin dispute tracking
# skillhub
