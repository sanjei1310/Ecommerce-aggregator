# ShopAggregator - E-commerce Product Aggregator

A modern, responsive e-commerce aggregator that allows users to search and compare products from multiple platforms like Amazon, Flipkart, Myntra, and AJIO.

## ✨ Features

### Core Features
- **🔍 Product Search**: Search products across all platforms with real-time results
- **🛍️ Product Cards**: Beautiful product cards with images, prices, ratings, and platform badges
- **📱 Responsive Design**: Mobile-first design that works seamlessly on all devices
- **🛒 Shopping Cart**: Add products to cart with quantity management and platform-wise grouping
- **🔗 Platform Redirect**: Direct links to original product pages on respective platforms
- **💫 Smooth Animations**: Framer Motion powered animations for a delightful UX

### Advanced Features
- **🎯 Smart Filters**: Filter by price range, categories, brands, ratings, and platforms
- **📊 Sort Options**: Sort by relevance, price (low-high/high-low), rating, and popularity
- **🖼️ Product Details**: Detailed product view with image gallery, specifications, and descriptions
- **💰 Price Comparison**: Compare prices across different platforms
- **⭐ Rating System**: View customer ratings and review counts
- **🏷️ Discount Badges**: Highlight products with special discounts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder:
```bash
cd "c:\VIT VELLORE\TOOLS\Project\E-commerce website"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🏗️ Project Structure

```
ecommerce-website/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartSlider.js
│   │   │   └── CartItem.js
│   │   ├── common/
│   │   │   ├── FilterSidebar.js
│   │   │   └── SortDropdown.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   └── product/
│   │       ├── ProductCard.js
│   │       ├── ProductGrid.js
│   │       └── ProductDetail.js
│   ├── context/
│   │   └── AppContext.js
│   ├── pages/
│   │   └── HomePage.js
│   ├── services/
│   │   └── mockDataService.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design Features

### Modern UI/UX
- **Glass Morphism**: Subtle glass effects for modern aesthetics
- **Gradient Accents**: Beautiful gradient colors for branding
- **Smooth Transitions**: All interactions have smooth animations
- **Skeleton Loading**: Loading states with skeleton screens
- **Responsive Grid**: Adaptive grid layout (1-4 columns based on screen size)

### Color Palette
- **Primary**: Blue (#1E40AF)
- **Secondary**: Green (#059669)
- **Accent**: Red (#DC2626)
- **Neutral**: Gray shades
- **Platform Colors**: Unique colors for each platform badge

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and context
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready animation library
- **React Router**: Client-side routing
- **Heroicons**: Beautiful hand-crafted SVG icons
- **Context API**: Global state management

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 column grid)
- **Desktop**: > 1024px (3-4 column grid)

## 🔥 Key Features Implementation

### Search System
- Real-time search across product titles, descriptions, brands, and categories
- Debounced search input for performance
- Search result count display

### Filter System
- Price range slider with min/max inputs
- Multi-select categories and brands
- Star rating filter (4+, 3+, 2+, 1+ stars)
- Platform selection
- Active filter count badge
- Clear all filters option

### Cart Management
- Add/remove products
- Quantity adjustment
- Platform-wise grouping
- Total price calculation
- Local storage persistence
- Cart item count badge

### Product Detail Modal
- Image gallery with navigation
- Product specifications table
- Tab-based content (Description, Specifications, Reviews)
- Add to cart functionality
- Direct platform redirect

## 🎯 Performance Optimizations

- Lazy loading for images
- Debounced search and filter operations
- Memoized expensive computations
- Optimized re-renders with React.memo
- Local storage for cart persistence

## 📈 Future Enhancements

- User authentication
- Wishlist functionality
- Price history tracking
- Real API integration
- Advanced search filters
- Product recommendations
- Price alerts
- Comparison table view
- Dark mode support

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer Notes

This is an MVP (Minimum Viable Product) that demonstrates the core functionality of an e-commerce aggregator. The application uses mock data for demonstration purposes. In a production environment, this would be integrated with real e-commerce APIs.

### To customize the mock data:
Edit `src/services/mockDataService.js` to add or modify products.

### To change the theme:
Modify the color palette in `tailwind.config.js`.

### To add new platforms:
1. Add platform data in mockDataService.js
2. Update platform colors in ProductCard.js
3. Add platform logo references

---

**Built with ❤️ for modern shoppers**
