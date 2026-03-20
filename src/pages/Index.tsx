import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import html2canvas from "html2canvas";

const HERO_IMG = "https://cdn.poehali.dev/projects/84f31b16-2241-4456-8f09-caa19377bb15/files/03d8ee1a-5419-4f6c-bdeb-956487ac0197.jpg";
const ARTIST_IMG = "https://cdn.poehali.dev/projects/84f31b16-2241-4456-8f09-caa19377bb15/bucket/fe7f5d0f-796d-40ce-b50e-69cee86be77b.jpg";

interface Show {
  id: number;
  date: string;
  dateSort: string;
  city: string;
  block: number;
  priceVip: number;
  priceFan: number;
  priceStd: number;
  sold: boolean;
}

interface CartItem {
  showId: number;
  city: string;
  date: string;
  tier: "vip" | "fan" | "std";
  price: number;
  qty: number;
}

const BLOCKS = [
  { id: 1, emoji: "🌲", title: "Сибирь", subtitle: "10 — 21 апреля" },
  { id: 2, emoji: "⛰️", title: "Урал и Поволжье", subtitle: "2 — 13 мая" },
  { id: 3, emoji: "☀️", title: "Юг", subtitle: "20 — 30 мая" },
  { id: 4, emoji: "🏙️", title: "Центр и Столицы", subtitle: "5 — 14 июня" },
];

const SHOWS: Show[] = [
  { id: 1,  date: "10 апр",  dateSort: "2026-04-10", city: "Иркутск",         block: 1, priceVip: 5500, priceFan: 3200, priceStd: 1800, sold: false },
  { id: 2,  date: "12 апр",  dateSort: "2026-04-12", city: "Красноярск",      block: 1, priceVip: 5500, priceFan: 3200, priceStd: 1800, sold: false },
  { id: 3,  date: "14 апр",  dateSort: "2026-04-14", city: "Кемерово",        block: 1, priceVip: 5000, priceFan: 2900, priceStd: 1600, sold: false },
  { id: 4,  date: "15 апр",  dateSort: "2026-04-15", city: "Юрга",            block: 1, priceVip: 4500, priceFan: 2600, priceStd: 1400, sold: false },
  { id: 5,  date: "17 апр",  dateSort: "2026-04-17", city: "Новосибирск",     block: 1, priceVip: 6500, priceFan: 3800, priceStd: 2200, sold: false },
  { id: 6,  date: "19 апр",  dateSort: "2026-04-19", city: "Томск",           block: 1, priceVip: 5000, priceFan: 2900, priceStd: 1600, sold: false },
  { id: 7,  date: "21 апр",  dateSort: "2026-04-21", city: "Омск",            block: 1, priceVip: 5200, priceFan: 3000, priceStd: 1700, sold: false },
  { id: 8,  date: "2 мая",   dateSort: "2026-05-02", city: "Тюмень",          block: 2, priceVip: 5200, priceFan: 3000, priceStd: 1700, sold: false },
  { id: 9,  date: "4 мая",   dateSort: "2026-05-04", city: "Екатеринбург",    block: 2, priceVip: 6800, priceFan: 4000, priceStd: 2300, sold: false },
  { id: 10, date: "5 мая",   dateSort: "2026-05-05", city: "Челябинск",       block: 2, priceVip: 5500, priceFan: 3200, priceStd: 1800, sold: false },
  { id: 11, date: "7 мая",   dateSort: "2026-05-07", city: "Уфа",             block: 2, priceVip: 5500, priceFan: 3200, priceStd: 1800, sold: false },
  { id: 12, date: "9 мая",   dateSort: "2026-05-09", city: "Оренбург",        block: 2, priceVip: 4800, priceFan: 2800, priceStd: 1500, sold: false },
  { id: 13, date: "11 мая",  dateSort: "2026-05-11", city: "Самара",          block: 2, priceVip: 5800, priceFan: 3400, priceStd: 1900, sold: false },
  { id: 14, date: "13 мая",  dateSort: "2026-05-13", city: "Казань",          block: 2, priceVip: 6200, priceFan: 3600, priceStd: 2100, sold: false },
  { id: 15, date: "20 мая",  dateSort: "2026-05-20", city: "Волгоград",       block: 3, priceVip: 5500, priceFan: 3200, priceStd: 1800, sold: false },
  { id: 16, date: "22 мая",  dateSort: "2026-05-22", city: "Ростов-на-Дону",  block: 3, priceVip: 5800, priceFan: 3400, priceStd: 1900, sold: false },
  { id: 17, date: "24 мая",  dateSort: "2026-05-24", city: "Белая Глина",     block: 3, priceVip: 4500, priceFan: 2600, priceStd: 1400, sold: false },
  { id: 18, date: "26 мая",  dateSort: "2026-05-26", city: "Ставрополь",      block: 3, priceVip: 5000, priceFan: 2900, priceStd: 1600, sold: false },
  { id: 19, date: "28 мая",  dateSort: "2026-05-28", city: "Краснодар",       block: 3, priceVip: 6200, priceFan: 3600, priceStd: 2100, sold: false },
  { id: 20, date: "30 мая",  dateSort: "2026-05-30", city: "Сочи",            block: 3, priceVip: 7200, priceFan: 4200, priceStd: 2500, sold: false },
  { id: 21, date: "5 июн",   dateSort: "2026-06-05", city: "Воронеж",         block: 4, priceVip: 5800, priceFan: 3400, priceStd: 1900, sold: false },
  { id: 22, date: "7 июн",   dateSort: "2026-06-07", city: "Нижний Новгород", block: 4, priceVip: 6200, priceFan: 3600, priceStd: 2100, sold: false },
  { id: 23, date: "10 июн",  dateSort: "2026-06-10", city: "Ярославль",       block: 4, priceVip: 5500, priceFan: 3200, priceStd: 1800, sold: false },
  { id: 24, date: "12 июн",  dateSort: "2026-06-12", city: "Санкт-Петербург", block: 4, priceVip: 8500, priceFan: 5000, priceStd: 2900, sold: false },
  { id: 25, date: "14 июн",  dateSort: "2026-06-14", city: "Москва",          block: 4, priceVip: 9500, priceFan: 5800, priceStd: 3200, sold: false },
];

