// Product generator to create 100+ diverse products

const categories = {
  shoes: {
    brands: ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Asics', 'Skechers', 'Fila', 'Converse', 'Vans'],
    types: ['Running Shoes', 'Sneakers', 'Sports Shoes', 'Casual Shoes', 'Formal Shoes', 'Boots', 'Sandals', 'Loafers'],
    keywords: ['footwear', 'comfortable', 'athletic', 'stylish', 'premium', 'lightweight', 'durable']
  },
  phones: {
    brands: ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'Oppo', 'Google', 'Nothing', 'Motorola'],
    types: ['5G Smartphone', 'Pro Max', 'Ultra', 'Plus', 'Pro', 'Lite', 'Gaming Phone', 'Camera Phone'],
    keywords: ['mobile', 'android', 'ios', 'flagship', 'budget', 'mid-range', 'premium']
  },
  laptops: {
    brands: ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Apple', 'MSI', 'Razer', 'Microsoft', 'LG'],
    types: ['Gaming Laptop', 'Ultrabook', 'Business Laptop', '2-in-1 Laptop', 'Workstation', 'Chromebook'],
    keywords: ['computer', 'notebook', 'portable', 'performance', 'productivity', 'gaming']
  },
  clothing: {
    brands: ['Levi\'s', 'H&M', 'Zara', 'Nike', 'Adidas', 'Puma', 'Tommy Hilfiger', 'Calvin Klein', 'Ralph Lauren'],
    types: ['T-Shirt', 'Shirt', 'Jeans', 'Trousers', 'Jacket', 'Hoodie', 'Shorts', 'Dress', 'Suit'],
    keywords: ['fashion', 'apparel', 'style', 'trendy', 'casual', 'formal', 'comfortable']
  },
  watches: {
    brands: ['Casio', 'Titan', 'Fossil', 'Timex', 'Seiko', 'Citizen', 'Rolex', 'Omega', 'Tag Heuer'],
    types: ['Smartwatch', 'Analog Watch', 'Digital Watch', 'Chronograph', 'Fitness Tracker', 'Luxury Watch'],
    keywords: ['timepiece', 'wearable', 'accessories', 'elegant', 'sporty', 'classic']
  },
  headphones: {
    brands: ['Sony', 'Bose', 'JBL', 'Sennheiser', 'Audio-Technica', 'Beats', 'Marshall', 'Skullcandy'],
    types: ['Wireless Headphones', 'Earbuds', 'Gaming Headset', 'Noise Cancelling', 'Sports Earphones'],
    keywords: ['audio', 'music', 'sound', 'wireless', 'bluetooth', 'earphones']
  },
  bags: {
    brands: ['Wildcraft', 'American Tourister', 'Skybags', 'VIP', 'Samsonite', 'Tommy Hilfiger', 'Puma'],
    types: ['Backpack', 'Laptop Bag', 'Travel Bag', 'Duffle Bag', 'Suitcase', 'Handbag', 'Wallet'],
    keywords: ['luggage', 'travel', 'storage', 'carry', 'accessories', 'utility']
  },
  tv: {
    brands: ['Samsung', 'LG', 'Sony', 'Mi', 'OnePlus', 'TCL', 'Panasonic', 'Philips', 'Toshiba'],
    types: ['Smart TV', 'OLED TV', 'QLED TV', '4K TV', 'LED TV', 'Android TV'],
    keywords: ['television', 'display', 'entertainment', 'screen', 'monitor', 'smart']
  }
};

