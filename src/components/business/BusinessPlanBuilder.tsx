import React, { useState } from 'react';
import { FileText, Download, Save } from 'lucide-react';
import { RichTextEditor } from '../RichTextEditor';
import toast from 'react-hot-toast';

type BusinessPlanSection = {
  id: string;
  title: string;
  content: string;
  tips: string[];
};

export function BusinessPlanBuilder() {
  const [sections, setSections] = useState<BusinessPlanSection[]>([
    {
      id: 'executive',
      title: 'Executive Summary',
      content: '',
      tips: [
        'Write this section last',
        'Keep it clear and concise',
        'Highlight key business goals'
      ]
    },
    {
      id: 'description',
      title: 'Business Description',
      content: '',
      tips: [
        'Explain your business model',
        'Define your target market',
        'Describe your products/services'
      ]
    },
    {
      id: 'market',
      title: 'Market Analysis',
      content: '',
      tips: [
        'Research your industry',
        'Analyze competitors',
        'Identify market trends'
      ]
    },
    {
      id: 'strategy',
      title: 'Marketing Strategy',
      content: '',
      tips: [
        'Define your unique value proposition',
        'Outline marketing channels',
        'Set pricing strategy'
      ]
    },
    {
      id: 'operations',
      title: 'Operations Plan',
      content: '',
      tips: [
        'Describe daily operations',
        'List required equipment',
        'Outline staffing needs'
      ]
    },
    {
      id: 'financial',
      title: 'Financial Projections',
      content: '',
      tips: [
        'Include startup costs',
        'Project revenue for 3-5 years',
        'Calculate break-even point'
      ]
    }
  ]);

  const [activeSection, setActiveSection] = useState(sections[0].id);

  const handleContentChange = (sectionId: string, content: string) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, content } : section
    ));
  };

  const handleSave = async () => {
    try {
      // TODO: Implement save functionality
      toast.success('Business plan saved successfully');
    } catch (error) {
      toast.error('Failed to save business plan');
    }
  };

  const handleDownload = () => {
    try {
      // TODO: Implement PDF generation
      toast.success('Business plan downloaded as PDF');
    } catch (error) {
      toast.error('Failed to download business plan');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Business Plan Builder</h2>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Save className="h-5 w-5" />
            Save Draft
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {/* Section Navigation */}
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-red-50 text-red-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{section.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Content Editor */}
        <div className="col-span-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className={activeSection === section.id ? 'block' : 'hidden'}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              
              <div className="mb-6">
                <RichTextEditor
                  content={section.content}
                  onChange={(content) => handleContentChange(section.id, content)}
                />
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Tips</h4>
                <ul className="list-disc list-inside space-y-1">
                  {section.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-yellow-700">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}