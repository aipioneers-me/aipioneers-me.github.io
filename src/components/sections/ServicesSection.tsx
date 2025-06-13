
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Rocket, FileSearch } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Calendar className="h-10 w-10 text-accent-blue" />,
      title: "AI Strategy Workshops",
      description: "Tailored sessions to define your organization's AI roadmap, identifying opportunities, challenges, and implementation paths specific to your business context."
    },
    {
      icon: <Rocket className="h-10 w-10 text-accent-blue" />,
      title: "Model Deployment Guidance",
      description: "Practical advice for scalable, responsible AI rollouts, focusing on integration with existing systems, monitoring, and continuous improvement processes."
    },
    {
      icon: <FileSearch className="h-10 w-10 text-accent-blue" />,
      title: "AI Assurance Audits",
      description: "Independent evaluation of AI risks, compliance, and robustness, providing actionable recommendations to enhance system reliability and trustworthiness."
    }
  ];

  return (
    <section id="services" className="bg-white py-20">
      <div className="section-container">
        <h2 className="section-title text-center mb-16">Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="animate-on-scroll border-none shadow-md hover:shadow-lg transition-shadow hover:bg-light-gray">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal/70">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
