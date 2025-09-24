import { Link } from 'react-router-dom';

export default function NotFound(){
  return (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-slate-600">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary mt-4 inline-block">Return Home</Link>
      </div>
    </div>
  );
}
