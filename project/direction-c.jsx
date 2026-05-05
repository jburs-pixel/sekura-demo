// Direction C — Cartographic
// Map-first. Deep forest greens + sand + clay. Topographic textures.

const { useState: useStateC } = React;

const C_PAL = {
  bg: '#F2EDDF',          // sand
  bgDeep: '#E8E0CB',
  paper: '#FBF8F0',
  ink: '#1F2A1F',         // deep forest ink
  inkSoft: '#4F5C4D',
  rule: '#C9C0A8',
  forest: '#2F4A35',
  forestSoft: '#5A7A5C',
  moss: '#8DA075',
  clay: '#C75A3D',
  ochre: '#D49B3D',
  watch: '#D49B3D',
  breach: '#C75A3D',
  ok: '#5A7A5C',
};

const cSerif = "'Fraunces', 'Source Serif 4', Georgia, serif";
const cSans = "'Inter', system-ui, sans-serif";
const cMono = "'JetBrains Mono', ui-monospace, monospace";

const cStyles = {
  root: {
    fontFamily: cSans, color: C_PAL.ink, background: C_PAL.bg,
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    minWidth: 0, overflow: 'hidden', fontSize: 13, position: 'relative',
  },
  topbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 24px', background: C_PAL.paper,
    borderBottom: `1px solid ${C_PAL.rule}`,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 12 },
  brandMark: {
    width: 32, height: 32, borderRadius: '50%', background: C_PAL.forest,
    color: C_PAL.bg, display: 'grid', placeItems: 'center',
    fontFamily: cSerif, fontStyle: 'italic', fontWeight: 600, fontSize: 16,
  },
  brandName: { fontFamily: cSerif, fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' },
  brandTag: { fontFamily: cSans, fontSize: 11, color: C_PAL.inkSoft, letterSpacing: '0.14em', textTransform: 'uppercase' },
  navTabs: { display: 'flex', gap: 4 },
  navTab: (active) => ({
    padding: '8px 18px', fontSize: 12, fontFamily: cSans,
    background: active ? C_PAL.forest : 'transparent',
    color: active ? C_PAL.bg : C_PAL.inkSoft,
    border: `1px solid ${active ? C_PAL.forest : C_PAL.rule}`,
    borderRadius: 999, cursor: 'pointer',
    letterSpacing: '0.04em', fontWeight: 500,
  }),
  body: { flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden', position: 'relative' },
  // Map covers full background; panels float over
  mapBg: { position: 'absolute', inset: 0, overflow: 'hidden' },
  mainScroll: { flex: 1, overflow: 'auto', position: 'relative', zIndex: 2 },
};

// Topo background pattern (rendered once for the workspace)
function CTopoBackground() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.5 }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="cTopo" patternUnits="userSpaceOnUse" width="200" height="200">
          <path d="M 0 100 Q 50 80 100 100 T 200 100" fill="none" stroke={C_PAL.rule} strokeWidth="0.6" />
          <path d="M 0 130 Q 50 110 100 130 T 200 130" fill="none" stroke={C_PAL.rule} strokeWidth="0.6" />
          <path d="M 0 70 Q 50 50 100 70 T 200 70" fill="none" stroke={C_PAL.rule} strokeWidth="0.6" />
          <path d="M 0 160 Q 50 140 100 160 T 200 160" fill="none" stroke={C_PAL.rule} strokeWidth="0.6" />
          <path d="M 0 40 Q 50 20 100 40 T 200 40" fill="none" stroke={C_PAL.rule} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cTopo)" />
    </svg>
  );
}

