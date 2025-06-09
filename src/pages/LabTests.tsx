
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, MapPin, Star, TestTube } from "lucide-react";
import { toast } from "sonner";

const LabTests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Tests" },
    { id: "popular", name: "Popular Tests" },
    { id: "packages", name: "Health Packages" },
    { id: "diabetes", name: "Diabetes" },
    { id: "heart", name: "Heart Health" },
    { id: "thyroid", name: "Thyroid" }
  ];

  const labTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis including RBC, WBC, platelets",
      price: 299.00,
      originalPrice: 450.00,
      category: "popular",
      duration: "4-6 hours",
      fasting: true,
      rating: 4.8,
      reviews: 1250,
      discount: 33,
      parameters: 22,
      popular: true
    },
    {
      id: 2,
      name: "Lipid Profile",
      description: "Cholesterol and triglycerides assessment for heart health",
      price: 399.00,
      originalPrice: 599.00,
      category: "heart",
      duration: "6-8 hours",
      fasting: true,
      rating: 4.7,
      reviews: 890,
      discount: 33,
      parameters: 8,
      popular: true
    },
    {
      id: 3,
      name: "Thyroid Function Test (TFT)",
      description: "T3, T4, TSH levels to assess thyroid function",
      price: 499.00,
      originalPrice: 699.00,
      category: "thyroid",
      duration: "4-6 hours",
      fasting: false,
      rating: 4.6,
      reviews: 640,
      discount: 29,
      parameters: 3,
      popular: true
    },
    {
      id: 4,
      name: "HbA1c (Diabetes)",
      description: "3-month average blood sugar levels",
      price: 349.00,
      originalPrice: 499.00,
      category: "diabetes",
      duration: "2-4 hours",
      fasting: false,
      rating: 4.9,
      reviews: 420,
      discount: 30,
      parameters: 1,
      popular: false
    },
    {
      id: 5,
      name: "Comprehensive Health Package",
      description: "Complete health checkup with 65+ parameters",
      price: 1999.00,
      originalPrice: 3500.00,
      category: "packages",
      duration: "Same day",
      fasting: true,
      rating: 4.8,
      reviews: 760,
      discount: 43,
      parameters: 65,
      popular: true
    },
    {
      id: 6,
      name: "Vitamin D Test",
      description: "Vitamin D deficiency assessment",
      price: 899.00,
      originalPrice: 1299.00,
      category: "popular",
      duration: "24-48 hours",
      fasting: false,
      rating: 4.5,
      reviews: 340,
      discount: 31,
      parameters: 1,
      popular: false
    }
  ];

  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const bookTest = (test) => {
    toast.success(`${test.name} booking initiated! You'll be redirected to schedule.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Tests</h1>
          <p className="text-gray-600">Book lab tests from the comfort of your home</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="flex items-center p-4">
              <MapPin className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-green-900">Home Sample Collection</h3>
                <p className="text-sm text-green-700">Free collection at your doorstep</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="flex items-center p-4">
              <Clock className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-blue-900">Quick Results</h3>
                <p className="text-sm text-blue-700">Reports in 6-24 hours</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="flex items-center p-4">
              <TestTube className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold text-purple-900">Certified Labs</h3>
                <p className="text-sm text-purple-700">NABL accredited laboratories</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search lab tests..."
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
            Showing {filteredTests.length} lab tests
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 text-gray-900">
                      {test.name}
                      {test.popular && (
                        <Badge className="ml-2 bg-orange-500">Popular</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                  {test.discount > 0 && (
                    <Badge className="bg-red-500 ml-2">
                      {test.discount}% OFF
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price and Rating */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{test.price.toFixed(2)}
                    </span>
                    {test.discount > 0 && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{test.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{test.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({test.reviews})</span>
                  </div>
                </div>

                {/* Test Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Results in {test.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <TestTube className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{test.parameters} parameters</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      test.fasting 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {test.fasting ? 'Fasting Required' : 'No Fasting'}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <Button 
                  className="w-full"
                  onClick={() => bookTest(test)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book This Test
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No lab tests found matching your criteria.</p>
          </div>
        )}

        {/* FAQ Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Book Online</h3>
                <p className="text-sm text-gray-600">Select your test and schedule a convenient time</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Sample Collection</h3>
                <p className="text-sm text-gray-600">Our trained phlebotomist visits your home</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-gray-600">Receive digital reports via email/SMS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabTests;
