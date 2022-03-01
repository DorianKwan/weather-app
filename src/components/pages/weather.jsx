import React from "react";

export class Weather extends React.Component {
  state = {
    cityName: undefined,
    inputVal: undefined,
    weather: undefined,
  };

  getCurrentWeatherForCity = (cityName, apiKey) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((result) => this.setState({ weather: result }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cityName !== prevState.cityName) {
      this.getCurrentWeatherForCity(this.state.cityName, this.props.apiKey);
    }
  }

  render() {
    return (
      <>
        <h2>Weather</h2>
        <input
          placeholder="City name"
          onChange={(e) => this.setState({ inputVal: e.currentTarget.value })}
        />
        <button
          onClick={() => this.setState({ cityName: this.state.inputVal })}
        >
          Check Weather
        </button>
        <p>
          The current weather is:{" "}
          {this.state.weather && this.state.weather.main.temp}
        </p>
      </>
    );
  }
}
