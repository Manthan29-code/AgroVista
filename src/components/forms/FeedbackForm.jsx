import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import Button from '../ui/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import { required } from '../../utils/validators.js';
import { useAuth } from '../../context/AuthContext.jsx';

const SOLUTION_OPTIONS = [
	'AI Crop & Fertilizer Recommendation',
	'Weather Smart Alerts',
	'Market Linkage',
	'Pest & Disease Scan',
	'Farm Sustainability Report',
	'Smart Crop Rotation Guidance',
];

const minLength = (min) => (value = '') => (value.trim().length < min ? `Please add at least ${min} characters.` : '');

export default function FeedbackForm({ onSubmit, loading }) {
	const { user } = useAuth();
	const [rating, setRating] = useState(0);
	const [ratingError, setRatingError] = useState('');

	const initialValues = useMemo(
		() => ({
			farmerName: user?.name || '',
			location: user?.farmLocation || '',
			solution: SOLUTION_OPTIONS[0],
			reference: '',
			description: '',
			impact: '',
		}),
		[user?.name, user?.farmLocation]
	);

	const { values, setValues, errors, setErrors, handleChange, validate } = useFormValidation(initialValues, {
		farmerName: required,
		location: required,
		solution: required,
		reference: minLength(8),
		description: minLength(24),
	});

	useEffect(() => {
		setValues(initialValues);
	}, [initialValues, setValues]);

	const handleRatingSelect = (value) => {
		setRating(value);
		setRatingError('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const isValid = validate();
		if (!rating) setRatingError('Please rate your experience.');
		if (!isValid || !rating) return;

		const payload = {
			...values,
			rating,
		};

		await onSubmit?.(payload);
		setValues(initialValues);
		setErrors({});
		setRating(0);
			setRatingError('');
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 space-y-6 border border-teal-100">
			<div className="space-y-2 text-center md:text-left">
				<p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Share your story</p>
				<h2 className="text-2xl md:text-3xl font-bold text-slate-900">How did AgroVista help you on the field?</h2>
				<p className="text-sm text-slate-500">We spotlight real farmer wins so others can follow the same playbook. Personal details stay safe with us.</p>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-slate-600">Your name</label>
					<input
						name="farmerName"
						value={values.farmerName}
						onChange={handleChange}
						className="mt-1 w-full rounded-xl border border-teal-200 bg-white/70 px-3 py-2 text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
						placeholder="Ravi Sharma"
						disabled={loading}
					/>
					{errors.farmerName && <p className="mt-1 text-sm text-red-600">{errors.farmerName}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-slate-600">Farm location</label>
					<input
						name="location"
						value={values.location}
						onChange={handleChange}
						className="mt-1 w-full rounded-xl border border-teal-200 bg-white/70 px-3 py-2 text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
						placeholder="Ahmedabad, Gujarat"
						disabled={loading}
					/>
					{errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-slate-600">Which solution?</label>
					<select
						name="solution"
						value={values.solution}
						onChange={handleChange}
						className="mt-1 w-full rounded-xl border border-teal-200 bg-white/70 px-3 py-2 text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
						disabled={loading}
					>
						{SOLUTION_OPTIONS.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
					{errors.solution && <p className="mt-1 text-sm text-red-600">{errors.solution}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-slate-600">Solution reference</label>
					<input
						name="reference"
						value={values.reference}
						onChange={handleChange}
						className="mt-1 w-full rounded-xl border border-teal-200 bg-white/70 px-3 py-2 text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
						placeholder="Heatwave alert before cotton flowering"
						disabled={loading}
					/>
					{errors.reference && <p className="mt-1 text-sm text-red-600">{errors.reference}</p>}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-slate-600">What changed on the field?</label>
				<textarea
					name="description"
					value={values.description}
					onChange={handleChange}
					rows={4}
					className="mt-1 w-full rounded-xl border border-teal-200 bg-white/70 px-3 py-2 text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
					placeholder="Describe how the recommendation or alert improved your yield, cut costs, or saved time."
					disabled={loading}
				></textarea>
				{errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
			</div>

			<div className="md:flex md:items-center md:justify-between gap-4">
				<div className="flex flex-col gap-2">
					<span className="text-sm font-medium text-slate-600">Rate your experience</span>
					<div className="flex items-center gap-2">
						{[1, 2, 3, 4, 5].map((value) => {
							const active = value <= rating;
							return (
								<button
									key={value}
									type="button"
									onClick={() => handleRatingSelect(value)}
									className={`group rounded-full border border-transparent bg-white/70 p-2 shadow transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 ${active ? 'bg-gradient-to-br from-amber-400 to-orange-300 text-white' : 'text-slate-400'}`}
									disabled={loading}
								>
									<Star className={`${active ? 'fill-white text-white' : 'text-slate-400'} h-6 w-6`} />
								</button>
							);
						})}
					</div>
					{ratingError && <p className="text-sm text-red-600">{ratingError}</p>}
				</div>
				<div className="flex-1">
					<label className="block text-sm font-medium text-slate-600">Measured impact (optional)</label>
					<input
						name="impact"
						value={values.impact}
						onChange={handleChange}
						className="mt-1 w-full rounded-xl border border-dashed border-teal-200 bg-white/60 px-3 py-2 text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
						placeholder="+18% yield · saved ₹30k input costs"
						disabled={loading}
					/>
				</div>
			</div>

			<div className="pt-2">
				<Button type="submit" disabled={loading} className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 hover:from-emerald-500 hover:via-teal-400 hover:to-cyan-400">
					{loading ? 'Submitting...' : 'Submit feedback'}
				</Button>
			</div>
		</form>
	);
}
