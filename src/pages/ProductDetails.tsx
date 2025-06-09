
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string;
  description: string;
  requires_prescription: boolean;
  stock: number;
  manufacturer: string;
  dosage: string;
  side_effects: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/medicines');
    } else {
      setProduct(data);
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Button onClick={() => navigate('/medicines')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Medicines
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-6">
            <img
              src={product.image_url || "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&h=500&fit=crop"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg p-6">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.brand}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">4.5</span>
                </div>
                <span className="text-sm text-gray-500 ml-2">(150+ reviews)</span>
              </div>
            </div>

            {product.requires_prescription && (
              <Badge className="bg-orange-500 mb-4">
                Prescription Required
              </Badge>
            )}

            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ₹{product.price.toFixed(2)}
              </span>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.stock} items available
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full mb-4"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                  
                  {product.side_effects && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Side Effects</h4>
                      <p className="text-gray-700">{product.side_effects}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Storage Instructions</h4>
                      <p className="text-gray-700">Store in a cool, dry place away from direct sunlight. Keep out of reach of children.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Usage Instructions</h4>
                      <p className="text-gray-700">Take as directed by your healthcare provider. Do not exceed recommended dosage.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900">Brand:</span>
                        <span className="ml-2 text-gray-700">{product.brand}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Manufacturer:</span>
                        <span className="ml-2 text-gray-700">{product.manufacturer || "Not specified"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Dosage:</span>
                        <span className="ml-2 text-gray-700">{product.dosage || "As prescribed"}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900">Stock:</span>
                        <span className="ml-2 text-gray-700">{product.stock} units</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Prescription Required:</span>
                        <span className="ml-2 text-gray-700">{product.requires_prescription ? "Yes" : "No"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Expiry Date:</span>
                        <span className="ml-2 text-gray-700">12/2025</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">John Doe</span>
                      </div>
                      <p className="text-gray-700">Excellent product! Fast delivery and good quality. Highly recommended.</p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[1,2,3,4].map(i => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="ml-2 font-medium">Jane Smith</span>
                      </div>
                      <p className="text-gray-700">Good product, works as expected. Packaging could be better.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
