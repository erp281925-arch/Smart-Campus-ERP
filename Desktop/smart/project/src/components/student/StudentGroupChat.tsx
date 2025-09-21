import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Users, MessageCircle, Heart, ThumbsUp } from 'lucide-react';
import { chatMessages } from '@/data/mockData';

const StudentGroupChat: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: (messages.length + 1).toString(),
      sender: 'Anon-005',
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      sentiment: 'neutral'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getOverallSentiment = () => {
    const positiveCount = messages.filter(m => m.sentiment === 'positive').length;
    const negativeCount = messages.filter(m => m.sentiment === 'negative').length;
    const neutralCount = messages.filter(m => m.sentiment === 'neutral').length;

    if (positiveCount > negativeCount && positiveCount > neutralCount) {
      return '😊 Overall Positive';
    } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
      return '😟 Overall Negative';
    } else {
      return '😐 Overall Neutral';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Class Group Chat</h1>
        <p className="text-gray-600">Connect with your classmates anonymously</p>
      </div>

      {/* Chat Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="kpi-card bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online Members</p>
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-xs text-gray-500 mt-1">Active now</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Today</p>
                <p className="text-3xl font-bold text-green-600">47</p>
                <p className="text-xs text-gray-500 mt-1">Class discussions</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mood Score</p>
                <p className="text-3xl font-bold text-purple-600">7.2</p>
                <p className="text-xs text-gray-500 mt-1">Class sentiment</p>
              </div>
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            CSE-K Group Chat
            <Badge className="bg-blue-100 text-blue-800 ml-auto">Anonymous</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`border-l-4 pl-4 py-3 rounded-r-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-800">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                  </div>
                  <div className="flex items-center space-x-1 ml-4">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Heart className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message... (You'll appear as Anon-005)"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="px-6">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Your identity is protected. All messages are anonymous to maintain a safe space for discussion.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chat Guidelines */}
      <Card className="dashboard-card bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">📋 Group Chat Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-700">Do's</h4>
              <ul className="text-sm text-yellow-600 space-y-1">
                <li>• Be respectful and kind to everyone</li>
                <li>• Share helpful academic resources</li>
                <li>• Ask questions when you need help</li>
                <li>• Support your classmates</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-700">Don'ts</h4>
              <ul className="text-sm text-yellow-600 space-y-1">
                <li>• No sharing of personal information</li>
                <li>• Avoid negative or harmful language</li>
                <li>• Don't spam or flood messages</li>
                <li>• No academic dishonesty discussions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Trending Topics Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {[
              'Calculus Assignment',
              'Physics Lab',
              'Group Study Session',
              'Exam Preparation',
              'Career Guidance',
              'Campus Events'
            ].map((topic, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 text-sm hover:bg-blue-50 cursor-pointer">
                #{topic.replace(/\s+/g, '')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overall Sentiment */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Overall Chat Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <p className="text-2xl font-bold">{getOverallSentiment()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentGroupChat;