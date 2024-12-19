import React, { useState } from "react";
import { FaPaperclip, FaRegPaperPlane } from "react-icons/fa";
import MessageNavbar from "../components/MessageNavbar";

const MessageArea = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [showUnread, setShowUnread] = useState(false); 

  const contacts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Contact ${i + 1}`,
  }));

  const handleContactSelect = (contact) => setSelectedContact(contact);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleFileChange = (e) => setAttachment(e.target.files[0]);

  const handleSendMessage = () => {
    if (message.trim() || attachment) {
      const newMessage = {
        text: message,
        attachment: attachment,
        time: new Date().toLocaleTimeString(),
        read: false, // New messages are unread by default
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage],
      }));
      setMessage("");
      setAttachment(null);
    }
  };

  // Handle the Enter key press to send a message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {  
      e.preventDefault();  // Prevent new line insertion
      handleSendMessage(); // Send the message
    }
  };

  const toggleUnread = () => setShowUnread(!showUnread);

  const filterMessages = (messages) => {
    if (showUnread) {
      return messages.filter((msg) => !msg.read); // Show only unread messages
    }
    return messages; // Show all messages
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Fixed Navbar */}
      <MessageNavbar />

      {/* Content Below Navbar */}
      <div className="flex flex-1 justify-center items-center p-4">
        {/* Card Container */}
        <div className="bg-white shadow-2xl rounded-lg w-full max-w-6xl h-[85vh] flex overflow-hidden">
          {/* Sidebar: Contacts */}
          <div className="w-72 bg-gray-50 p-4 border-r overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Contacts</h2>
            
            {/* Enhanced Toggle Switch for Messages */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-gray-600 text-sm">All Messages</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showUnread}
                  onChange={toggleUnread}
                />
                <span className="w-12 h-7 bg-gray-300 rounded-full transition-all duration-300"></span>
                <span
                  className={`${
                    showUnread ? "bg-blue-600 translate-x-5" : "bg-gray-500"
                  } absolute left-0.5 top-0.5 w-6 h-6 rounded-full transition-all duration-300 ease-in-out`}
                ></span>
              </label>
              <span className="text-gray-600 text-sm">Unread ({selectedContact ? messages[selectedContact.id]?.filter((msg) => !msg.read).length : 0})</span>
            </div>

            <ul>
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className={`p-3 rounded-lg cursor-pointer mb-2 transition-all duration-300 ${
                    selectedContact?.id === contact.id
                      ? "bg-indigo-100 shadow-md"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{contact.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 bg-gray-100 border-b shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedContact ? selectedContact.name : "Select a Contact"}
              </h2>
            </div>

            {/* Messages Display */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {selectedContact ? (
                // Check if there are unread messages
                filterMessages(messages[selectedContact.id] || []).length === 0 && showUnread ? (
                  <div className="flex justify-center items-center text-gray-500 text-lg">
                    <div className="text-center">
                      <span className="block mb-2">📭</span>
                      <p>No unread messages</p>
                    </div>
                  </div>
                ) : (
                  filterMessages(messages[selectedContact.id] || []).map((msg, index) => (
                    <div
                      key={index}
                      className={`flex mb-3 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`p-3 rounded-lg shadow-md ${
                          index % 2 === 0
                            ? "bg-gray-200 text-gray-800"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {msg.text && <p>{msg.text}</p>}
                        {msg.attachment && (
                          <a
                            href={URL.createObjectURL(msg.attachment)}
                            download={msg.attachment.name}
                            className="underline text-sm"
                          >
                            {msg.attachment.name}
                          </a>
                        )}
                        <span className="block mt-1 text-xs text-right opacity-80">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="text-center mt-20">
                  <svg className="animate-spin h-10 w-10 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                  </svg>
                  <p className="text-gray-500 text-center mt-4 text-lg">
                    Please select a contact to start chatting.
                  </p>
                </div>
              )}
            </div>

            {/* Message Input */}
            {selectedContact && (
              <div className="p-4 bg-white border-t flex items-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-gray-600 hover:text-indigo-500"
                >
                  <FaPaperclip size={20} />
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyDown}  // Add the event listener here
                  placeholder="Type a message..."
                  className="flex-1 mx-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition-all"
                >
                  <FaRegPaperPlane size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
