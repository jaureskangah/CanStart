import React, { useState, useEffect, useRef } from 'react';
import { Users, Building2, Clock } from 'lucide-react';

type StatCounterProps = {
  end: number;
  suffix?: string;
  duration?: number;
};

function StatCounter({ end, suffix = '', duration = 2000 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      countRef.current = Math.floor(end * percentage);
      setCount(countRef.current);

      if (percentage < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span className="inline-flex items-baseline">
      <span className="tabular-nums">{count}</span>
      <span>{suffix}</span>
    </span>
  );
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-red-600" />,
      value: 97,
      suffix: '%',
      label: "Success Rate",
      description: "of our clients successfully settle in Canada within their first year"
    },
    {
      icon: <Building2 className="h-6 w-6 text-red-600" />,
      value: 500,
      suffix: '+',
      label: "Partner Companies",
      description: "across major cities providing job opportunities"
    },
    {
      icon: <Clock className="h-6 w-6 text-red-600" />,
      value: 24,
      suffix: '/7',
      label: "Support Available",
      description: "whenever you need help, our team is here for you"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex p-3 bg-red-50 rounded-lg mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {isVisible && <StatCounter end={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-lg font-medium text-gray-900 mb-2">{stat.label}</div>
              <p className="text-gray-600 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}