export type PRICING_PLANS_PROPS = {
  name: string;
  price: string;
  features: string[];
  description: string;
  cta: string;
};

export const PRICING_PLANS: PRICING_PLANS_PROPS[] = [
  {
    name: "Free Plan",
    description: "Perfect for getting started",
    price: "₹0",
    features: [
      "Boost engagement with target responses",
      "Automate comment replies to enhance audience interaction",
      "Turn followers into customers with targeted messaging"
    ],
    cta: "Get Started"
  },
  {
    name: "Smart AI Plan",
    description: "Advanced features for power users",
    price: "₹149",
    features: [
      "All features from Free Plan",
      "AI-powered response generation",
      "Advanced analytics and insights",
      "Priority customer support",
      "Custom branding options"
    ],
    cta: "Upgrade Now"
  }
];
