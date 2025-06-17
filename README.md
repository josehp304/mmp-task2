# Simple web app to test pokeapi 
## React + TypeScript + Vite + Zustand


```
this is the file structure 

src/
├── components/
│   ├── Card/
│   │   ├── index.ts
│   │   ├── Card.tsx
│   │   └── Card.module.css
│   ├── SmallCard/
│   │   ├── index.ts
│   │   ├── SmallCard.tsx
│   │   └── SmallCard.module.css
│   ├── SelectPoki/
│   │   ├── index.ts
│   │   ├── SelectPoki.tsx
│   │   └── SelectPoki.module.css
│   └── TeamGallery/
│       ├── index.ts
│       ├── TeamGallery.tsx
│       └── TeamGallery.module.css
├── api/
│   └── pokemon.ts
├── utils/
│   └── pokemonUtils.ts
├── data/
│   └── fallbackPokemons.json
├── App.tsx
└── App.css


```
### Check the .env.example file to construct a .env file 

## Technologies Used

- React
- TypeScript
- CSS Modules
- Axios for API calls
- PokeAPI for Pokemon data

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add:
4. Start the development server:
```bash
npm run dev
```

## Component Overview

### SelectPoki
- Main component for Pokemon selection
- Displays available Pokemon in a grid
- Implements drag and drop functionality

### TeamGallery
- Displays the user's selected team
- Shows combined team stats
- Provides team management options

### Card
- Displays individual Pokemon information
- Shows Pokemon sprite and base stats
- Implements drag functionality

### SmallCard
- Compact version of the Card component
- Used in the team display section

## API Integration

The application uses the PokeAPI to fetch Pokemon data. API calls are centralized in the `api/pokemon.ts` file. A fallback data system is implemented to ensure functionality even when the API is unavailable.

## State Management

- Uses React's built-in state management with hooks
- Implements custom store for team management
- Persists team data in localStorage

## Styling

- Uses CSS Modules for component-specific styling
- Implements responsive design
- Maintains consistent styling across components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.