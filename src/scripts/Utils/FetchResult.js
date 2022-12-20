const API_URL = 'http://localhost:5000/';

const FetchResult = async (url) => {
    const response = await fetch(API_URL + url);
    const data = await response.json();
    return data;
}

export {FetchResult};

