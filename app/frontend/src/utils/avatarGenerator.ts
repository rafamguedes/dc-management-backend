// Function to generate a random image
export async function avatarGenerate(): Promise<string> {
  //
  const response = await fetch('https://rickandmortyapi.com/api/character');

  // get url of random image
  const data = await response.json();
  const randomImage = data.results[Math.floor(Math.random() * data.results.length)];

  return randomImage.image;
}