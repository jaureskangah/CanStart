import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'What are the basic requirements to start a business in Canada?',
    answer: 'To start a business in Canada, you need to: 1) Choose a business structure, 2) Register your business name, 3) Obtain necessary licenses and permits, 4) Register for tax accounts, and 5) Set up proper business insurance.',
    category: 'Getting Started'
  },
  {
    id: '2',
    question: 'How long does it take to register a business?',
    answer: 'The registration process typically takes 1-5 business days for a sole proprietorship or partnership, and 5-10 business days for a corporation, depending on the province and registration method.',
    category: 'Registration'
  },
  {
    id: '3',
    question: 'What tax obligations do new businesses have?',
    answer: 'New businesses must register for GST/HST if annual revenue exceeds $30,000, collect and remit sales tax, file corporate income tax returns, and possibly register for payroll accounts if hiring employees.',
    category: 'Taxes'
  },
  {
    id: '4',
    question: 'Are there special programs for immigrant entrepreneurs?',
    answer: 'Yes, Canada offers several programs including the Start-up Visa Program, Self-employed Persons Program, and various provincial nominee programs specifically for entrepreneurs.',
    category: 'Immigration'
  },
  {
    id: '5',
    question: 'What funding options are available for new businesses?',
    answer: 'Funding options include government grants, loans from financial institutions, angel investors, venture capital, crowdfunding, and specific immigrant entrepreneur funding programs.',
    category: 'Funding'
  }
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const toggleItem = (id: string) => {
    setOpenItems(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openItems.includes(faq.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openItems.includes(faq.id) && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No questions found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}