# SoilSense AI

A comprehensive agricultural technology platform with AI-powered analysis for soil, plants, and crop recommendations. Build with modern web technologies and deployed on Vercel.

## 🌟 Features

### Core Services
- **🪨 Soil Analysis** - Analyze soil type, texture, fertility, moisture, and get crop recommendations
- **🌿 Plant Health Analysis** - Detect plant diseases, nutrient deficiencies, and receive treatment recommendations
- **🌾 AI Crop Recommendation** - Enter soil and environmental data to get personalized crop recommendations with confidence scores

### UI/UX Features
- ✨ **Modern AgriTech Design** - Premium, professional interface with earth tones
- 🌙 **Dark Mode** - Full dark mode support with localStorage persistence
- 📱 **Fully Responsive** - Mobile-first design for all devices
- 🎨 **Smooth Animations** - Glassmorphism effects and transitions
- 📄 **PDF Export** - Download detailed analysis reports
- 🎯 **Results Dashboard** - Comprehensive analysis with health scores, risk levels, and recommendations

### Platform Features
- 🤖 **AI-Powered Analysis** - Grok Vision API for advanced image and data analysis
- 🔐 **Secure** - API keys kept server-side
- ⚡ **Fast & Lightweight** - Optimized performance
- 📊 **Data-Driven** - Actionable insights and recommendations
- 🌍 **Sustainable** - Focus on sustainable agriculture practices

## Tech Stack

- **Frontend:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS with custom theme
- **Backend:** Next.js API Routes
- **AI:** Grok Vision API
- **Language:** TypeScript
- **Database:** Optional (future enhancement)
- **Deployment:** Vercel

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
│   ├── _app.tsx                  # App wrapper
│   ├── _document.tsx             # HTML document
│   ├── index.tsx                 # Home page with intro
│   ├── services.tsx              # Service selection hub
│   ├── soil-analysis.tsx         # Soil analysis page
│   ├── plant-analysis.tsx        # Plant analysis page
│   ├── crop-recommendation.tsx   # Crop recommendation form
│   ├── analysis-results.tsx      # Unified results dashboard
│   ├── results.tsx               # Legacy (for backward compatibility)
│   └── api/
│       ├── analyze.ts            # Soil analysis endpoint
│       ├── analyze-plant.ts      # Plant analysis endpoint
│       └── recommend-crops.ts    # Crop recommendation endpoint
├── components/
│   ├── AgricultureIntro.tsx      # Agriculture introduction section
│   ├── DarkModeToggle.tsx        # Dark mode toggle
│   ├── DeveloperInfo.tsx         # Developer/creator info
│   ├── ServiceCard.tsx           # Service selection card
│   ├── UploadCard.tsx            # Image upload component
│   └── ResultsCard.tsx           # Results display card
├── styles/
│   └── globals.css               # Global styles
├── types/
│   └── html2pdf.d.ts             # TypeScript declarations
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind theme config
├── next.config.js                # Next.js config
├── tsconfig.json                 # TypeScript config
├── .env.example                  # Environment template
└── README.md                     # Documentation
```

## User Flow

```
Home Page
  ↓
Agriculture Introduction (learn about AgriTech)
  ↓
Choose a Service (Soil / Plant / Crop)
  ↓
  ├─→ Soil Analysis
  │   └─→ Upload image → AI Analysis → Results Dashboard
  │
  ├─→ Plant Health Analysis
  │   └─→ Upload image → Disease Detection → Results Dashboard
  │
  └─→ Crop Recommendation
      └─→ Enter soil/environmental data → AI Recommendation → Results Dashboard
  ↓
Results Dashboard (view scores, recommendations, insights)
  ↓
Download Report or New Analysis
```

## API Endpoints

### POST `/api/analyze`
Soil analysis using image upload.

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
  "explanation": "Detailed analysis..."
}
```

### POST `/api/analyze-plant`
Plant health analysis using image upload.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "fileName": "plant_sample.jpg"
}
```

**Response:**
```json
{
  "plantHealth": "Moderate",
  "healthScore": 65,
  "riskLevel": "medium",
  "plantDiseases": ["Early blight"],
  "nutrientDeficiencies": ["Nitrogen"],
  "treatmentRecommendations": ["Apply nitrogen fertilizer", "Increase watering"],
  "confidenceScore": 0.85
}
```

### POST `/api/recommend-crops`
Get crop recommendations based on environmental data.

**Request:**
```json
{
  "N": 50,
  "P": 30,
  "K": 45,
  "pH": 6.8,
  "temperature": 25,
  "humidity": 65,
  "rainfall": 200,
  "soilMoisture": 40
}
```

**Response:**
```json
{
  "crops": [
    {
      "name": "Wheat",
      "confidence": 0.85,
      "reason": "Excellent for NPK levels and pH conditions"
    }
  ],
  "farmingPractices": ["Crop rotation", "Balanced fertilization"],
  "confidenceScore": 0.87
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
vercel --prod
```

### Deploy to Other Platforms

Works with any Node.js hosting:
- Railway
- Render
- DigitalOcean
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

## Color Palette

### Earth Tones Theme
- **Soil Colors**: Browns and tans for soil-related content
- **Earth Colors**: Greens for agriculture and growth
- **Accent Colors**: White, grays, and earth browns

### Dark Mode
Automatically inverts colors for comfortable viewing in low-light environments.

## Customization

### Change Colors
Edit `tailwind.config.js` to modify the `soil` and `earth` color palettes.

### Change API Provider
Modify the API endpoints to use different vision AI providers:
- OpenAI Vision
- Claude Vision
- Anthropic
- Custom ML models

### Add Features
- User authentication with NextAuth.js
- Database integration (Supabase, Firebase)
- Analysis history and saved reports
- Community features and sharing
- Multi-language support

## Performance

- **First Load:** ~2-3 seconds
- **Image Upload:** Instant preview
- **AI Analysis:** ~3-5 seconds (depends on Grok API)
- **Results Display:** Instant
- **PDF Generation:** ~2-3 seconds

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
- Verify image is JPG, PNG, or WebP
- Try a different image

**Build errors:**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check TypeScript errors: `npm run build`

**Dark mode not working:**
- Clear localStorage: Open DevTools → Application → Storage → Clear All
- Refresh the page

## Security

- API keys are kept server-side only
- Images are sent only to Grok API
- No data is stored or logged
- HTTPS recommended for production
- Input validation on all endpoints

## Contributing

Contributions are welcome! Areas for enhancement:
- Additional ML models
- User authentication
- Database integration
- Advanced analytics
- Mobile app
- API documentation
- More detailed recommendations

## Roadmap

- [ ] User accounts and saved analyses
- [ ] Advanced analytics dashboard
- [ ] Real-time weather integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Video analysis support
- [ ] Community recommendations
- [ ] AI training on local data

## License

MIT - Feel free to use for personal or commercial projects

## Credits

**Developer:** Sammy  
**AI Provider:** Grok Vision API (X.AI)  
**Built with:** Next.js, React, Tailwind CSS, TypeScript

## Support

For issues, questions, or suggestions:
- Check documentation above
- Review [Next.js Docs](https://nextjs.org/docs)
- Review [Tailwind Docs](https://tailwindcss.com/docs)
- Check [Grok API Docs](https://console.x.ai/)

---

**Transform Your Agriculture with AI** 🌱  
*SoilSense AI - Smart Farming for a Sustainable Future*
