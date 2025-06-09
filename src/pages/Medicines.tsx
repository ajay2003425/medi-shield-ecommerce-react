
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Medicines" },
    { id: "prescription", name: "Prescription" },
    { id: "otc", name: "Over the Counter" },
    { id: "ayurvedic", name: "Ayurvedic" },
    { id: "homeopathy", name: "Homeopathy" }
  ];

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "Crocin",
      price: 25.50,
      originalPrice: 30.00,
      image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&h=300&fit=crop",
      category: "otc",
      rating: 4.5,
      reviews: 1250,
      description: "Effective pain relief and fever reducer",
      prescription: false,
      inStock: true,
      discount: 15
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      brand: "Amoxil",
      price: 85.00,
      originalPrice: 85.00,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      category: "prescription",
      rating: 4.7,
      reviews: 890,
      description: "Antibiotic for bacterial infections",
      prescription: true,
      inStock: true,
      discount: 0
    },
    {
      id: 3,
      name: "Vitamin D3 Tablets",
      brand: "HealthVit",
      price: 180.00,
      originalPrice: 220.00,
      image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop",
      category: "otc",
      rating: 4.3,
      reviews: 640,
      description: "Essential vitamin for bone health",
      prescription: false,
      inStock: true,
      discount: 18
    },
    {
      id: 4,
      name: "Ashwagandha Capsules",
      brand: "Himalaya",
      price: 320.00,
      originalPrice: 380.00,
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop",
      category: "ayurvedic",
      rating: 4.6,
      reviews: 420,
      description: "Natural stress relief and immunity booster",
      prescription: false,
      inStock: true,
      discount: 16
    },
    {
      id: 5,
      name: "Omeprazole 20mg",
      brand: "Prilosec",
      price: 145.00,
      originalPrice: 145.00,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
      category: "prescription",
      rating: 4.4,
      reviews: 760,
      description: "Acid reflux and heartburn relief",
      prescription: true,
      inStock: false,
      discount: 0
    },
    {
      id: 6,
      name: "Arnica Montana 30C",
      brand: "Boiron",
      price: 240.00,
      originalPrice: 280.00,
      image: "https://images.unsplash.com/photo-1574781330855-d0db37de30a9?w=300&h=300&fit=crop",
      category: "homeopathy",
      rating: 4.2,
      reviews: 180,
      description: "Homeopathic remedy for bruises and injuries",
      prescription: false,
      inStock: true,
      discount: 14
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine) => {
    if (!medicine.inStock) {
      toast.error("This medicine is currently out of stock");
      return;
    }
    if (medicine.prescription) {
      toast.warning("Prescription required. Please upload your prescription.");
      return;
    }
    toast.success(`${medicine.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medicines</h1>
          <p className="text-gray-600">Find the right medicine for your needs</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search medicines by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMedicines.length} medicines
          </p>
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-48 object-cover"
                />
                {medicine.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    {medicine.discount}% OFF
                  </Badge>
                )}
                {!medicine.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
                {medicine.prescription && (
                  <Badge className="absolute top-2 right-2 bg-orange-500">
                    Rx Required
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 mb-1">{medicine.name}</h3>
                  <p className="text-sm text-gray-600">{medicine.brand}</p>
                </div>

                <p className="text-sm text-gray-600 mb-3">{medicine.description}</p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{medicine.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({medicine.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{medicine.price.toFixed(2)}
                    </span>
                    {medicine.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{medicine.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => addToCart(medicine)}
                  disabled={!medicine.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {medicine.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No medicines found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;
