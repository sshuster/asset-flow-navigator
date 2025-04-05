
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, ExternalLink } from 'lucide-react';
import { pricingTiers } from '@/utils/mockData';

const Feature = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckIcon className="h-4 w-4 text-financial-up flex-shrink-0" />
      <span className="text-sm">{children}</span>
    </div>
  );
};

const PricingCard = ({ tier, popularIndex }: { tier: typeof pricingTiers[0]; popularIndex: number }) => {
  const isHighlighted = tier.highlighted;
  
  return (
    <Card className={`flex flex-col h-full ${isHighlighted ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader className={isHighlighted ? 'bg-primary/5 rounded-t-lg' : ''}>
        {isHighlighted && (
          <Badge className="w-fit mb-2" variant="secondary">Most Popular</Badge>
        )}
        <CardTitle>{tier.title}</CardTitle>
        <div className="flex items-end">
          <span className="text-3xl font-bold">${tier.price}</span>
          <span className="text-muted-foreground ml-1">/{tier.period}</span>
        </div>
        <CardDescription>{tier.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3 mt-2">
          {tier.features.map((feature, index) => (
            <Feature key={index}>{feature}</Feature>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isHighlighted ? 'default' : 'outline'}>
          {tier.buttonText}
          {popularIndex === 2 && <ExternalLink className="h-4 w-4 ml-2" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

const FAQ = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">How are the trading strategies developed?</h3>
        <p className="text-muted-foreground">Our strategies are developed by a team of experienced financial analysts and data scientists using advanced quantitative models, machine learning techniques, and comprehensive market analysis.</p>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Can I cancel my subscription anytime?</h3>
        <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will remain active until the end of your current billing period.</p>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-lg font-medium">How often are strategies updated?</h3>
        <p className="text-muted-foreground">Our strategies are continuously monitored and updated as market conditions change. Major updates typically occur weekly, with real-time adjustments when necessary.</p>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Do you offer a trial period?</h3>
        <p className="text-muted-foreground">Yes, we offer a 14-day free trial for new users. You can access all features of the Basic plan during this period with no credit card required.</p>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Is historical performance data available?</h3>
        <p className="text-muted-foreground">Yes, we provide comprehensive historical performance data for all strategies, including drawdowns, volatility metrics, and comparison to relevant benchmarks.</p>
      </div>
    </div>
  );
};

const PricingPage: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Choose the Right Plan for Your Investment Needs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Access powerful trading strategies across multiple asset classes with our flexible subscription options.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} popularIndex={index} />
          ))}
        </div>
        
        <div className="mt-12 bg-muted/50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <FAQ />
        </div>
        
        <div className="mt-12 text-center border-t pt-12">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            We offer tailored enterprise solutions for institutional investors, family offices, and wealth management firms.
          </p>
          <Button size="lg">
            Contact our Sales Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