const platforms = [
  { name: "Amazon", logo: "/images/logos/amazon.png", url: "https://amazon.in", color: "#FF9900" },
  { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
  { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
  { name: "AJIO", logo: "/images/logos/ajio.png", url: "https://ajio.com", color: "#2C4152" }
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateAdditionalProducts = (startId = 21, count = 80) => {
  const products = [];
  const categoryKeys = Object.keys(categories);
  
  for (let i = 0; i < count; i++) {
    const categoryKey = getRandomElement(categoryKeys);
    const category = categories[categoryKey];
    const brand = getRandomElement(category.brands);
    const type = getRandomElement(category.types);
    const platform = getRandomElement(platforms);
    const platformPrefix = platform.name.toLowerCase().substring(0, 3);
    const id = `${platformPrefix}-${String(startId + i).padStart(3, '0')}`;
    
    // Generate price based on category
    let priceRange = { min: 500, max: 5000 };
    if (categoryKey === 'phones') priceRange = { min: 10000, max: 150000 };
    if (categoryKey === 'laptops') priceRange = { min: 25000, max: 200000 };
    if (categoryKey === 'tv') priceRange = { min: 15000, max: 200000 };
    if (categoryKey === 'watches') priceRange = { min: 1000, max: 50000 };
    if (categoryKey === 'headphones') priceRange = { min: 1000, max: 30000 };
    
    const originalPrice = getRandomNumber(priceRange.min, priceRange.max);
    const discount = getRandomNumber(10, 40);
    const currentPrice = Math.floor(originalPrice * (1 - discount / 100));
    
    // Generate title with keywords
    const keywords = category.keywords;
    const keyword1 = getRandomElement(keywords);
    const keyword2 = getRandomElement(keywords.filter(k => k !== keyword1));
    
    const title = `${brand} ${type} - ${keyword1.charAt(0).toUpperCase() + keyword1.slice(1)} ${keyword2}`;
    const description = `Premium ${type.toLowerCase()} from ${brand}. Features ${keyword1} design with ${keyword2} quality. Perfect for ${getRandomElement(['daily use', 'professionals', 'enthusiasts', 'everyone', 'modern lifestyle'])}.`;
    
    // Category mapping
    let productCategory = 'Fashion';
    if (['phones', 'laptops', 'tv', 'headphones', 'watches'].includes(categoryKey)) {
      productCategory = 'Electronics';
    } else if (categoryKey === 'bags') {
      productCategory = 'Travel';
    }
    
    // Better image URLs that are more specific to brands and categories
    const getProductImage = (categoryKey, brand) => {
      const imageMap = {
        shoes: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", // Running shoes
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400", // Sneakers
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400", // Sports shoes
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", // White sneakers
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" // Colorful sneakers
        ],
        phones: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", // Black phone
          "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400", // Modern phone
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400", // Phone in hand
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", // Samsung style
          "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400"  // Android phone
        ],
        laptops: [
          "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400", // Modern laptop
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400", // Business laptop
          "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=400", // Silver laptop
          "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"  // Gaming laptop
        ],
        clothing: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", // Jeans
          "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400", // Polo shirt
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400", // Formal shirt
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"  // Casual shirt
        ],
        watches: [
          "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400", // Smartwatch
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", // Analog watch
          "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?w=400", // Sports watch
          "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400"  // Apple watch style
        ],
        headphones: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", // Over-ear headphones
          "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400", // Earbuds
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", // Bose style
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400"  // Premium headphones
        ],
        bags: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", // Backpack
          "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400", // Luggage
          "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400"  // Travel bag
        ],
        tv: [
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400", // OLED TV
          "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400", // Samsung TV
          "https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=400", // Sony TV
          "https://images.unsplash.com/photo-1567690187548-f07f1d7bf5bb?w=400"  // Smart TV
        ]
      };
      
      const categoryImages = imageMap[categoryKey] || imageMap.phones;
      return getRandomElement(categoryImages);
    };
    
    products.push({
      id,
      title,
      description,
      price: {
        current: currentPrice,
        original: originalPrice,
        currency: "₹"
      },
      images: [getProductImage(categoryKey, brand)],
      rating: {
        average: (Math.random() * 2 + 3).toFixed(1),
        count: getRandomNumber(50, 5000)
      },
      platform,
      category: productCategory,
      brand,
      availability: Math.random() > 0.1,
      specifications: generateSpecifications(categoryKey, type)
    });
  }
  
  return products;
};

const generateSpecifications = (category, type) => {
  const specs = {};
  
  switch(category) {
    case 'shoes':
      specs.Material = getRandomElement(['Leather', 'Canvas', 'Mesh', 'Synthetic', 'Suede']);
      specs.Sole = getRandomElement(['Rubber', 'EVA', 'PU', 'TPR']);
      specs.Closure = getRandomElement(['Lace-up', 'Slip-on', 'Velcro', 'Buckle']);
      break;
    case 'phones':
      specs.Display = `${getRandomElement(['6.1', '6.4', '6.7', '6.8'])} inch`;
      specs.RAM = `${getRandomElement(['4GB', '6GB', '8GB', '12GB', '16GB'])}`;
      specs.Storage = `${getRandomElement(['64GB', '128GB', '256GB', '512GB'])}`;
      specs.Camera = `${getRandomElement(['48MP', '64MP', '108MP', '200MP'])}`;
      break;
    case 'laptops':
      specs.Display = `${getRandomElement(['13.3', '14', '15.6', '17.3'])} inch`;
      specs.Processor = getRandomElement(['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'AMD Ryzen 7']);
      specs.RAM = `${getRandomElement(['8GB', '16GB', '32GB', '64GB'])}`;
      specs.Storage = `${getRandomElement(['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'])}`;
      break;
    case 'clothing':
      specs.Material = getRandomElement(['Cotton', 'Polyester', 'Wool', 'Linen', 'Denim']);
      specs.Fit = getRandomElement(['Regular', 'Slim', 'Relaxed', 'Skinny', 'Loose']);
      specs.Pattern = getRandomElement(['Solid', 'Striped', 'Checked', 'Printed']);
      break;
    case 'watches':
      specs.Movement = getRandomElement(['Quartz', 'Automatic', 'Digital', 'Smart']);
      specs.Case = getRandomElement(['Stainless Steel', 'Titanium', 'Ceramic', 'Plastic']);
      specs['Water Resistance'] = getRandomElement(['30m', '50m', '100m', '200m']);
      break;
    case 'headphones':
      specs.Type = getRandomElement(['Over-ear', 'On-ear', 'In-ear', 'True Wireless']);
      specs.Connectivity = getRandomElement(['Bluetooth 5.0', 'Bluetooth 5.2', 'Bluetooth 5.3', 'Wired']);
      specs.Battery = `${getRandomElement(['20', '30', '40', '50'])} hours`;
      break;
    case 'bags':
      specs.Capacity = `${getRandomElement(['20L', '30L', '40L', '50L', '60L'])}`;
      specs.Material = getRandomElement(['Polyester', 'Nylon', 'Canvas', 'Leather']);
      specs.Compartments = getRandomElement(['2', '3', '4', '5', 'Multiple']);
      break;
    case 'tv':
      specs.Display = `${getRandomElement(['32', '43', '50', '55', '65'])} inch`;
      specs.Resolution = getRandomElement(['HD Ready', 'Full HD', '4K', '8K']);
      specs.SmartTV = getRandomElement(['Android TV', 'webOS', 'Tizen', 'Fire TV']);
      break;
  }
  
  return specs;
};
