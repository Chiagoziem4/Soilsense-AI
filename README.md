# SoilSense AI

A modern, production-ready full-stack web application for AI-powered soil analysis and crop recommendations.

## Features

✨ **Core Features:**
- 🖼️ **Image Upload** - Upload soil images (JPG/PNG) with preview
- 🤖 **AI Analysis** - Uses Grok Vision API for soil analysis
- 🌾 **Crop Recommendations** - Get personalized crop suggestions
- 🎨 **Beautiful UI** - Premium SaaS design with smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive** - Mobile-first design
- 📄 **PDF Export** - Download analysis results as PDF
- ⚡ **Fast & Lightweight** - Optimized performance

## Tech Stack

- **Frontend:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **AI:** Grok Vision API
- **TypeScript:** Full type safety
- **Deployment:** Vercel-ready

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Grok API Key ([Get one here](https://console.x.ai/))

### Installation

1. **Clone/Download the project:**
   ```bash
   cd soilsense-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your Grok API key:
   ```
   GROK_API_KEY=your_actual_grok_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
soilsense-ai/
├── pages/
│   ├── _app.tsx           # App wrapper & global config
│   ├── _document.tsx      # HTML document wrapper
│   ├── index.tsx          # Landing page with upload
│   ├── results.tsx        # Results display page
│   └── api/
│       └── analyze.ts     # Grok API integration endpoint
├── components/
│   ├── DarkModeToggle.tsx # Dark mode toggle button
│   ├── UploadCard.tsx     # Image upload component
│   └── ResultsCard.tsx    # Results display component
├── styles/
│   └── globals.css        # Global styles & Tailwind setup
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── .env.example           # Environment variables template
```

## How It Works

1. **Upload Phase:**
   - User uploads a soil image via drag-drop or file picker
   - Image is previewed before analysis
   - Click "Analyze Soil" to start

2. **Analysis Phase:**
   - Image is sent to backend API route
   - Backend converts to base64 and sends to Grok Vision API
   - Grok analyzes the image and returns soil information

3. **Results Phase:**
   - Analysis results are displayed in a beautiful card
   - Shows soil type, fertility, moisture level, and crop recommendations
   - User can download results as PDF or analyze another image

## API Endpoint

### POST `/api/analyze`

**Request:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "fileName": "soil_sample.jpg"
}
```

**Response:**
```json
{
  "soilType": "Loam",
  "fertilityLevel": "high",
  "moistureLevel": "moderate",
  "recommendedCrops": ["Wheat", "Corn", "Soybeans"],
  "explanation": "This soil sample..."
}
```

## Environment Variables

```env
# Required: Grok API Key from https://console.x.ai/
GROK_API_KEY=your_grok_api_key_here
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `GROK_API_KEY`: Your Grok API key
5. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The app can be deployed to any Node.js hosting:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Netlify (with serverless functions)

Build command: `npm run build`
Start command: `npm run start`

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## UI Components

### DarkModeToggle
Toggle between light and dark themes. Persists preference in localStorage.

### UploadCard
Drag-and-drop image upload with preview. Supports JPG and PNG.

### ResultsCard
Displays analysis results with badges and crop recommendation chips.

## Color Scheme

The app uses earth-tone colors:
- **Soil Palette:** Browns and tans (#6d5a47, #8b7355)
- **Earth Palette:** Greens (#427d1e, #5a9c2a)
- **Accents:** Whites and grays with soft shadows

Dark mode automatically inverts the color scheme for comfortable viewing.

## Customization

### Change Colors
Edit `tailwind.config.js` to modify the `soil` and `earth` color palettes.

### Change API Endpoint
Modify `/pages/api/analyze.ts` to use a different vision API (e.g., OpenAI, Claude).

### Add Features
- Authentication: Add NextAuth.js
- Database: Connect to Supabase or Firebase
- History: Store past analyses
- Sharing: Generate shareable result links

## Performance

- **First Load:** ~2-3 seconds (optimized)
- **Image Upload:** Instant preview
- **AI Analysis:** ~3-5 seconds (depends on Grok API)
- **Results Display:** Instant

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Troubleshooting

**"API key not configured" error:**
- Ensure `GROK_API_KEY` is in `.env.local`
- Restart dev server after adding the key

**"Failed to analyze image" error:**
- Check if Grok API key is valid
- Verify image is JPG or PNG
- Try a different image

**Dark mode not working:**
- Clear localStorage: `localStorage.clear()`
- Refresh the page

**PDF download not working:**
- Check browser console for errors
- Ensure pop-ups are not blocked
- Try a different browser

## Security

- API keys are kept server-side
- Images are only sent to Grok API
- No data is stored or logged
- HTTPS recommended for production

## License

MIT - Feel free to use for personal or commercial projects

## Support

For issues or questions, check:
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Grok API Docs](https://console.x.ai/)

---

**Made with 🌱 by the SoilSense Team**
