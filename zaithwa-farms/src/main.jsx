import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Egg,
  Facebook,
  Fish,
  Leaf,
  Menu,
  Moon,
  PackageCheck,
  Phone,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Sun,
  Tractor,
  Truck,
  Wheat,
  X,
  MapPin,
  Mail,
  Instagram
} from "lucide-react";
import logo from "./assets/zaithwa-logo.jpeg";
import "./styles.css";

/*
  Zaithwa Farms — single-page React site.
  Design direction:
  - Mobile-first, clean agricultural editorial layout.
  - Inspired by the user's three reference UIs and the information hierarchy of Kelfoods,
    but written and structured specifically for Zaithwa Farms.
  - No AI/futuristic visual language: use real farm photography and familiar agricultural icons.
*/

const products = [
  {
    name: "Maize",
    category: "Crops",
    icon: "wheat",
    image: "/images/maize.jpg",
    note: "Bulk grain for households, retailers and food businesses."
  },
  {
    name: "Groundnuts",
    category: "Crops",
    icon: "leaf",
    image: "/images/groundnuts.jpg",
    note: "Carefully handled nuts for local trade and value addition."
  },
  {
    name: "Soybeans",
    category: "Crops",
    icon: "sprout",
    image: "/images/soybeans.jpg",
    note: "A dependable crop for food, feed and processing markets."
  },
  {
    name: "Fresh vegetables",
    category: "Horticulture",
    icon: "basket",
    image: "/images/vegetables.jpg",
    note: "Seasonal vegetables selected for freshness and quality."
  },
  {
    name: "Eggs & poultry",
    category: "Animal produce",
    icon: "egg",
    image: "/images/eggs.jpg",
    note: "Everyday animal protein supplied with care and consistency."
  },
  {
    name: "Fish",
    category: "Animal produce",
    icon: "fish",
    image: "/images/fish.jpg",
    note: "Fresh fish supply for homes, retailers and food service."
  }
];

const stats = [
  ["01", "Local production", "Produce grown and sourced in Malawi."],
  ["02", "Reliable supply", "Planned harvests and dependable fulfilment."],
  ["03", "Quality handling", "Care from farm gate through delivery."],
  ["04", "Regional reach", "Built to serve Malawi and neighbouring markets."]
];

const iconMap = {
  wheat: Wheat,
  leaf: Leaf,
  sprout: Sprout,
  basket: ShoppingBasket,
  egg: Egg,
  fish: Fish
};

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("zaithwa-theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("zaithwa-theme", dark ? "dark" : "light");
  }, [dark]);

  const filteredProducts = useMemo(
    () => activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="Zaithwa Farms home">
            <img src={logo} alt="Zaithwa Farms - Growing pure, growing simple" style={{ height: 52, width: "auto", borderRadius: 6, display: "block" }} />
          </button>

          <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Main navigation">
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("produce")}>Produce</button>
            <button onClick={() => scrollTo("story")}>Our farm</button>
            <button onClick={() => scrollTo("supply")}>Supply</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setDark((v) => !v)} aria-label="Toggle dark mode" title="Toggle dark mode">
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle navigation">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow"><span className="dot" /> Farm produce, grown in Malawi</span>
              <h1>Good food starts with <em>good farming.</em></h1>
              <p>
                Zaithwa Farms supplies crops and animal produce for families, retailers,
                food businesses and regional buyers — with a focus on dependable supply and careful handling.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollTo("produce")}>
                  Explore our produce <ArrowRight size={17} />
                </button>
                <button className="btn btn-quiet" onClick={() => scrollTo("contact")}>
                  Talk to the farm
                </button>
              </div>
              <div className="hero-trust">
                <span><CheckCircle2 size={17} /> Malawi-grown</span>
                <span><CheckCircle2 size={17} /> Quality focused</span>
                <span><CheckCircle2 size={17} /> Wholesale ready</span>
              </div>
            </div>

            <div className="hero-visual reveal delay-1">
              <div className="photo-frame hero-photo">
                <img
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  src="/images/hero-field.jpg"
                  alt="Green agricultural field"
                />
              </div>
              <div className="floating-card harvest-card">
                <span className="mini-icon"><Sprout size={18} /></span>
                <div>
                  <strong>From the farm</strong>
                  <small>To homes & markets</small>
                </div>
              </div>
              <div className="floating-card location-card">
                <MapPin size={17} />
                <span>Malawi</span>
              </div>
            </div>
          </div>
        </section>

        <section className="strip">
          <div className="container strip-grid">
            {stats.map(([num, title, copy]) => (
              <div className="stat" key={num}>
                <span className="stat-num">{num}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="produce" className="section-pad produce-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">What we supply</span>
                <h2>Produce for everyday <em>needs.</em></h2>
              </div>
              <p>
                A practical range of crops and animal produce, with room to grow as Zaithwa Farms expands its production and partner network.
              </p>
            </div>

            <div className="filter-row" aria-label="Produce categories">
              {["All", "Crops", "Horticulture", "Animal produce"].map((cat) => (
                <button
                  key={cat}
                  className={activeCategory === cat ? "filter active" : "filter"}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {filteredProducts.map((product, index) => {
                const Icon = iconMap[product.icon];
                return (
                  <article className="product-card reveal" style={{ animationDelay: `${index * 70}ms` }} key={product.name}>
                    <div className="product-image">
                      <img onError={(e) => (e.currentTarget.style.visibility = "hidden")} src={product.image} alt={product.name} loading="lazy" />
                      <span className="product-icon"><Icon size={17} /></span>
                    </div>
                    <div className="product-body">
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.note}</p>
                      <button onClick={() => scrollTo("contact")} className="text-link">
                        Ask about supply <ArrowRight size={15} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="story" className="story section-pad">
          <div className="container story-grid">
            <div className="story-collage reveal">
              <div className="photo-frame story-main">
                <img
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  src="/images/farmer.jpg"
                  alt="Farmer working in a crop field"
                  loading="lazy"
                />
              </div>
              <div className="photo-frame story-small">
                <img
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  src="/images/landscape.jpg"
                  alt="Farm landscape"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="story-copy reveal delay-1">
              <span className="eyebrow">Our farm</span>
              <h2>Built around the people who <em>grow</em> Malawi.</h2>
              <p>
                Zaithwa Farms is being developed around a simple idea: strengthen the connection
                between productive farms and the people who depend on a steady food supply.
              </p>
              <p>
                We aim to combine crop production, animal farming, responsible sourcing and practical
                distribution so customers can buy with confidence and farmers can build sustainable livelihoods.
              </p>
              <div className="check-list">
                <div><ShieldCheck size={20} /><span><strong>Careful production</strong><small>Good farm practices and attention to quality.</small></span></div>
                <div><Truck size={20} /><span><strong>Reliable fulfilment</strong><small>Planning for consistent deliveries and wholesale orders.</small></span></div>
                <div><Tractor size={20} /><span><strong>Local value</strong><small>Creating opportunity around Malawi's agricultural economy.</small></span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="supply" className="section-pad supply-section">
          <div className="container supply-grid">
            <div>
              <span className="eyebrow">For buyers & partners</span>
              <h2>Need a regular supply of <em>produce?</em></h2>
              <p>
                Whether you are a retailer, restaurant, institution, processor or regional buyer,
                tell us what you need and when you need it. We can discuss volumes, seasons, collection and delivery.
              </p>
              <div className="supply-points">
                <span><PackageCheck size={18} /> Bulk orders</span>
                <span><Truck size={18} /> Delivery planning</span>
                <span><Wheat size={18} /> Crop supply</span>
                <span><Egg size={18} /> Animal produce</span>
              </div>
              <button className="btn btn-primary" onClick={() => scrollTo("contact")}>
                Start a supply enquiry <ArrowRight size={17} />
              </button>
            </div>

            <div className="supply-note">
              <div className="quote-mark">“</div>
              <blockquote>
                We want Zaithwa Farms to be a dependable link between Malawi's farmers,
                productive land and the growing food needs of our communities.
              </blockquote>
              <div className="quote-line">
                <span className="avatar-placeholder"><CircleUserRound size={21} /></span>
                <span><strong>Zaithwa Farms</strong><small>Growing for tomorrow's tables</small></span>
              </div>
            </div>
          </div>
        </section>

        <section className="faq section-pad">
          <div className="container faq-grid">
            <div>
              <span className="eyebrow">Common questions</span>
              <h2>Before you <em>order.</em></h2>
              <p className="muted">
                These are starting points for the website. Replace or expand them as your actual operations, products and delivery terms are confirmed.
              </p>
            </div>
            <div className="faq-list">
              {[
                ["What can I buy from Zaithwa Farms?", "The site is designed around crops, horticultural produce and animal produce. Final product availability can be updated as each farm unit becomes operational."],
                ["Do you accept wholesale orders?", "Yes, the enquiry flow is designed for retailers, restaurants, institutions, processors and other buyers who need planned volumes."],
                ["Do you deliver outside Malawi?", "The brand is designed with regional supply in mind. Actual cross-border routes, certifications, minimum volumes and delivery terms should be added once confirmed."],
                ["Can farmers partner with Zaithwa Farms?", "Yes. A future farmer-partner section can explain contract growing, aggregation, procurement standards and payment terms once those programmes are defined."]
              ].map(([q, a], i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={q}>
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{q}</span>{openFaq === i ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
                  </button>
                  <div className="faq-answer"><p>{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-pad">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">Let's work together</span>
              <h2>Tell us what you <em>need.</em></h2>
              <p>For produce enquiries, wholesale supply, partnerships or farm visits, send a message and the team can follow up.</p>
              <div className="contact-details">
                <a href="tel:+265994051852"><Phone size={18} /> +265 994 051 852</a>
                <a href="mailto:hello@zaithwafarms.mw"><Mail size={18} /> hello@zaithwafarms.mw</a>
                <span><MapPin size={18} /> Malawi</span>
              </div>
              
            </div>

            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks. Connect this form to your preferred email/form service before launch."); }}>
              <div className="form-row">
                <label>Name<input required name="name" placeholder="Your name" /></label>
                <label>Phone<input name="phone" placeholder="+265..." /></label>
              </div>
              <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
              <label>What do you need?<textarea required name="message" rows="5" placeholder="e.g. 50 crates of eggs every week..."></textarea></label>
              <button className="btn btn-primary" type="submit">Send enquiry <ArrowRight size={17} /></button>
              <small>Form currently runs locally. Connect it to Formspree, Netlify Forms, a server endpoint or your preferred email service.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <div>
            <div className="brand footer-brand">
              <img src={logo} alt="Zaithwa Farms" style={{ height: 72, width: "auto", borderRadius: 6, display: "block" }} />
            </div>
            <p>Growing and supplying food from Malawi for a growing region.</p>
          </div>
          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <button onClick={() => scrollTo("produce")}>Produce</button>
              <button onClick={() => scrollTo("story")}>Our farm</button>
              <button onClick={() => scrollTo("supply")}>Supply</button>
            </div>
            <div>
              <strong>Connect</strong>
              <a href="mailto:hello@zaithwafarms.mw"><Mail size={15}/> Email</a>
              <a href="#"><Instagram size={15}/> Instagram</a>
              <a href="#"><Facebook size={15}/> Facebook</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Zaithwa Farms. All rights reserved.</span>
          <span>Designed for Malawi · Built with React</span>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
