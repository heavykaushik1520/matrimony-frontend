import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/lib/utils';

const Plans = () => {
  const { 
    membershipActive, 
    membershipPlanName, 
    membershipExpiry,
    buySilver, 
    buyGold,
    purchasePlan,
    fetchMembershipStatus,
    isAuthenticated 
  } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handlePurchase = async (plan) => {
    setLoading(true);
    try {
      const success = await purchasePlan(plan);
      if (success) {
        await fetchMembershipStatus();
      }
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      id: 'silver',
      name: 'Silver Plan',
      price: 999,
      duration: '1 Month',
      months: 1,
      features: [
        'Access to view all profiles',
        'Basic search filters',
        'View profile details',
        'Contact information access',
        'Email support'
      ],
      icon: Sparkles,
      color: 'from-gray-500 to-gray-700',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      popular: false
    },
    {
      id: 'gold',
      name: 'Gold Plan',
      price: 1999,
      duration: '3 Months',
      months: 3,
      features: [
        'Everything in Silver Plan',
        'Advanced search filters',
        'Priority profile matching',
        'Unlimited profile views',
        'Priority email support',
        'Best value - Save ₹998'
      ],
      icon: Crown,
      color: 'from-yellow-400 to-orange-500',
      buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
      popular: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Plan</h1>
        <p className="text-gray-600">Unlock access to view profiles and find your perfect match</p>
      </div>

      {/* Current Membership Status */}
      {membershipActive && (
        <Card className="mb-8 border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-600 text-white">Active</Badge>
                  <span className="font-semibold text-gray-800">
                    {membershipPlanName || 'Membership'} Plan
                  </span>
                </div>
                {membershipExpiry && (
                  <p className="text-sm text-gray-600">
                    Expires on: {formatDate(membershipExpiry, 'long')}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/matches')}
                className="border-green-600 text-green-700 hover:bg-green-50"
              >
                View Profiles
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = membershipActive && membershipPlanName === plan.name.replace(' Plan', '');
          
          return (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden ${plan.popular ? 'border-2 border-orange-400 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  BEST VALUE
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${plan.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.duration}</CardDescription>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.duration.toLowerCase()}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {isCurrentPlan ? (
                  <Button 
                    disabled 
                    className="w-full bg-gray-300 text-gray-600 cursor-not-allowed"
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePurchase(plan.id)}
                    disabled={loading}
                    className={`w-full text-white ${plan.buttonColor} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Buy ${plan.name} - ₹${plan.price}`
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Info Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">How it works:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Choose a plan that suits your needs</li>
            <li>Complete secure payment via Razorpay</li>
            <li>Get instant access to view all profiles</li>
            <li>Start connecting with potential matches</li>
          </ol>
          <div className="mt-4 p-3 bg-white rounded border border-blue-200">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> All payments are secure and processed through Razorpay. 
              Your membership will be activated immediately after successful payment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Plans;

