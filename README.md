# CineVerse

A modern, full-featured movie streaming platform built with Next.js, offering unlimited access to movies and entertainment content. Users can explore diverse genres, create personalized watchlists, and enjoy premium streaming with subscription-based access.

## Features

- **User Authentication**: Secure login and registration with email verification
- **Movie Streaming**: High-quality video playback with React Player
- **Personalized Watchlist**: Save and manage favorite movies
- **Admin Dashboard**: Comprehensive content and user management
- **Subscription Management**: Multiple pricing tiers with payment integration
- **Responsive Design**: Mobile-first UI built with Tailwind CSS and Shadcn/ui
- **Real-time Data**: Efficient state management with TanStack Query
- **Dark Mode Support**: Theme switching with Next Themes
- **Type-Safe Development**: Full TypeScript implementation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn/ui components
- **Authentication**: Better Auth
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Database**: Prisma (via Better Auth adapter)
- **UI Components**: Radix UI, Lucide React icons
- **Charts**: Recharts
- **Video Player**: React Player

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cine-verse-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your configuration:
```env
# Database URL
DATABASE_URL="your-database-connection-string"

# Authentication secrets
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Other API keys as needed
```

4. Run database migrations (if using Prisma):
```bash
npx prisma migrate dev
```

## Usage

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # User and admin dashboards
│   │   ├── admin/         # Admin-specific pages
│   │   └── user/          # User-specific pages
│   ├── (main-layout)/     # Public pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── modules/          # Feature-specific components
├── lib/                  # Utility functions and configurations
│   ├── auth-client.ts    # Authentication client
│   ├── auth-session.ts   # Session management
│   └── utils.ts          # General utilities
└── proxy.ts              # API proxy configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [Shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev) and [Phosphor Icons](https://phosphoricons.com)
