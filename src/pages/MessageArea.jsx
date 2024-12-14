import React, { useState } from 'react';
import { FaPaperclip, FaRegPaperPlane } from 'react-icons/fa'; // Icons for attachments and send button

const MessageArea = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [attachment, setAttachment] = useState(null);

  // Dummy contacts list (now with a longer list)
  const contacts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Contact ${i + 1}`,
    status: i % 2 === 0 ? 'Online' : 'Offline',
  }));

  // Handle selecting a contact
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (message.trim() || attachment) {
      const newMessage = {
        text: message,
        attachment: attachment,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage],
      }));
      setMessage('');
      setAttachment(null);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Message Area Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Contacts */}
        <div className="w-80 bg-gray-100 p-4 flex-none h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Contacts</h2>
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className={`cursor-pointer p-2 rounded-lg ${
                  selectedContact?.id === contact.id ? 'bg-green-100' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{contact.name}</span>
                  <span className={`text-xs ${contact.status === 'Online' ? 'text-green-500' : 'text-gray-400'}`}>
                    {contact.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Chat Section */}
        <div className="flex-1 bg-white flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-medium">{selectedContact ? selectedContact.name : 'Message Area'}</h2>
          </div>

          {/* Messages Display Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {selectedContact &&
              messages[selectedContact.id]?.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.attachment ? 'space-x-3' : 'space-x-0'} ${msg.text ? 'items-start' : 'items-center'}`}
                >
                  <div
                    className={`${
                      msg.text ? 'bg-gray-200' : 'bg-green-200'
                    } p-3 rounded-lg max-w-xs`}
                  >
                    {msg.text && <p className="text-sm text-gray-700">{msg.text}</p>}
                    {msg.attachment && (
                      <div className="mt-2">
                        <a
                          href={URL.createObjectURL(msg.attachment)}
                          download={msg.attachment.name}
                          className="text-blue-500 text-xs"
                        >
                          {msg.attachment.name}
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
              ))}
          </div>

          {/* Message Input and Send Section */}
          <div className="p-4 border-t border-gray-300 bg-white">
            <div className="flex items-center space-x-2">
              {/* File Upload */}
              <label htmlFor="file-upload" className="cursor-pointer text-gray-600 hover:text-green-500">
                <FaPaperclip />
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Text Input */}
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600"
              >
                <FaRegPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
