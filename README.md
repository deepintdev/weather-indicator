# Weather indicator for Deep Intelligence

## Requeriments

You need a data source with at least 3 features: `timestamp`, `variable` and `value`.

You need an account in [Deep Intelligence](https://app.deepint.net/)

## Usage

Set up a custom visualization with:

**URL:** `https://deepintdev.github.io/weather-indicator/`

| Key | Value | Example |
| --- | --- | --- |
| data:timestamp | The position of the feature to use as timestamp for the measure. Can be a date type (preferred), but it also can be a numeric UTC timestamp. | 0 |
| data:variable | The position of the feature to use as variable name of the measure. | 1 |
| data:value | The position of the feature to use as the value of the measure. | 1 |

## Customization

Here is a list of parametters you can set to customize the visualization.

| Key | Value | Example |
| --- | --- | --- |
| layout | Can be `horizontal` or `vertical`. Is set to horizontal by default. | vertical |
| variables:display | List of variables to Display. Also sets the order. Full List: `weather_state`, `temperature`, `rainfall`, `humidity`, `wind_speed`, `visibility`, `wind_gust`, `pressure`, `dew_point` | rainfall, humidity, wind_speed |
| temperature:var | Name of the temperature variable in the data. By default: `temp` | temp |
| temperature:mag | Can be `C` (celsius) or `F` (fahrenheit) depending on the magnitude of the temperature in the data. | C |
| humidity:var | Name of the humidity variable in the data. By default: `humidity` | humidity |
| humidity:mag | Magnitude to append to the value for `humidity` | % |
| humidity:cf | Conversion factor for `humidity` from the data to the display. | 1 |
| wind_speed:var | Name of the wind_speed variable in the data. By default: `wind_speed` | wind_speed |
| wind_speed:mag | Magnitude to append to the value for `wind_speed` | m/s |
| wind_speed:cf | Conversion factor for `wind_speed` from the data to the display. | 1 |
| wind_gust:var | Name of the wind_gust variable in the data. By default: `wind_gust` | wind_gust |
| wind_gust:mag | Magnitude to append to the value for `wind_gust` | m/s |
| wind_gust:cf | Conversion factor for `wind_gust` from the data to the display. | 1 |
| pressure:var | Name of the pressure variable in the data. By default: `pressure` | pressure |
| pressure:mag | Magnitude to append to the value for `pressure` | hPa |
| pressure:cf | Conversion factor for `pressure` from the data to the display. | 1 |
| visibility:var | Name of the visibility variable in the data. By default: `visibility` | visibility |
| visibility:mag | Magnitude to append to the value for `visibility` | m |
| visibility:cf | Conversion factor for `visibility` from the data to the display. | 1 |
| dew_point:var | Name of the dew_point variable in the data. By default: `dew_point` | dew_point |
| dew_point:mag | Magnitude to append to the value for `dew_point` | °C |
| dew_point:cf | Conversion factor for `dew_point` from the data to the display. | 1 |

