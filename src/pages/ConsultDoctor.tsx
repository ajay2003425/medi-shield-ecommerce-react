
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Clock, Star, Calendar, Shield, Award, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ConsultDoctor = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    symptoms: "",
    preferredDate: "",
    preferredTime: ""
  });

  const specializations = [
    {
      id: "general",
      name: "General Medicine",
      icon: "🩺",
      description: "Common health issues and preventive care",
      consultationFee: 299,
      avgRating: 4.7,
      doctorsCount: 150
    },
    {
      id: "dermatology",
      name: "Dermatology",
      icon: "🔬",
      description: "Skin, hair, and nail related problems",
      consultationFee: 499,
      avgRating: 4.8,
      doctorsCount: 45
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      icon: "👶",
      description: "Child health and development",
      consultationFee: 399,
      avgRating: 4.9,
      doctorsCount: 80
    },
    {
      id: "gynecology",
      name: "Gynecology",
      icon: "👩‍⚕️",
      description: "Women's health and reproductive care",
      consultationFee: 449,
      avgRating: 4.8,
      doctorsCount: 65
    },
    {
      id: "cardiology",
      name: "Cardiology",
      icon: "❤️",
      description: "Heart and cardiovascular health",
      consultationFee: 699,
      avgRating: 4.9,
      doctorsCount: 35
    },
    {
      id: "psychiatry",
      name: "Psychiatry",
      icon: "🧠",
      description: "Mental health and counseling",
      consultationFee: 599,
      avgRating: 4.6,
      doctorsCount: 55
    }
  ];

  const doctors = {
    general: [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: 15,
        rating: 4.8,
        reviews: 1250,
        languages: ["English", "Hindi"],
        nextAvailable: "Today, 2:30 PM",
        consultationFee: 299
      },
      {
        id: 2,
        name: "Dr. Priya Sharma",
        qualification: "MBBS, MD (General Medicine)",
        experience: 12,
        rating: 4.7,
        reviews: 980,
        languages: ["English", "Hindi", "Marathi"],
        nextAvailable: "Tomorrow, 10:00 AM",
        consultationFee: 299
      }
    ],
    dermatology: [
      {
        id: 3,
        name: "Dr. Anita Desai",
        qualification: "MBBS, MD (Dermatology)",
        experience: 18,
        rating: 4.9,
        reviews: 750,
        languages: ["English", "Hindi"],
        nextAvailable: "Today, 4:00 PM",
        consultationFee: 499
      }
    ],
    pediatrics: [
      {
        id: 4,
        name: "Dr. Suresh Patel",
        qualification: "MBBS, MD (Pediatrics)",
        experience: 20,
        rating: 4.9,
        reviews: 1100,
        languages: ["English", "Hindi", "Gujarati"],
        nextAvailable: "Today, 6:00 PM",
        consultationFee: 399
      }
    ]
  };

  const selectedSpec = specializations.find(spec => spec.id === selectedSpecialization);
  const availableDoctors = doctors[selectedSpecialization] || [];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const bookConsultation = () => {
    if (!selectedDoctor) {
      toast.error("Please select a doctor first");
      return;
    }
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Consultation booked with ${selectedDoctor.name}! You'll receive a confirmation shortly.`);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      symptoms: "",
      preferredDate: "",
      preferredTime: ""
    });
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Consult Expert Doctors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with certified doctors from the comfort of your home. Get expert medical advice through secure video consultations.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="border-blue-200 bg-blue-50 text-center">
            <CardContent className="p-4">
              <Video className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Video Consultation</h3>
              <p className="text-sm text-blue-700">Face-to-face with doctors</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50 text-center">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900">Secure & Private</h3>
              <p className="text-sm text-green-700">HIPAA compliant platform</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50 text-center">
            <CardContent className="p-4">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900">Certified Doctors</h3>
              <p className="text-sm text-purple-700">Licensed medical professionals</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50 text-center">
            <CardContent className="p-4">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-900">24/7 Available</h3>
              <p className="text-sm text-orange-700">Round-the-clock care</p>
            </CardContent>
          </Card>
        </div>

        {/* Specializations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Specialization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((spec) => (
              <Card 
                key={spec.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedSpecialization === spec.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedSpecialization(spec.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{spec.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{spec.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{spec.avgRating}</span>
                        <span className="mx-2">•</span>
                        <Users className="h-3 w-3 mr-1" />
                        <span>{spec.doctorsCount} doctors</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{spec.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">₹{spec.consultationFee}</span>
                    <Badge variant="secondary">Starting from</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Doctors */}
        {selectedSpecialization && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Available {selectedSpec?.name} Doctors
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableDoctors.map((doctor) => (
                <Card 
                  key={doctor.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.qualification}</p>
                        <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                      </div>
                      <Badge className="bg-green-500">Available</Badge>
                    </div>

                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                      <span className="text-sm text-gray-500 ml-2">({doctor.reviews} reviews)</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span>Next available: {doctor.nextAvailable}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-400 mr-2">Languages:</span>
                        <span>{doctor.languages.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">₹{doctor.consultationFee}</span>
                      <Button 
                        size="sm"
                        variant={selectedDoctor?.id === doctor.id ? "default" : "outline"}
                      >
                        {selectedDoctor?.id === doctor.id ? "Selected" : "Select Doctor"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Booking Form */}
        {selectedDoctor && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Book Consultation with {selectedDoctor.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                          <SelectItem value="16:00">04:00 PM</SelectItem>
                          <SelectItem value="17:00">05:00 PM</SelectItem>
                          <SelectItem value="18:00">06:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="symptoms">Describe Your Symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange("symptoms", e.target.value)}
                  placeholder="Please describe your symptoms or reason for consultation..."
                  rows={4}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Consultation Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Doctor:</span>
                    <span>{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialization:</span>
                    <span>{selectedSpec?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consultation Fee:</span>
                    <span className="font-semibold">₹{selectedDoctor.consultationFee}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full"
                size="lg"
                onClick={bookConsultation}
              >
                <Video className="h-5 w-5 mr-2" />
                Book Video Consultation - ₹{selectedDoctor.consultationFee}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsultDoctor;
