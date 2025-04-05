
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BarChart3, BarChart4, ChartPie, LineChart, ShieldCheck, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => {
  return (
    <Card>
      <CardHeader>
        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-navy-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy-700">
              Advanced Trading Strategies <br className="hidden md:block" />
              for the Modern Investor
            </h1>
            <p className="text-xl text-navy-500 mb-8 max-w-3xl mx-auto">
              Access professional-grade multi-asset investment strategies that adapt to market conditions in real-time
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-5xl mx-auto">
              <div className="aspect-w-16 aspect-h-9 bg-navy-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-navy-300" />
                  <span className="text-navy-500 text-xl ml-4">Strategy Dashboard Demo</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose StrategyHub</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our platform combines advanced financial analysis with cutting-edge technology to deliver exceptional trading strategies
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={ChartPie}
                title="Multi-Asset Strategies"
                description="Access diversified strategies across stocks, bonds, commodities, FX, crypto, and real estate for balanced portfolio construction."
              />
              <FeatureCard 
                icon={BarChart4}
                title="Real-Time Monitoring"
                description="Track strategy performance with real-time data updates and comprehensive performance analytics."
              />
              <FeatureCard 
                icon={LineChart}
                title="Advanced Analytics"
                description="Gain insights through sophisticated risk metrics, correlation analysis, and historical backtesting."
              />
              <FeatureCard 
                icon={TrendingUp}
                title="Personalized Recommendations"
                description="Receive strategy recommendations tailored to your investment preferences and risk tolerance."
              />
              <FeatureCard 
                icon={Bell}
                title="Smart Alerts"
                description="Get timely notifications about market opportunities and risks affecting your portfolio."
              />
              <FeatureCard 
                icon={ShieldCheck}
                title="Risk Management"
                description="Implement advanced risk management techniques to protect your capital during market downturns."
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-navy-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join thousands of investors who are already benefiting from our trading strategies
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-navy-200 flex items-center justify-center mr-3">
                      <span className="font-medium text-navy-700">JD</span>
                    </div>
                    <div>
                      <h4 className="font-medium">John D.</h4>
                      <p className="text-sm text-muted-foreground">Individual Investor</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The multi-asset strategies have transformed my approach to investing. My portfolio is more resilient during market turbulence."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-navy-200 flex items-center justify-center mr-3">
                      <span className="font-medium text-navy-700">SM</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah M.</h4>
                      <p className="text-sm text-muted-foreground">Financial Advisor</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I've been able to offer my clients institutional-quality strategies that were previously only available to large asset managers."
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-navy-200 flex items-center justify-center mr-3">
                      <span className="font-medium text-navy-700">RK</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Robert K.</h4>
                      <p className="text-sm text-muted-foreground">Family Office</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The risk management alerts have saved us from significant drawdowns multiple times. The platform pays for itself."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-navy-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Investment Approach?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of investors who are already benefiting from our professional trading strategies
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Now
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:text-navy-600">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
