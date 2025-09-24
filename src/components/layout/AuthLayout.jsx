export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
      <div className="w-full max-w-md card">
        <h1 className="text-xl font-semibold mb-4 text-primary">{title}</h1>
        {children}
      </div>
    </div>
  );
}
