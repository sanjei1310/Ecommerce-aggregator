# E-commerce Aggregator MVP - AI IDE Development Plan

## 1. REQUIREMENTS DOCUMENT

### 1.1 Project Specification
**Project Name:** E-commerce Product Aggregator
**Type:** Web Application MVP
**Primary Function:** Search and display products from multiple e-commerce platforms (Amazon, Flipkart, etc.)

### 1.2 Functional Requirements (Priority Order)

#### MUST HAVE (MVP Core)
1. **Product Search System**
   - Input: Search query string
   - Output: Aggregated product results from multiple platforms
   - Display: Grid layout with product cards

2. **Product Display Cards**
   - Required Fields: Image, Title, Price, Rating, Platform Badge
   - Platform Badge: Bottom bar showing source website
   - Action Button: "Visit Page" (opens external link)
   - Secondary Button: "Add to Cart"

3. **Product Detail View**
   - Full product information display
   - Multiple images gallery
   - Specifications table
   - "Visit Page" redirect to original platform

4. **Basic Cart System**
   - Add/remove items from cart
   - View cart contents
   - Platform-wise grouping
   - Local storage persistence

#### SHOULD HAVE (Enhanced Features)
5. **Search Filters**
   - Price range slider
   - Category dropdown
   - Brand checkboxes
   - Rating filter

6. **Product Comparison**
   - Compare up to 3 products
   - Side-by-side feature comparison
   - Price comparison across platforms

### 1.3 Technical Constraints
- No actual payment processing
- External redirects for purchases
- Client-side data storage only
- Responsive design required
- Cross-platform compatibility

### 1.4 Data Requirements

#### Product Object Structure
```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  images: string[];
  rating: {
    average: number;
    count: number;
  };
  platform: {
    name: string;
    logo: string;
    url: string;
    color: string;
  };
  category: string;
  brand: string;
  availability: boolean;
  specifications: Record<string, string>;
}
```

---

## 2. DESIGN DOCUMENT

### 2.1 Architecture Overview

#### System Architecture Pattern
```
Frontend Only Architecture (MVP Approach)
┌─────────────────────────────────────┐
│           React App                 │
├─────────────────────────────────────┤
│  Components Layer                   │
│  ├── SearchComponent               │
│  ├── ProductGrid                   │
│  ├── ProductCard                   │
│  ├── ProductDetail                 │
│  ├── CartComponent                 │
│  └── FilterComponent               │
├─────────────────────────────────────┤
│  Services Layer                     │
│  ├── MockDataService               │
│  ├── SearchService                 │
│  ├── CartService                   │
│  └── LocalStorageService           │
├─────────────────────────────────────┤
│  State Management (Context/Redux)   │
└─────────────────────────────────────┘
```

### 2.2 Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── SearchBar
│   └── CartIcon
├── MainContent
│   ├── FilterSidebar
│   ├── ProductGrid
│   │   └── ProductCard (multiple)
│   └── ProductDetail (modal/page)
├── Cart (slide-out)
└── Footer
```

### 2.3 UI Specifications

#### Color Palette
- Primary: #1E40AF (Blue)
- Secondary: #059669 (Green)
- Accent: #DC2626 (Red for prices)
- Neutral: #6B7280 (Gray)
- Background: #F9FAFB

#### Component Specifications
1. **ProductCard Dimensions:** 280px × 380px
2. **Grid Layout:** 4 cards per row (desktop), 2 (tablet), 1 (mobile)
3. **Platform Badge:** 100% width, 40px height, bottom of card
4. **Button Styling:** Rounded, 8px padding, medium font weight

### 2.4 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 3. AI IDE DEVELOPMENT PLAN

### 3.1 File Structure Creation

#### STEP 1: Initialize Project Structure
Create the following directory structure:
```
ecommerce-aggregator/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── images/
│       ├── logos/
│       └── products/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── product/
│   │   └── cart/
│   ├── services/
│   ├── data/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

