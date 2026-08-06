# CloudCast

CloudCast is a responsive weather dashboard built with React. Search for a city, use your current location, or select a random city to view live weather conditions, air quality, an interactive map, a forecast, hourly trends, and nearby-city weather.

## Features

- City search with OpenWeather geocoding results
- Current local weather, including temperature, feels-like temperature, wind, humidity, pressure, visibility, sunrise, and sunset
- Metric/imperial temperature toggle
- PM2.5-based US AQI calculation and category display
- Upcoming forecast periods with temperature and humidity trend chart
- Expandable five-day forecast summaries
- Nearby-city weather cards
- Random-city picker backed by the bundled world-city dataset
- Interactive Leaflet map that recenters on the selected location
- Light and dark themes, plus responsive desktop and mobile layouts

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, React Router, Tailwind CSS 4 |
| Build tooling | Vite 6, ESLint 9 |
| Maps | Leaflet and React Leaflet |
| Charts | Recharts |
| Data parsing | Papa Parse |
| Location/country helpers | Browser Geolocation API and `i18n-iso-countries` |
| Weather data | OpenWeather APIs; GeoNames data via the project’s nearby-cities service |

## Prerequisites

- Node.js 18 or later (Node.js 20 LTS recommended)
- npm
- An [OpenWeather API key](https://openweathermap.org/api)
- A GeoNames username for nearby-city results (optional, but recommended)

## Installation and local development

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd WeatherApp
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root.

   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_GEONAME_USERNAME=your_geonames_username
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

   Vite serves the app on `http://localhost:5173` and is configured to listen on all network interfaces.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot reload. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally after `npm run build`. |
| `npm run lint` | Runs ESLint across the project. |

## Configuration

Vite only exposes client-side environment variables prefixed with `VITE_`. Keep your local environment file out of version control and never commit real credentials.

| Variable | Required | Used for |
| --- | --- | --- |
| `VITE_OPENWEATHER_API_KEY` | Yes | Current weather, city search, reverse geocoding, air pollution, and forecast requests. |
| `VITE_GEONAME_USERNAME` | Recommended | Passed to the nearby-cities service, which retrieves GeoNames results. |
| `JAWG_ACCESS_TOKEN` | No, currently unused | Reserved by `WeatherMap` for a Jawg map token. The active dark tile URL currently contains its token directly in source. |

### Location behavior

On load, the app requests browser location permission. If permission is unavailable, denied, or the position cannot be resolved, it loads weather for the fallback coordinates `26.8381, 80.9346001` (Lucknow, India). Browser location is never sent anywhere except the location and weather services needed to render the dashboard.

## Using the dashboard

1. Enter a city in the format `City, Country`, for example `Paris, France`, then select a result.
2. Use the dice button beside the search field for a random city from `public/worldcities.csv`.
3. Switch between °C and °F with the temperature control.
4. Select a nearby-city card to make that city the active dashboard location.
5. Select a row in the five-day overview to expand it; use the arrows to move between expanded days.
6. Use the theme icon in the header to switch between light and dark appearance.

## Data sources

CloudCast makes browser-side requests to the following services:

| Service | Purpose |
| --- | --- |
| [OpenWeather Current Weather](https://openweathermap.org/current) | Current conditions and coordinates. |
| [OpenWeather Geocoding API](https://openweathermap.org/api/geocoding-api) | City search and reverse geocoding of the browser location. |
| [OpenWeather Air Pollution API](https://openweathermap.org/api/air-pollution) | PM2.5 and PM10 readings used in the AQI card. |
| [OpenWeather 5 day / 3 hour forecast](https://openweathermap.org/forecast5) | Hourly display and the aggregated five-day overview. |
| `weather-project-server.vercel.app` | Project-specific nearby-city proxy that uses the supplied GeoNames username. |
| [OpenStreetMap](https://www.openstreetmap.org/) / Jawg | Base map tiles. |
| [country-flag-icons](https://github.com/lipis/flag-icons) CDN | Country flags displayed on nearby-city cards. |

Because API calls run in the browser, API availability, rate limits, CORS rules, and network connection can affect the dashboard. The loading placeholders remain visible while data is being requested.

## Project structure

```text
WeatherApp/
├── public/
│   ├── weatherIcons/              # Local weather and UI image assets
│   └── worldcities.csv            # Random-city source dataset
├── src/
│   ├── components/
│   │   ├── Body-Components/       # Search, weather details, forecasts, nearby cities
│   │   ├── Body.jsx               # Dashboard composition and units context
│   │   ├── Header.jsx             # Navigation and theme switch
│   │   ├── Footer.jsx             # Author/contact links
│   │   └── WeatherMap.jsx         # Leaflet map
│   ├── utils/
│   │   ├── constant.jsx           # Image and icon path constants
│   │   ├── functions.jsx          # API calls, formatters, AQI/forecast helpers
│   │   └── loadCoordinates.js     # CSV loading and random-city selection
│   ├── App.jsx                    # Router and app-wide theme context
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind import and theme variables
├── vite.config.js                 # Vite, React, Tailwind, and server settings
└── package.json                   # Scripts and dependencies
```

## Architecture notes

- `App.jsx` owns the light/dark mode and provides it through `ThemeContext`.
- `Body.jsx` owns the active weather payload and selected unit system, then shares the units via `ThemeCelcius`.
- `DateAndSearch` resolves the initial location, performs searches, and sends the selected weather response up to `Body`.
- Weather panels independently request their supplemental data when the active location changes:
  - `WeatherInfo` requests air pollution data.
  - `UpComingHours` requests the 5-day/3-hour forecast for the chart and upcoming periods.
  - `FiveDayOverview` aggregates the same forecast response into daily summaries.
  - `NearbyCities` obtains nearby places, then fetches weather for each one.

## Routes

| Path | View |
| --- | --- |
| `/` | Main weather dashboard. |
| `/about` | Currently renders the same dashboard as `/`. |
| `/weatherMap` | Map-only route. |
| Any unmatched route | Custom 404 page. |

## Deployment

Build the app with:

```bash
npm run build
```

Deploy the resulting `dist/` directory to any static hosting provider that supports a single-page application. Configure the environment variables in the host’s build settings; they must be available during the Vite build. Configure a rewrite to `index.html` for client-side routes such as `/weatherMap`.

## Troubleshooting

| Symptom | Likely cause and resolution |
| --- | --- |
| Weather does not load | Confirm `VITE_OPENWEATHER_API_KEY` is present in `.env.local`, restart Vite, and check that the key is active. |
| Nearby cities never load | Add a valid `VITE_GEONAME_USERNAME` and confirm the nearby-cities proxy is reachable. |
| Your location is not used | Allow location access in the browser, then refresh. The Lucknow fallback is expected when access is unavailable. |
| Map tiles are blank | Check network access to OpenStreetMap/Jawg and browser content-blocking settings. |
| Search has no matches | Use `City, Country` format and verify spelling. |
| A route returns a host 404 after deployment | Add an SPA fallback/rewrite to `index.html`. |

## Known implementation details

- The forecast endpoint returns data in three-hour increments, despite the component name `UpComingHours`.
- The app’s metric wind label displays `km/h`, while OpenWeather’s metric weather response provides wind speed in m/s. This is a presentation issue to address if exact wind-unit labeling matters.
- The UV index and high/low temperature values in the detailed weather card are currently static display values, not live API fields.
- The header’s “About” link currently points to the dashboard; `/about` likewise renders the dashboard.

## Contributing

1. Create a branch for your change.
2. Run `npm run lint` before submitting it.
3. Run `npm run build` to verify the production bundle.
4. Keep credentials and generated build output out of commits.

## License

No license file is currently included. Add a license before redistributing or accepting external contributions.
