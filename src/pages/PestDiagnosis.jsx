import { useState } from 'react';
import ImageUpload from '../components/forms/ImageUpload.jsx';
import Modal from '../components/ui/Modal.jsx';
import Button from '../components/ui/Button.jsx';
import useMockApi from '../hooks/useMockApi.js';
import { useToast } from '../context/ToastContext.jsx';

export default function PestDiagnosis(){
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const api = useMockApi();
  const { addToast } = useToast();

  const onScan = async () => {
    setIsScanning(true);
    try {
      const res = await api.postPestScan(file);
      setResult(res);
      setOpen(true);
    } catch(e) {
      addToast(e.message || 'Scan failed', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  // Determine confidence level styling
  const getConfidenceStyle = (confidence) => {
    if (confidence >= 70) return { bg: 'bg-emerald-500', text: 'text-emerald-700', label: 'High Confidence' };
    if (confidence >= 40) return { bg: 'bg-amber-500', text: 'text-amber-700', label: 'Medium Confidence' };
    return { bg: 'bg-red-500', text: 'text-red-700', label: 'Low Confidence' };
  };

  const confidenceStyle = result ? getConfidenceStyle(result.confidencePercent) : null;

  return (
    <div className="animate-page-fade space-y-8 pb-12">
      {/* Gradient Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-60 w-60 animate-blob rounded-full bg-emerald-400/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-72 w-72 animate-blob-delay rounded-full bg-cyan-400/25 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-32 w-32 animate-spin-slow rounded-full border border-white/10" />
        </div>

        {/* Hero Content */}
        <div className="relative grid gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
              🔬 Pest Scanner
            </span>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              AI-Powered Pest<br />Diagnosis
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Upload a photo of your affected crop and let our AI identify potential pests, 
              diseases, and recommend treatment actions instantly.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-2xl bg-white/15 px-5 py-3 shadow-md backdrop-blur">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-white/70">Pests Detected</div>
              </div>
              <div className="rounded-2xl bg-white/15 px-5 py-3 shadow-md backdrop-blur">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-white/70">Accuracy Rate</div>
              </div>
              <div className="rounded-2xl bg-white/15 px-5 py-3 shadow-md backdrop-blur">
                <div className="text-2xl font-bold">&lt;3s</div>
                <div className="text-sm text-white/70">Scan Time</div>
              </div>
            </div>
          </div>

          {/* Right Column - Info Panel */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="mb-4 font-semibold text-lg">How it works</h3>
              <div className="space-y-3 text-sm text-white/90">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">1</span>
                  <span>Upload a clear photo of the affected plant part</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">2</span>
                  <span>Our AI analyzes patterns and symptoms</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">3</span>
                  <span>Get instant diagnosis with treatment suggestions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="rounded-3xl border border-teal-100 bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Upload Crop Image</h2>
          <p className="text-sm text-gray-500 mt-1">
            Take a close-up photo of the affected area for best results
          </p>
        </div>

        {/* Image Upload with Scanning Overlay */}
        <div className="relative">
          <ImageUpload onFile={setFile} />
          
          {/* Scanning Overlay */}
          {isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/60 backdrop-blur-sm z-10">
              {/* Scanning Animation */}
              <div className="relative w-24 h-24 mb-4">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-ping" />
                {/* Middle Ring */}
                <div className="absolute inset-2 rounded-full border-4 border-emerald-400/50 animate-pulse" />
                {/* Inner Spinner */}
                <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin" />
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <p className="text-white font-semibold text-lg">Analyzing Image...</p>
              <p className="text-white/70 text-sm mt-1">Detecting pests and diseases</p>
              
              {/* Scan Line Animation */}
              <div className="absolute inset-x-8 top-1/4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line" />
            </div>
          )}
        </div>

        {/* Scan Button */}
        <div className="mt-6 flex items-center gap-4">
          <Button 
            onClick={onScan} 
            disabled={!file || isScanning}
            className="px-8 py-3 text-base font-semibold"
          >
            {isScanning ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Scanning...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Scan for Pests
              </span>
            )}
          </Button>
          
          {file && !isScanning && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Image ready for scan
            </span>
          )}
        </div>
      </section>

      {/* Results Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Scan Result" size="lg">
        {result && (
          <div className="space-y-6">
            {/* Detection Result */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-teal-50/30 p-5 border border-teal-100">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  result.confidencePercent >= 70 ? 'bg-emerald-100' : 
                  result.confidencePercent >= 40 ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  <svg className={`w-6 h-6 ${confidenceStyle.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Detected Issue</p>
                  <p className="text-lg font-bold text-gray-800">{result.detectedName}</p>
                </div>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Confidence Level</span>
                <span className={`text-sm font-semibold ${confidenceStyle.text}`}>
                  {confidenceStyle.label} • {result.confidencePercent}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${confidenceStyle.bg}`}
                  style={{ width: `${result.confidencePercent}%` }}
                />
              </div>
            </div>

            {/* Suggested Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Suggested Actions
              </h4>
              <ul className="space-y-2">
                {result.suggestedActions.map((action, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-700 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                onClick={() => { 
                  addToast('Alert saved successfully!', 'success');
                  setOpen(false); 
                }}
                className="flex-1 justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Save as Alert
              </Button>
              <Button 
                variant="secondary"
                className="flex-1 justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View Nearby Inputs
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
