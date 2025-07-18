# NONEO - 90-Day Stay Planner

A Next.js application for planning your 90-day stays within a rolling 180-day window, perfect for managing visa requirements and travel planning.

## Features

- 📅 Interactive calendar for date selection
- 🗓️ 90-day quota management with rolling 180-day window
- 📊 Real-time remaining days calculation
- 🌙 Dark/Light theme support
- 💾 Local storage for data persistence
- 📱 Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd noneo
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

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main application page
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # UI components
│   ├── calendar/             # Calendar-related components
│   ├── stays/                # Stay management components
│   └── layout/               # Layout components
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions
└── types/                    # TypeScript type definitions
```

## Usage

1. **Select Start Date**: Click on a calendar date to set your stay start date
2. **Select End Date**: Click on another date to set your stay end date
3. **Add Stay**: Give your stay a name and click "Ajouter le séjour"
4. **Manage Stays**: Edit or delete existing stays as needed
5. **Monitor Quota**: Keep track of your remaining days in the rolling 180-day window

## Technologies Used

- **Next.js 15.4.1** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **Local Storage** - Data persistence

## License

This project is licensed under the MIT License.
