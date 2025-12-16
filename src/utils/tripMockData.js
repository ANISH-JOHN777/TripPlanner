// Comprehensive mock data for 10 popular Indian destinations
export const mockTripData = {
    'Mumbai, Maharashtra': {
        destination: 'Mumbai, Maharashtra',
        distance: 0, // Starting point
        duration: '3-4 Days',
        totalKm: 450,
        highlights: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Bollywood Tour'],
        bestTime: 'November to February',
        dayPlans: [
            {
                day: 1,
                title: 'South Mumbai Heritage',
                activities: [
                    { time: '09:00', place: 'Gateway of India', duration: '1 hour', description: 'Iconic monument overlooking the Arabian Sea' },
                    { time: '10:30', place: 'Taj Mahal Palace Hotel', duration: '30 mins', description: 'Admire the historic luxury hotel' },
                    { time: '11:30', place: 'Colaba Causeway', duration: '2 hours', description: 'Shopping and street food' },
                    { time: '14:00', place: 'Lunch at Leopold Cafe', duration: '1 hour', description: 'Famous historic cafe' },
                    { time: '16:00', place: 'Chhatrapati Shivaji Terminus', duration: '1 hour', description: 'UNESCO World Heritage railway station' },
                    { time: '18:00', place: 'Marine Drive', duration: '2 hours', description: 'Sunset walk along the Queens Necklace' }
                ]
            },
            {
                day: 2,
                title: 'Island Adventures',
                activities: [
                    { time: '08:00', place: 'Elephanta Caves', duration: '4 hours', description: 'Ancient rock-cut temples (Ferry + Tour)' },
                    { time: '13:00', place: 'Lunch at Bandra', duration: '1 hour', description: 'Trendy cafes and restaurants' },
                    { time: '15:00', place: 'Bandra Fort', duration: '1 hour', description: 'Historic fort with sea views' },
                    { time: '17:00', place: 'Bandstand Promenade', duration: '1.5 hours', description: 'Celebrity homes and sunset views' },
                    { time: '19:00', place: 'Dinner at Linking Road', duration: '2 hours', description: 'Street shopping and food' }
                ]
            },
            {
                day: 3,
                title: 'Culture & Entertainment',
                activities: [
                    { time: '10:00', place: 'Siddhivinayak Temple', duration: '1 hour', description: 'Famous Hindu temple' },
                    { time: '11:30', place: 'Haji Ali Dargah', duration: '1.5 hours', description: 'Mosque on an islet' },
                    { time: '14:00', place: 'Lunch at Mohammad Ali Road', duration: '1 hour', description: 'Authentic street food' },
                    { time: '16:00', place: 'Film City Tour', duration: '3 hours', description: 'Bollywood studio experience' },
                    { time: '20:00', place: 'Juhu Beach', duration: '2 hours', description: 'Beach walk and street food' }
                ]
            }
        ],
        hotels: [
            { name: 'Taj Mahal Palace', type: 'Luxury', price: '₹25,000/night', rating: 4.8, location: 'Colaba' },
            { name: 'The Oberoi Mumbai', type: 'Luxury', price: '₹20,000/night', rating: 4.7, location: 'Nariman Point' },
            { name: 'Hotel Marine Plaza', type: 'Mid-range', price: '₹8,000/night', rating: 4.2, location: 'Marine Drive' },
            { name: 'FabHotel Prime', type: 'Budget', price: '₹2,500/night', rating: 4.0, location: 'Andheri' }
        ],
        transport: [
            { mode: 'Local Train', cost: '₹10-50/trip', description: 'Cheapest and fastest for long distances' },
            { mode: 'Metro', cost: '₹10-60/trip', description: 'Clean and efficient' },
            { mode: 'Taxi/Uber', cost: '₹200-800/trip', description: 'Comfortable door-to-door' },
            { mode: 'Auto Rickshaw', cost: '₹50-300/trip', description: 'Good for short distances' }
        ],
        estimatedBudget: {
            solo: { min: 15000, max: 40000 },
            couple: { min: 30000, max: 80000 },
            group: { min: 50000, max: 150000 }
        }
    },

    'Goa, Goa': {
        destination: 'Goa, Goa',
        distance: 580,
        duration: '4-5 Days',
        totalKm: 650,
        highlights: ['Beach Paradise', 'Portuguese Heritage', 'Water Sports', 'Nightlife'],
        bestTime: 'November to February',
        dayPlans: [
            {
                day: 1,
                title: 'North Goa Beaches',
                activities: [
                    { time: '09:00', place: 'Calangute Beach', duration: '2 hours', description: 'Queen of Beaches - swimming and sunbathing' },
                    { time: '11:30', place: 'Baga Beach', duration: '2 hours', description: 'Water sports and beach shacks' },
                    { time: '14:00', place: 'Lunch at Beach Shack', duration: '1.5 hours', description: 'Fresh seafood by the sea' },
                    { time: '16:00', place: 'Anjuna Beach', duration: '2 hours', description: 'Flea market and sunset' },
                    { time: '19:00', place: 'Dinner at Vagator', duration: '2 hours', description: 'Cliff-top restaurants' }
                ]
            },
            {
                day: 2,
                title: 'South Goa Serenity',
                activities: [
                    { time: '08:00', place: 'Palolem Beach', duration: '3 hours', description: 'Crescent-shaped paradise beach' },
                    { time: '12:00', place: 'Agonda Beach', duration: '2 hours', description: 'Quiet and pristine' },
                    { time: '14:30', place: 'Lunch at Beach Restaurant', duration: '1 hour', description: 'Goan cuisine' },
                    { time: '16:00', place: 'Cabo de Rama Fort', duration: '2 hours', description: 'Historic fort with ocean views' },
                    { time: '18:30', place: 'Sunset at Cola Beach', duration: '1.5 hours', description: 'Hidden gem beach' }
                ]
            },
            {
                day: 3,
                title: 'Heritage & Culture',
                activities: [
                    { time: '09:00', place: 'Basilica of Bom Jesus', duration: '1.5 hours', description: 'UNESCO World Heritage church' },
                    { time: '11:00', place: 'Se Cathedral', duration: '1 hour', description: 'Largest church in Asia' },
                    { time: '12:30', place: 'Old Goa Museum', duration: '1 hour', description: 'Portuguese history' },
                    { time: '14:00', place: 'Lunch at Panjim', duration: '1.5 hours', description: 'Latin Quarter dining' },
                    { time: '16:00', place: 'Fontainhas Walk', duration: '2 hours', description: 'Colorful Portuguese quarter' },
                    { time: '19:00', place: 'River Cruise', duration: '2 hours', description: 'Mandovi River with dinner' }
                ]
            },
            {
                day: 4,
                title: 'Adventure & Wildlife',
                activities: [
                    { time: '08:00', place: 'Dudhsagar Waterfalls', duration: '5 hours', description: 'Jeep safari to majestic falls' },
                    { time: '14:00', place: 'Lunch at Spice Plantation', duration: '2 hours', description: 'Traditional Goan meal' },
                    { time: '17:00', place: 'Butterfly Beach', duration: '2 hours', description: 'Boat ride to secluded beach' },
                    { time: '20:00', place: 'Night Market', duration: '2 hours', description: 'Shopping and street food' }
                ]
            }
        ],
        hotels: [
            { name: 'Taj Exotica', type: 'Luxury', price: '₹18,000/night', rating: 4.7, location: 'Benaulim' },
            { name: 'Park Hyatt Goa', type: 'Luxury', price: '₹15,000/night', rating: 4.6, location: 'Cansaulim' },
            { name: 'Lemon Tree Amarante', type: 'Mid-range', price: '₹5,500/night', rating: 4.3, location: 'Candolim' },
            { name: 'Zostel Goa', type: 'Budget', price: '₹800/night', rating: 4.1, location: 'Anjuna' }
        ],
        transport: [
            { mode: 'Scooter Rental', cost: '₹300-500/day', description: 'Best way to explore Goa' },
            { mode: 'Taxi', cost: '₹500-1500/trip', description: 'Convenient for long distances' },
            { mode: 'Bus', cost: '₹10-50/trip', description: 'Economical local transport' },
            { mode: 'Bike Rental', cost: '₹400-800/day', description: 'For adventure seekers' }
        ],
        estimatedBudget: {
            solo: { min: 12000, max: 35000 },
            couple: { min: 25000, max: 70000 },
            group: { min: 45000, max: 120000 }
        }
    },

    'Jaipur, Rajasthan': {
        destination: 'Jaipur, Rajasthan',
        distance: 1150,
        duration: '3-4 Days',
        totalKm: 580,
        highlights: ['Pink City', 'Royal Palaces', 'Forts', 'Rajasthani Culture'],
        bestTime: 'October to March',
        dayPlans: [
            {
                day: 1,
                title: 'Royal Heritage',
                activities: [
                    { time: '08:00', place: 'Amber Fort', duration: '3 hours', description: 'Majestic hilltop fort with elephant ride' },
                    { time: '11:30', place: 'Jaigarh Fort', duration: '1.5 hours', description: 'Fort with worlds largest cannon' },
                    { time: '13:30', place: 'Lunch at 1135 AD', duration: '1.5 hours', description: 'Royal dining in Amber Fort' },
                    { time: '15:30', place: 'Jal Mahal', duration: '1 hour', description: 'Water Palace photo stop' },
                    { time: '17:00', place: 'Nahargarh Fort', duration: '2 hours', description: 'Sunset views over Pink City' }
                ]
            },
            {
                day: 2,
                title: 'Pink City Exploration',
                activities: [
                    { time: '09:00', place: 'City Palace', duration: '2 hours', description: 'Royal residence and museum' },
                    { time: '11:30', place: 'Jantar Mantar', duration: '1.5 hours', description: 'UNESCO astronomical observatory' },
                    { time: '13:30', place: 'Lunch at LMB', duration: '1 hour', description: 'Traditional Rajasthani thali' },
                    { time: '15:00', place: 'Hawa Mahal', duration: '1.5 hours', description: 'Palace of Winds' },
                    { time: '17:00', place: 'Johari Bazaar', duration: '2 hours', description: 'Jewelry and textile shopping' },
                    { time: '19:30', place: 'Chokhi Dhani', duration: '3 hours', description: 'Rajasthani village cultural experience' }
                ]
            },
            {
                day: 3,
                title: 'Art & Culture',
                activities: [
                    { time: '09:00', place: 'Albert Hall Museum', duration: '2 hours', description: 'Rajasthan art and artifacts' },
                    { time: '11:30', place: 'Birla Mandir', duration: '1 hour', description: 'White marble temple' },
                    { time: '13:00', place: 'Lunch at Peacock Rooftop', duration: '1.5 hours', description: 'City views and cuisine' },
                    { time: '15:00', place: 'Block Printing Workshop', duration: '2 hours', description: 'Traditional craft experience' },
                    { time: '17:30', place: 'Bapu Bazaar', duration: '2 hours', description: 'Handicrafts and souvenirs' },
                    { time: '20:00', place: 'Raj Mandir Cinema', duration: '3 hours', description: 'Bollywood movie experience' }
                ]
            }
        ],
        hotels: [
            { name: 'Rambagh Palace', type: 'Luxury', price: '₹35,000/night', rating: 4.9, location: 'Bhawani Singh Road' },
            { name: 'Taj Jai Mahal Palace', type: 'Luxury', price: '₹22,000/night', rating: 4.7, location: 'Jacob Road' },
            { name: 'Alsisar Haveli', type: 'Mid-range', price: '₹6,000/night', rating: 4.4, location: 'Sansar Chandra Road' },
            { name: 'Zostel Jaipur', type: 'Budget', price: '₹600/night', rating: 4.2, location: 'MI Road' }
        ],
        transport: [
            { mode: 'Auto Rickshaw', cost: '₹50-200/trip', description: 'Most common local transport' },
            { mode: 'Taxi/Ola', cost: '₹300-800/trip', description: 'Comfortable sightseeing' },
            { mode: 'Metro', cost: '₹5-25/trip', description: 'Fast for main routes' },
            { mode: 'Cycle Rickshaw', cost: '₹30-100/trip', description: 'Old city exploration' }
        ],
        estimatedBudget: {
            solo: { min: 10000, max: 30000 },
            couple: { min: 20000, max: 60000 },
            group: { min: 35000, max: 100000 }
        }
    },

    'Manali, Himachal Pradesh': {
        destination: 'Manali, Himachal Pradesh',
        distance: 540,
        duration: '4-5 Days',
        totalKm: 720,
        highlights: ['Snow Mountains', 'Adventure Sports', 'Temples', 'Scenic Beauty'],
        bestTime: 'March to June, October to February',
        dayPlans: [
            {
                day: 1,
                title: 'Arrival & Local Sightseeing',
                activities: [
                    { time: '10:00', place: 'Hadimba Temple', duration: '1.5 hours', description: 'Ancient cave temple in cedar forest' },
                    { time: '12:00', place: 'Manu Temple', duration: '1 hour', description: 'Temple dedicated to sage Manu' },
                    { time: '13:30', place: 'Lunch at Old Manali', duration: '1.5 hours', description: 'Cafes with mountain views' },
                    { time: '15:30', place: 'Vashisht Hot Springs', duration: '2 hours', description: 'Natural hot water baths' },
                    { time: '18:00', place: 'Mall Road', duration: '2 hours', description: 'Shopping and evening walk' }
                ]
            },
            {
                day: 2,
                title: 'Solang Valley Adventure',
                activities: [
                    { time: '08:00', place: 'Solang Valley', duration: '6 hours', description: 'Paragliding, zorbing, skiing (seasonal)' },
                    { time: '14:30', place: 'Lunch at Solang', duration: '1 hour', description: 'Valley view restaurants' },
                    { time: '16:00', place: 'Atal Tunnel', duration: '2 hours', description: 'Worlds longest highway tunnel' },
                    { time: '19:00', place: 'Dinner at Manali', duration: '1.5 hours', description: 'Himachali cuisine' }
                ]
            },
            {
                day: 3,
                title: 'Rohtang Pass Excursion',
                activities: [
                    { time: '06:00', place: 'Rohtang Pass', duration: '8 hours', description: 'Snow activities and breathtaking views (Permit required)' },
                    { time: '14:30', place: 'Lunch on the way', duration: '1 hour', description: 'Mountain dhaba food' },
                    { time: '16:00', place: 'Rahala Falls', duration: '1 hour', description: 'Scenic waterfall stop' },
                    { time: '18:00', place: 'Return to Manali', duration: '2 hours', description: 'Rest and relaxation' }
                ]
            },
            {
                day: 4,
                title: 'Kasol & Manikaran',
                activities: [
                    { time: '08:00', place: 'Drive to Kasol', duration: '2 hours', description: 'Scenic Parvati Valley drive' },
                    { time: '10:30', place: 'Kasol Village', duration: '2 hours', description: 'Israeli cafes and riverside walk' },
                    { time: '13:00', place: 'Lunch at Kasol', duration: '1 hour', description: 'International cuisine' },
                    { time: '14:30', place: 'Manikaran Sahib', duration: '2 hours', description: 'Hot springs and gurudwara' },
                    { time: '17:00', place: 'Return to Manali', duration: '2 hours', description: 'Evening at leisure' }
                ]
            }
        ],
        hotels: [
            { name: 'The Himalayan', type: 'Luxury', price: '₹12,000/night', rating: 4.6, location: 'Hadimba Road' },
            { name: 'Manu Allaya Resort', type: 'Luxury', price: '₹10,000/night', rating: 4.5, location: 'Sunny Side' },
            { name: 'Apple Country Resort', type: 'Mid-range', price: '₹4,500/night', rating: 4.3, location: 'Log Huts Area' },
            { name: 'Zostel Manali', type: 'Budget', price: '₹700/night', rating: 4.1, location: 'Old Manali' }
        ],
        transport: [
            { mode: 'Taxi (Full Day)', cost: '₹2,500-4,000/day', description: 'Best for sightseeing' },
            { mode: 'Bike Rental', cost: '₹800-1,500/day', description: 'For adventure enthusiasts' },
            { mode: 'Local Bus', cost: '₹20-100/trip', description: 'Economical option' },
            { mode: 'Shared Taxi', cost: '₹100-300/trip', description: 'Good for nearby places' }
        ],
        estimatedBudget: {
            solo: { min: 15000, max: 40000 },
            couple: { min: 30000, max: 75000 },
            group: { min: 50000, max: 130000 }
        }
    },

    'Udaipur, Rajasthan': {
        destination: 'Udaipur, Rajasthan',
        distance: 730,
        duration: '3-4 Days',
        totalKm: 420,
        highlights: ['City of Lakes', 'Palaces', 'Romantic Setting', 'Rajput Architecture'],
        bestTime: 'September to March',
        dayPlans: [
            {
                day: 1,
                title: 'Lake City Wonders',
                activities: [
                    { time: '09:00', place: 'City Palace', duration: '3 hours', description: 'Magnificent palace complex with museum' },
                    { time: '12:30', place: 'Lunch at Ambrai', duration: '1.5 hours', description: 'Lakeside dining with palace views' },
                    { time: '14:30', place: 'Jagdish Temple', duration: '1 hour', description: 'Indo-Aryan architecture temple' },
                    { time: '16:00', place: 'Lake Pichola Boat Ride', duration: '2 hours', description: 'Sunset cruise to Jag Mandir' },
                    { time: '19:00', place: 'Bagore Ki Haveli', duration: '2 hours', description: 'Cultural show and museum' }
                ]
            },
            {
                day: 2,
                title: 'Royal Heritage',
                activities: [
                    { time: '08:00', place: 'Saheliyon Ki Bari', duration: '1.5 hours', description: 'Garden of Maidens with fountains' },
                    { time: '10:00', place: 'Fateh Sagar Lake', duration: '2 hours', description: 'Boating and Nehru Park visit' },
                    { time: '12:30', place: 'Lunch at Upre', duration: '1.5 hours', description: 'Rooftop restaurant' },
                    { time: '14:30', place: 'Monsoon Palace', duration: '2 hours', description: 'Hilltop palace with panoramic views' },
                    { time: '17:00', place: 'Vintage Car Museum', duration: '1.5 hours', description: 'Royal automobile collection' },
                    { time: '19:00', place: 'Gangaur Ghat', duration: '1 hour', description: 'Evening aarti ceremony' }
                ]
            },
            {
                day: 3,
                title: 'Art & Culture',
                activities: [
                    { time: '09:00', place: 'Shilpgram', duration: '2 hours', description: 'Rural arts and crafts complex' },
                    { time: '11:30', place: 'Bharatiya Lok Kala Museum', duration: '1.5 hours', description: 'Folk art museum' },
                    { time: '13:30', place: 'Lunch at Jheel Ginger', duration: '1.5 hours', description: 'Lake view dining' },
                    { time: '15:30', place: 'Old City Walking Tour', duration: '2.5 hours', description: 'Narrow lanes, havelis, markets' },
                    { time: '18:30', place: 'Dinner at Ambrai', duration: '2 hours', description: 'Romantic lakeside dinner' }
                ]
            }
        ],
        hotels: [
            { name: 'Taj Lake Palace', type: 'Luxury', price: '₹45,000/night', rating: 4.9, location: 'Lake Pichola' },
            { name: 'The Oberoi Udaivilas', type: 'Luxury', price: '₹40,000/night', rating: 4.9, location: 'Haridasji Ki Magri' },
            { name: 'Jagat Niwas Palace', type: 'Mid-range', price: '₹5,000/night', rating: 4.4, location: 'Lake Palace Road' },
            { name: 'Zostel Udaipur', type: 'Budget', price: '₹650/night', rating: 4.2, location: 'Lal Ghat' }
        ],
        transport: [
            { mode: 'Auto Rickshaw', cost: '₹50-150/trip', description: 'Best for short distances' },
            { mode: 'Taxi/Ola', cost: '₹200-600/trip', description: 'Comfortable touring' },
            { mode: 'Bike Rental', cost: '₹300-500/day', description: 'Explore at your pace' },
            { mode: 'Walking', cost: 'Free', description: 'Old city is walkable' }
        ],
        estimatedBudget: {
            solo: { min: 12000, max: 35000 },
            couple: { min: 25000, max: 70000 },
            group: { min: 40000, max: 110000 }
        }
    },

    'Varanasi, Uttar Pradesh': {
        destination: 'Varanasi, Uttar Pradesh',
        distance: 820,
        duration: '2-3 Days',
        totalKm: 380,
        highlights: ['Spiritual Capital', 'Ganges Ghats', 'Ancient Temples', 'Cultural Heritage'],
        bestTime: 'October to March',
        dayPlans: [
            {
                day: 1,
                title: 'Ghats & Spirituality',
                activities: [
                    { time: '05:30', place: 'Sunrise Boat Ride', duration: '2 hours', description: 'Witness morning rituals on Ganges' },
                    { time: '08:00', place: 'Breakfast at Blue Lassi', duration: '1 hour', description: 'Famous lassi shop' },
                    { time: '09:30', place: 'Kashi Vishwanath Temple', duration: '2 hours', description: 'Most sacred Shiva temple' },
                    { time: '12:00', place: 'Lunch at Banaras Haveli', duration: '1.5 hours', description: 'Traditional Banarasi food' },
                    { time: '14:00', place: 'Sarnath', duration: '3 hours', description: 'Buddhist pilgrimage site' },
                    { time: '18:00', place: 'Dashashwamedh Ghat Aarti', duration: '1.5 hours', description: 'Grand evening prayer ceremony' }
                ]
            },
            {
                day: 2,
                title: 'Heritage Walk',
                activities: [
                    { time: '07:00', place: 'Morning Walk in Galis', duration: '2 hours', description: 'Explore ancient narrow lanes' },
                    { time: '09:30', place: 'Banaras Hindu University', duration: '2 hours', description: 'Campus and Bharat Kala Bhavan museum' },
                    { time: '12:00', place: 'Lunch at Kashi Chat Bhandar', duration: '1 hour', description: 'Street food experience' },
                    { time: '13:30', place: 'Ramnagar Fort', duration: '2 hours', description: 'Museum and vintage car collection' },
                    { time: '16:00', place: 'Assi Ghat', duration: '2 hours', description: 'Yoga and evening aarti' },
                    { time: '19:00', place: 'Dinner at Open Hand Cafe', duration: '1.5 hours', description: 'Rooftop Ganga view' }
                ]
            },
            {
                day: 3,
                title: 'Art & Crafts',
                activities: [
                    { time: '09:00', place: 'Silk Weaving Workshop', duration: '2 hours', description: 'Banarasi silk making process' },
                    { time: '11:30', place: 'Tulsi Manas Temple', duration: '1 hour', description: 'Modern marble temple' },
                    { time: '13:00', place: 'Lunch at Pizzeria Vaatika', duration: '1.5 hours', description: 'Garden restaurant' },
                    { time: '15:00', place: 'Shopping at Vishwanath Gali', duration: '2 hours', description: 'Silk sarees and handicrafts' },
                    { time: '17:30', place: 'Manikarnika Ghat', duration: '1.5 hours', description: 'Main cremation ghat (respectful visit)' }
                ]
            }
        ],
        hotels: [
            { name: 'Taj Ganges', type: 'Luxury', price: '₹8,000/night', rating: 4.5, location: 'Nadesar Palace Grounds' },
            { name: 'Brijrama Palace', type: 'Luxury', price: '₹12,000/night', rating: 4.6, location: 'Darbhanga Ghat' },
            { name: 'Ganpati Guest House', type: 'Mid-range', price: '₹2,500/night', rating: 4.2, location: 'Assi Ghat' },
            { name: 'Stops Hostel', type: 'Budget', price: '₹500/night', rating: 4.0, location: 'Assi' }
        ],
        transport: [
            { mode: 'Auto Rickshaw', cost: '₹30-100/trip', description: 'Main transport mode' },
            { mode: 'Cycle Rickshaw', cost: '₹20-50/trip', description: 'For narrow lanes' },
            { mode: 'Taxi/Ola', cost: '₹150-400/trip', description: 'For longer distances' },
            { mode: 'Walking', cost: 'Free', description: 'Best for ghat exploration' }
        ],
        estimatedBudget: {
            solo: { min: 8000, max: 20000 },
            couple: { min: 15000, max: 40000 },
            group: { min: 25000, max: 70000 }
        }
    },

    'Agra, Uttar Pradesh': {
        destination: 'Agra, Uttar Pradesh',
        distance: 230,
        duration: '1-2 Days',
        totalKm: 180,
        highlights: ['Taj Mahal', 'Mughal Architecture', 'UNESCO Sites', 'Marble Crafts'],
        bestTime: 'October to March',
        dayPlans: [
            {
                day: 1,
                title: 'Mughal Marvels',
                activities: [
                    { time: '06:00', place: 'Taj Mahal Sunrise', duration: '3 hours', description: 'Witness the monument at its most beautiful' },
                    { time: '09:30', place: 'Breakfast at Hotel', duration: '1 hour', description: 'Return for breakfast' },
                    { time: '11:00', place: 'Agra Fort', duration: '2.5 hours', description: 'Red sandstone fort complex' },
                    { time: '14:00', place: 'Lunch at Pinch of Spice', duration: '1.5 hours', description: 'Mughlai cuisine' },
                    { time: '16:00', place: 'Mehtab Bagh', duration: '2 hours', description: 'Taj Mahal sunset view from across Yamuna' },
                    { time: '19:00', place: 'Sadar Bazaar', duration: '2 hours', description: 'Shopping for marble souvenirs' }
                ]
            },
            {
                day: 2,
                title: 'Hidden Gems',
                activities: [
                    { time: '08:00', place: 'Itmad-ud-Daulah (Baby Taj)', duration: '1.5 hours', description: 'Exquisite marble tomb' },
                    { time: '10:00', place: 'Marble Inlay Workshop', duration: '2 hours', description: 'See artisans at work' },
                    { time: '12:30', place: 'Lunch at Joney\'s Place', duration: '1 hour', description: 'Rooftop with Taj view' },
                    { time: '14:00', place: 'Fatehpur Sikri', duration: '4 hours', description: 'Abandoned Mughal city (40km away)' },
                    { time: '19:00', place: 'Mohabbat The Taj Show', duration: '1.5 hours', description: 'Cultural performance' }
                ]
            }
        ],
        hotels: [
            { name: 'The Oberoi Amarvilas', type: 'Luxury', price: '₹50,000/night', rating: 4.9, location: 'Taj East Gate Road' },
            { name: 'ITC Mughal', type: 'Luxury', price: '₹15,000/night', rating: 4.7, location: 'Taj Ganj' },
            { name: 'Hotel Atulyaa Taj', type: 'Mid-range', price: '₹4,000/night', rating: 4.3, location: 'Taj East Gate' },
            { name: 'Zostel Agra', type: 'Budget', price: '₹600/night', rating: 4.1, location: 'Taj Ganj' }
        ],
        transport: [
            { mode: 'Auto Rickshaw', cost: '₹50-150/trip', description: 'Local sightseeing' },
            { mode: 'Taxi (Full Day)', cost: '₹1,500-2,500/day', description: 'Including Fatehpur Sikri' },
            { mode: 'E-Rickshaw', cost: '₹30-80/trip', description: 'Eco-friendly option' },
            { mode: 'Cycle Rickshaw', cost: '₹20-50/trip', description: 'Around Taj Ganj area' }
        ],
        estimatedBudget: {
            solo: { min: 6000, max: 18000 },
            couple: { min: 12000, max: 35000 },
            group: { min: 20000, max: 60000 }
        }
    },

    'Shimla, Himachal Pradesh': {
        destination: 'Shimla, Himachal Pradesh',
        distance: 350,
        duration: '3-4 Days',
        totalKm: 520,
        highlights: ['Colonial Architecture', 'Mall Road', 'Toy Train', 'Hill Station Beauty'],
        bestTime: 'March to June, December to February',
        dayPlans: [
            {
                day: 1,
                title: 'Shimla Heritage',
                activities: [
                    { time: '09:00', place: 'The Ridge', duration: '1.5 hours', description: 'Open space with mountain views' },
                    { time: '10:30', place: 'Christ Church', duration: '1 hour', description: 'Second oldest church in North India' },
                    { time: '12:00', place: 'Mall Road Shopping', duration: '2 hours', description: 'Colonial-era shopping street' },
                    { time: '14:00', place: 'Lunch at Cafe Simla Times', duration: '1.5 hours', description: 'Heritage building restaurant' },
                    { time: '16:00', place: 'Jakhu Temple', duration: '2 hours', description: 'Hanuman temple at highest point' },
                    { time: '19:00', place: 'Scandal Point', duration: '1 hour', description: 'Evening gathering spot' }
                ]
            },
            {
                day: 2,
                title: 'Kufri Excursion',
                activities: [
                    { time: '08:00', place: 'Drive to Kufri', duration: '1 hour', description: '16km scenic drive' },
                    { time: '09:30', place: 'Kufri Adventure Park', duration: '3 hours', description: 'Skiing, tobogganing, horse riding' },
                    { time: '13:00', place: 'Lunch at Kufri', duration: '1 hour', description: 'Mountain view restaurants' },
                    { time: '14:30', place: 'Himalayan Nature Park', duration: '2 hours', description: 'Wildlife and flora' },
                    { time: '17:00', place: 'Return to Shimla', duration: '1 hour', description: 'Evening at leisure' },
                    { time: '19:00', place: 'Lakkar Bazaar', duration: '2 hours', description: 'Wooden crafts shopping' }
                ]
            },
            {
                day: 3,
                title: 'Toy Train & Nature',
                activities: [
                    { time: '08:00', place: 'Kalka-Shimla Toy Train', duration: '5 hours', description: 'UNESCO Heritage railway journey' },
                    { time: '13:30', place: 'Lunch at Ashiana Restaurant', duration: '1.5 hours', description: 'Valley view dining' },
                    { time: '15:30', place: 'Annandale', duration: '2 hours', description: 'Flat terrain for picnics and golf' },
                    { time: '18:00', place: 'Viceregal Lodge', duration: '1.5 hours', description: 'British-era architecture and museum' }
                ]
            }
        ],
        hotels: [
            { name: 'Wildflower Hall', type: 'Luxury', price: '₹25,000/night', rating: 4.8, location: 'Chharabra' },
            { name: 'The Oberoi Cecil', type: 'Luxury', price: '₹18,000/night', rating: 4.7, location: 'Chaura Maidan' },
            { name: 'Hotel Combermere', type: 'Mid-range', price: '₹5,000/night', rating: 4.3, location: 'The Mall' },
            { name: 'Zostel Shimla', type: 'Budget', price: '₹700/night', rating: 4.1, location: 'Lakkar Bazaar' }
        ],
        transport: [
            { mode: 'Taxi (Full Day)', cost: '₹2,000-3,500/day', description: 'Best for sightseeing' },
            { mode: 'Local Bus', cost: '₹10-50/trip', description: 'Economical option' },
            { mode: 'Toy Train', cost: '₹400-1,200/trip', description: 'Scenic experience' },
            { mode: 'Walking', cost: 'Free', description: 'Mall Road area' }
        ],
        estimatedBudget: {
            solo: { min: 12000, max: 32000 },
            couple: { min: 24000, max: 65000 },
            group: { min: 40000, max: 110000 }
        }
    },

    'Darjeeling, West Bengal': {
        destination: 'Darjeeling, West Bengal',
        distance: 650,
        duration: '3-4 Days',
        totalKm: 580,
        highlights: ['Tea Gardens', 'Toy Train', 'Kanchenjunga Views', 'Colonial Charm'],
        bestTime: 'March to May, October to December',
        dayPlans: [
            {
                day: 1,
                title: 'Sunrise & Heritage',
                activities: [
                    { time: '04:00', place: 'Tiger Hill Sunrise', duration: '3 hours', description: 'Kanchenjunga sunrise view' },
                    { time: '07:30', place: 'Breakfast at Keventers', duration: '1 hour', description: 'Historic breakfast spot' },
                    { time: '09:00', place: 'Batasia Loop', duration: '1 hour', description: 'Toy train spiral and war memorial' },
                    { time: '10:30', place: 'Ghoom Monastery', duration: '1 hour', description: 'Oldest Tibetan monastery' },
                    { time: '12:00', place: 'Lunch at Glenary\'s', duration: '1.5 hours', description: 'Colonial-era bakery' },
                    { time: '14:00', place: 'Himalayan Mountaineering Institute', duration: '2 hours', description: 'Museum and zoo' },
                    { time: '17:00', place: 'Mall Road', duration: '2 hours', description: 'Shopping and evening stroll' }
                ]
            },
            {
                day: 2,
                title: 'Tea & Nature',
                activities: [
                    { time: '08:00', place: 'Happy Valley Tea Estate', duration: '2.5 hours', description: 'Tea factory tour and tasting' },
                    { time: '11:00', place: 'Peace Pagoda', duration: '1.5 hours', description: 'Japanese Buddhist temple' },
                    { time: '13:00', place: 'Lunch at Sonam\'s Kitchen', duration: '1 hour', description: 'Popular cafe' },
                    { time: '14:30', place: 'Toy Train Joy Ride', duration: '2 hours', description: 'UNESCO Heritage railway' },
                    { time: '17:00', place: 'Observatory Hill', duration: '1.5 hours', description: 'Sunset and temples' },
                    { time: '19:00', place: 'Chowrasta', duration: '1.5 hours', description: 'Evening gathering square' }
                ]
            },
            {
                day: 3,
                title: 'Nearby Excursions',
                activities: [
                    { time: '07:00', place: 'Mirik Lake', duration: '4 hours', description: 'Boating and pine forests (50km)' },
                    { time: '11:30', place: 'Lunch at Mirik', duration: '1 hour', description: 'Lakeside dining' },
                    { time: '13:00', place: 'Pashupati Market', duration: '2 hours', description: 'Nepal border market' },
                    { time: '15:30', place: 'Return to Darjeeling', duration: '1.5 hours', description: 'Scenic drive back' },
                    { time: '17:30', place: 'St. Andrew\'s Church', duration: '1 hour', description: 'Colonial architecture' }
                ]
            }
        ],
        hotels: [
            { name: 'Windamere Hotel', type: 'Luxury', price: '₹15,000/night', rating: 4.6, location: 'Observatory Hill' },
            { name: 'Mayfair Darjeeling', type: 'Luxury', price: '₹12,000/night', rating: 4.5, location: 'The Mall' },
            { name: 'Hotel Seven Seventeen', type: 'Mid-range', price: '₹4,000/night', rating: 4.3, location: 'Nehru Road' },
            { name: 'Zostel Darjeeling', type: 'Budget', price: '₹650/night', rating: 4.0, location: 'Bhanu Sarani' }
        ],
        transport: [
            { mode: 'Shared Jeep', cost: '₹20-50/trip', description: 'Local transport' },
            { mode: 'Taxi (Full Day)', cost: '₹2,500-4,000/day', description: 'Sightseeing' },
            { mode: 'Toy Train', cost: '₹1,000-1,500/trip', description: 'Heritage experience' },
            { mode: 'Walking', cost: 'Free', description: 'Mall and Chowrasta area' }
        ],
        estimatedBudget: {
            solo: { min: 11000, max: 30000 },
            couple: { min: 22000, max: 60000 },
            group: { min: 38000, max: 100000 }
        }
    },

    'Kochi, Kerala': {
        destination: 'Kochi, Kerala',
        distance: 1380,
        duration: '3-4 Days',
        totalKm: 520,
        highlights: ['Backwaters', 'Colonial History', 'Seafood', 'Cultural Melting Pot'],
        bestTime: 'October to February',
        dayPlans: [
            {
                day: 1,
                title: 'Fort Kochi Heritage',
                activities: [
                    { time: '09:00', place: 'Chinese Fishing Nets', duration: '1.5 hours', description: 'Iconic fishing technique demonstration' },
                    { time: '10:30', place: 'St. Francis Church', duration: '1 hour', description: 'Oldest European church in India' },
                    { time: '12:00', place: 'Lunch at Kashi Art Cafe', duration: '1.5 hours', description: 'Art gallery and cafe' },
                    { time: '14:00', place: 'Mattancherry Palace', duration: '1.5 hours', description: 'Dutch Palace with murals' },
                    { time: '16:00', place: 'Jew Town & Synagogue', duration: '2 hours', description: 'Antique shopping and oldest synagogue' },
                    { time: '18:30', place: 'Kathakali Performance', duration: '2 hours', description: 'Traditional dance drama' }
                ]
            },
            {
                day: 2,
                title: 'Backwater Experience',
                activities: [
                    { time: '08:00', place: 'Alleppey Houseboat', duration: '8 hours', description: 'Full day backwater cruise with lunch' },
                    { time: '17:00', place: 'Return to Kochi', duration: '1.5 hours', description: 'Scenic drive back' },
                    { time: '19:00', place: 'Marine Drive', duration: '2 hours', description: 'Sunset walk and street food' }
                ]
            },
            {
                day: 3,
                title: 'Culture & Nature',
                activities: [
                    { time: '08:00', place: 'Athirapally Waterfalls', duration: '5 hours', description: 'Niagara of India (60km away)' },
                    { time: '13:30', place: 'Lunch at Rainforest Resort', duration: '1.5 hours', description: 'Nature view dining' },
                    { time: '15:30', place: 'Spice Plantation Tour', duration: '2 hours', description: 'Learn about Kerala spices' },
                    { time: '18:00', place: 'Fort Kochi Beach', duration: '1.5 hours', description: 'Sunset and seafood' },
                    { time: '20:00', place: 'Dinner Cruise', duration: '2 hours', description: 'Harbor cruise with dinner' }
                ]
            }
        ],
        hotels: [
            { name: 'Taj Malabar Resort', type: 'Luxury', price: '₹14,000/night', rating: 4.6, location: 'Willingdon Island' },
            { name: 'Brunton Boatyard', type: 'Luxury', price: '₹16,000/night', rating: 4.7, location: 'Fort Kochi' },
            { name: 'Old Harbour Hotel', type: 'Mid-range', price: '₹5,500/night', rating: 4.4, location: 'Fort Kochi' },
            { name: 'Zostel Kochi', type: 'Budget', price: '₹700/night', rating: 4.1, location: 'Fort Kochi' }
        ],
        transport: [
            { mode: 'Auto Rickshaw', cost: '₹50-200/trip', description: 'Local transport' },
            { mode: 'Taxi/Ola', cost: '₹300-800/trip', description: 'Comfortable travel' },
            { mode: 'Ferry', cost: '₹4-20/trip', description: 'Island hopping' },
            { mode: 'Metro', cost: '₹10-40/trip', description: 'Fast for main routes' }
        ],
        estimatedBudget: {
            solo: { min: 13000, max: 35000 },
            couple: { min: 26000, max: 70000 },
            group: { min: 45000, max: 120000 }
        }
    }
};

// Helper function to get mock data for a destination
export const getMockTripData = (destination) => {
    return mockTripData[destination] || null;
};

// Helper function to calculate trip duration in days
export const calculateTripDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day
    return diffDays;
};

// Helper function to get budget estimate based on travel type
export const getBudgetEstimate = (destination, travelType, days) => {
    const data = mockTripData[destination];
    if (!data || !data.estimatedBudget[travelType]) return null;

    const { min, max } = data.estimatedBudget[travelType];
    const perDayMin = Math.round(min / 3); // Assuming 3 days as base
    const perDayMax = Math.round(max / 3);

    return {
        min: perDayMin * days,
        max: perDayMax * days,
        perDay: { min: perDayMin, max: perDayMax }
    };
};

// Get list of all available destinations
export const getAvailableDestinations = () => {
    return Object.keys(mockTripData);
};
