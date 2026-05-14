export const getStatusStyle = (status) => {
  const styles = {
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
    Pending: 'bg-yellow-100 text-yellow-700'
  };
  return styles[status] || 'bg-gray-100';
};