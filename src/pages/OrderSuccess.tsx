
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, CreditCard } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Order</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">Order ID</span>
                </div>
                <p className="text-lg font-mono">{orderDetails.orderId}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">Total Amount</span>
                </div>
                <p className="text-lg font-bold text-green-600">₹{orderDetails.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{orderDetails.items} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="capitalize">
                    {orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     orderDetails.paymentMethod === 'upi' ? 'UPI Payment' : 'Card Payment'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll send you an order confirmation email shortly</li>
                <li>• Your order will be processed within 1-2 business days</li>
                <li>• You'll receive tracking information once shipped</li>
                <li>• Expected delivery: 3-5 business days</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={() => navigate('/')} className="flex-1">
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate('/medicines')} className="flex-1">
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
