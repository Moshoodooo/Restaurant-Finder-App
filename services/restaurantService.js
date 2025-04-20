// Mock API call — Replace this with actual fetch from your backend
export const fetchRestaurants = async () => {
    // This would be replaced with a real API call like:
    // const response = await fetch('http://<your-backend-url>/api/restaurants');
    // return await response.json();
  
    return [
      {
        id: 1,
        name: 'Mama Put Delight',
        location: 'Lagos, Nigeria',
        image: 'https://via.placeholder.com/300x200.png?text=Mama+Put+Delight',
      },
      {
        id: 2,
        name: 'Chop Life Bistro',
        location: 'Abuja, Nigeria',
        image: 'https://via.placeholder.com/300x200.png?text=Chop+Life+Bistro',
      },
    ];
  };
  