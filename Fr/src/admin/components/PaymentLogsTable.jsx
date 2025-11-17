// admin/components/PaymentLogsTable.jsx
import React from "react";
import Badge from "../../components/ui/Badge";

const PaymentLogsTable = ({ payments = [] }) => {
  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/40">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Transaction ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Song</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {payments.map((p) => (
              <tr key={p._id} className="hover:bg-gray-800/50">
                <td className="px-6 py-4 text-sm text-purple-400 font-mono">
                  {p.transactionId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {p.user?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {p.song?.title}
                </td>
                <td className="px-6 py-4 text-sm text-green-400">
                  ${(p.amount / 100).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <Badge variant="green">Success</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentLogsTable;