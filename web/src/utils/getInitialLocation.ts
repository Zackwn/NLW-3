export default async function getInitialLocation(): Promise<[number, number]> {
   return new Promise((resolve, _) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
         const { latitude, longitude } = coords
         return resolve([latitude, longitude])
      }, (err) => {
         return resolve([-23.6821604, -46.8754862])
      });
   })
}