#### STEP 2: Package Dependencies
Create package.json with these exact dependencies:
```json
{
  "name": "ecommerce-aggregator",
  "version": "0.1.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@heroicons/react": "^2.0.16",
    "tailwindcss": "^3.2.7",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.21"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### 3.2 Development Steps (Sequential Order)

#### PHASE 1: Foundation Setup (Steps 1-5)

**STEP 3: Create Mock Data Service**
File: `src/services/mockDataService.js`
Purpose: Provide sample product data for development
Content: Create array of 20 sample products with all required fields

**STEP 4: Setup Tailwind CSS**
Files: 
- `tailwind.config.js`
- `src/index.css`
- `postcss.config.js`
Purpose: Configure styling framework

**STEP 5: Create App Component Structure**
File: `src/App.js`
Purpose: Main app layout with routing setup
Requirements:
- Header component
- Main content area
- Footer component
- Router configuration

#### PHASE 2: Core Components (Steps 6-12)

**STEP 6: Build Header Component**
File: `src/components/layout/Header.js`
Requirements:
- Logo on left
- Search bar in center (400px width)
- Cart icon with counter on right
- Responsive design

**STEP 7: Create SearchBar Component**
File: `src/components/common/SearchBar.js`
Requirements:
- Input field with placeholder "Search products..."
- Search icon
- onSubmit handler
- Clear button when text exists

**STEP 8: Build ProductCard Component**
File: `src/components/product/ProductCard.js`
Requirements:
- Product image (aspect ratio 4:3)
- Product title (truncate after 2 lines)
- Current price (prominent)
- Original price (strikethrough if different)
- Star rating display
- Platform badge at bottom
- "Add to Cart" button
- "Visit Page" button

**STEP 9: Create ProductGrid Component**
File: `src/components/product/ProductGrid.js`
Requirements:
- Responsive grid layout
- Loading state
- Empty state message
- Renders ProductCard components

**STEP 10: Build FilterSidebar Component**
File: `src/components/common/FilterSidebar.js`
Requirements:
- Price range slider (₹0 - ₹50000)
- Category checkboxes
- Brand checkboxes
- Rating filter (4+ stars, 3+ stars, etc.)
- Clear filters button

**STEP 11: Create ProductDetail Component**
File: `src/components/product/ProductDetail.js`
Requirements:
- Modal or full page view
- Image gallery with thumbnails
- Product information section
- Specifications table
- Large "Visit Page" button
- "Add to Cart" button
- Close/back functionality

**STEP 12: Build Cart Components**
Files:
- `src/components/cart/CartSlider.js`
- `src/components/cart/CartItem.js`
Requirements:
- Slide-out from right
- Cart item list grouped by platform
- Quantity controls
- Remove item functionality
- Total count display
- "Visit Platform" buttons for each group

#### PHASE 3: State Management (Steps 13-16)

**STEP 13: Create App Context**
File: `src/context/AppContext.js`
Purpose: Global state management
State Variables:
- products: array of all products
- filteredProducts: array after applying filters
- searchQuery: string
- filters: object with price, category, brand, rating
- cart: array of cart items
- selectedProduct: object for detail view

**STEP 14: Create Custom Hooks**
Files:
- `src/hooks/useSearch.js`
- `src/hooks/useCart.js`
- `src/hooks/useFilters.js`
Purpose: Encapsulate business logic

**STEP 15: Implement Search Logic**
File: `src/services/searchService.js`
Requirements:
- Text search across title, description, brand
- Filter application (price, category, brand, rating)
- Sort functionality (price low-high, high-low, rating, newest)

**STEP 16: Add Local Storage Service**
File: `src/services/localStorageService.js`
Purpose: Persist cart data and user preferences

#### PHASE 4: Integration & Polish (Steps 17-20)

**STEP 17: Connect Components to State**
- Update all components to use context
- Add event handlers
- Implement data flow

**STEP 18: Add Loading States**
- Skeleton loading for product cards
- Loading spinners for search
- Shimmer effects for images

**STEP 19: Implement Responsive Design**
- Mobile-first approach
- Tablet breakpoint adjustments
- Touch-friendly interactions

**STEP 20: Add Error Handling**
- Try-catch blocks in services
- Error boundaries for components
- User-friendly error messages

### 3.3 Component Development Templates

#### Template for Each Component:
```javascript
// Component Name: [ComponentName]
// File: src/components/[path]/[ComponentName].js
// Purpose: [Brief description]
// Props: [List of props and types]
// State: [Local state variables]
// Dependencies: [Required imports]

import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ComponentName = ({ prop1, prop2 }) => {
  // Local state
  const [localState, setLocalState] = useState(initialValue);
  
  // Context
  const { globalState, updateGlobalState } = useContext(AppContext);
  
  // Event handlers
  const handleEvent = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### 3.4 Testing Checklist for Each Component

For AI IDE to verify each component:
1. Component renders without errors
2. Props are properly typed and used
3. Event handlers work correctly
4. Responsive design functions on all breakpoints
5. Accessibility attributes are present
6. Loading states display correctly
7. Error states are handled gracefully

### 3.5 Mock Data Structure

Each mock product should have this exact structure:
```javascript
{
  id: "unique-id",
  title: "Product Title",
  description: "Detailed description...",
  price: {
    current: 999,
    original: 1299,
    currency: "₹"
  },
  images: ["image-url-1", "image-url-2"],
  rating: {
    average: 4.2,
    count: 156
  },
  platform: {
    name: "Amazon",
    logo: "/images/logos/amazon.png",
    url: "https://amazon.in/product/...",
    color: "#FF9900"
  },
  category: "Electronics",
  brand: "Samsung",
  availability: true,
  specifications: {
    "Display": "6.1 inch",
    "Storage": "128GB",
    "RAM": "8GB"
  }
}
```

### 3.6 Implementation Priority Queue

Execute in this exact order:
1. Project setup and dependencies
2. Mock data service
3. Basic component shells
4. State management setup
5. Component logic implementation
6. Styling and responsive design
7. Integration testing
8. Polish and optimization

This structured approach ensures the AI IDE can build the application systematically with clear checkpoints and validation at each step.