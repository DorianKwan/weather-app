# Getting Started

Hosted (here)[https://doriankwan-weather-app.herokuapp.com/]

First ensure you're on node version **v16.14.0**. `.nvmrc` will enforce this version.  
Recommended node version managers: **[n](https://github.com/tj/n)** or **[nvm](https://github.com/nvm-sh/nvm)**

Next get an Open Weather Map API key **[here](https://openweathermap.org/api)**

Copy the `.env.example` to a new `.env` file and add your api key there

```bash
 > cp .env.example .env
```

Install dependencies

```bash
 > yarn
```

Finally boot up the React dev server and happy coding! 🎉

```bash
 > yarn start
```

### Scripts

Run Test + Coverage

```bash
 > yarn test:coverage
```
