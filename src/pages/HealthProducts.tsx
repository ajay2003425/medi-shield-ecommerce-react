
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Star, Heart } from "lucide-react";
import { toast } from "sonner";

const HealthProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products", icon: "🏥" },
    { id: "fitness", name: "Fitness", icon: "💪" },
    { id: "supplements", name: "Supplements", icon: "💊" },
    { id: "personal-care", name: "Personal Care", icon: "🧴" },
    { id: "baby-care", name: "Baby Care", icon: "👶" },
    { id: "elderly-care", name: "Elderly Care", icon: "👴" }
  ];

  const products = [
    {
      id: 1,
      name: "Whey Protein Isolate",
      brand: "MuscleTech",
      price: 2499.00,
      originalPrice: 2999.00,
      image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop",
      category: "fitness",
      rating: 4.5,
      reviews: 1250,
      description: "Premium quality protein for muscle building",
      inStock: true,
      discount: 17,
      bestseller: true
    },
    {
      id: 2,
      name: "Multivitamin Tablets",
      brand: "Centrum",
      price: 899.00,
      originalPrice: 1099.00,
      image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop",
      category: "supplements",
      rating: 4.3,
      reviews: 890,
      description: "Complete daily vitamin and mineral support",
      inStock: true,
      discount: 18,
      bestseller: false
    },
    {
      id: 3,
      name: "Anti-Aging Face Serum",
      brand: "Olay",
      price: 1299.00,
      originalPrice: 1499.00,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      category: "personal-care",
      rating: 4.6,
      reviews: 640,
      description: "Advanced anti-aging formula with retinol",
      inStock: true,
      discount: 13,
      bestseller: true
    },
    {
      id: 4,
      name: "Baby Moisturizing Lotion",
      brand: "Johnson's",
      price: 299.00,
      originalPrice: 350.00,
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=300&fit=crop",
      category: "baby-care",
      rating: 4.7,
      reviews: 420,
      description: "Gentle moisturizing lotion for baby's delicate skin",
      inStock: true,
      discount: 15,
      bestseller: false
    },
    {
      id: 5,
      name: "Yoga Mat Premium",
      brand: "Decathlon",
      price: 1599.00,
      originalPrice: 1899.00,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
      category: "fitness",
      rating: 4.4,
      reviews: 760,
      description: "Non-slip exercise mat for yoga and workouts",
      inStock: true,
      discount: 16,
      bestseller: false
    },
    {
      id: 6,
      name: "Omega-3 Fish Oil",
      brand: "Nordic Naturals",
      price: 1899.00,
      originalPrice: 2199.00,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      category: "supplements",
      rating: 4.8,
      reviews: 340,
      description: "High-quality omega-3 fatty acids for heart health",
      inStock: true,
      discount: 14,
      bestseller: true
    },
    {
      id: 7,
      name: "Walking Stick Premium",
      brand: "Medicare",
      price: 899.00,
      originalPrice: 1099.00,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop",
      category: "elderly-care",
      rating: 4.2,
      reviews: 180,
      description: "Adjustable walking stick with ergonomic handle",
      inStock: true,
      discount: 18,
      bestseller: false
    },
    {
      id: 8,
      name: "Vitamin C Serum",
      brand: "The Ordinary",
      price: 799.00,
      originalPrice: 999.00,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop",
      category: "personal-care",
      rating: 4.5,
      reviews: 520,
      description: "Brightening vitamin C serum for glowing skin",
      inStock: false,
      discount: 20,
      bestseller: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    if (!product.inStock) {
      toast.error("This product is currently out of stock");
      return;
    }
    toast.success(`${product.name} added to cart!`);
  };

  const addToWishlist = (product) => {
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Products</h1>
          <p className="text-gray-600">Wellness products for a healthier lifestyle</p>
        </div>

        {/* Search and Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search health products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex flex-col items-center p-3 h-auto"
              >
                <span className="text-lg mb-1">{category.icon}</span>
                <span className="text-xs text-center">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount > 0 && (
                    <Badge className="bg-red-500">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  {product.bestseller && (
                    <Badge className="bg-orange-500">
                      Bestseller
                    </Badge>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => addToWishlist(product)}
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthProducts;
