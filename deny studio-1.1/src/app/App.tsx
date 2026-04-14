import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Instagram, Facebook, Twitter, ArrowRight, ArrowLeft, ChevronDown, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Preloader from "./components/Preloader/Preloader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const [activeShowcase, setActiveShowcase] = useState("NEW DROP");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const heroParallax = Math.min(scrollY * 0.4, 120);
  const shopRef = useRef<HTMLElement | null>(null);
  const lookbookRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: shopProgress } = useScroll({
    target: shopRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: lookbookProgress } = useScroll({
    target: lookbookRef,
    offset: ["start end", "end start"],
  });
  const shopTitleY = useSpring(useTransform(shopProgress, [0, 1], [34, -34]), {
    stiffness: 110,
    damping: 28,
  });
  const shopEyebrowY = useSpring(useTransform(shopProgress, [0, 1], [20, -20]), {
    stiffness: 110,
    damping: 28,
  });
  const lookbookParallaxA = useSpring(useTransform(lookbookProgress, [0, 1], [-30, 90]), {
    stiffness: 100,
    damping: 26,
  });
  const lookbookParallaxB = useSpring(useTransform(lookbookProgress, [0, 1], [-20, 72]), {
    stiffness: 100,
    damping: 26,
  });
  const lookbookTextA = useSpring(useTransform(lookbookProgress, [0, 1], [-40, 28]), {
    stiffness: 120,
    damping: 30,
  });
  const lookbookTextB = useSpring(useTransform(lookbookProgress, [0, 1], [40, -24]), {
    stiffness: 120,
    damping: 30,
  });
  const showcaseContent: Record<string, { image: string; eyebrow: string; caption: string }> = {
    "NEW DROP": {
      image: "https://images.unsplash.com/photo-1675079506513-f0a5eb0fd788?w=1800&q=80",
      eyebrow: "Latest Arrival",
      caption: "Fresh silhouettes, clean tailoring, and statement layers for this season.",
    },
    "BEST SELLING": {
      image: "https://images.unsplash.com/photo-1718340803554-3a7af7253aa8?w=1800&q=80",
      eyebrow: "Most Wanted",
      caption: "The pieces our community wears on repeat across every city.",
    },
    CATEGORIES: {
      image: "https://images.unsplash.com/photo-1552337480-48918be048b9?w=1800&q=80",
      eyebrow: "Browse By Mood",
      caption: "Explore by fit and identity with a minimalist, editorial navigation flow.",
    },
  };
  type RouteProduct = { name: string; price: string; image: string };
  const pageCatalog: Record<
    string,
    {
      title: string;
      subtitle: string;
      hero: string;
      gallery: string[];
      highlightCaption: string;
      products: RouteProduct[];
      ctaLabel: string;
      ctaPath: string;
    }
  > = {
    "/new-drop": {
      title: "NEW DROP",
      subtitle: "Fresh silhouettes and elevated essentials for this season.",
      hero: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1675079506513-f0a5eb0fd788?w=1800&q=80",
        "https://images.unsplash.com/photo-1718340803554-3a7af7253aa8?w=1800&q=80",
      ],
      highlightCaption: "Limited run. Precision cut. Built for the street.",
      products: [
        {
          name: "STUDIO BOMBER",
          price: "$220",
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=80",
        },
        {
          name: "BLACK CARGO SET",
          price: "$175",
          image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1400&q=80",
        },
        {
          name: "WIDE LEG DENIM",
          price: "$130",
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&q=80",
        },
        {
          name: "SIGNATURE KNIT",
          price: "$150",
          image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1400&q=80",
        },
      ],
      ctaLabel: "Shop New Drop",
      ctaPath: "/shop",
    },
    "/best-selling": {
      title: "BEST SELLING",
      subtitle: "Most wanted pieces worn across cities and seasons.",
      hero: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1559590450-fc29d6207936?w=1800&q=80",
        "https://images.unsplash.com/photo-1552337480-48918be048b9?w=1800&q=80",
      ],
      highlightCaption: "The silhouettes that define the Studio uniform.",
      products: [
        {
          name: "ESSENTIAL HOODIE",
          price: "$120",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1400&q=80",
        },
        {
          name: "URBAN RELAXED TEE",
          price: "$65",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&q=80",
        },
        {
          name: "CORE STREET JEANS",
          price: "$110",
          image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1400&q=80",
        },
        {
          name: "MONOCHROME JACKET",
          price: "$180",
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=80",
        },
      ],
      ctaLabel: "Explore Best Selling",
      ctaPath: "/shop",
    },
    "/shop": {
      title: "SHOP",
      subtitle: "A refined selection of studio essentials and statement pieces.",
      hero: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1620223765052-d38678bcce1a?w=1800&q=80",
        "https://images.unsplash.com/photo-1673118306649-a74a253c5733?w=1800&q=80",
      ],
      highlightCaption: "Navigate by category. One visual language end to end.",
      products: [
        {
          name: "OUTERWEAR",
          price: "FROM $180",
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=80",
        },
        {
          name: "TOPS",
          price: "FROM $65",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&q=80",
        },
        {
          name: "DENIM",
          price: "FROM $110",
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&q=80",
        },
        {
          name: "FOOTWEAR",
          price: "FROM $140",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1400&q=80",
        },
      ],
      ctaLabel: "Back To New Drop",
      ctaPath: "/new-drop",
    },
  };
  const categoryCatalog: Record<
    string,
    { title: string; subtitle: string; hero: string; gallery: string[]; highlightCaption: string; products: RouteProduct[] }
  > = {
    men: {
      title: "MEN",
      subtitle: "Tailored streetwear essentials with confident silhouettes.",
      hero: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=80",
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1800&q=80",
      ],
      highlightCaption: "Sharp lines. Quiet confidence. Built for the city.",
      products: [
        { name: "STRUCTURED BLAZER", price: "$260", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80" },
        { name: "TECH SHELL", price: "$210", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=80" },
        { name: "RELAXED TROUSER", price: "$145", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1400&q=80" },
        { name: "MONO LOAFER", price: "$165", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1400&q=80" },
      ],
    },
    women: {
      title: "WOMEN",
      subtitle: "Modern cuts with soft structure and strong attitude.",
      hero: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1800&q=80",
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1800&q=80",
      ],
      highlightCaption: "Texture, drape, and proportion in balance.",
      products: [
        { name: "DRAPED COAT", price: "$290", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1400&q=80" },
        { name: "RIB KNIT", price: "$125", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1400&q=80" },
        { name: "WIDE TROUSER", price: "$155", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1400&q=80" },
        { name: "MINIMAL HEEL", price: "$195", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1400&q=80" },
      ],
    },
    kids: {
      title: "KIDS",
      subtitle: "Play-ready essentials with bold studio identity.",
      hero: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=1800&q=80",
        "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1800&q=80",
      ],
      highlightCaption: "Durable fabrics. Easy movement. Same studio DNA.",
      products: [
        { name: "MINI HOODIE", price: "$75", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=1400&q=80" },
        { name: "PLAY TEE", price: "$45", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1400&q=80" },
        { name: "STRETCH DENIM", price: "$85", image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=1400&q=80" },
        { name: "LIGHT TRAINER", price: "$95", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1400&q=80" },
      ],
    },
    street: {
      title: "STREET",
      subtitle: "Underground-inspired essentials for everyday movement.",
      hero: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=1800&q=80",
        "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=1800&q=80",
      ],
      highlightCaption: "Utility layers. Heavy texture. Zero noise.",
      products: [
        { name: "OVERSIZED HOODIE", price: "$135", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1400&q=80" },
        { name: "CARGO PANT", price: "$155", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1400&q=80" },
        { name: "TECH VEST", price: "$175", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=80" },
        { name: "CHUNKY SOLE", price: "$185", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1400&q=80" },
      ],
    },
    jeans: {
      title: "JEANS",
      subtitle: "Relaxed, tapered, and oversized denim for every fit mood.",
      hero: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=1800&q=80",
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1800&q=80",
      ],
      highlightCaption: "Wash, weight, and break-in—editorial denim.",
      products: [
        { name: "WIDE LEG RAW", price: "$125", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&q=80" },
        { name: "TAPERED BLACK", price: "$118", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1400&q=80" },
        { name: "RELAXED INDIGO", price: "$130", image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=1400&q=80" },
        { name: "CROPPED STRAIGHT", price: "$122", image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=1400&q=80" },
      ],
    },
    shirts: {
      title: "SHIRTS",
      subtitle: "Clean construction and premium texture for layered looks.",
      hero: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=2200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1800&q=80",
        "https://images.unsplash.com/photo-1618354691221-88d47f285158?w=1800&q=80",
      ],
      highlightCaption: "Crisp cottons and quiet structure.",
      products: [
        { name: "OXFORD SHIRT", price: "$98", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1400&q=80" },
        { name: "LINEN RELAXED", price: "$110", image: "https://images.unsplash.com/photo-1618354691221-88d47f285158?w=1400&q=80" },
        { name: "STRIPE LONGSLEEVE", price: "$85", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1400&q=80" },
        { name: "SILK BLEND", price: "$135", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1400&q=80" },
      ],
    },
  };
  const isHomeRoute = currentPath === "/";
  const navigateHomeSection = (sectionId: string) => {
    if (!isHomeRoute) {
      navigateTo("/");
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const activePageData = pageCatalog[currentPath];
  const categorySlug = currentPath.startsWith("/category/") ? currentPath.replace("/category/", "") : "";
  const activeCategoryData = categorySlug ? categoryCatalog[categorySlug] : undefined;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === "/new-drop") {
      setActiveShowcase("NEW DROP");
      setCategoriesOpen(false);
      return;
    }
    if (currentPath === "/best-selling") {
      setActiveShowcase("BEST SELLING");
      setCategoriesOpen(false);
      return;
    }
    if (currentPath.startsWith("/category/")) {
      setActiveShowcase("CATEGORIES");
      setCategoriesOpen(true);
    }
  }, [currentPath]);

  const navigateTo = (path: string) => {
    if (window.location.pathname === path) return;
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo("/");
    }
  };

  const routeHighlightCaption =
    activePageData?.highlightCaption ?? activeCategoryData?.highlightCaption ?? "Studio Deny — editorial essentials.";
  const routeProducts: RouteProduct[] =
    activePageData?.products ??
    activeCategoryData?.products ?? [
      { name: "CITY OVERSHIRT", price: "$140", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=80" },
      { name: "ESSENTIAL RELAXED TEE", price: "$65", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&q=80" },
      { name: "STUDIO DENIM", price: "$120", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&q=80" },
      { name: "UTILITY JACKET", price: "$190", image: "https://images.unsplash.com/photo-1620223765052-d38678bcce1a?w=1400&q=80" },
    ];
  const routeCtaLabel = activePageData?.ctaLabel ?? "View Shop";
  const routeCtaPath = activePageData?.ctaPath ?? "/shop";

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <>
      <Preloader onLoadingComplete={() => setIsLoading(false)} />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="bg-[var(--deep-black)] text-[var(--pure-white)] overflow-x-hidden"
      >


      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 flex justify-between items-center transition-[background,backdrop-filter] duration-300 ${
          !isHomeRoute && scrollY > 12 ? "bg-[rgba(10,10,10,0.78)] backdrop-blur-md mix-blend-normal" : "mix-blend-difference"
        }`}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/");
          }}
          className="tracking-[-0.02em] hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-[1.65rem] sm:text-[2.5rem] leading-none">STUDIO DENY</span>
        </a>
        <div className="hidden sm:flex gap-8 items-center" style={{ fontFamily: "var(--font-body)" }}>
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              navigateHomeSection("shop");
            }}
            className="text-sm tracking-wide hover:opacity-60 transition-opacity"
          >
            SHOP
          </a>
          <a
            href="#lookbook"
            onClick={(e) => {
              e.preventDefault();
              navigateHomeSection("lookbook");
            }}
            className="text-sm tracking-wide hover:opacity-60 transition-opacity"
          >
            LOOKBOOK
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              navigateHomeSection("about");
            }}
            className="text-sm tracking-wide hover:opacity-60 transition-opacity"
          >
            ABOUT
          </a>
        </div>
      </motion.nav>

      {isHomeRoute ? (
      <>
      {/* Hero Section */}
      <section className="relative min-h-[82vh] sm:min-h-[86vh] w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-16 pt-28 sm:pt-32 pb-16">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1762666168682-8229f2a62305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')`,
            filter: "blur(8px) brightness(0.4)",
            transform: `translateY(${heroParallax}px)`,
          }}
        />

        {/* Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1320px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            <h1
              className="text-[clamp(2.4rem,13vw,8.5rem)] leading-[0.88] tracking-[-0.04em] uppercase max-w-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              IN THE CUT
              <br />
              NOT IN THE CROWD
            </h1>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl opacity-90"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Elevated streetwear engineered for creators. Limited drops, premium cuts, and a fit made to stand
              apart.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.a
                href="#shop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="group relative overflow-hidden px-8 py-3 min-h-11 border border-[var(--pure-white)] bg-[var(--pure-white)] text-[var(--deep-black)] hover:bg-transparent hover:text-[var(--pure-white)] transition-colors duration-300 inline-flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="text-sm tracking-[0.14em]">SHOP THE DROP</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <a
                href="#lookbook"
                className="px-8 py-3 min-h-11 border border-[var(--gray-700)] text-sm tracking-[0.14em] hover:border-[var(--pure-white)] transition-colors duration-300 inline-flex items-center justify-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                VIEW LOOKBOOK
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="flex flex-col items-center gap-2 opacity-70">
            <span className="text-[11px] tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>
              SCROLL
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Editorial Marquee */}
      <section className="py-5 sm:py-6 border-y border-[rgba(255,255,255,0.16)] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="whitespace-nowrap flex gap-8 sm:gap-12 text-xs sm:text-sm tracking-[0.2em] uppercase opacity-70"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {Array.from({ length: 3 }).map((_, row) => (
            <span key={row} className="inline-flex gap-8 sm:gap-12">
              <span>STUDIO DENY</span>
              <span>NEW SEASON</span>
              <span>LIMITED EDITION</span>
              <span>URBAN TAILORING</span>
              <span>STREET LUXE</span>
              <span>STUDIO DENY</span>
              <span>NEW SEASON</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* Collection Section */}
      <section id="shop" ref={shopRef} className="relative py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 lg:gap-14 items-end">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative min-h-[62vh] sm:min-h-[78vh] overflow-hidden"
            >
              {Object.entries(showcaseContent).map(([key, content]) => (
                <motion.img
                  key={key}
                  src={content.image}
                  alt={`${key} editorial preview`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{
                    opacity: activeShowcase === key ? 1 : 0,
                    scale: activeShowcase === key ? 1 : 1.04,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-transparent to-[rgba(0,0,0,0.2)]" />
              <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8">
                <motion.p
                  style={{ fontFamily: "var(--font-body)", y: shopEyebrowY }}
                  className="text-xs sm:text-sm tracking-[0.22em] uppercase opacity-85 mb-3"
                >
                  {showcaseContent[activeShowcase].eyebrow}
                </motion.p>
                <motion.h2
                  style={{ y: shopTitleY, fontFamily: "var(--font-display)" }}
                  className="text-[clamp(2.5rem,10vw,7.6rem)] leading-[0.86] tracking-[-0.045em] uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                  transition={{ duration: 0.35 }}
                  initial={false}
                  key={activeShowcase}
                >
                  {activeShowcase}
                </motion.h2>
              </div>
            </motion.div>

            <div className="space-y-8 sm:space-y-10">
              <p className="text-xs tracking-[0.2em] uppercase opacity-70" style={{ fontFamily: "var(--font-body)" }}>
                Discover the collection through curated pathways.
              </p>
              {["NEW DROP", "BEST SELLING", "CATEGORIES"].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="border-b border-[rgba(255,255,255,0.22)] pb-3"
                >
                  {item === "CATEGORIES" ? (
                    <button
                      type="button"
                      onMouseEnter={() => setActiveShowcase(item)}
                      onFocus={() => setActiveShowcase(item)}
                      onClick={() => {
                        setActiveShowcase(item);
                        setCategoriesOpen((prev) => !prev);
                      }}
                      className="w-full text-left flex items-end justify-between group min-h-11 cursor-pointer active:opacity-80 focus-visible:outline-none focus-visible:opacity-100"
                      aria-expanded={categoriesOpen}
                      aria-controls="showcase-categories-list"
                    >
                      <h3
                        className={`text-[clamp(1.7rem,5.5vw,3.6rem)] leading-[0.95] tracking-[-0.02em] uppercase transition-opacity duration-300 ${
                          activeShowcase === item ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item}
                      </h3>
                      <span
                        className={`text-xs tracking-[0.2em] uppercase transition-opacity duration-300 ${
                          activeShowcase === item ? "opacity-80" : "opacity-40 group-hover:opacity-70"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {categoriesOpen ? "CLOSE" : "EXPLORE"}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={item === "NEW DROP" ? "/new-drop" : "/best-selling"}
                      onMouseEnter={() => setActiveShowcase(item)}
                      onFocus={() => setActiveShowcase(item)}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveShowcase(item);
                        setCategoriesOpen(false);
                        navigateTo(item === "NEW DROP" ? "/new-drop" : "/best-selling");
                      }}
                      className="w-full text-left flex items-end justify-between group min-h-11 cursor-pointer active:opacity-80 focus-visible:outline-none focus-visible:opacity-100"
                    >
                      <h3
                        className={`text-[clamp(1.7rem,5.5vw,3.6rem)] leading-[0.95] tracking-[-0.02em] uppercase transition-opacity duration-300 ${
                          activeShowcase === item ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item}
                      </h3>
                      <span
                        className={`text-xs tracking-[0.2em] uppercase transition-opacity duration-300 ${
                          activeShowcase === item ? "opacity-80" : "opacity-40 group-hover:opacity-70"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        VIEW
                      </span>
                    </a>
                  )}
                  {item === "CATEGORIES" && (
                    <motion.div
                      id="showcase-categories-list"
                      initial={false}
                      animate={{
                        height: categoriesOpen ? "auto" : 0,
                        opacity: categoriesOpen ? 1 : 0,
                        marginTop: categoriesOpen ? 16 : 0,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-x-5 gap-y-3 pb-1">
                        {["MEN", "WOMEN", "KIDS", "STREET", "JEANS", "SHIRTS"].map((cat) => (
                          <a
                            key={cat}
                            href={`/category/${cat.toLowerCase()}`}
                            onMouseEnter={() => setActiveShowcase("CATEGORIES")}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveShowcase("CATEGORIES");
                              setCategoriesOpen(true);
                              navigateTo(`/category/${cat.toLowerCase()}`);
                            }}
                            className="text-xs sm:text-sm tracking-[0.18em] uppercase opacity-70 hover:opacity-100 transition-opacity cursor-pointer active:opacity-80 focus-visible:outline-none focus-visible:opacity-100"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {cat}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              <p className="text-sm opacity-75 max-w-md leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {showcaseContent[activeShowcase].caption}
              </p>
              <a
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/shop");
                }}
                className="inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase opacity-85 hover:opacity-100 transition-opacity"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Shop Full Collection <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Typography Statement Section */}
      <section className="relative py-24 sm:py-36 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(circle at center, black 40%, transparent 85%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.32, scale: 1 }}
          transition={{ duration: 1.1 }}
          viewport={{ once: true }}
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl bg-[rgba(255,255,255,0.08)]"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.24, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          viewport={{ once: true }}
          className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full blur-3xl bg-[rgba(255,255,255,0.06)]"
        />
        <div className="absolute inset-0 pointer-events-none">
          {[
            { text: "UTILITY FIT", pos: "top-[20%] left-[8%]" },
            { text: "HEAVY GSM", pos: "top-[32%] right-[10%]" },
            { text: "LIMITED DROP", pos: "bottom-[28%] left-[12%]" },
            { text: "CITY UNIFORM", pos: "bottom-[20%] right-[12%]" },
          ].map((tag, idx) => (
            <motion.span
              key={tag.text}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 0.34, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 * idx }}
              viewport={{ once: true }}
              className={`absolute ${tag.pos} hidden md:block text-xs tracking-[0.24em]`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {tag.text}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-[1320px] mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-4 sm:mb-6"
          >
            <span
              className="inline-flex items-center px-3 py-1 border border-[rgba(255,255,255,0.28)] text-[10px] sm:text-xs tracking-[0.22em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              STUDIO DENY DNA
            </span>
          </motion.div>
          <h2
            className="text-[clamp(2.8rem,16vw,11rem)] leading-[0.82] tracking-[-0.05em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            STREET
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px var(--pure-white)" }}>
              IS
            </span>
            <br />
            IDENTITY
          </h2>
        </motion.div>
      </section>

      {/* Mid Page CTA */}
      <section className="py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-xs tracking-[0.18em] uppercase opacity-65 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Private Access
            </p>
            <h3 className="text-[clamp(2rem,7vw,5rem)] leading-[0.9] tracking-[-0.03em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
              MEMBERS
              <br />
              GET FIRST LOOK
            </h3>
            <p className="text-base mt-3 opacity-80 max-w-md" style={{ fontFamily: "var(--font-body)" }}>
              Drop alerts and early windows for limited releases.
            </p>
          </div>
          <a
            href="#cta-end"
            className="inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase opacity-85 hover:opacity-100 transition-opacity min-h-11"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join Waitlist <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Lookbook Section */}
      <section id="lookbook" ref={lookbookRef} className="py-14 sm:py-20 bg-[rgba(255,255,255,0.01)]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-10"
          >
            <h2 className="text-[clamp(2rem,8vw,4.5rem)] leading-none tracking-[-0.03em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
              LOOKBOOK
            </h2>
            <p className="text-base sm:text-lg mt-3 opacity-80 max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
              Swipe through curated fits built for daily movement.
            </p>
          </motion.div>
        </div>

        <div className="space-y-10 sm:space-y-16">
          {/* Lookbook Image 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative h-[72vh] sm:h-[86vh] overflow-hidden"
          >
            <motion.div
              className="absolute inset-x-0 -inset-y-14 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1762666167416-72b1540a76b7?w=1920&q=80')`,
                y: lookbookParallaxA,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-black)] via-transparent to-transparent" />
            <motion.div className="absolute bottom-8 left-4 sm:bottom-14 sm:left-8 lg:left-16 z-10" style={{ x: lookbookTextA }}>
              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-[clamp(2.2rem,9vw,8rem)] leading-none tracking-[-0.04em] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                SS26
                <br />
                COLLECTION
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Lookbook Image 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative h-[72vh] sm:h-[86vh] overflow-hidden"
          >
            <motion.div
              className="absolute inset-x-0 -inset-y-14 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1762052508086-59f97070092c?w=1920&q=80')`,
                y: lookbookParallaxB,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-black)] via-transparent to-transparent" />
            <motion.div className="absolute top-8 right-4 sm:top-14 sm:right-8 lg:right-16 z-10 text-right" style={{ x: lookbookTextB }}>
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-[clamp(2.2rem,9vw,8rem)] leading-none tracking-[-0.04em] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                URBAN
                <br />
                ESSENTIALS
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-14"
          >
            <h2 className="text-[clamp(2.1rem,8vw,5.2rem)] leading-[0.9] tracking-[-0.03em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
              WORN IN
              <br />
              EVERY CITY
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {[
              "“Fit is unreal. It feels premium without trying too hard.”",
              "“Finally a brand that understands cut, fabric, and movement.”",
              "“Every drop sells out for a reason. Quality is consistent.”",
            ].map((quote, idx) => (
              <motion.div
                key={quote}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} className="w-3.5 h-3.5 fill-current opacity-90" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl leading-relaxed opacity-90" style={{ fontFamily: "var(--font-display)" }}>
                  {quote}
                </p>
                <p className="text-xs tracking-[0.15em] opacity-60 mt-4" style={{ fontFamily: "var(--font-body)" }}>
                  VERIFIED BUYER
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="about" className="py-14 sm:py-20 px-4 sm:px-8 lg:px-16 border-y border-[var(--gray-900)] bg-[rgba(255,255,255,0.01)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-[1320px] mx-auto"
        >
          <h2
            className="text-[clamp(2rem,8vw,4.5rem)] leading-[0.95] tracking-[-0.03em] mb-6 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WE DON'T FOLLOW TRENDS.
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed tracking-wide max-w-2xl font-light opacity-85"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Studio Deny represents creators and rule-breakers. We build pieces that fit real movement, hold up daily,
            and speak before you do.
          </p>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section id="cta-end" className="py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-16 text-center"
        >
          <h2 className="text-[clamp(2.3rem,9vw,6rem)] leading-[0.88] tracking-[-0.03em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
            READY FOR THE NEXT DROP?
          </h2>
          <p className="text-base sm:text-lg mt-4 opacity-80 max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Be first in line when new pieces launch. No spam, just access.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase opacity-90 hover:opacity-100 transition-opacity min-h-11"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Get Early Access <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--deep-black)] border-t border-[var(--gray-800)] pt-12 sm:pt-16 pb-24 sm:pb-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1320px] mx-auto">
          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            {[
              "https://images.unsplash.com/photo-1760302318620-261f5e4d1940?w=600&q=80",
              "https://images.unsplash.com/photo-1775592231472-6d8719ccdfe3?w=600&q=80",
              "https://images.unsplash.com/photo-1602080243652-3c5a008e194c?w=600&q=80",
              "https://images.unsplash.com/photo-1728997907996-b946a76e211b?w=600&q=80",
              "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
              "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80",
            ].map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden bg-[var(--gray-900)]">
                <img
                  src={img}
                  alt={`Studio ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </motion.div>

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Logo & Tagline */}
            <div>
              <h3
                className="text-[3rem] leading-none tracking-[-0.02em] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                STUDIO
                <br />
                DENY
              </h3>
              <p className="text-sm tracking-wide opacity-60 font-light" style={{ fontFamily: "var(--font-body)" }}>
                STREET CULTURE. REFINED.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4" style={{ fontFamily: "var(--font-body)" }}>
              <h4 className="text-sm tracking-[0.2em] mb-2 opacity-40">NAVIGATE</h4>
              <a href="#shop" className="text-sm tracking-wide hover:opacity-60 transition-opacity w-fit">
                SHOP
              </a>
              <a href="#lookbook" className="text-sm tracking-wide hover:opacity-60 transition-opacity w-fit">
                LOOKBOOK
              </a>
              <a href="#about" className="text-sm tracking-wide hover:opacity-60 transition-opacity w-fit">
                ABOUT
              </a>
              <a href="#cta-end" className="text-sm tracking-wide hover:opacity-60 transition-opacity w-fit">
                WAITLIST
              </a>
            </div>

            {/* Social */}
            <div style={{ fontFamily: "var(--font-body)" }}>
              <h4 className="text-sm tracking-[0.2em] mb-6 opacity-40">FOLLOW US</h4>
              <div className="flex gap-6">
                <a href="#" className="hover:opacity-60 transition-opacity">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:opacity-60 transition-opacity">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:opacity-60 transition-opacity">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
              <p className="text-sm tracking-wide mt-8 opacity-60">@STUDIODENY</p>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="pt-8 border-t border-[var(--gray-800)] text-xs tracking-wider opacity-40 font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © 2026 STUDIO DENY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

        {/* Sticky Mobile CTA */}
        <motion.a
          href="#cta-end"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: scrollY > 420 ? 0 : 120, opacity: scrollY > 420 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden fixed bottom-4 left-4 right-4 z-50 min-h-11 px-6 py-3 border border-[var(--pure-white)] bg-[var(--pure-white)] text-[var(--deep-black)] text-sm tracking-[0.14em] inline-flex items-center justify-center"
          style={{ fontFamily: "var(--font-body)" }}
        >
          SHOP THE DROP
        </motion.a>
      </>
      ) : (
        <main className="pt-20 sm:pt-24">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-16 pt-2 pb-4">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.18em] uppercase opacity-70 hover:opacity-100 transition-opacity min-h-11 cursor-pointer active:opacity-80 focus-visible:outline-none focus-visible:opacity-100"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Back
            </button>
          </div>

          <section className="relative min-h-[78vh] sm:min-h-[90vh] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${activeCategoryData?.hero ?? activePageData?.hero ?? pageCatalog["/shop"].hero}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.78)] via-[rgba(0,0,0,0.28)] to-[rgba(0,0,0,0.35)]" />
            <div className="relative z-10 px-4 sm:px-8 lg:px-16 h-full min-h-[78vh] sm:min-h-[90vh] flex items-end pb-14 sm:pb-20">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                <p className="text-xs sm:text-sm tracking-[0.22em] uppercase opacity-75 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  Studio Deny Editorial
                </p>
                <h1
                  className="text-[clamp(2.8rem,12vw,8.5rem)] leading-[0.84] tracking-[-0.045em] uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {activeCategoryData?.title ?? activePageData?.title ?? "SHOP"}
                </h1>
                <p className="text-base sm:text-lg mt-4 max-w-xl opacity-88 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {activeCategoryData?.subtitle ?? activePageData?.subtitle ?? "Curated essentials for a clean city uniform."}
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16 sm:py-24 space-y-20 sm:space-y-28">
            {routeProducts.map((product, idx) => {
              const imageLeft = idx % 2 === 0;
              return (
                <motion.a
                  key={`${product.name}-${idx}`}
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/shop");
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.05 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  className="group block max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center cursor-pointer"
                >
                  <div
                    className={`relative min-h-[48vh] sm:min-h-[58vh] overflow-hidden ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.45)] to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>
                  <div className={`space-y-5 lg:pl-2 lg:pr-2 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                    <p className="text-[11px] sm:text-xs tracking-[0.22em] uppercase opacity-55" style={{ fontFamily: "var(--font-body)" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <div className="space-y-3">
                      <h2
                        className="text-[clamp(1.9rem,6vw,4rem)] leading-[0.95] tracking-[-0.03em] uppercase transition-opacity duration-300 group-hover:opacity-100"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <span className="bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] bg-[linear-gradient(currentColor,currentColor)]">
                          {product.name}
                        </span>
                      </h2>
                      <p className="text-sm sm:text-base tracking-[0.16em] uppercase opacity-75" style={{ fontFamily: "var(--font-body)" }}>
                        {product.price}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </section>

          <section className="relative min-h-[56vh] sm:min-h-[70vh] overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${(activeCategoryData?.gallery ?? activePageData?.gallery ?? pageCatalog["/shop"].gallery)[0]}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.35)] to-transparent" />
            <div className="relative z-10 min-h-[56vh] sm:min-h-[70vh] flex items-end px-4 sm:px-8 lg:px-16 pb-12 sm:pb-16 max-w-[1560px] mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-[clamp(1.25rem,4vw,2.25rem)] leading-snug tracking-[-0.02em] max-w-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {routeHighlightCaption}
              </motion.p>
            </div>
          </section>

          <section className="py-20 sm:py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-14 lg:gap-24"
            >
              <div className="space-y-8 max-w-md">
                <p className="text-xs tracking-[0.22em] uppercase opacity-55" style={{ fontFamily: "var(--font-body)" }}>
                  Continue
                </p>
                <a
                  href={routeCtaPath}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(routeCtaPath);
                  }}
                  className="inline-flex items-center gap-2 text-sm tracking-[0.22em] uppercase opacity-90 hover:opacity-100 transition-opacity min-h-11"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {routeCtaLabel} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="space-y-6 lg:text-right lg:ml-auto">
                <p className="text-xs tracking-[0.2em] uppercase opacity-50" style={{ fontFamily: "var(--font-body)" }}>
                  Navigate
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="/new-drop"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/new-drop");
                    }}
                    className="text-2xl sm:text-4xl tracking-[-0.02em] uppercase opacity-85 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    New Drop
                  </a>
                  <a
                    href="/best-selling"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/best-selling");
                    }}
                    className="text-2xl sm:text-4xl tracking-[-0.02em] uppercase opacity-85 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Best Selling
                  </a>
                  <a
                    href="/shop"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/shop");
                    }}
                    className="text-2xl sm:text-4xl tracking-[-0.02em] uppercase opacity-85 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Shop
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="border-t border-[rgba(255,255,255,0.12)] pt-14 sm:pt-16 pb-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-[1560px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div>
                <p className="text-[1.75rem] sm:text-[2rem] leading-none tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  STUDIO DENY
                </p>
                <p className="text-xs tracking-[0.18em] uppercase opacity-50" style={{ fontFamily: "var(--font-body)" }}>
                  Street culture. Refined.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-[0.16em] uppercase opacity-70" style={{ fontFamily: "var(--font-body)" }}>
                <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo("/"); window.setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 40); }} className="hover:opacity-100 transition-opacity">
                  Shop
                </a>
                <a href="#lookbook" onClick={(e) => { e.preventDefault(); navigateTo("/"); window.setTimeout(() => document.getElementById("lookbook")?.scrollIntoView({ behavior: "smooth" }), 40); }} className="hover:opacity-100 transition-opacity">
                  Lookbook
                </a>
                <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo("/"); window.setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 40); }} className="hover:opacity-100 transition-opacity">
                  About
                </a>
                <a href="/" onClick={(e) => { e.preventDefault(); navigateTo("/"); }} className="hover:opacity-100 transition-opacity">
                  Home
                </a>
              </div>
              <div className="flex gap-6 opacity-80">
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="max-w-[1560px] mx-auto mt-12 text-[11px] tracking-[0.14em] uppercase opacity-35" style={{ fontFamily: "var(--font-body)" }}>
              © 2026 Studio Deny. All rights reserved.
            </p>
          </footer>
        </main>
      )}
      </motion.div>
    </>
  );
}


