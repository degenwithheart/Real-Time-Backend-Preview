# Backend Preview Frontend

A modern React + TypeScript frontend for demonstrating API integration with mock data generation. This project showcases real-time backend preview functionality with multiple programming language examples.

## Features

- 🚀 **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with TypeScript
- 🎨 **Modern UI** - Mobile-first responsive design
- 📱 **Tabbed Interface** - API Demo, Code Examples, Downloads
- 🔗 **API Integration** - Axios for HTTP requests
- 📦 **Vercel Ready** - Optimized for Vercel deployment with edge functions

## API Endpoints

The frontend integrates with the following API endpoints:

- `GET /api/user` - Fetch mock user data
- `GET /api/product` - Fetch mock product data
- `GET /api/health` - Health check endpoint

## Project Structure

```
/
├── api/                    # Vercel API routes (serverless functions)
│   ├── user.js            # User data endpoint
│   ├── product.js         # Product data endpoint
│   └── health.js          # Health check endpoint
├── src/                   # React application
│   ├── components/        # React components
│   │   ├── CodeTabs.tsx   # Code examples tabs
│   │   └── DownloadsTabs.tsx # Download templates tabs
│   ├── App.tsx            # Main app component
│   ├── App.css            # Main styles
│   └── main.tsx           # App entry point
├── public/                # Static assets
├── templates/             # Language-specific examples
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```
├── src/
│   ├── components/         # React components
│   │   ├── CodeTabs.tsx    # Code examples tabs
│   │   └── DownloadsTabs.tsx # Download templates tabs
│   ├── App.tsx             # Main app component
│   ├── App.css             # Main styles
│   └── main.tsx            # App entry point
├── vercel.json             # Vercel configuration
└── package.json
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the configuration
3. Deploy with zero configuration

The `vercel.json` file configures:
- Static build with Vite
- API routes as serverless functions
- SPA routing fallback

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## API Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* actual data */ },
  "timestamp": "2025-10-05T12:00:00.000Z"
}
```

## Environment Variables

Create a `.env` file for local development:

```env
VITE_API_BASE_URL=http://localhost:5173
```

## Technologies Used

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Deployment**: Vercel with Edge Functions
- **Code Quality**: ESLint

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
