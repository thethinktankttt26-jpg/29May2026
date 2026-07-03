export async function fetchHtml(url: string) {

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 AIPSA Discovery Bot",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to fetch ${url}`
    );
  }

  return await response.text();

}