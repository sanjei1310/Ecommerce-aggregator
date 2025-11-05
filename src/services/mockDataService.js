// Mock data service with 100+ sample products from multiple platforms
import { generateAdditionalProducts } from './productGenerator';

// Related search terms mapping for better search results
const searchRelatedTerms = {
  'shoes': ['sneakers', 'footwear', 'boots', 'sandals', 'slippers', 'loafers', 'running', 'sports', 'casual', 'formal'],
  'phone': ['mobile', 'smartphone', 'iphone', 'android', 'samsung', 'oneplus', 'xiaomi', 'realme', 'oppo', 'vivo'],
  'laptop': ['notebook', 'macbook', 'computer', 'pc', 'dell', 'hp', 'lenovo', 'asus', 'acer'],
  'watch': ['smartwatch', 'timepiece', 'wearable', 'fitness', 'tracker', 'band'],
  'headphone': ['earphone', 'earbuds', 'airpods', 'headset', 'audio', 'wireless', 'bluetooth'],
  'tv': ['television', 'smart tv', 'led', 'oled', 'display', 'monitor'],
  'shirt': ['tshirt', 't-shirt', 'top', 'polo', 'casual', 'formal', 'cotton'],
  'jeans': ['denim', 'pants', 'trousers', 'bottoms'],
  'bag': ['backpack', 'handbag', 'luggage', 'suitcase', 'purse', 'wallet'],
  'camera': ['dslr', 'mirrorless', 'photography', 'canon', 'nikon', 'sony'],
  'tablet': ['ipad', 'tab', 'surface'],
  'speaker': ['audio', 'sound', 'bluetooth', 'wireless', 'jbl', 'bose'],
  'game': ['gaming', 'playstation', 'xbox', 'nintendo', 'console', 'controller'],
  'book': ['novel', 'reading', 'kindle', 'ebook'],
  'furniture': ['sofa', 'chair', 'table', 'bed', 'desk', 'wardrobe', 'cabinet'],
  'kitchen': ['appliance', 'cookware', 'utensils', 'mixer', 'grinder', 'microwave'],
  'fitness': ['gym', 'exercise', 'workout', 'yoga', 'sports', 'equipment'],
  'beauty': ['makeup', 'cosmetics', 'skincare', 'perfume', 'grooming'],
  'toy': ['kids', 'children', 'games', 'play'],
  'jewelry': ['jewellery', 'necklace', 'ring', 'earring', 'bracelet', 'chain']
};

