import { StarIcon } from "lucide-react";
import SectionHeader from "../section-header";
const testimonialsData = [
    { quote: "Lumina changed how we handle client contracts. It's incredibly fast and the output looks professional.", author: "Sarah Jenkins", role: "Freelance Designer" },
    { quote: "The AI features are actually useful, not just gimmicks. Structuring complex forms is a breeze now.", author: "Mark Thompson", role: "CTO, TechFlow" },
    { quote: "Cleanest invoice builder I've used. My clients actually compliment my bills now. Totally worth it.", author: "Elena Rodriguez", role: "Consultant" }
]
const Testimonials = () => (
    <section className="bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
            <div className="border-b border-neutral-200 dark:border-neutral-800 p-8 md:p-12">
                <SectionHeader title="Trusted by builders." subtitle="Thousands of teams rely on Lumina for their critical document infrastructure." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
                {testimonialsData.map((t, i) => (
                    <div key={i} className="p-12 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex gap-1 text-neutral-900 dark:text-neutral-100 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} className="w-4 h-4" />)}
                        </div>
                        <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">"{t.quote}"</p>
                        <div>
                            <p className="font-bold text-neutral-900 dark:text-neutral-100">{t.author}</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;