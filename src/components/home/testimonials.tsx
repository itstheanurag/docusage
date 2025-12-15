import { StarIcon } from "lucide-react";
import SectionHeader from "../section-header";
const testimonialsData = [
    { quote: "Docusage changed how we handle client contracts. It's incredibly fast and the output looks professional.", author: "Sarah Jenkins", role: "Freelance Designer" },
    { quote: "The AI features are actually useful, not just gimmicks. Structuring complex forms is a breeze now.", author: "Mark Thompson", role: "CTO, TechFlow" },
    { quote: "Cleanest invoice builder I've used. My clients actually compliment my bills now. Totally worth it.", author: "Elena Rodriguez", role: "Consultant" }
]
const Testimonials = () => (
    <section className="bg-transparent dark:bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:text-center max-w-3xl mx-auto">
                <SectionHeader title="Trusted by builders." subtitle="Thousands of teams rely on Docusage for their critical document infrastructure." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
                {testimonialsData.map((t, i) => (
                    <div key={i} className="p-12 bg-background hover:bg-muted/5 transition-colors duration-300">
                        <div className="flex gap-1 text-primary mb-6">
                            {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} className="w-5 h-5 fill-current" />)}
                        </div>
                        <p className="text-lg font-medium text-foreground mb-8 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                                {t.author[0]}
                            </div>
                            <div>
                                <p className="font-bold text-foreground">{t.author}</p>
                                <p className="text-sm text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials;