import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Play, Pause, Save, Download } from 'lucide-react';
import { generateInterviewResponse } from '../../services/interviewService';
import toast from 'react-hot-toast';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
};

type InterviewMode = 'practice' | 'feedback' | 'preparation';

export function InterviewAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<InterviewMode>('preparation');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your interview assistant. How can I help you prepare for your interview today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await generateInterviewResponse(input, mode);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to generate response');
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: InterviewMode) => {
    setMode(newMode);
    const modeMessages = {
      preparation: 'Let\'s prepare for your interview. What role are you interviewing for?',
      practice: 'Ready for practice questions? I\'ll simulate a real interview experience.',
      feedback: 'I\'ll analyze your responses and provide detailed feedback. Ready to begin?'
    };

    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: modeMessages[newMode],
        timestamp: new Date()
      }
    ]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  const saveSession = async () => {
    try {
      // TODO: Implement session saving
      toast.success('Session saved successfully');
    } catch (error) {
      toast.error('Failed to save session');
    }
  };

  const downloadTranscript = () => {
    const transcript = messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}\n`)
      .join('\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Interview Assistant</h2>
          <div className="flex gap-4">
            <button
              onClick={saveSession}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <Save className="h-5 w-5" />
              Save
            </button>
            <button
              onClick={downloadTranscript}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <Download className="h-5 w-5" />
              Download
            </button>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex gap-4 mb-6">
          {(['preparation', 'practice', 'feedback'] as InterviewMode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-4 py-2 rounded-lg capitalize ${
                mode === m
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="h-[500px] mb-6 overflow-y-auto border rounded-lg p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex gap-4">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-lg ${
              isRecording
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isRecording ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={3}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="self-end px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}