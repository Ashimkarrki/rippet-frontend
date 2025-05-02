async function fetching(endpoint) {
  console.log(`https://rappit-backend-7wcs.vercel.app/api/v1/${endpoint}`);

  return await fetch(
    `https://rappit-backend-7wcs.vercel.app/api/v1/${endpoint}`
  );
}
export default fetching;
