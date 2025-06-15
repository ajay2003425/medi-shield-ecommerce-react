import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Heart, TestTube, Video, ShieldCheck, Clock, Award, Users } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Pill className="h-8 w-8 text-blue-600" />,
      title: "Medicines",
      description: "Prescription & OTC medicines delivered to your doorstep",
      link: "/medicines",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: "Health Products",
      description: "Wellness products, supplements & personal care items",
      link: "/health-products",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <TestTube className="h-8 w-8 text-purple-600" />,
      title: "Lab Tests",
      description: "Book lab tests from the comfort of your home",
      link: "/lab-tests",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Video className="h-8 w-8 text-teal-600" />,
      title: "Consult Doctor",
      description: "Connect with certified doctors online",
      link: "/consult-doctor",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "50K+", label: "Happy Customers" },
    { icon: <Award className="h-6 w-6" />, value: "500+", label: "Expert Doctors" },
    { icon: <Clock className="h-6 w-6" />, value: "24/7", label: "Support Available" },
    { icon: <ShieldCheck className="h-6 w-6" />, value: "100%", label: "Secure & Safe" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Health, Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Priority</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Complete healthcare solution at your fingertips. From medicines to consultations, 
              we've got everything you need for a healthier tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/medicines">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  Shop Medicines
                </Button>
              </Link>
              <Link to="/consult-doctor">
                <Button size="lg" variant="outline">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Healthcare Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for your health and wellness journey, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      Explore →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust MediShield for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
