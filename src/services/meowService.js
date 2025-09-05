import axios from 'axios';

const MEOW_URL = 'https://meowfacts.herokuapp.com';
const TRANSLATE_URL = 'https://libretranslate.de/translate';

export const getMeowFactES = async () => {
  // 1. Obtener el dato en inglés
  const { data } = await axios.get(MEOW_URL);
  const englishFact = data.data[0];

  try {
    // 2. Traducir al español
    const { data: translated } = await axios.post(
      TRANSLATE_URL,
      {
        q: englishFact,
        source: 'en',
        target: 'es',
        format: 'text', // 👈 esto es importante
      },
      {
        headers: { 'Content-Type': 'application/json' }, // 👈 también esto
      }
    );

    // 3. Devolver traducción o texto original
    return translated.translatedText?.trim() || englishFact;
  } catch (err) {
    console.error('Error traduciendo', err);
    return englishFact;
  }
};
