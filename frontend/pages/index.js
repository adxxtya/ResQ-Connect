import { useEffect, useState } from 'react';
import MapboxMap from '@/components/mapbox-map';
import Cookies from 'js-cookie';

const Mensen = () => {
  const [location, setLocation] = useState();


  useEffect(() => {
    const storedLocation = Cookies.get('userLocation');
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setLocation(parsedLocation);
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        const userLocation = { latitude, longitude };
        setLocation(userLocation);
        Cookies.set('userLocation', JSON.stringify(userLocation));
      });
    }
  }, []);



  return (
    <div>
      <MapboxMap location={location} />
    </div>
  );
};

export default Mensen;
