export default function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="container-responsive py-6 text-sm text-slate-500">
        © {new Date().getFullYear()} AgroVista. Demo prototype.
      </div>
    </footer>
  );
}
