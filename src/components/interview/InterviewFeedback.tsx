import React from 'react';
import { ThumbsUp, AlertCircle, Lightbulb } from 'lucide-react';

type FeedbackProps = {
  strengths: string[];
  improvements: string[];
  suggestions: string[];
};

export function InterviewFeedback({ strengths, improvements, suggestions }: FeedbackProps) {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ThumbsUp className="h-5 w-5 text-green-600" />
          <h3 className="font-medium text-green-900">Strengths</h3>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {strengths.map((strength, index) => (
            <li key={index} className="text-green-700">{strength}</li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <h3 className="font-medium text-yellow-900">Areas for Improvement</h3>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {improvements.map((improvement, index) => (
            <li key={index} className="text-yellow-700">{improvement}</li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-blue-900">Suggestions</h3>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-blue-700">{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}