// Region polygons for Brazil (simplified silhouette)
function CBrazilCarto({ regions, lang, hovered, setHovered, onClick, points = [], showPoints = true }) {
  const colorFor = (id) => {
    const r = regions.find(x => x.id === id);
    const intensity = r ? r.pct / 30 : 0;
    return `rgba(199, 90, 61, ${0.2 + intensity * 0.6})`;
  };
  // Simplified region shapes
  const regs = {
    north: 'M 60 60 L 240 50 L 250 130 L 230 170 L 110 175 L 70 160 Z',
    northeast: 'M 240 50 L 340 70 L 360 170 L 280 200 L 250 170 L 250 130 Z',
    midwest: 'M 110 175 L 230 170 L 250 170 L 280 200 L 270 270 L 180 290 L 130 270 Z',
    southeast: 'M 270 270 L 280 200 L 360 200 L 360 280 L 290 310 Z',
    south: 'M 180 290 L 290 310 L 270 360 L 200 370 L 160 340 Z',
  };
  const labelPos = {
    north: [150, 115], northeast: [305, 130], midwest: [195, 230], southeast: [320, 260], south: [225, 335],
  };
  return (
    <svg viewBox="0 0 420 400" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <pattern id="cWater" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M 0 4 Q 2 2 4 4 T 8 4" fill="none" stroke={C_PAL.forestSoft} strokeWidth="0.4" opacity="0.4" />
        </pattern>
        <filter id="cRough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="1.5" />
        </filter>
      </defs>
      <rect width="420" height="400" fill="url(#cWater)" />
      {Object.entries(regs).map(([id, d]) => {
        const r = regions.find(x => x.id === id);
        const isH = hovered === id;
        return (
          <g key={id} onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)} onClick={() => onClick && onClick(id)} style={{ cursor: 'pointer' }}>
            <path d={d} fill={colorFor(id)} stroke={isH ? C_PAL.forest : C_PAL.inkSoft} strokeWidth={isH ? 2 : 1} />
            <text x={labelPos[id][0]} y={labelPos[id][1]} textAnchor="middle" fontFamily={cSerif} fontSize="14" fontStyle="italic" fontWeight="600" fill={C_PAL.ink}>{r[lang]}</text>
            <text x={labelPos[id][0]} y={labelPos[id][1] + 14} textAnchor="middle" fontFamily={cMono} fontSize="9" fill={C_PAL.inkSoft} letterSpacing="0.08em">{sekuraFmt.pct(r.pct)} · {r.cars}</text>
          </g>
        );
      })}
      {/* compass rose */}
      <g transform="translate(380, 360)">
        <circle r="20" fill={C_PAL.paper} stroke={C_PAL.ink} strokeWidth="1" />
        <path d="M 0 -16 L 4 0 L 0 16 L -4 0 Z" fill={C_PAL.ink} />
        <text y="-22" textAnchor="middle" fontFamily={cSerif} fontStyle="italic" fontSize="10" fill={C_PAL.ink}>N</text>
      </g>
      {/* scale bar */}
      <g transform="translate(20, 380)">
        <rect width="60" height="4" fill={C_PAL.ink} />
        <text y="-4" fontFamily={cMono} fontSize="9" fill={C_PAL.inkSoft} letterSpacing="0.06em">500 KM</text>
      </g>
      {/* property points */}
      {showPoints && points.map((p, i) => {
        const sc = p.status === 'ok' ? C_PAL.ok : (p.status === 'watch' ? C_PAL.watch : C_PAL.breach);
        return (
          <circle key={p.car} cx={p.cx} cy={p.cy} r={p.status === 'breach' ? 5 : 3} fill={sc} stroke={C_PAL.paper} strokeWidth="1" opacity="0.9" />
        );
      })}
    </svg>
  );
}

const propPoints = [
  { car: 'BR-2310-A4F1-2C26', cx: 130, cy: 110, status: 'breach' },
  { car: 'BR-1148-9B7E-D331', cx: 200, cy: 220, status: 'ok' },
  { car: 'BR-7702-3C44-A058', cx: 290, cy: 150, status: 'watch' },
  { car: 'BR-5519-D801-7E2A', cx: 210, cy: 320, status: 'ok' },
  { car: 'BR-9904-EE12-AB9F', cx: 305, cy: 240, status: 'breach' },
  { car: 'BR-6627-44A9-C201', cx: 320, cy: 110, status: 'ok' },
  { car: 'BR-3318-F7B0-911C', cx: 220, cy: 240, status: 'watch' },
  { car: 'BR-8841-021D-5F8E', cx: 195, cy: 200, status: 'ok' },
  { car: 'BR-2255-B6FA-7440', cx: 200, cy: 80, status: 'breach' },
  { car: 'BR-4490-7C3E-DD1B', cx: 305, cy: 270, status: 'ok' },
];

function CCard({ children, style }) {
  return (
    <div style={{
      background: C_PAL.paper, border: `1px solid ${C_PAL.rule}`,
      boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 6px 24px rgba(31,42,31,0.08)',
      ...style,
    }}>{children}</div>
  );
}

function CMetricStrip({ t, lang }) {
  const items = [
    { k: t.metrics.portfolio, v: sekuraFmt.ha(SEKURA_AGG.totalHa, lang) },
    { k: t.metrics.cars, v: sekuraFmt.int(SEKURA_AGG.totalCars, lang) },
    { k: t.metrics.alerts, v: sekuraFmt.int(SEKURA_AGG.totalAlerts, lang), c: C_PAL.clay },
    { k: t.metrics.exposure, v: 'R$ 1.85B' },
  ];
  return (
    <CCard style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 16 }}>
      {items.map((m, i) => (
        <div key={i} style={{ padding: '14px 18px', borderRight: i < 3 ? `1px solid ${C_PAL.rule}` : 'none' }}>
          <div style={{ fontFamily: cSans, fontSize: 10, color: C_PAL.inkSoft, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{m.k}</div>
          <div style={{ fontFamily: cSerif, fontSize: 22, fontWeight: 600, color: m.c || C_PAL.ink, letterSpacing: '-0.01em' }}>{m.v}</div>
        </div>
      ))}
    </CCard>
  );
}

function COverview({ t, lang, onPick, regionFilter, setRegionFilter, statusFilter, setStatusFilter }) {
  const [hovered, setHovered] = useStateC(null);
  const filtered = SEKURA_PROPERTIES.filter(p =>
    (regionFilter === 'all' || p.region === regionFilter) &&
    (statusFilter === 'all' || p.status === statusFilter)
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 460px', height: '100%' }}>
      {/* Map column */}
      <div style={{ position: 'relative', borderRight: `1px solid ${C_PAL.rule}`, background: C_PAL.bgDeep }}>
        <CTopoBackground />
        <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CBrazilCarto regions={SEKURA_REGIONS} lang={lang} hovered={hovered} setHovered={setHovered} onClick={(id) => setRegionFilter(id === regionFilter ? 'all' : id)} points={propPoints} showPoints={true} />
        </div>
        {/* Legend overlay */}
        <CCard style={{ position: 'absolute', top: 20, left: 20, padding: '12px 14px', minWidth: 180 }}>
          <div style={{ fontFamily: cSerif, fontSize: 13, fontWeight: 600, marginBottom: 8, fontStyle: 'italic' }}>{t.legend}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[[C_PAL.ok, t.status.ok], [C_PAL.watch, t.status.watch], [C_PAL.breach, t.status.breach]].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: cMono, fontSize: 10, letterSpacing: '0.06em' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                <span style={{ color: C_PAL.inkSoft }}>{l}</span>
              </div>
            ))}
            <div style={{ height: 1, background: C_PAL.rule, margin: '4px 0' }} />
            <div style={{ fontFamily: cSans, fontSize: 10, color: C_PAL.inkSoft }}>
              {lang === 'pt' ? 'Intensidade do tom = concentração' : (lang === 'es' ? 'Intensidad del tono = concentración' : 'Tone intensity = concentration')}
            </div>
          </div>
        </CCard>
        {/* Title overlay */}
        <CCard style={{ position: 'absolute', bottom: 20, left: 20, padding: '14px 18px', maxWidth: 360 }}>
          <div style={{ fontFamily: cMono, fontSize: 9, color: C_PAL.inkSoft, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>Atlas · 2026</div>
          <div style={{ fontFamily: cSerif, fontSize: 26, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            {lang === 'pt' ? 'O território, em vigília.' : (lang === 'es' ? 'El territorio, en vigilia.' : 'The land, kept watch.')}
          </div>
          <div style={{ fontFamily: cSerif, fontStyle: 'italic', fontSize: 13, color: C_PAL.inkSoft, marginTop: 6 }}>
            {sekuraFmt.int(SEKURA_AGG.totalCars, lang)} {t.table.car.toLowerCase()} · {sekuraFmt.ha(SEKURA_AGG.totalHa, lang)}
          </div>
        </CCard>
      </div>

      {/* Side column */}
      <div style={{ overflow: 'auto', padding: 20, background: C_PAL.bg }}>
        <CMetricStrip t={t} lang={lang} />

        <CCard style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: cSerif, fontSize: 16, fontWeight: 600, marginBottom: 4, letterSpacing: '-0.01em' }}>{t.geoTitle}</div>
          <div style={{ fontFamily: cSerif, fontStyle: 'italic', fontSize: 12, color: C_PAL.inkSoft, marginBottom: 12 }}>
            {lang === 'pt' ? 'Distribuição da carteira por região' : (lang === 'es' ? 'Distribución de la cartera por región' : 'Portfolio distribution by region')}
          </div>
          {SEKURA_REGIONS.map(r => (
            <div key={r.id}
                 onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(null)}
                 onClick={() => setRegionFilter(r.id === regionFilter ? 'all' : r.id)}
                 style={{ padding: '10px 8px', cursor: 'pointer', borderRadius: 4,
                          background: hovered === r.id || regionFilter === r.id ? C_PAL.bgDeep : 'transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: cSerif, fontSize: 14, fontWeight: 600 }}>{r[lang]}</span>
                <span style={{ fontFamily: cMono, fontSize: 11 }}>{sekuraFmt.pct(r.pct)}</span>
              </div>
              <div style={{ height: 4, background: C_PAL.bgDeep, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: (r.pct / 30 * 100) + '%', background: C_PAL.clay }} />
              </div>
              <div style={{ fontFamily: cMono, fontSize: 10, color: C_PAL.inkSoft, marginTop: 4, letterSpacing: '0.06em' }}>
                {r.cars} · {sekuraFmt.ha(r.ha, lang)}
              </div>
            </div>
          ))}
        </CCard>

        <CCard style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div style={{ fontFamily: cSerif, fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>
              {lang === 'pt' ? 'Propriedades' : (lang === 'es' ? 'Propiedades' : 'Properties')}
            </div>
            <div style={{ fontFamily: cMono, fontSize: 10, color: C_PAL.inkSoft, letterSpacing: '0.08em' }}>{filtered.length} {t.of} {SEKURA_PROPERTIES.length}</div>
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
            {['all', 'ok', 'watch', 'breach'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontFamily: cSans, cursor: 'pointer',
                         background: statusFilter === s ? C_PAL.forest : 'transparent',
                         color: statusFilter === s ? C_PAL.bg : C_PAL.inkSoft,
                         border: `1px solid ${statusFilter === s ? C_PAL.forest : C_PAL.rule}` }}>
                {s === 'all' ? (lang === 'pt' ? 'Todos' : (lang === 'es' ? 'Todos' : 'All')) : t.status[s]}
              </button>
            ))}
          </div>
          {filtered.map(p => {
            const sc = p.status === 'ok' ? C_PAL.ok : (p.status === 'watch' ? C_PAL.watch : C_PAL.breach);
            return (
              <div key={p.car} onClick={() => onPick(p)}
                   style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center', padding: '10px 4px', borderBottom: `1px solid ${C_PAL.rule}`, cursor: 'pointer' }}
                   onMouseEnter={(e) => e.currentTarget.style.background = C_PAL.bgDeep}
                   onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: sc, marginTop: 4 }} />
                <span>
                  <div style={{ fontFamily: cSerif, fontSize: 14, fontWeight: 600 }}>{p.owner}</div>
                  <div style={{ fontFamily: cMono, fontSize: 10, color: C_PAL.inkSoft, marginTop: 2 }}>{p.muni}, {p.uf} · {p.biome}</div>
                </span>
                <span style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: cMono, fontSize: 11 }}>{sekuraFmt.int(p.ha, lang)} ha</div>
                  <div style={{ fontFamily: cMono, fontSize: 9, color: C_PAL.inkSoft, marginTop: 2 }}>{sekuraFmt.brl(p.loanBrl, lang)}</div>
                </span>
              </div>
            );
          })}
        </CCard>
      </div>
    </div>
  );
}

function CDetail({ t, lang, prop, onBack }) {
  if (!prop) return null;
  const propAlerts = SEKURA_ALERTS.filter(a => a.car === prop.car);
  return (
    <div style={{ overflow: 'auto', padding: 24, background: C_PAL.bg, height: '100%' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', fontFamily: cMono, fontSize: 11, letterSpacing: '0.12em', color: C_PAL.inkSoft, cursor: 'pointer', textTransform: 'uppercase', padding: 0, marginBottom: 16 }}>
        ← {lang === 'pt' ? 'Voltar ao atlas' : (lang === 'es' ? 'Volver al atlas' : 'Back to atlas')}
      </button>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: cMono, fontSize: 10, letterSpacing: '0.16em', color: C_PAL.inkSoft, textTransform: 'uppercase', marginBottom: 4 }}>{prop.car}</div>
        <div style={{ fontFamily: cSerif, fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>{prop.owner}</div>
        <div style={{ fontFamily: cSerif, fontStyle: 'italic', fontSize: 16, color: C_PAL.inkSoft }}>{prop.muni}, {prop.uf} · {prop.biome} · {sekuraFmt.ha(prop.ha, lang)}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
        <CCard style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontFamily: cSerif, fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>{lang === 'pt' ? 'Cobertura do solo' : (lang === 'es' ? 'Cobertura del suelo' : 'Land cover')}</div>
          <svg viewBox="0 0 400 280" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 4 }}>
            <defs>
              <pattern id="cForestP" patternUnits="userSpaceOnUse" width="10" height="10">
                <rect width="10" height="10" fill={C_PAL.forest} />
                <circle cx="3" cy="3" r="1.5" fill={C_PAL.forestSoft} />
                <circle cx="7" cy="7" r="1.5" fill={C_PAL.forestSoft} />
              </pattern>
              <pattern id="cFieldP" patternUnits="userSpaceOnUse" width="6" height="6">
                <rect width="6" height="6" fill={C_PAL.moss} opacity="0.6" />
                <line x1="0" y1="3" x2="6" y2="3" stroke={C_PAL.forest} strokeWidth="0.4" opacity="0.5" />
              </pattern>
              <pattern id="cClearedP" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <rect width="6" height="6" fill={C_PAL.bgDeep} />
                <line x1="0" y1="0" x2="0" y2="6" stroke={C_PAL.clay} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="280" fill={C_PAL.bgDeep} />
            <path d="M 30 30 Q 80 25 140 35 Q 220 40 300 30 Q 360 35 380 60 L 380 240 Q 320 250 240 240 Q 150 230 60 240 Q 30 235 30 220 Z" fill="url(#cForestP)" />
            <path d="M 90 90 Q 150 80 210 95 Q 260 105 310 100 L 320 180 Q 270 190 210 185 Q 150 180 100 190 Q 80 180 80 160 Z" fill="url(#cFieldP)" />
            <path d="M 170 130 L 240 130 L 240 170 L 170 170 Z" fill="url(#cClearedP)" stroke={C_PAL.clay} strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="40" y="60" fontFamily={cSerif} fontStyle="italic" fontSize="13" fill={C_PAL.bg}>{t.forest}</text>
            <text x="190" y="120" fontFamily={cSerif} fontStyle="italic" fontSize="11" fill={C_PAL.ink}>{t.crop2}</text>
            <text x="178" y="155" fontFamily={cMono} fontSize="9" fill={C_PAL.clay} letterSpacing="0.1em">{t.defl.toUpperCase()}</text>
            <text x="178" y="167" fontFamily={cMono} fontSize="9" fill={C_PAL.clay} letterSpacing="0.1em">18.4 HA</text>
            {/* compass + scale */}
            <g transform="translate(360, 50)">
              <circle r="14" fill={C_PAL.paper} stroke={C_PAL.ink} strokeWidth="0.8" />
              <path d="M 0 -10 L 3 0 L 0 10 L -3 0 Z" fill={C_PAL.ink} />
              <text y="-16" textAnchor="middle" fontFamily={cSerif} fontStyle="italic" fontSize="8">N</text>
            </g>
            <g transform="translate(20, 260)">
              <rect width="40" height="3" fill={C_PAL.ink} />
              <text y="-3" fontFamily={cMono} fontSize="8" fill={C_PAL.inkSoft}>2 KM</text>
            </g>
          </svg>
          <div style={{ display: 'flex', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
            {[[C_PAL.forest, t.forest, '64%'], [C_PAL.moss, t.crop2, '21%'], [C_PAL.ochre, t.pasture, '8%'], [C_PAL.clay, t.defl, '7%']].map(([c, l, v]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: cMono, fontSize: 10 }}>
                <span style={{ width: 10, height: 10, background: c }} />
                <span style={{ color: C_PAL.inkSoft }}>{l}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </CCard>
        <CCard style={{ padding: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${C_PAL.rule}`, fontFamily: cSerif, fontSize: 16, fontWeight: 600 }}>{lang === 'pt' ? 'Ficha cadastral' : (lang === 'es' ? 'Ficha' : 'Record')}</div>
          {[
            [t.table.cpf, prop.cpf],
            [t.biome, prop.biome],
            [t.crop, prop.crop],
            [t.region, SEKURA_REGIONS.find(r => r.id === prop.region)[lang]],
            [t.loan, sekuraFmt.brl(prop.loanBrl, lang)],
            [t.lastScan, prop.lastScan],
            [t.table.risk, prop.risk + '/100'],
            [t.table.status, t.status[prop.status]],
          ].map(([k, v], i, arr) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C_PAL.rule}` : 'none' }}>
              <span style={{ fontFamily: cMono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C_PAL.inkSoft }}>{k}</span>
              <span style={{ fontFamily: cSerif, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </CCard>
      </div>

      <CCard style={{ padding: 16 }}>
        <div style={{ fontFamily: cSerif, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.alertsPanel} · {propAlerts.length}</div>
        {propAlerts.length === 0 && <div style={{ fontFamily: cSerif, fontStyle: 'italic', color: C_PAL.inkSoft }}>{lang === 'pt' ? 'Sem alertas registrados.' : (lang === 'es' ? 'Sin alertas registradas.' : 'No alerts on record.')}</div>}
        {propAlerts.map(al => {
          const sc = al.severity === 'high' ? C_PAL.breach : (al.severity === 'medium' ? C_PAL.watch : C_PAL.inkSoft);
          return (
            <div key={al.id} style={{ display: 'grid', gridTemplateColumns: '70px 1.4fr 1fr 1fr 1fr 80px', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C_PAL.rule}` }}>
              <span style={{ fontFamily: cMono, fontSize: 11, color: C_PAL.inkSoft }}>{al.id}</span>
              <span style={{ fontFamily: cSerif, fontSize: 14, fontWeight: 500 }}>{t.alertKinds[al.kind]}</span>
              <span style={{ fontFamily: cMono, fontSize: 11 }}>{al.detected}</span>
              <span style={{ fontFamily: cMono, fontSize: 11 }}>{al.area ? al.area + ' ha' : '—'}</span>
              <span style={{ fontFamily: cMono, fontSize: 11, color: C_PAL.inkSoft }}>{al.confidence}% · {al.sat}</span>
              <span style={{ padding: '3px 8px', borderRadius: 999, border: `1px solid ${sc}`, color: sc, fontFamily: cMono, fontSize: 10, letterSpacing: '0.06em', textAlign: 'center' }}>{t.severity[al.severity]}</span>
            </div>
          );
        })}
      </CCard>
    </div>
  );
}

function CMap({ t, lang }) {
  const [hovered, setHovered] = useStateC(null);
  return (
    <div style={{ position: 'relative', height: '100%', background: C_PAL.bgDeep }}>
      <CTopoBackground />
      <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CBrazilCarto regions={SEKURA_REGIONS} lang={lang} hovered={hovered} setHovered={setHovered} points={propPoints} showPoints={true} />
      </div>
      <CCard style={{ position: 'absolute', top: 24, left: 24, padding: 16, maxWidth: 280 }}>
        <div style={{ fontFamily: cMono, fontSize: 9, color: C_PAL.inkSoft, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>{t.nav.map}</div>
        <div style={{ fontFamily: cSerif, fontSize: 24, fontWeight: 600, lineHeight: 1.1 }}>
          {lang === 'pt' ? 'Atlas nacional' : (lang === 'es' ? 'Atlas nacional' : 'National atlas')}
        </div>
        <div style={{ fontFamily: cSerif, fontStyle: 'italic', fontSize: 13, color: C_PAL.inkSoft, marginTop: 6 }}>
          {sekuraFmt.int(SEKURA_AGG.totalCars, lang)} {t.table.car.toLowerCase()} · {sekuraFmt.ha(SEKURA_AGG.totalHa, lang)}
        </div>
      </CCard>
      <CCard style={{ position: 'absolute', bottom: 24, left: 24, padding: 14, maxWidth: 240 }}>
        <div style={{ fontFamily: cSerif, fontSize: 13, fontWeight: 600, fontStyle: 'italic', marginBottom: 8 }}>{t.legend}</div>
        {[[C_PAL.ok, t.status.ok], [C_PAL.watch, t.status.watch], [C_PAL.breach, t.status.breach]].map(([c, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: cMono, fontSize: 10, padding: '3px 0' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            <span style={{ color: C_PAL.inkSoft }}>{l}</span>
          </div>
        ))}
      </CCard>
      <CCard style={{ position: 'absolute', top: 24, right: 24, padding: 16, width: 280 }}>
        <div style={{ fontFamily: cSerif, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{t.regions}</div>
        {SEKURA_REGIONS.map((r, i) => (
          <div key={r.id}
               onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(null)}
               style={{ padding: '8px 4px', borderBottom: i < SEKURA_REGIONS.length - 1 ? `1px solid ${C_PAL.rule}` : 'none', background: hovered === r.id ? C_PAL.bgDeep : 'transparent', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: cSerif, fontSize: 14, fontWeight: 600 }}>{r[lang]}</span>
              <span style={{ fontFamily: cMono, fontSize: 11 }}>{sekuraFmt.pct(r.pct)}</span>
            </div>
            <div style={{ fontFamily: cMono, fontSize: 9, color: C_PAL.inkSoft, marginTop: 2, letterSpacing: '0.06em' }}>{r.cars} · {sekuraFmt.int(r.ha, lang)} ha</div>
          </div>
        ))}
      </CCard>
    </div>
  );
}

function CAlerts({ t, lang, onPick }) {
  const [sev, setSev] = useStateC('all');
  const filtered = SEKURA_ALERTS.filter(a => sev === 'all' || a.severity === sev);
  return (
    <div style={{ overflow: 'auto', padding: 24, background: C_PAL.bg, height: '100%' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: cMono, fontSize: 10, letterSpacing: '0.16em', color: C_PAL.inkSoft, textTransform: 'uppercase', marginBottom: 4 }}>{t.queue}</div>
        <div style={{ fontFamily: cSerif, fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>
          {lang === 'pt' ? 'Triagem da semana' : (lang === 'es' ? 'Triaje de la semana' : 'Weekly triage')}
        </div>
        <div style={{ fontFamily: cSerif, fontStyle: 'italic', fontSize: 14, color: C_PAL.inkSoft }}>{filtered.length} {t.alertsPanel.toLowerCase()} · {t.sla} 48h</div>
      </div>

      <CCard style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        {[
          { k: t.severity.high, v: SEKURA_ALERTS.filter(a => a.severity === 'high').length, c: C_PAL.breach },
          { k: t.severity.medium, v: SEKURA_ALERTS.filter(a => a.severity === 'medium').length, c: C_PAL.watch },
          { k: t.severity.low, v: SEKURA_ALERTS.filter(a => a.severity === 'low').length, c: C_PAL.inkSoft },
          { k: t.resolved, v: 142, c: C_PAL.ok },
        ].map((m, i) => (
          <div key={i} style={{ padding: '14px 18px', borderRight: i < 3 ? `1px solid ${C_PAL.rule}` : 'none' }}>
            <div style={{ fontFamily: cSans, fontSize: 10, color: C_PAL.inkSoft, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{m.k}</div>
            <div style={{ fontFamily: cSerif, fontSize: 26, fontWeight: 600, color: m.c }}>{m.v}</div>
          </div>
        ))}
      </CCard>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['all', 'high', 'medium', 'low'].map(s => (
          <button key={s} onClick={() => setSev(s)}
            style={{ padding: '5px 12px', borderRadius: 999, fontSize: 12, fontFamily: cSans, cursor: 'pointer',
                     background: sev === s ? C_PAL.forest : 'transparent',
                     color: sev === s ? C_PAL.bg : C_PAL.inkSoft,
                     border: `1px solid ${sev === s ? C_PAL.forest : C_PAL.rule}` }}>
            {s === 'all' ? (lang === 'pt' ? 'Todos' : (lang === 'es' ? 'Todos' : 'All')) : t.severity[s]}
          </button>
        ))}
      </div>

      <CCard>
        {filtered.map((al, i) => {
          const prop = SEKURA_PROPERTIES.find(p => p.car === al.car);
          const sc = al.severity === 'high' ? C_PAL.breach : (al.severity === 'medium' ? C_PAL.watch : C_PAL.inkSoft);
          return (
            <div key={al.id} onClick={() => prop && onPick(prop)}
                 style={{ display: 'grid', gridTemplateColumns: '70px 1.4fr 1.2fr 90px 100px 100px 90px', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: i < filtered.length - 1 ? `1px solid ${C_PAL.rule}` : 'none', cursor: 'pointer' }}
                 onMouseEnter={(e) => e.currentTarget.style.background = C_PAL.bgDeep}
                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontFamily: cMono, fontSize: 11, color: C_PAL.inkSoft }}>{al.id}</span>
              <span>
                <div style={{ fontFamily: cSerif, fontSize: 15, fontWeight: 600 }}>{t.alertKinds[al.kind]}</div>
                <div style={{ fontFamily: cMono, fontSize: 10, color: C_PAL.inkSoft, marginTop: 2 }}>{al.car}</div>
              </span>
              <span>
                <div style={{ fontFamily: cSerif, fontSize: 13 }}>{prop?.owner}</div>
                <div style={{ fontFamily: cMono, fontSize: 10, color: C_PAL.inkSoft }}>{prop?.muni}, {prop?.uf}</div>
              </span>
              <span style={{ fontFamily: cMono, fontSize: 11 }}>{al.detected}</span>
              <span style={{ fontFamily: cMono, fontSize: 11 }}>{al.area ? al.area + ' ha' : '—'}</span>
              <span style={{ fontFamily: cMono, fontSize: 10, color: C_PAL.inkSoft }}>{al.confidence}% · {al.sat}</span>
              <span style={{ padding: '4px 10px', borderRadius: 999, border: `1px solid ${sc}`, color: sc, fontFamily: cMono, fontSize: 10, letterSpacing: '0.06em', textAlign: 'center' }}>{t.severity[al.severity]}</span>
            </div>
          );
        })}
      </CCard>
    </div>
  );
}

function DirectionC({ lang, setLang }) {
  const [screen, setScreen] = useStateC('overview');
  const [picked, setPicked] = useStateC(null);
  const [regionFilter, setRegionFilter] = useStateC('all');
  const [statusFilter, setStatusFilter] = useStateC('all');
  const t = SEKURA_I18N[lang];
  const handlePick = (p) => { setPicked(p); setScreen('detail'); };

  return (
    <div style={cStyles.root}>
      <div style={cStyles.topbar}>
        <div style={cStyles.brand}>
          <div style={cStyles.brandMark}>S</div>
          <div>
            <div style={cStyles.brandName}>Sekura</div>
            <div style={cStyles.brandTag}>{t.tagline}</div>
          </div>
        </div>
        <div style={cStyles.navTabs}>
          {[['overview', t.nav.overview], ['map', t.nav.map], ['alerts', t.nav.alerts]].map(([k, l]) => (
            <button key={k} onClick={() => setScreen(k)} style={cStyles.navTab(screen === k || (k === 'overview' && screen === 'detail'))}>{l}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', border: `1px solid ${C_PAL.rule}`, borderRadius: 999, padding: 2 }}>
            {['pt', 'es', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ padding: '3px 9px', fontFamily: cMono, fontSize: 10, letterSpacing: '0.08em',
                         background: lang === l ? C_PAL.forest : 'transparent',
                         color: lang === l ? C_PAL.bg : C_PAL.inkSoft,
                         border: 'none', borderRadius: 999, cursor: 'pointer', textTransform: 'uppercase' }}>{l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: C_PAL.clay, color: C_PAL.bg, display: 'grid', placeItems: 'center', fontFamily: cSerif, fontWeight: 600, fontSize: 12 }}>JS</div>
            <span style={{ fontFamily: cSerif, fontSize: 13 }}>Juan Silva</span>
          </div>
        </div>
      </div>
      <div style={cStyles.body}>
        {screen === 'overview' && <COverview t={t} lang={lang} onPick={handlePick} regionFilter={regionFilter} setRegionFilter={setRegionFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}
        {screen === 'detail' && <CDetail t={t} lang={lang} prop={picked} onBack={() => setScreen('overview')} />}
        {screen === 'map' && <CMap t={t} lang={lang} />}
        {screen === 'alerts' && <CAlerts t={t} lang={lang} onPick={handlePick} />}
      </div>
    </div>
  );
}

window.DirectionC = DirectionC;