const TIER_LABELS = { vip: "VIP", fan: "Фанзона", std: "Стандарт" };
const TIER_COLORS = {
  vip: "from-yellow-400 to-orange-500",
  fan: "from-purple-500 to-pink-500",
  std: "from-blue-500 to-cyan-500",
};

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [expandedShow, setExpandedShow] = useState<number | null>(null);
  const [addedKey, setAddedKey] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const downloadPoster = async () => {
    if (!posterRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: "#0d0d1f",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "Большой-тур-2026.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const filtered = activeBlock ? SHOWS.filter((s) => s.block === activeBlock) : SHOWS;

  const getPrice = (show: Show, tier: "vip" | "fan" | "std") =>
    tier === "vip" ? show.priceVip : tier === "fan" ? show.priceFan : show.priceStd;

  const addToCart = (show: Show, tier: "vip" | "fan" | "std") => {
    const key = `${show.id}-${tier}`;
    setCart((prev) => {
      const ex = prev.find((i) => i.showId === show.id && i.tier === tier);
      if (ex) return prev.map((i) => i.showId === show.id && i.tier === tier ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { showId: show.id, city: show.city, date: show.date, tier, price: getPrice(show, tier), qty: 1 }];
    });
    setAddedKey(key);
    setTimeout(() => setAddedKey(null), 900);
  };

  const changeQty = (showId: number, tier: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.showId === showId && i.tier === tier ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen" style={{ background: "#080810" }}>

      {/* TICKER */}
      <div className="overflow-hidden py-2" style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
        <div className="flex animate-ticker whitespace-nowrap select-none">
          {Array(6).fill("🎵 БОЛЬШОЙ ТУР 2026 · 28 ГОРОДОВ РОССИИИ · БИЛЕТЫ ОФИЦИАЛЬНО ·\u00A0").map((t, i) => (
            <span key={i} className="text-white/90 text-xs font-unbounded font-semibold tracking-widest mr-0">{t}</span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
            >
              <Icon name="Music2" size={17} className="text-white" />
            </div>
            <div>
              <div className="font-unbounded text-base font-black text-white leading-none neon-text">БОЛЬШОЙ ТУР</div>
              <div className="text-xs text-white/40 font-golos">2026 · Официальные билеты</div>
            </div>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
          >
            <Icon name="ShoppingCart" size={17} className="text-white" />
            <span className="hidden sm:block">Корзина</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-purple-700 text-[10px] font-black flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Тур 2026" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #080810 30%, transparent 70%), linear-gradient(to top, #080810 10%, transparent 60%)" }} />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.2), transparent)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-purple-300 mb-6 animate-fade-in"
              style={{ border: "1px solid rgba(168,85,247,0.35)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Продажа билетов открыта
            </div>

            <h1 className="font-unbounded text-5xl md:text-7xl font-black text-white leading-[0.95] mb-5 animate-fade-in delay-100">
              БОЛЬШОЙ<br />
              <span className="text-transparent bg-clip-text animate-gradient"
                style={{ backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899, #f97316, #a855f7)" }}>
                ТУР 2026
              </span>
            </h1>

            <p className="text-white/60 text-lg mb-8 animate-fade-in delay-200 font-golos">
              28 городов · 4 блока · апрель–июнь 2026
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in delay-300">
              {[
                { icon: "MapPin", val: "28", label: "городов" },
                { icon: "Calendar", val: "4", label: "блока" },
                { icon: "Users", val: "50К+", label: "зрителей" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl px-5 py-3 text-center min-w-[90px]">
                  <div className="font-unbounded text-xl font-black text-white">{s.val}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POSTER */}
      <section className="max-w-6xl mx-auto px-4 mt-10 mb-14">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
              <Icon name="Image" size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-unbounded text-xl font-black text-white">Афиша тура</h2>
              <p className="text-xs text-white/40 mt-0.5">Все города · Апрель — Июнь 2026</p>
            </div>
          </div>
          <button
            onClick={downloadPoster}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
          >
            {downloading ? (
              <>
                <Icon name="Loader2" size={16} className="text-white animate-spin" />
                Создаю...
              </>
            ) : (
              <>
                <Icon name="Download" size={16} className="text-white" />
                Скачать афишу
              </>
            )}
          </button>
        </div>

        <div ref={posterRef} className="relative rounded-3xl overflow-hidden animate-fade-in"
          style={{ background: "linear-gradient(135deg, #0d0d1f 0%, #120820 50%, #0d0d1f 100%)", border: "1px solid rgba(168,85,247,0.2)" }}>

          {/* Background poster image */}
          <div className="absolute inset-0">
            <img src="https://cdn.poehali.dev/projects/84f31b16-2241-4456-8f09-caa19377bb15/files/7b40f0cd-3161-4961-be29-735aa4be210b.jpg"
              alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,8,16,0.85) 0%, rgba(20,8,40,0.75) 100%)" }} />
          </div>

          {/* Glow accents */}
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
            style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />

          <div className="relative z-10 p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white/80 mb-5"
                style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))", border: "1px solid rgba(168,85,247,0.4)" }}>
                🎵 БОЛЬШОЙ ТУР · ОФИЦИАЛЬНАЯ АФИША
              </div>
              <h3 className="font-unbounded text-4xl md:text-6xl font-black text-white leading-none mb-3">
                БОЛЬШОЙ<br />
                <span className="text-transparent bg-clip-text animate-gradient"
                  style={{ backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899, #f97316, #a855f7)" }}>
                  ТУР 2026
                </span>
              </h3>
              <p className="text-white/40 font-unbounded text-sm tracking-widest">АПРЕЛЬ · МАЙ · ИЮНЬ</p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.5))" }} />
              <Icon name="Music2" size={16} className="text-purple-400" />
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(168,85,247,0.5))" }} />
            </div>

            {/* All 4 blocks in columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { emoji: "🌲", title: "СИБИРЬ", sub: "10–21 апреля", cities: ["10 апр — Иркутск", "12 апр — Красноярск", "14 апр — Кемерово", "15 апр — Юрга", "17 апр — Новосибирск", "19 апр — Томск", "21 апр — Омск"] },
                { emoji: "⛰️", title: "УРАЛ И ПОВОЛЖЬЕ", sub: "2–13 мая", cities: ["02 мая — Тюмень", "04 мая — Екатеринбург", "05 мая — Челябинск", "07 мая — Уфа", "09 мая — Оренбург", "11 мая — Самара", "13 мая — Казань"] },
                { emoji: "☀️", title: "ЮГ", sub: "20–30 мая", cities: ["20 мая — Волгоград", "22 мая — Ростов-на-Дону", "24 мая — Белая Глина", "26 мая — Ставрополь", "28 мая — Краснодар", "30 мая — Сочи"] },
                { emoji: "🏙️", title: "ЦЕНТР И СТОЛИЦЫ", sub: "5–14 июня", cities: ["05 июн — Воронеж", "07 июн — Нижний Новгород", "10 июн — Ярославль", "12 июн — Санкт-Петербург", "14 июн — Москва"] },
              ].map((block, bi) => (
                <div key={bi} className="animate-fade-in" style={{ animationDelay: `${bi * 0.1}s` }}>
                  <div className="mb-3">
                    <div className="text-xl mb-1">{block.emoji}</div>
                    <div className="font-unbounded text-[11px] font-black text-white leading-tight tracking-wide">{block.title}</div>
                    <div className="text-[10px] text-purple-400 mt-0.5 font-medium">{block.sub}</div>
                  </div>
                  <div className="space-y-1.5">
                    {block.cities.map((city, ci) => {
                      const [date, name] = city.split(" — ");
                      return (
                        <div key={ci} className="flex items-baseline gap-2">
                          <span className="font-unbounded text-[10px] text-white/35 shrink-0 w-12">{date}</span>
                          <span className="text-white/80 text-xs font-medium leading-tight">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(236,72,153,0.4))" }} />
              <div className="flex gap-2">
                {["🌲", "⛰️", "☀️", "🏙️"].map((e, i) => <span key={i} className="text-sm">{e}</span>)}
              </div>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(236,72,153,0.4))" }} />
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-unbounded text-xs text-white/50 tracking-widest">ОФИЦИАЛЬНЫЕ БИЛЕТЫ</p>
                <p className="text-white/25 text-[10px] mt-0.5">Все 28 концертов · 3 категории мест</p>
              </div>
              <div className="flex items-center gap-3">
                {["Стандарт", "Фанзона", "VIP"].map((t, i) => (
                  <span key={i} className={`text-[10px] font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-yellow-400 to-orange-500"][i]}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ARTIST */}
      <section className="max-w-6xl mx-auto px-4 mt-10 mb-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Photo */}
          <div className="relative animate-fade-in">
            <div className="absolute -inset-1 rounded-3xl blur-xl opacity-50"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }} />
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
              <img src={ARTIST_IMG} alt="Исполнитель" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,16,0.7) 0%, transparent 50%)" }} />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex gap-3">
                  {["VK", "TG", "YM"].map((s) => (
                    <div key={s} className="glass px-3 py-1.5 rounded-xl text-xs font-bold text-white/70">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-in delay-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-purple-300 mb-5"
              style={{ border: "1px solid rgba(168,85,247,0.3)" }}>
              <Icon name="Star" size={12} className="text-yellow-400" />
              Об исполнителе
            </div>

            <h2 className="font-unbounded text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
              Большой<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                Тур 2026
              </span>
            </h2>

            <p className="text-white/60 leading-relaxed mb-6 font-golos">
              Масштабное турне охватит всю Россию — от Иркутска до Москвы. 28 городов, 4 блока, тысячи зрителей.
              Живое звучание, новые аранжировки и неповторимая атмосфера живого концерта.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: "MapPin", label: "28 городов", sub: "по всей России" },
                { icon: "Clock", label: "2+ часа", sub: "живого шоу" },
                { icon: "Music", label: "12 треков", sub: "в сет-листе" },
                { icon: "Mic2", label: "Live-звук", sub: "без фонограммы" },
              ].map((f) => (
                <div key={f.label} className="glass rounded-2xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))" }}>
                    <Icon name={f.icon} fallback="Star" size={15} className="text-purple-300" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{f.label}</div>
                    <div className="text-white/40 text-xs mt-0.5">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOCKS FILTER */}
      <section className="max-w-6xl mx-auto px-4 mb-8 mt-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveBlock(null)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${!activeBlock ? "text-white scale-105" : "glass text-white/60 hover:text-white"}`}
            style={!activeBlock ? { background: "linear-gradient(135deg, #a855f7, #ec4899)" } : {}}
          >
            Все даты
          </button>
          {BLOCKS.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBlock(activeBlock === b.id ? null : b.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${activeBlock === b.id ? "text-white scale-105" : "glass text-white/60 hover:text-white"}`}
              style={activeBlock === b.id ? { background: "linear-gradient(135deg, #a855f7, #ec4899)" } : {}}
            >
              <span>{b.emoji}</span>
              <span className="hidden sm:inline">{b.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="max-w-6xl mx-auto px-4 pb-24 space-y-2">
        {BLOCKS.filter((b) => !activeBlock || b.id === activeBlock).map((block) => {
          const shows = filtered.filter((s) => s.block === block.id);
          if (shows.length === 0) return null;
          return (
            <div key={block.id} className="mb-8">
              {/* Block header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{block.emoji}</span>
                <div>
                  <h2 className="font-unbounded text-lg font-bold text-white">{block.title}</h2>
                  <p className="text-xs text-white/40">{block.subtitle}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                {shows.map((show, idx) => {
                  const isExpanded = expandedShow === show.id;
                  return (
                    <div key={show.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.04}s` }}>
                      {/* Row */}
                      <div
                        className="concert-row glass rounded-2xl px-5 py-4 flex items-center gap-4 cursor-pointer"
                        onClick={() => setExpandedShow(isExpanded ? null : show.id)}
                      >
                        <div className="font-unbounded text-sm font-bold text-purple-400 w-16 shrink-0">{show.date}</div>
                        <div className="flex-1">
                          <span className="text-white font-semibold">{show.city}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5">
                          {(["std", "fan", "vip"] as const).map((tier) => {
                            const inCart = cart.find((i) => i.showId === show.id && i.tier === tier);
                            return (
                              <span key={tier} className={`text-xs px-2.5 py-1 rounded-full font-medium text-white bg-gradient-to-r ${TIER_COLORS[tier]}`}>
                                {TIER_LABELS[tier]} {(getPrice(show, tier) / 1000).toFixed(1)}К
                                {inCart ? ` ×${inCart.qty}` : ""}
                              </span>
                            );
                          })}
                        </div>
                        <Icon
                          name={isExpanded ? "ChevronUp" : "ChevronDown"}
                          size={18}
                          className="text-white/40 shrink-0"
                        />
                      </div>

                      {/* Expanded ticket picker */}
                      {isExpanded && (
                        <div className="mx-2 mt-1 glass rounded-2xl px-5 py-4 grid sm:grid-cols-3 gap-3 animate-fade-in">
                          {(["std", "fan", "vip"] as const).map((tier) => {
                            const price = getPrice(show, tier);
                            const key = `${show.id}-${tier}`;
                            const inCart = cart.find((i) => i.showId === show.id && i.tier === tier);
                            const justAdded = addedKey === key;
                            return (
                              <div key={tier} className="flex flex-col gap-2 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${TIER_COLORS[tier]}`}>
                                    {TIER_LABELS[tier]}
                                  </span>
                                  <span className="font-unbounded font-black text-white text-sm">{price.toLocaleString()} ₽</span>
                                </div>
                                {inCart ? (
                                  <div className="flex items-center gap-2 justify-between">
                                    <button onClick={() => changeQty(show.id, tier, -1)} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center transition-colors">−</button>
                                    <span className="text-white font-semibold">{inCart.qty}</span>
                                    <button onClick={() => changeQty(show.id, tier, 1)} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center transition-colors">+</button>
                                    <span className="text-white/50 text-xs ml-auto">{(price * inCart.qty).toLocaleString()} ₽</span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => addToCart(show, tier)}
                                    className={`py-2 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 ${justAdded ? "bg-green-500 scale-95" : "hover:opacity-90 hover:scale-[1.02]"}`}
                                    style={!justAdded ? { background: "linear-gradient(135deg, #a855f7, #ec4899)" } : {}}
                                  >
                                    {justAdded ? <><Icon name="Check" size={13} className="text-white" /> Добавлено</> : <><Icon name="Plus" size={13} className="text-white" /> В корзину</>}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/70 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md glass-strong border-l border-white/10 flex flex-col animate-slide-right">
            {/* Cart header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                  <Icon name="Ticket" size={17} className="text-white" />
                </div>
                <div>
                  <h2 className="font-unbounded font-bold text-white">Мои билеты</h2>
                  <p className="text-xs text-white/40">{totalItems} шт.</p>
                </div>
              </div>
              <button onClick={() => setCartOpen(false)} className="text-white/40 hover:text-white p-1 transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4 animate-float">🎫</div>
                  <p className="font-unbounded text-sm text-white/40">Корзина пуста</p>
                  <p className="text-xs text-white/25 mt-1">Выбери концерт в расписании</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.showId}-${item.tier}`} className="glass rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-unbounded text-sm font-bold text-white">{item.city}</p>
                        <p className="text-xs text-white/50 mt-0.5">{item.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${TIER_COLORS[item.tier]}`}>
                        {TIER_LABELS[item.tier]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(item.showId, item.tier, -1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center transition-colors">−</button>
                        <span className="text-white font-semibold w-4 text-center">{item.qty}</span>
                        <button onClick={() => changeQty(item.showId, item.tier, 1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center transition-colors">+</button>
                      </div>
                      <span className="font-unbounded text-sm font-bold text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                        {(item.price * item.qty).toLocaleString()} ₽
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Итого:</span>
                  <span className="font-unbounded text-2xl font-black text-white">{totalPrice.toLocaleString()} ₽</span>
                </div>
                <button className="w-full py-4 rounded-xl font-unbounded font-bold text-white text-sm transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                  <Icon name="CreditCard" size={17} className="text-white" />
                  Оплатить
                </button>
                <div className="flex items-center justify-center gap-5 text-xs text-white/30">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Shield" size={12} className="text-green-400" />
                    Безопасная оплата
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Lock" size={12} className="text-blue-400" />
                    SSL шифрование
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;