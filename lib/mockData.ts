// lib/mockData.ts

export const userProfile = {
    id: "user_01",
    full_name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 98765 43210",
    bio: "Love trekking and exploring the Himalayas. Working remotely and living the mountain life.",
    profile_photo: "https://www.w3schools.com/howto/img_avatar.png",
    settings: {
      dark_mode: true,
      email_notifications: false,
    },
  };
  
  export const trekDetails = {
    name: "Ali Bedni Bugyal Trek",
    dates: "25th May, 2025 to 30th May, 2025",
    rentalPeriod: "5 days",
    pickup: "Basecamp on 25th May, 2025",
    dropoff: "Basecamp on 30th May, 2025",
  };

  export const rentalHistory = [
    {
      order_id: "rental_1001",
      items: [
        { name: "Backpack (60L)", quantity: 1, price_per_unit: 500, image: '/images/backpack60L.jpg' },
        { name: "Water Bottle (1L)", quantity: 2, price_per_unit: 100, image: '/images/waterbottle.jpg' },
      ],
      rental_start_date: "2024-12-15",
      rental_end_date: "2024-12-20",
      total_price: 700,
      status: "Confirmed",
      
    },
    {
      order_id: "rental_1002",
      items: [
        { name: "Trekking Shoes", quantity: 1, price_per_unit: 1000, image: '/images/trekkingshoes.jpg' },
      ],
      rental_start_date: "2024-10-10",
      rental_end_date: "2024-10-15",
      total_price: 1000,
      status: "Completed",
    },
    {
      order_id: "rental_1003",
      items: [
        { name: "Water Bottle (1L)", quantity: 1, price_per_unit: 100, image: '/images/waterbottle.jpg' },
      ],
      rental_start_date: "2024-09-01",
      rental_end_date: "2024-09-05",
      total_price: 100,
      status: "Cancelled",
    },
  ];
  