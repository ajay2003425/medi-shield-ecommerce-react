
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Star, Heart } from "lucide-react";
import { toast } from "sonner";

// Helper: fetch health products from Supabase
const fetchHealthProducts = async () => {
  // First, fetch the categories to find ID for "Health Products" (if needed)
  const { data: category, error: catErr } = await supabase
    .from("categories")
    .select("id")
    .eq("name", "Health Products")
    .maybeSingle();

  if (catErr || !category) throw new Error("Category not found");

  // Now fetch products in that category
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id);

  if (error) throw error;

  return data ?? [];
};

const HealthProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categories (you might want to fetch these dynamically as well)
  const categories = [
    { id: "all", name: "All Products", icon: "🏥" },
    { id: "fitness", name: "Fitness", icon: "💪" },
    { id: "supplements", name: "Supplements", icon: "💊" },
    { id: "personal-care", name: "Personal Care", icon: "🧴" },
    { id: "baby-care", name: "Baby Care", icon: "👶" },
    { id: "elderly-care", name: "Elderly Care", icon: "👴" }
  ];

  // Fetch products from Supabase
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["health-products"],
    queryFn: fetchHealthProducts,
  });

  // Filtering & searching logic
  const filteredProducts = (products ?? []).filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    // Map category_id to human-readable category (if you want better filtering, add map from category_id to type)
    const matchesCategory =
      selectedCategory === "all" ||
      (product.category_id &&
        categories.find((c) => c.id === selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    if (!product.stock || product.stock <= 0) {
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

        {/* Result counts, loading, error */}
        <div className="mb-6">
          {isLoading && (
            <p className="text-gray-600">Loading products...</p>
          )}
          {error && (
            <p className="text-red-500">Failed to load products. {error.message}</p>
          )}
          {!isLoading && !error && (
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
          )}
        </div>

        {/* Products grid or skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading &&
            Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} className="animate-pulse h-80 bg-gray-200" />
            ))
          }
          {!isLoading && filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={product.image_url ?? ""}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount && (
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

                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.brand || product.manufacturer}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">
                      {product.rating ?? "4.5"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews ?? "100+"})
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{Number(product.price).toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{Number(product.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => addToCart(product)}
                  disabled={!product.stock || product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock && product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthProducts;
