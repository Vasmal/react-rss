const BASE_URL = 'https://api.github.com/';

const getData = async (value?: string | null) => {
  const query =
    value === null || value === undefined || value === '' ? 'stars>0' : value;
  try {
    const res = await fetch(
      `${BASE_URL}search/repositories?q=${query}&per_page=10&page=1`
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

export default getData;
