import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowDown, ArrowRight, Menu, X, Building2, Sun, Wind, Factory, Landmark, Paintbrush, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/BionicEyeLogoLargeBlack2.png.asset.json";
import hero from "@/assets/C10_3.jpg.asset.json";
import { SystemCarousel } from "@/components/SystemCarousel";
import facade from "@/assets/865A0018.jpg.asset.json";
import field from "@/assets/IMG_2240.JPG.asset.json";
import { enquirySchema, enquiryEmail } from "@/lib/enquiry";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "The Bionic Eye | Facade and structure cleaning" },
    { name: "description", content: "Facade and structure cleaning without access equipment." },
    { property: "og:title", content: "The Bionic Eye | Facade and structure cleaning" },
    { property: "og:description", content: "Facade and structure cleaning without access equipment." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const navigation = [ ["Solutions", "#solutions"], ["Support", "#support"], ["Regulation", "#regulation"], ["Sectors", "#sectors"], ["About Us", "#about-us"], ["Contact", "#contact"] ];
const specifications = [
  ["Working height", "Over 60 metres"],
  ["Flow rate", "Up to 15 litres per minute"],
  ["Working pressure", "Around 170 bar at the nozzle, up to 255 bar at peak"],
  ["Collision avoidance", "Radar, with standoff control"],
  ["Maximum take-off mass", "29 kg"],
];
const applications = [
  [Building2, "Commercial and residential facades, and glass curtain walling"],
  [Sun, "Solar farms and rooftop arrays"],
  [Wind, "Wind turbine towers"],
  [Factory, "Industrial silos, tanks and cladding"],
  [Landmark, "Heritage and listed structures"],
  [Paintbrush, "Graffiti removal"],
  [Layers, "Surface coating and treatment, currently in development"],
] as const;

function EnquiryLink() {
  return <Button variant="industrial" asChild><a href="#contact">Discuss a requirement <ArrowUpRight aria-hidden="true" /></a></Button>;
}

function EnquiryForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = enquirySchema.safeParse(data);
    if (!result.success) {
      const issue = result.error.issues[0];
      const element = issue ? form.elements.namedItem(String(issue.path[0])) : null;
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.setCustomValidity(issue?.message ?? "");
        element.reportValidity();
      }
      return;
    }
    window.location.href = enquiryEmail(result.data);
  }
  return <form className="enquiry-form" onSubmit={submit} onInput={event => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) target.setCustomValidity("");
  }}>
    <label className="form-field">Name<input name="name" autoComplete="name" required maxLength={100} /></label>
    <label className="form-field">Company<input name="company" autoComplete="organization" maxLength={160} /></label>
    <label className="form-field">Email<input type="email" name="email" autoComplete="email" required maxLength={255} /></label>
    <label className="form-field">Telephone<input type="tel" name="telephone" autoComplete="tel" maxLength={40} /></label>
    <label className="form-field form-wide">Sites or work involved<textarea name="sites" required maxLength={4000} rows={4} /></label>
    <Button variant="industrial" type="submit" className="form-wide">Discuss a requirement <ArrowUpRight aria-hidden="true" /></Button>
  </form>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" aria-label="The Bionic Eye home"><img src={logo.url} className="brand-logo" alt="The Bionic Eye" /></a>
        <nav aria-label="Main navigation" className={`navigation ${menuOpen ? "is-open" : ""}`}>
          {navigation.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="shop-link" href="https://shop.thebioniceye.co.uk/" target="_blank" rel="noreferrer">Shop <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
    </header>
    <main>
      <section className="hero">
        <img className="hero-image" src={hero.url} alt="Cleaning drone washing a building facade" fetchPriority="high" />
        <div className="container hero-inner">
          <h1>Facade and structure cleaning <span>without access equipment.</span></h1>
          <EnquiryLink />
        </div>
        <a href="#opening" className="hero-scroll" aria-label="Continue to opening"><ArrowDown size={17} /></a>
      </section>
      <div id="opening" className="container opening">
        <p>Drone cleaning removes the requirement for scaffolding, cradles, powered access or rope teams across a substantial proportion of facade, glazing, cladding and roof maintenance. The work is carried out from ground level, and setup is measured in minutes rather than days.</p>
        <p>It does not replace access equipment for every application. We identify where it does not before specifying a system.</p>
      </div>
      <section id="solutions" className="section">
        <div className="container">
          <h2 className="section-heading">The system</h2>
          <div className="system-layout">
            <div>
              <p>The ABZ Innovation C10 is the platform we have standardised on. It operates to over 60 metres, delivers up to 15 litres per minute at a working pressure around 170 bar at the nozzle, up to 255 bar at peak, and uses radar for collision avoidance and standoff control. Reverse osmosis water can be specified where surface finish, seals or painted surfaces require it.</p>
              <p>Maximum take-off mass is 29 kg. The sub 25 kg limit that applied under the earlier authorisation route is not required under UK SORA.</p>
              <dl className="specification">{specifications.map(([label,value]) => <div className="spec-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            </div>
            <SystemCarousel />
          </div>
        </div>
      </section>
      <section id="sectors" className="section applications-band">
        <div className="container">
          <h2 className="section-heading">Applications</h2>
          <div className="applications-layout">
            <img className="applications-photo" src={facade.url} alt="Drone cleaning beside glazing and exterior cladding" loading="lazy" />
            <ul className="applications-list">{applications.map(([Icon, text]) => <li key={text}><Icon aria-hidden="true" /><span>{text}</span></li>)}</ul>
          </div>
        </div>
      </section>
      <section id="support" className="section">
        <div className="container">
          <h2 className="section-heading">What we supply</h2>
          <div className="supply-layout">
            <h3 className="supply-title">The drone, pressure system and nozzle set specified against your surfaces.</h3>
            <div><p>Pilot training is available as an additional service, and we can advise on preparing the operations manual and supporting documentation required for CAA authorisation.</p><p>Parts are held in the United Kingdom, repairs are carried out in our own workshop, and the enhanced warranty option provides priority servicing and maintenance, with loan equipment where parts are unavailable. We also offer white label services, arranged in advance, giving clients additional capacity.</p></div>
          </div>
        </div>
      </section>
      <section id="regulation" className="section regulation-band">
        <div className="container regulation-layout">
          <h2 className="section-heading">Regulatory position</h2>
          <div><p>Cleaning operations at height adjacent to structures fall within the Specific Category, which requires an Operational Authorisation from the Civil Aviation Authority. Since April 2025 these are granted through UK SORA.</p><p>The Operational Authorisation is held by the operator and not the supplier. The Bionic Eye assists clients in attaining their own, drawing on the UK SORA authorisation we hold for cleaning operations with our own PowerWash system, obtained in January 2026, and on the applications we have supported since. The first client Operational Authorisation for the C10 has now been granted, in the client's own name, with two further applications at final assessment.</p><Button variant="industrial" asChild><a href="https://www.caa.co.uk/drones/rules-and-categories-of-drone-flying/flying-in-the-specific-category/" target="_blank" rel="noreferrer">How authorisation works <ArrowUpRight aria-hidden="true" /></a></Button></div>
        </div>
      </section>
      <section id="about-us" className="section">
        <div className="container field-layout">
          <div><h2 className="section-heading">Proven in the field</h2><p>ABZ Innovation's case studies show what the C10 delivers in service. A factory facade was cleaned at around 300 square metres an hour using chemical-free reverse osmosis water. A roof carrying ten years of moss, about 550 square metres, was cleared in roughly three hours with no chemicals, and the system was set up and ready to fly in fifteen minutes.</p><p className="footnote">Figures are from ABZ Innovation case studies. Actual output varies with the surface, the level of soiling and site conditions.</p></div>
          <img src={field.url} className="field-photo" alt="Ground-level operators supervising a cleaning drone at an industrial building" loading="lazy" />
        </div>
      </section>
      <section id="contact" className="section contact-band">
        <div className="container"><h2 className="section-heading">Closing and enquiry</h2><div className="contact-layout"><p className="contact-text">Send us the sites you intend to work on. We will identify which are straightforward under a standard authorisation, which require additional work, and which are unlikely to be viable, before any commitment is made.</p><EnquiryForm /></div></div>
      </section>
    </main>
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="#" aria-label="The Bionic Eye home"><img src={logo.url} alt="The Bionic Eye" className="brand-logo" loading="lazy" /></a>
          <div><p>The Bionic Eye, Bionic House, Hall Farm, Berry Lane, Chorleywood, WD3 5EX, United Kingdom.</p><p>Telephone <a href="tel:+441753655886">+44 1753 655886</a>. Email <a href="mailto:info@thebioniceye.co.uk">info@thebioniceye.co.uk</a>.</p><p className="footer-brands">Specialist brands: <a href="https://farmingbydrone.com/" target="_blank" rel="noreferrer">FarmingByDrone</a> | <a href="https://shop.thebioniceye.co.uk/collections/powerwash-pro-drones" target="_blank" rel="noreferrer">PowerWash</a> | <a href="https://cleaningbydrone.com/" target="_blank" rel="noreferrer">CleaningByDrone</a></p></div>
          <p>The Operational Authorisation is held by the operator and not the supplier. The Bionic Eye assists clients in attaining their own.</p>
        </div>
        <div className="footer-legal"><p>CAA approved since 2014. UK SORA authorisation held for cleaning operations with the PowerWash system since January 2026.</p><p>The Bionic Eye Ltd. Registered in England and Wales, company number 09053005. Registered office: 22 Wycombe End, Beaconsfield HP9 1NB.</p></div>
      </div>
    </footer>
  </>;
}
