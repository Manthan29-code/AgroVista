import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ProfitChart({ data }) {
  const d = data?.length ? data : [
    { month: 'Jan', profit: 10000 },
    { month: 'Feb', profit: 14000 },
    { month: 'Mar', profit: 16000 },
    { month: 'Apr', profit: 20000 },
  ];
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={d}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#2F855A" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
