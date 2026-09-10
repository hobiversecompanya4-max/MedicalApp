import { ArrowRight, HeartHandshake, Quote, Star } from 'lucide-react'

const experiences = [
  { name: 'Ayush Sharma', location: 'Local customer', message: 'The staff were polite, patient, and explained every step instead of rushing me through the order.' },
  { name: 'Sumati Verma', location: 'Regular customer', message: 'They recommended a suitable lower-cost option for my prescription and helped me save without compromising on care.' },
  { name: 'Rajendra Patel', location: 'Verified order', message: 'The team is honest about prices and availability, which makes ordering medicines feel simple and trustworthy.' },
  { name: 'Neha Joshi', location: 'Family care', message: 'The staff spoke kindly with my parents and kept us updated from prescription review to delivery.' },
  { name: 'Vikram Singh', location: 'Regular customer', message: 'I received a helpful recommendation that reduced my monthly medicine cost without making the process confusing.' },
  { name: 'Pooja Mehta', location: 'Home delivery', message: 'Everything arrived sealed and well organized, and the staff followed up to make sure the order was right.' },
  { name: 'Arjun Rao', location: 'Verified order', message: 'Fast delivery, respectful service, and useful savings on my refill make this my first choice.' },
  { name: 'Kavita Nair', location: 'Family care', message: 'The pharmacist listened carefully and suggested a practical option that saved my family money.' },
  { name: 'Manoj Gupta', location: 'Regular customer', message: 'My repeat orders come with special customer discounts, and the friendly service keeps me coming back.' },
  { name: 'Ritu Malhotra', location: 'Local customer', message: 'Professional staff, transparent recommendations, and genuine discounts make Panchawati feel different.' },
]

const ExperienceCard = ({ experience, index, duplicate = false }) => (
  <article className="customer-experience-card relative w-[280px] shrink-0 overflow-hidden rounded-[1.5rem] border border-[#dbe7e4] bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.05)] sm:w-[330px]" aria-hidden={duplicate}>
    <div className={`absolute inset-x-0 top-0 h-1 ${index % 3 === 0 ? 'bg-brand' : index % 3 === 1 ? 'bg-sky' : 'bg-amber'}`} />
    <div className="flex items-center justify-between pt-1">
      <div className="flex gap-0.5 text-amber" aria-label="5 out of 5 stars">
        {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}
      </div>
      <Quote size={20} className="text-brand/25" />
    </div>
    <p className="mt-4 min-h-[96px] text-sm leading-6 text-[var(--text)]">“{experience.message}”</p>
    <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#eef2f1] pt-4">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A]">{experience.name}</h3>
        <p className="mt-1 text-xs text-slate-500">{experience.location}</p>
      </div>
      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${index % 3 === 0 ? 'bg-brand-soft text-brand-strong' : index % 3 === 1 ? 'bg-sky-soft text-sky' : 'bg-amber-soft text-amber'}`}>
        {experience.name.split(' ').map((part) => part[0]).join('')}
      </span>
    </div>
  </article>
)

const CustomerExperiences = () => {
  return (
    <section id="customer-experiences" className="overflow-hidden bg-[linear-gradient(180deg,rgba(244,238,255,0.7),rgba(247,251,250,0.8))] py-14 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong">
              <HeartHandshake size={14} />
              Customer experiences
            </p>
            <h2 className="font-[Plus_Jakarta_Sans] text-[clamp(28px,3vw,40px)] font-semibold leading-tight tracking-[-0.8px] text-[#0F172A]">Care people come back for</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text)] sm:text-[15px]">Kind staff, smarter recommendations, and savings that make every refill feel easier.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 sm:pb-1"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand shadow-sm"><Quote size={15} /></span>10 local voices</div>
        </div>
      </div>

      <div className="customer-experience-mask mt-10" aria-label="Customer experiences">
        <div className="customer-experience-track flex w-max gap-4 px-4">
          {experiences.map((experience, index) => <ExperienceCard key={experience.name} experience={experience} index={index} />)}
          {experiences.map((experience, index) => <ExperienceCard key={`${experience.name}-duplicate`} experience={experience} index={index} duplicate />)}
        </div>
      </div>

      <div className="mx-auto mt-7 flex max-w-[1200px] items-center justify-center gap-2 px-5 text-xs font-semibold text-slate-500 sm:px-8">
        <ArrowRight size={15} className="text-brand" /> Hover to pause and read a story
      </div>
    </section>
  )
}

export default CustomerExperiences