const generateMockProducts = () => {
  const products = [
    {
      id: "amz-001",
      title: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
      description: "The Samsung Galaxy S23 Ultra 5G comes with a 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 processor, and a versatile quad-camera system with 200MP main sensor.",
      price: {
        current: 124999,
        original: 149999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400"
      ],
      rating: {
        average: 4.5,
        count: 2341
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/samsung-galaxy-s23-ultra",
        color: "#FF9900"
      },
      category: "Electronics",
      brand: "Samsung",
      availability: true,
      specifications: {
        "Display": "6.8 inch Dynamic AMOLED 2X",
        "Processor": "Snapdragon 8 Gen 2",
        "RAM": "12GB",
        "Storage": "256GB",
        "Camera": "200MP + 12MP + 10MP + 10MP",
        "Battery": "5000mAh"
      }
    },
    {
      id: "flp-001",
      title: "Apple iPhone 15 Pro Max (Natural Titanium, 256GB)",
      description: "iPhone 15 Pro Max features a strong and light titanium design with Action button, A17 Pro chip, and pro camera system.",
      price: {
        current: 156900,
        original: 159900,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"
      ],
      rating: {
        average: 4.7,
        count: 1856
      },
      platform: {
        name: "Flipkart",
        logo: "/images/logos/flipkart.png",
        url: "https://flipkart.com/iphone-15-pro-max",
        color: "#2874F0"
      },
      category: "Electronics",
      brand: "Apple",
      availability: true,
      specifications: {
        "Display": "6.7 inch Super Retina XDR",
        "Processor": "A17 Pro Bionic",
        "Storage": "256GB",
        "Camera": "48MP + 12MP + 12MP",
        "Battery": "All-day battery life"
      }
    },
    {
      id: "amz-002",
      title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      description: "Industry-leading noise cancellation with Auto NC Optimizer, exceptional sound quality, and up to 30-hour battery life.",
      price: {
        current: 29990,
        original: 34990,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
      ],
      rating: {
        average: 4.6,
        count: 892
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/sony-wh1000xm5",
        color: "#FF9900"
      },
      category: "Electronics",
      brand: "Sony",
      availability: true,
      specifications: {
        "Type": "Over-ear",
        "Connectivity": "Bluetooth 5.2",
        "Battery Life": "30 hours",
        "Noise Cancellation": "Industry-leading ANC",
        "Weight": "250g"
      }
    },
    {
      id: "myn-001",
      title: "Nike Air Jordan 1 Retro High OG",
      description: "The Air Jordan 1 Retro High OG brings back the original colorway with premium leather construction and Nike Air cushioning.",
      price: {
        current: 14995,
        original: 16995,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
      ],
      rating: {
        average: 4.4,
        count: 567
      },
      platform: {
        name: "Myntra",
        logo: "/images/logos/myntra.png",
        url: "https://myntra.com/nike-air-jordan-1",
        color: "#FF3F6C"
      },
      category: "Fashion",
      brand: "Nike",
      availability: true,
      specifications: {
        "Material": "Premium Leather",
        "Sole": "Rubber",
        "Closure": "Lace-up",
        "Style": "High-top"
      }
    },
    {
      id: "flp-002",
      title: "LG 139 cm (55 inch) OLED Ultra HD (4K) Smart TV",
      description: "Experience perfect blacks and infinite contrast with LG OLED technology, featuring α9 Gen5 AI Processor 4K and Dolby Vision IQ.",
      price: {
        current: 119990,
        original: 179990,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
        "https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=400"
      ],
      rating: {
        average: 4.8,
        count: 234
      },
      platform: {
        name: "Flipkart",
        logo: "/images/logos/flipkart.png",
        url: "https://flipkart.com/lg-oled-55-tv",
        color: "#2874F0"
      },
      category: "Electronics",
      brand: "LG",
      availability: true,
      specifications: {
        "Display": "55 inch OLED",
        "Resolution": "4K Ultra HD (3840x2160)",
        "Smart TV": "webOS",
        "Sound": "40W, Dolby Atmos",
        "Connectivity": "4 HDMI, 3 USB"
      }
    },
    {
      id: "amz-003",
      title: "Apple MacBook Air M2 (Midnight, 8GB RAM, 256GB SSD)",
      description: "Supercharged by M2 chip, featuring 13.6-inch Liquid Retina display, all-day battery life, and fanless design.",
      price: {
        current: 114900,
        original: 119900,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
      ],
      rating: {
        average: 4.7,
        count: 1123
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/macbook-air-m2",
        color: "#FF9900"
      },
      category: "Electronics",
      brand: "Apple",
      availability: true,
      specifications: {
        "Display": "13.6 inch Liquid Retina",
        "Processor": "Apple M2 chip",
        "RAM": "8GB unified memory",
        "Storage": "256GB SSD",
        "Battery": "Up to 18 hours"
      }
    },
    {
      id: "ajio-001",
      title: "Levi's Men's 511 Slim Fit Jeans",
      description: "The 511 Slim Jeans sit below the waist with a slim fit from hip to ankle, made with sustainable cotton.",
      price: {
        current: 2799,
        original: 3999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400"
      ],
      rating: {
        average: 4.3,
        count: 445
      },
      platform: {
        name: "AJIO",
        logo: "/images/logos/ajio.png",
        url: "https://ajio.com/levis-511-slim",
        color: "#2C4152"
      },
      category: "Fashion",
      brand: "Levi's",
      availability: true,
      specifications: {
        "Fit": "Slim",
        "Material": "98% Cotton, 2% Elastane",
        "Wash": "Medium Indigo",
        "Rise": "Mid Rise"
      }
    },
    {
      id: "flp-003",
      title: "Canon EOS R6 Mark II Mirrorless Camera Body",
      description: "24.2MP full-frame sensor, up to 40 fps continuous shooting, 6K oversampled 4K video, and advanced autofocus.",
      price: {
        current: 215990,
        original: 239995,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
      ],
      rating: {
        average: 4.9,
        count: 89
      },
      platform: {
        name: "Flipkart",
        logo: "/images/logos/flipkart.png",
        url: "https://flipkart.com/canon-eos-r6-mark2",
        color: "#2874F0"
      },
      category: "Electronics",
      brand: "Canon",
      availability: true,
      specifications: {
        "Sensor": "24.2MP Full-Frame CMOS",
        "ISO Range": "100-102400",
        "Video": "6K oversampled 4K 60p",
        "AF Points": "1053 AF points",
        "Stabilization": "8-stop IBIS"
      }
    },
    {
      id: "amz-004",
      title: "Dyson V15 Detect Absolute Cordless Vacuum Cleaner",
      description: "Laser reveals microscopic dust, scientific proof of deep clean, 60 minutes runtime, and HEPA filtration.",
      price: {
        current: 62900,
        original: 67900,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400"
      ],
      rating: {
        average: 4.5,
        count: 342
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/dyson-v15-detect",
        color: "#FF9900"
      },
      category: "Home Appliances",
      brand: "Dyson",
      availability: true,
      specifications: {
        "Runtime": "Up to 60 minutes",
        "Suction Power": "230AW",
        "Bin Capacity": "0.77L",
        "Filtration": "HEPA",
        "Weight": "3.1kg"
      }
    },
    {
      id: "myn-002",
      title: "Ray-Ban Aviator Classic Sunglasses",
      description: "Timeless aviator design with crystal green G-15 lenses and gold metal frame, 100% UV protection.",
      price: {
        current: 8990,
        original: 10990,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
      ],
      rating: {
        average: 4.6,
        count: 678
      },
      platform: {
        name: "Myntra",
        logo: "/images/logos/myntra.png",
        url: "https://myntra.com/rayban-aviator",
        color: "#FF3F6C"
      },
      category: "Fashion",
      brand: "Ray-Ban",
      availability: true,
      specifications: {
        "Frame Material": "Metal",
        "Lens Material": "Crystal",
        "UV Protection": "100%",
        "Frame Size": "58mm"
      }
    },
    {
      id: "amz-005",
      title: "Kindle Paperwhite (11th Gen) - 6.8\" Display, 8GB",
      description: "Adjustable warm light, waterproof design, weeks of battery life, and glare-free display for comfortable reading.",
      price: {
        current: 13999,
        original: 14999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1592433385892-e3213a3e822e?w=400",
        "https://images.unsplash.com/photo-1598618443855-232ee5b5e3d8?w=400"
      ],
      rating: {
        average: 4.4,
        count: 2134
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/kindle-paperwhite-11",
        color: "#FF9900"
      },
      category: "Electronics",
      brand: "Amazon",
      availability: true,
      specifications: {
        "Display": "6.8 inch E-ink",
        "Storage": "8GB",
        "Battery": "Up to 10 weeks",
        "Waterproof": "IPX8",
        "Weight": "205g"
      }
    },
    {
      id: "flp-004",
      title: "OnePlus 11 5G (Titan Black, 16GB RAM, 256GB)",
      description: "Snapdragon 8 Gen 2, Hasselblad camera system, 100W SUPERVOOC charging, and 120Hz AMOLED display.",
      price: {
        current: 61999,
        original: 66999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400"
      ],
      rating: {
        average: 4.5,
        count: 987
      },
      platform: {
        name: "Flipkart",
        logo: "/images/logos/flipkart.png",
        url: "https://flipkart.com/oneplus-11-5g",
        color: "#2874F0"
      },
      category: "Electronics",
      brand: "OnePlus",
      availability: true,
      specifications: {
        "Display": "6.7 inch AMOLED, 120Hz",
        "Processor": "Snapdragon 8 Gen 2",
        "RAM": "16GB LPDDR5X",
        "Storage": "256GB UFS 4.0",
        "Camera": "50MP + 48MP + 32MP",
        "Battery": "5000mAh, 100W charging"
      }
    },
    {
      id: "ajio-002",
      title: "Adidas Ultraboost 22 Running Shoes",
      description: "Responsive BOOST midsole, Continental rubber outsole, and Primeknit+ upper for ultimate comfort.",
      price: {
        current: 12999,
        original: 16999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400"
      ],
      rating: {
        average: 4.6,
        count: 445
      },
      platform: {
        name: "AJIO",
        logo: "/images/logos/ajio.png",
        url: "https://ajio.com/adidas-ultraboost-22",
        color: "#2C4152"
      },
      category: "Fashion",
      brand: "Adidas",
      availability: true,
      specifications: {
        "Upper": "Primeknit+",
        "Midsole": "BOOST",
        "Outsole": "Continental Rubber",
        "Weight": "333g"
      }
    },
    {
      id: "amz-006",
      title: "PlayStation 5 Console (Disc Edition)",
      description: "Experience lightning-fast loading, deeper immersion with haptic feedback, and stunning games.",
      price: {
        current: 54990,
        original: 54990,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
        "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400"
      ],
      rating: {
        average: 4.8,
        count: 3421
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/playstation-5-console",
        color: "#FF9900"
      },
      category: "Gaming",
      brand: "Sony",
      availability: false,
      specifications: {
        "CPU": "8-core AMD Zen 2",
        "GPU": "10.28 TFLOPs, AMD RDNA 2",
        "Memory": "16GB GDDR6",
        "Storage": "825GB SSD",
        "4K Gaming": "Up to 120fps"
      }
    },
    {
      id: "myn-003",
      title: "Tommy Hilfiger Men's Analog Watch",
      description: "Classic design with stainless steel case, leather strap, and water resistance up to 50m.",
      price: {
        current: 7999,
        original: 9995,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400"
      ],
      rating: {
        average: 4.3,
        count: 234
      },
      platform: {
        name: "Myntra",
        logo: "/images/logos/myntra.png",
        url: "https://myntra.com/tommy-hilfiger-watch",
        color: "#FF3F6C"
      },
      category: "Fashion",
      brand: "Tommy Hilfiger",
      availability: true,
      specifications: {
        "Movement": "Quartz",
        "Case Material": "Stainless Steel",
        "Strap": "Genuine Leather",
        "Water Resistance": "5 ATM"
      }
    },
    {
      id: "flp-005",
      title: "Samsung 8 kg Fully-Automatic Front Loading Washing Machine",
      description: "EcoBubble technology, Digital Inverter motor with 10-year warranty, and Quick Wash feature.",
      price: {
        current: 32990,
        original: 42990,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1626806787461-102c1f0994a7?w=400",
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400"
      ],
      rating: {
        average: 4.4,
        count: 567
      },
      platform: {
        name: "Flipkart",
        logo: "/images/logos/flipkart.png",
        url: "https://flipkart.com/samsung-washing-machine",
        color: "#2874F0"
      },
      category: "Home Appliances",
      brand: "Samsung",
      availability: true,
      specifications: {
        "Capacity": "8 kg",
        "Type": "Front Load",
        "Energy Rating": "5 Star",
        "Motor": "Digital Inverter",
        "Programs": "15 wash programs"
      }
    },
    {
      id: "amz-007",
      title: "JBL Flip 6 Portable Bluetooth Speaker",
      description: "IP67 waterproof and dustproof, 12 hours playtime, PartyBoost feature, and powerful JBL Original Pro Sound.",
      price: {
        current: 9999,
        original: 11999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400"
      ],
      rating: {
        average: 4.5,
        count: 1234
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/jbl-flip-6",
        color: "#FF9900"
      },
      category: "Electronics",
      brand: "JBL",
      availability: true,
      specifications: {
        "Battery": "12 hours",
        "Waterproof": "IP67",
        "Connectivity": "Bluetooth 5.1",
        "Power": "30W RMS",
        "Weight": "550g"
      }
    },
    {
      id: "ajio-003",
      title: "Fossil Gen 6 Smartwatch",
      description: "Wear OS by Google, Snapdragon 4100+, heart rate & SpO2 monitoring, and customizable watch faces.",
      price: {
        current: 19995,
        original: 25995,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
        "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=400"
      ],
      rating: {
        average: 4.2,
        count: 345
      },
      platform: {
        name: "AJIO",
        logo: "/images/logos/ajio.png",
        url: "https://ajio.com/fossil-gen-6",
        color: "#2C4152"
      },
      category: "Electronics",
      brand: "Fossil",
      availability: true,
      specifications: {
        "OS": "Wear OS by Google",
        "Processor": "Snapdragon 4100+",
        "Display": "1.28 inch AMOLED",
        "Battery": "24+ hours",
        "Water Resistance": "3 ATM"
      }
    },
    {
      id: "flp-006",
      title: "Mi 43 inch 4K Ultra HD Smart Android LED TV",
      description: "4K HDR display, Android TV 11, Google Assistant, Chromecast built-in, and Dolby Audio.",
      price: {
        current: 27999,
        original: 34999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
        "https://images.unsplash.com/photo-1567690187548-f07f1d7bf5bb?w=400"
      ],
      rating: {
        average: 4.3,
        count: 2341
      },
      platform: {
        name: "Flipkart",
        logo: "/images/logos/flipkart.png",
        url: "https://flipkart.com/mi-43-4k-tv",
        color: "#2874F0"
      },
      category: "Electronics",
      brand: "Xiaomi",
      availability: true,
      specifications: {
        "Display": "43 inch LED",
        "Resolution": "4K Ultra HD (3840x2160)",
        "OS": "Android TV 11",
        "Sound": "20W, Dolby Audio",
        "Connectivity": "3 HDMI, 2 USB"
      }
    },
    {
      id: "amz-008",
      title: "Fitbit Charge 5 Advanced Fitness Tracker",
      description: "Built-in GPS, stress management, sleep tracking, 7-day battery, and Daily Readiness Score.",
      price: {
        current: 12999,
        original: 14999,
        currency: "₹"
      },
      images: [
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400"
      ],
      rating: {
        average: 4.1,
        count: 876
      },
      platform: {
        name: "Amazon",
        logo: "/images/logos/amazon.png",
        url: "https://amazon.in/fitbit-charge-5",
        color: "#FF9900"
      },
      category: "Electronics",
      brand: "Fitbit",
      availability: true,
      specifications: {
        "Display": "AMOLED touchscreen",
        "Battery": "Up to 7 days",
        "GPS": "Built-in",
        "Water Resistance": "50m",
        "Health Tracking": "Heart rate, SpO2, stress"
      }
    }
  ];

  // Add duplicate products across platforms for price comparison
  const duplicateProducts = [
    // iPhone 15 Pro Max - Multiple platforms with different prices
    {
      id: "amz-101",
      title: "Apple iPhone 15 Pro Max (Natural Titanium, 256GB)",
      description: "iPhone 15 Pro Max features titanium design with Action button, A17 Pro chip, and pro camera system.",
      price: { current: 159900, original: 159900, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"],
      rating: { average: 4.7, count: 1856 },
      platform: { name: "Amazon", logo: "/images/logos/amazon.png", url: "https://amazon.in", color: "#FF9900" },
      category: "Electronics",
      brand: "Apple",
      availability: true,
      specifications: { "Display": "6.7 inch", "Processor": "A17 Pro", "Storage": "256GB" }
    },
    {
      id: "myn-101",
      title: "Apple iPhone 15 Pro Max (Natural Titanium, 256GB)",
      description: "iPhone 15 Pro Max features titanium design with Action button, A17 Pro chip, and pro camera system.",
      price: { current: 162900, original: 164900, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"],
      rating: { average: 4.6, count: 892 },
      platform: { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
      category: "Electronics",
      brand: "Apple",
      availability: true,
      specifications: { "Display": "6.7 inch", "Processor": "A17 Pro", "Storage": "256GB" }
    },
    {
      id: "ajio-101",
      title: "Apple iPhone 15 Pro Max (Natural Titanium, 256GB)",
      description: "iPhone 15 Pro Max features titanium design with Action button, A17 Pro chip, and pro camera system.",
      price: { current: 158900, original: 159900, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"],
      rating: { average: 4.5, count: 567 },
      platform: { name: "AJIO", logo: "/images/logos/ajio.png", url: "https://ajio.com", color: "#2C4152" },
      category: "Electronics",
      brand: "Apple",
      availability: true,
      specifications: { "Display": "6.7 inch", "Processor": "A17 Pro", "Storage": "256GB" }
    },

    // Samsung Galaxy S23 Ultra - Multiple platforms
    {
      id: "flp-102",
      title: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
      description: "The Samsung Galaxy S23 Ultra 5G comes with a 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 processor.",
      price: { current: 127999, original: 149999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400"],
      rating: { average: 4.4, count: 1234 },
      platform: { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
      category: "Electronics",
      brand: "Samsung",
      availability: true,
      specifications: { "Display": "6.8 inch", "RAM": "12GB", "Storage": "256GB" }
    },
    {
      id: "myn-102",
      title: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
      description: "The Samsung Galaxy S23 Ultra 5G comes with a 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 processor.",
      price: { current: 129999, original: 149999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400"],
      rating: { average: 4.3, count: 876 },
      platform: { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
      category: "Electronics",
      brand: "Samsung",
      availability: true,
      specifications: { "Display": "6.8 inch", "RAM": "12GB", "Storage": "256GB" }
    },

    // Nike Air Jordan - Multiple platforms
    {
      id: "flp-103",
      title: "Nike Air Jordan 1 Retro High OG Sneakers",
      description: "Classic basketball shoes with premium leather construction and Nike Air cushioning.",
      price: { current: 15995, original: 16995, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400"],
      rating: { average: 4.3, count: 432 },
      platform: { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
      category: "Fashion",
      brand: "Nike",
      availability: true,
      specifications: { "Material": "Premium Leather", "Sole": "Rubber", "Style": "High-top" }
    },
    {
      id: "amz-103",
      title: "Nike Air Jordan 1 Retro High OG Sneakers",
      description: "Classic basketball shoes with premium leather construction and Nike Air cushioning.",
      price: { current: 14495, original: 16995, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400"],
      rating: { average: 4.5, count: 789 },
      platform: { name: "Amazon", logo: "/images/logos/amazon.png", url: "https://amazon.in", color: "#FF9900" },
      category: "Fashion",
      brand: "Nike",
      availability: true,
      specifications: { "Material": "Premium Leather", "Sole": "Rubber", "Style": "High-top" }
    },
    {
      id: "ajio-103",
      title: "Nike Air Jordan 1 Retro High OG Sneakers",
      description: "Classic basketball shoes with premium leather construction and Nike Air cushioning.",
      price: { current: 15495, original: 16995, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400"],
      rating: { average: 4.4, count: 345 },
      platform: { name: "AJIO", logo: "/images/logos/ajio.png", url: "https://ajio.com", color: "#2C4152" },
      category: "Fashion",
      brand: "Nike",
      availability: true,
      specifications: { "Material": "Premium Leather", "Sole": "Rubber", "Style": "High-top" }
    },

    // Sony WH-1000XM5 Headphones - Multiple platforms
    {
      id: "flp-104",
      title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      description: "Industry-leading noise cancellation, 30-hour battery, premium sound quality.",
      price: { current: 31990, original: 34990, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
      rating: { average: 4.5, count: 567 },
      platform: { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
      category: "Electronics",
      brand: "Sony",
      availability: true,
      specifications: { "Type": "Over-ear", "Battery": "30 hours", "ANC": "Yes" }
    },
    {
      id: "myn-104",
      title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      description: "Industry-leading noise cancellation, 30-hour battery, premium sound quality.",
      price: { current: 32990, original: 34990, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
      rating: { average: 4.4, count: 234 },
      platform: { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
      category: "Electronics",
      brand: "Sony",
      availability: true,
      specifications: { "Type": "Over-ear", "Battery": "30 hours", "ANC": "Yes" }
    },
    {
      id: "ajio-104",
      title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      description: "Industry-leading noise cancellation, 30-hour battery, premium sound quality.",
      price: { current: 28990, original: 34990, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
      rating: { average: 4.7, count: 1123 },
      platform: { name: "AJIO", logo: "/images/logos/ajio.png", url: "https://ajio.com", color: "#2C4152" },
      category: "Electronics",
      brand: "Sony",
      availability: true,
      specifications: { "Type": "Over-ear", "Battery": "30 hours", "ANC": "Yes" }
    },

    // MacBook Air M2 - Multiple platforms
    {
      id: "flp-105",
      title: "Apple MacBook Air M2 (Midnight, 8GB RAM, 256GB SSD)",
      description: "Supercharged by M2 chip, 13.6-inch Liquid Retina display, all-day battery life.",
      price: { current: 118900, original: 119900, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400"],
      rating: { average: 4.6, count: 678 },
      platform: { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
      category: "Electronics",
      brand: "Apple",
      availability: true,
      specifications: { "Display": "13.6 inch", "Processor": "M2", "RAM": "8GB" }
    },
    {
      id: "myn-105",
      title: "Apple MacBook Air M2 (Midnight, 8GB RAM, 256GB SSD)",
      description: "Supercharged by M2 chip, 13.6-inch Liquid Retina display, all-day battery life.",
      price: { current: 116900, original: 119900, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400"],
      rating: { average: 4.8, count: 432 },
      platform: { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
      category: "Electronics",
      brand: "Apple",
      availability: true,
      specifications: { "Display": "13.6 inch", "Processor": "M2", "RAM": "8GB" }
    },

    // Levi's 511 Jeans - Multiple platforms
    {
      id: "amz-106",
      title: "Levi's 511 Slim Fit Denim Jeans for Men",
      description: "Slim fit jeans with stretch denim for comfort and mobility. Classic style pants for everyday wear.",
      price: { current: 2999, original: 3999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"],
      rating: { average: 4.2, count: 567 },
      platform: { name: "Amazon", logo: "/images/logos/amazon.png", url: "https://amazon.in", color: "#FF9900" },
      category: "Fashion",
      brand: "Levi's",
      availability: true,
      specifications: { "Fit": "Slim", "Material": "98% Cotton, 2% Elastane" }
    },
    {
      id: "flp-106",
      title: "Levi's 511 Slim Fit Denim Jeans for Men",
      description: "Slim fit jeans with stretch denim for comfort and mobility. Classic style pants for everyday wear.",
      price: { current: 2699, original: 3999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"],
      rating: { average: 4.4, count: 789 },
      platform: { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
      category: "Fashion",
      brand: "Levi's",
      availability: true,
      specifications: { "Fit": "Slim", "Material": "98% Cotton, 2% Elastane" }
    },
    {
      id: "ajio-106",
      title: "Levi's 511 Slim Fit Denim Jeans for Men",
      description: "Slim fit jeans with stretch denim for comfort and mobility. Classic style pants for everyday wear.",
      price: { current: 2899, original: 3999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"],
      rating: { average: 4.3, count: 345 },
      platform: { name: "AJIO", logo: "/images/logos/ajio.png", url: "https://ajio.com", color: "#2C4152" },
      category: "Fashion",
      brand: "Levi's",
      availability: true,
      specifications: { "Fit": "Slim", "Material": "98% Cotton, 2% Elastane" }
    },

    // JBL Flip 6 Speaker - Multiple platforms
    {
      id: "amz-107",
      title: "JBL Flip 6 Portable Bluetooth Speaker Waterproof",
      description: "IP67 waterproof speaker with 12 hours playtime, PartyBoost, JBL Pro Sound.",
      price: { current: 10499, original: 11999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"],
      rating: { average: 4.4, count: 892 },
      platform: { name: "Amazon", logo: "/images/logos/amazon.png", url: "https://amazon.in", color: "#FF9900" },
      category: "Electronics",
      brand: "JBL",
      availability: true,
      specifications: { "Battery": "12 hours", "Waterproof": "IP67" }
    },
    {
      id: "myn-107",
      title: "JBL Flip 6 Portable Bluetooth Speaker Waterproof",
      description: "IP67 waterproof speaker with 12 hours playtime, PartyBoost, JBL Pro Sound.",
      price: { current: 9799, original: 11999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"],
      rating: { average: 4.6, count: 456 },
      platform: { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
      category: "Electronics",
      brand: "JBL",
      availability: true,
      specifications: { "Battery": "12 hours", "Waterproof": "IP67" }
    },

    // Adidas Ultraboost - Multiple platforms
    {
      id: "myn-108",
      title: "Adidas Ultraboost 22 Running Shoes",
      description: "Responsive BOOST midsole, Continental rubber outsole, Primeknit+ upper for comfort.",
      price: { current: 13499, original: 16999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
      rating: { average: 4.5, count: 234 },
      platform: { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
      category: "Fashion",
      brand: "Adidas",
      availability: true,
      specifications: { "Upper": "Primeknit+", "Midsole": "BOOST" }
    },
    {
      id: "flp-108",
      title: "Adidas Ultraboost 22 Running Shoes",
      description: "Responsive BOOST midsole, Continental rubber outsole, Primeknit+ upper for comfort.",
      price: { current: 12799, original: 16999, currency: "₹" },
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
      rating: { average: 4.7, count: 567 },
      platform: { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
      category: "Fashion",
      brand: "Adidas",
      availability: true,
      specifications: { "Upper": "Primeknit+", "Midsole": "BOOST" }
    }
  ];

  // Add 80+ more products using the generator
  const additionalProducts = generateAdditionalProducts(21, 65);
  
  return [...products, ...duplicateProducts, ...additionalProducts];
};

// Function to get all products
export const getAllProducts = () => {
  return generateMockProducts();
};

// Enhanced search function with fuzzy matching
const expandSearchQuery = (query) => {
  const lowerQuery = query.toLowerCase();
  const relatedTerms = [];
  
  // Check if query matches any key in searchRelatedTerms
  for (const [key, values] of Object.entries(searchRelatedTerms)) {
    if (key.includes(lowerQuery) || lowerQuery.includes(key)) {
      relatedTerms.push(...values);
    }
    // Also check if query matches any related term
    for (const value of values) {
      if (value.includes(lowerQuery) || lowerQuery.includes(value)) {
        relatedTerms.push(key, ...values);
        break;
      }
    }
  }
  
  return [...new Set([lowerQuery, ...relatedTerms])];
};

// Function to search products with improved fuzzy matching
export const searchProducts = (query, filters = {}) => {
  let products = generateMockProducts();
  
  // Enhanced text search with related terms
  if (query) {
    const searchTerms = expandSearchQuery(query);
    products = products.filter(product => {
      const productText = `${product.title} ${product.description} ${product.brand} ${product.category}`.toLowerCase();
      
      // Check if any search term matches
      return searchTerms.some(term => {
        // Direct inclusion check
        if (productText.includes(term)) return true;
        
        // Check individual words
        const words = term.split(' ');
        return words.every(word => productText.includes(word));
      });
    });
  }
  
  // Apply filters
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    products = products.filter(product => 
      product.price.current >= filters.minPrice && 
      product.price.current <= filters.maxPrice
    );
  }
  
  if (filters.categories && filters.categories.length > 0) {
    products = products.filter(product => 
      filters.categories.includes(product.category)
    );
  }
  
  if (filters.brands && filters.brands.length > 0) {
    products = products.filter(product => 
      filters.brands.includes(product.brand)
    );
  }
  
  if (filters.minRating) {
    products = products.filter(product => 
      product.rating.average >= filters.minRating
    );
  }
  
  if (filters.platforms && filters.platforms.length > 0) {
    products = products.filter(product => 
      filters.platforms.includes(product.platform.name)
    );
  }
  
  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low-high':
        products.sort((a, b) => a.price.current - b.price.current);
        break;
      case 'price-high-low':
        products.sort((a, b) => b.price.current - a.price.current);
        break;
      case 'rating':
        products.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case 'popularity':
        products.sort((a, b) => b.rating.count - a.rating.count);
        break;
      default:
        break;
    }
  }
  
  return products;
};

// Function to get product by ID
export const getProductById = (id) => {
  const products = generateMockProducts();
  return products.find(product => product.id === id);
};

// Function to get unique categories
export const getCategories = () => {
  const products = generateMockProducts();
  const categories = [...new Set(products.map(p => p.category))];
  return categories.sort();
};

// Function to get unique brands
export const getBrands = () => {
  const products = generateMockProducts();
  const brands = [...new Set(products.map(p => p.brand))];
  return brands.sort();
};

// Function to get unique platforms
export const getPlatforms = () => {
  const products = generateMockProducts();
  const platforms = [...new Set(products.map(p => p.platform.name))];
  return platforms.sort();
};
