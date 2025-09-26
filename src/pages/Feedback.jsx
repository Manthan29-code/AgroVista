import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, LineChart, MessageCircleHeart, Sparkles, Users } from 'lucide-react';
import FeedbackForm from '../components/forms/FeedbackForm.jsx';
import useMockApi from '../hooks/useMockApi.js';
import Spinner from '../components/ui/Spinner.jsx';
import { useToast } from '../context/ToastContext.jsx';

const formatter = new Intl.DateTimeFormat('en-IN', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
});

const sortFeedback = (items = []) =>
	[...items].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

export default function Feedback() {
	const api = useMockApi();
	const { addToast } = useToast();
	const [feedback, setFeedback] = useState([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const data = await api.getFeedbackList();
				if (mounted) setFeedback(sortFeedback(data));
			} catch (error) {
				if (mounted) addToast('Unable to load farmer stories right now.', 'error');
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [api, addToast]);

	const stats = useMemo(() => {
		if (!feedback.length) {
			return {
				averageRating: 0,
				promoters: 0,
				total: 0,
			};
		}
		const total = feedback.length;
		const averageRating = feedback.reduce((sum, item) => sum + Number(item.rating || 0), 0) / total;
		const promoters = Math.round(((feedback.filter((item) => Number(item.rating) >= 4).length || 0) / total) * 100);
		return {
			averageRating,
			promoters,
			total,
		};
	}, [feedback]);

	const topStories = useMemo(() => feedback.slice(0, 6), [feedback]);

	const handleSubmit = async (payload) => {
		setSubmitting(true);
		try {
			const record = await api.postFeedback(payload);
			setFeedback((prev) => sortFeedback([{ ...record }, ...prev]));
			addToast('Thank you! Your success story will inspire other farmers.');
		} catch (error) {
			addToast(error.message || 'Could not submit feedback.', 'error');
		} finally {
			setSubmitting(false);
		}
	};

	return (
			<div className="space-y-16 pb-12">
				<section className="relative z-0 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 text-white">
					<div className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block">
					<div className="h-full w-72 translate-x-12 skew-x-12 rounded-l-[80px] bg-white/10 blur-3xl" />
				</div>
			<div className="relative z-[1] grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[3fr,2fr] lg:py-16">
					<div className="space-y-6">
						<p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
							<Sparkles className="h-4 w-4" /> Farmer success lab
						</p>
						<h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
							Stories from the ground where AgroVista AI changed the harvest.
						</h1>
						<p className="max-w-2xl text-lg text-white/80">
							Real-world wins from farmers who used recommendations, heat alerts, and market insights to stay ahead of weather, pests, and pricing swings.
						</p>
						<div className="grid gap-4 sm:grid-cols-3">
							<StatTile
								icon={MessageCircleHeart}
								label="Verified stories"
								value={stats.total}
								hint="Authenticated AgroVista users"
							/>
							<StatTile
								icon={LineChart}
								label="Average rating"
								value={stats.averageRating ? stats.averageRating.toFixed(1) : '—'}
								hint="/5 experience score"
							/>
							<StatTile
								icon={Users}
								label="Promoter score"
								value={`${stats.promoters || 0}%`}
								hint="Ratings ≥ 4 stars"
							/>
						</div>
					</div>
					<div className="rounded-3xl bg-white/15 p-6 shadow-xl backdrop-blur-xl">
						<div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
							<span>Signals from the field</span>
							<ArrowUpRight className="h-5 w-5" />
						</div>
						<ul className="mt-6 space-y-5 text-sm">
							{feedback.slice(0, 3).map((item) => (
								<li key={item.id} className="rounded-2xl bg-white/10 p-4 shadow-inner">
									<p className="text-white/90">
										“{item.description.length > 120 ? `${item.description.slice(0, 120)}…` : item.description}”
									</p>
									<div className="mt-3 flex items-center justify-between text-xs text-white/60">
										<span>{item.farmerName} · {item.location}</span>
										<span>{formatter.format(new Date(item.submittedAt))}</span>
									</div>
								</li>
							))}
							{!feedback.length && <li className="rounded-2xl bg-white/10 p-4 text-white/70">No stories yet—be the first to share!</li>}
						</ul>
					</div>
				</div>
			</section>

			<section className="grid gap-10 lg:grid-cols-[2fr,3fr]">
				<div className="order-2 lg:order-1 space-y-5">
					<h2 className="text-2xl font-semibold text-slate-900">Playbook takeaways</h2>
					<div className="grid gap-4">
						{INSIGHTS.map((insight) => (
							<article key={insight.title} className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white via-white to-teal-50/40 p-5 shadow-sm">
								<h3 className="font-semibold text-emerald-700">
									{insight.title}
								</h3>
								<p className="mt-2 text-sm text-slate-600">{insight.body}</p>
							</article>
						))}
					</div>
				</div>
				<div className="order-1 lg:order-2">
					<FeedbackForm onSubmit={handleSubmit} loading={submitting} />
				</div>
			</section>

			<section className="space-y-6">
				<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-sm uppercase tracking-wider text-emerald-600 font-semibold">Field notes</p>
						<h2 className="text-2xl font-semibold text-slate-900">Recent farmer shout-outs</h2>
					</div>
					<p className="text-sm text-slate-500">Sorted by latest submissions, verified through the AgroVista dashboard.</p>
				</div>
				{loading ? (
					<div className="flex justify-center py-12">
						<Spinner size={40} />
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{topStories.map((item) => (
							<FeedbackCard key={item.id} data={item} />
						))}
						{!topStories.length && (
							<div className="rounded-3xl border border-dashed border-teal-200 bg-white p-8 text-center text-slate-500">
								No feedback to show yet. Share your experience and inspire other growers.
							</div>
						)}
					</div>
				)}
			</section>
		</div>
	);
}

function StatTile({ icon: Icon, label, value, hint }) {
	return (
		<div className="rounded-2xl bg-white/15 p-4 shadow-md backdrop-blur">
			<div className="flex items-center gap-3">
				<span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
					<Icon className="h-5 w-5" />
				</span>
				<div>
					<p className="text-xs uppercase tracking-widest text-white/70">{label}</p>
					<p className="text-2xl font-bold text-white">{value}</p>
				</div>
			</div>
			<p className="mt-2 text-xs text-white/70">{hint}</p>
		</div>
	);
}

function FeedbackCard({ data }) {
	const stars = Array.from({ length: 5 }, (_, idx) => idx + 1);
	return (
		<article className="relative overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
			<div className="absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent" />
			<div className="relative space-y-4 p-6">
				<div className="flex items-center justify-between">
					<div className="text-sm font-semibold text-emerald-700">{data.solution}</div>
					<div className="flex items-center gap-1 text-amber-400">
						{stars.map((value) => (
							<Star key={value} filled={value <= Number(data.rating)} />
						))}
					</div>
				</div>
				<h3 className="text-lg font-semibold text-slate-900">{data.reference}</h3>
				<p className="text-sm text-slate-600">{data.description}</p>
				{data.impact && <p className="text-sm font-medium text-emerald-600">{data.impact}</p>}
				<div className="flex items-center justify-between text-xs text-slate-400">
					<span>{data.farmerName} · {data.location}</span>
					<span>{formatter.format(new Date(data.submittedAt))}</span>
				</div>
			</div>
		</article>
	);
}

function Star({ filled }) {
	return (
		<svg
			className={`h-4 w-4 ${filled ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-slate-300'}`}
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		</svg>
	);
}

const INSIGHTS = [
	{
		title: 'Anticipate weather swings',
		body: 'Heatwave alerts from the prototype inspired a climate risk widget. Farmers now receive 48-hour advance warnings tied to irrigation tips.',
	},
	{
		title: 'Track market-ready lots',
		body: 'Crop sale outcomes feed into a consolidated market insight board, helping co-ops plan logistics around the highest premium opportunities.',
	},
	{
		title: 'Share best practices',
		body: 'Top-rated feedback becomes part of the in-app knowledge base, spotlighting fertilizer mixes, pest control combos, and cost-saving tweaks.',
	},
];
