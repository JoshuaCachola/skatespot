const fetch = require('node-fetch');

export const getGeocoding = async (street: string, city: string, state: string) => {
  street = street.split(' ').join('+');
  city = city.split(' ').join('+');
  state = state.split(' ').join('+')
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${street},${city},${state}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
  let res = await fetch(URL)
  res = await res.json();
  console.log(res)
};