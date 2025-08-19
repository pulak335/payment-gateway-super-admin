import React, { useState, useEffect, useRef } from 'react';

const LiveChatSupportPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat window on new messages
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user', timestamp: new Date() }]);
      setInput('');
      // Simulate a response from support
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Thank you for your message: "${input}". A support agent will be with you shortly.`, sender: 'support', timestamp: new Date() },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Live Chat Support</h1>

      <div className="flex-1 bg-white shadow-md rounded-lg p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4" ref={chatWindowRef}>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">
              Welcome to Live Chat Support! How can we help you today?
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-r-lg px-6 py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChatSupportPage;