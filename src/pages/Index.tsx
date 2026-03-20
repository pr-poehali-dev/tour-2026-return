import { useState } from "react";
import Icon from "@/components/ui/icon";

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
              <div className="font-unbounded text-base font-black text-white leading-none neon-text">PROJECT 23</div>
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

      {/* BLOCKS FILTER */}
      <section className="max-w-6xl mx-auto px-4 mb-6 mt-8">
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
                                    {justAdded
                                      ? <><Icon name="Check" size={13} className="text-white" /> Добавлено</>
                                      : <><Icon name="Plus" size={13} className="text-white" /> В корзину</>
                                    }
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
