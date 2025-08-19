import React, { useState } from 'react';

const SupportPage = () => {
  const [tickets, setTickets] = useState([
    { id: 1, subject: 'Payment Gateway Integration Issue', description: 'Merchant XYZ is experiencing issues with payment gateway integration.', status: 'Open', date: '2023-10-26', merchantName: 'Merchant XYZ' },
    { id: 2, subject: 'Transaction Reconciliation Error', description: 'Merchant ABC reported discrepancies in daily transaction reconciliation.', status: 'Resolved', date: '2023-10-25', merchantName: 'Merchant ABC' },
    { id: 3, subject: 'API Key Generation Problem', description: 'Merchant PQR cannot generate new API keys from their dashboard.', status: 'Open', date: '2023-10-26', merchantName: 'Merchant PQR' },
  ]);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    merchantName: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (newTicket.subject.trim() === '' || newTicket.description.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    const ticket = {
      id: tickets.length + 1,
      subject: newTicket.subject,
      description: newTicket.description,
      status: 'Open',
      date: new Date().toLocaleDateString(),
      merchantName: newTicket.merchantName,
    };

    setTickets([...tickets, ticket]);
    setNewTicket({
      subject: '',
      description: '',
      merchantName: '',
    });
  };

  const handleResolveTicket = (id) => {
    setTickets(tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: 'Resolved' } : ticket
    ));
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Support Center</h2>

      {/* Support Ticket System Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Merchant Support Tickets</h4>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by Merchant Name..."
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredTickets.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No support tickets found for the given search term.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Merchant Name</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Subject</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Description</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{ticket.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{ticket.merchantName}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{ticket.subject}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{ticket.description}</td>
                        <td className="py-3 px-4 text-sm font-medium ${ticket.status === 'Open' ? 'text-red-500' : 'text-green-500'}">{ticket.status}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{ticket.date}</td>
                        <td className="py-3 px-4 text-sm">
                          {ticket.status === 'Open' && (
                            <button
                              onClick={() => handleResolveTicket(ticket.id)}
                              className="!bg-green-500 text-white px-3 py-1 rounded-md text-sm !hover:bg-green-600"
                            >
                              Mark as Resolved
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default SupportPage;