export const getStatusStyle = (status) => {
  const styles = {
    Approved: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
    Rejected: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
    Pending: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  };
  return styles[status] || 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
};
