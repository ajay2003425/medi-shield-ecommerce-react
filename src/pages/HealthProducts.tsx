import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import StarRating from "@/components/StarRating";

// --- EXTEND PRODUCT TYPE LOCALLY ---
export type Product = {
  id: string;
  name: string;
  brand?: string | null;
  manufacturer?: string | null;
  description?: string | null;
  image_url?: string | null;
  category_id?: string | null;
  dosage?: string | null;
  price: number;
  original_price?: number | null;
  discount?: number | null;
  bestseller?: boolean | null;
  rating?: number | null;
  reviews?: { author: string; comment: string; stars: number }[] | null;
  stock?: number | null;
  requires_prescription?: boolean | null;
  side_effects?: string | null;
  created_at?: string;
  updated_at?: string;
};

const fetchCategories = async () => {
  // Fetch only categories that have products in them
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, icon");
  if (error) throw error;
  return data ?? [];
};

const fetchHealthProducts = async (): Promise<Product[]> => {
  const { data: category, error: catErr } = await supabase
    .from("categories")
    .select("id")
    .eq("name", "Health Products")
    .maybeSingle();

  if (catErr || !category) throw new Error("Category not found");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id);

  if (error) throw error;

  // Optional: ensure reviews parsed if needed
  return (data ?? []).map((p) => ({
    ...p,
    reviews: Array.isArray(p.reviews)
      ? p.reviews
      : (typeof p.reviews === "string" ? JSON.parse(p.reviews) : []),
  }));
};

// Placeholder image
const PLACEHOLDER_IMAGE = "/placeholder.svg"; // Use a static asset

const HealthProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoriesDb, setCategoriesDb] = useState<
    { id: string; name: string; icon?: string | null }[]
  >([]);
  const [catLoading, setCatLoading] = useState(true);

  useEffect(() => {
    // Get all categories from DB on mount
    const fetch = async () => {
      setCatLoading(true);
      try {
        const cats = await fetchCategories();
        setCategoriesDb([
          { id: "all", name: "All Products", icon: "🌈" },
          ...cats.map((c) => ({
            id: c.id,
            name: c.name,
            icon: c.icon || "🏥",
          })),
        ]);
      } catch {
        setCategoriesDb([{ id: "all", name: "All Products", icon: "🌈" }]);
      }
      setCatLoading(false);
    };
    fetch();
  }, []);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["health-products"],
    queryFn: fetchHealthProducts,
  });

  // Robust search: also match description
  const filteredProducts = (products ?? []).filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (product.category_id && product.category_id === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    if (!product.stock || product.stock <= 0) {
      toast.error("This product is currently out of stock");
      return;
    }
    toast.success(`${product.name} added to cart!`);
  };

  const addToWishlist = (product: Product) => {
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
            {(catLoading
              ? Array.from({ length: 6 })
              : categoriesDb
            ).map((category, idx) => (
              catLoading ? (
                <div
                  key={idx}
                  className="h-14 rounded bg-gray-100 animate-pulse"
                />
              ) : (
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
              )
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
                {/* Lazy loading image with fallback */}
                <img
                  src={product.image_url ?? PLACEHOLDER_IMAGE}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount && Number(product.discount) > 0 && (
                    <Badge className="bg-red-500">
                      -{Number(product.discount)}%
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
                  <StarRating rating={typeof product.rating === "number" ? product.rating : 0} />
                  <span className="text-sm text-gray-500 ml-2">
                    ({Array.isArray(product.reviews) ? product.reviews.length : 0})
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    {product.original_price && (
                      <span className="text-sm text-gray-500 line-through mr-1">
                        ₹{Number(product.original_price).toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-gray-900">
                      ₹{Number(product.price).toFixed(2)}
                    </span>
                    {product.discount && Number(product.discount) > 0 && (
                      <Badge className="bg-red-500">
                        -{Number(product.discount)}%
                      </Badge>
                    )}
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
