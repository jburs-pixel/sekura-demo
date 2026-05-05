// Direction A — Editorial Ledger
// Warm off-white, ink black, clay accent. Serif headers. Generous whitespace.
// Feels like a quality financial publication.

const { useState, useMemo, useEffect } = React;

const A_PALETTE = {
  paper: '#F4F0E8',
  paperDeep: '#EAE3D5',
  ink: '#1A1714',
  inkSoft: '#4A4239',
  rule: '#D5CCB8',
  ruleSoft: '#E2DACA',
  clay: '#B8543A',
  claySoft: '#D88770',
  ok: '#5C7A4A',
  watch: '#B8893A',
  breach: '#B8543A',
};

const aSerif = "'Source Serif 4', 'Source Serif Pro', Georgia, serif";
const aSans  = "'Inter', -apple-system, system-ui, sans-serif";
const aMono  = "'JetBrains Mono', ui-monospace, monospace";

const aStyles = {
  root: {
    fontFamily: aSans, color: A_PALETTE.ink, background: A_PALETTE.paper,
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    minWidth: 0, overflow: 'hidden', fontSize: 14,
  },
  topbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 28px', borderBottom: `1px solid ${A_PALETTE.rule}`,
    background: A_PALETTE.paper,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 12 },
  brandMark: {
    width: 28, height: 28, background: A_PALETTE.ink, color: A_PALETTE.paper,
    display: 'grid', placeItems: 'center', fontFamily: aSerif, fontStyle: 'italic',
    fontSize: 16, fontWeight: 600,
  },
  brandName: { fontFamily: aSerif, fontSize: 20, letterSpacing: '-0.01em', fontWeight: 600 },
  brandTag: { fontFamily: aSerif, fontStyle: 'italic', fontSize: 13, color: A_PALETTE.inkSoft, marginLeft: 4 },
  navTabs: { display: 'flex', gap: 2, alignItems: 'center' },
  navTab: (active) => ({
    padding: '6px 14px', fontSize: 13, cursor: 'pointer',
    color: active ? A_PALETTE.ink : A_PALETTE.inkSoft,
    borderBottom: active ? `2px solid ${A_PALETTE.clay}` : '2px solid transparent',
    fontWeight: active ? 600 : 400, letterSpacing: '0.02em',
    background: 'none', border: 'none', borderBottom: active ? `2px solid ${A_PALETTE.clay}` : '2px solid transparent',
  }),
  langPill: {
    display: 'flex', gap: 0, border: `1px solid ${A_PALETTE.rule}`, borderRadius: 999,
    padding: 2, background: A_PALETTE.paper,
  },
  langBtn: (active) => ({
    padding: '3px 10px', fontSize: 11, fontFamily: aMono, letterSpacing: '0.08em',
    border: 'none', borderRadius: 999, cursor: 'pointer',
    background: active ? A_PALETTE.ink : 'transparent',
    color: active ? A_PALETTE.paper : A_PALETTE.inkSoft, textTransform: 'uppercase',
  }),
  user: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 },
  userAvatar: {
    width: 28, height: 28, borderRadius: '50%', background: A_PALETTE.clay,
    color: A_PALETTE.paper, display: 'grid', placeItems: 'center',
    fontFamily: aSerif, fontWeight: 600, fontSize: 12,
  },
  body: { flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' },
  main: { flex: 1, overflow: 'auto', padding: '32px 40px 40px' },

  masthead: { borderBottom: `2px solid ${A_PALETTE.ink}`, paddingBottom: 18, marginBottom: 28 },
  mastTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 },
  mastDate: { fontFamily: aMono, fontSize: 11, letterSpacing: '0.12em', color: A_PALETTE.inkSoft, textTransform: 'uppercase' },
  mastIssue: { fontFamily: aMono, fontSize: 11, letterSpacing: '0.12em', color: A_PALETTE.inkSoft, textTransform: 'uppercase' },
  h1: { fontFamily: aSerif, fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 600 },
  h1Sub: { fontFamily: aSerif, fontStyle: 'italic', fontSize: 18, color: A_PALETTE.inkSoft, marginTop: 6 },

  metricsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${A_PALETTE.rule}`,
    borderBottom: `1px solid ${A_PALETTE.rule}`,
  },
  metricCell: (i) => ({
    padding: '20px 24px', borderRight: i < 3 ? `1px solid ${A_PALETTE.rule}` : 'none',
  }),
  metricLabel: {
    fontFamily: aMono, fontSize: 10, letterSpacing: '0.14em', color: A_PALETTE.inkSoft,
    textTransform: 'uppercase', marginBottom: 8,
  },
  metricValue: { fontFamily: aSerif, fontSize: 32, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.01em' },
  metricSub: { fontFamily: aSerif, fontStyle: 'italic', fontSize: 13, color: A_PALETTE.inkSoft, marginTop: 6 },

  twoCol: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginTop: 32 },
  feature: {},
  featureLabel: { fontFamily: aMono, fontSize: 10, letterSpacing: '0.14em', color: A_PALETTE.inkSoft, textTransform: 'uppercase', marginBottom: 8 },
  featureH: { fontFamily: aSerif, fontSize: 22, fontWeight: 600, marginBottom: 16, letterSpacing: '-0.01em' },

  // table
  tableWrap: { marginTop: 32 },
  tableHead: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, borderBottom: `1px solid ${A_PALETTE.ink}`, paddingBottom: 8 },
  tableTitle: { fontFamily: aSerif, fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '10px 12px', fontFamily: aMono, fontSize: 10, letterSpacing: '0.14em', color: A_PALETTE.inkSoft, textTransform: 'uppercase', borderBottom: `1px solid ${A_PALETTE.rule}`, fontWeight: 500 },
  td: { padding: '14px 12px', borderBottom: `1px solid ${A_PALETTE.ruleSoft}`, fontFamily: aSans, fontSize: 13, verticalAlign: 'middle' },

  chip: (color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px',
    border: `1px solid ${color}`, color, borderRadius: 999, fontSize: 11,
    fontFamily: aMono, letterSpacing: '0.04em',
  }),
  filterRow: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' },
  filterChip: (active) => ({
    padding: '5px 12px', borderRadius: 999, border: `1px solid ${active ? A_PALETTE.ink : A_PALETTE.rule}`,
    background: active ? A_PALETTE.ink : 'transparent', color: active ? A_PALETTE.paper : A_PALETTE.inkSoft,
    fontSize: 12, cursor: 'pointer', fontFamily: aSans,
  }),
};

// ---------- helpers ----------
function ASparkline({ data, color, width = 240, height = 56 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * stepX},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  const area = `0,${height} ${pts} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polygon points={area} fill={color} opacity="0.12" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      {data.map((v, i) => (
        <circle key={i} cx={i * stepX} cy={height - ((v - min) / range) * (height - 4) - 2} r="2" fill={color} />
      ))}
    </svg>
  );
}

// Brazil region map — abstract, not literal cartography
function ABrazilMap({ regions, t, lang, hovered, setHovered }) {
  const colorFor = (id) => {
    const r = regions.find(x => x.id === id);
    const intensity = r ? r.pct / 30 : 0;
    return `rgba(184, 84, 58, ${0.15 + intensity * 0.8})`;
  };
  const blocks = [
    { id: 'north',     x: 30,  y: 30,  w: 180, h: 120 },
    { id: 'northeast', x: 220, y: 30,  w: 130, h: 130 },
    { id: 'midwest',   x: 80,  y: 160, w: 130, h: 110 },
    { id: 'southeast', x: 220, y: 170, w: 110, h: 80 },
    { id: 'south',     x: 130, y: 280, w: 100, h: 60 },
  ];
  return (
    <svg viewBox="0 0 380 360" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <pattern id="aHatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={A_PALETTE.rule} strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="380" height="360" fill="url(#aHatch)" opacity="0.4" />
      {blocks.map(b => {
        const r = regions.find(x => x.id === b.id);
        const isH = hovered === b.id;
        return (
          <g key={b.id} onMouseEnter={() => setHovered(b.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h}
                  fill={colorFor(b.id)}
                  stroke={isH ? A_PALETTE.ink : A_PALETTE.inkSoft}
                  strokeWidth={isH ? 1.5 : 0.5} />
            <text x={b.x + 10} y={b.y + 22} fontFamily={aSerif} fontSize="13" fontWeight="600" fill={A_PALETTE.ink}>
              {r[lang]}
            </text>
            <text x={b.x + 10} y={b.y + 38} fontFamily={aMono} fontSize="10" fill={A_PALETTE.inkSoft} letterSpacing="0.08em">
              {sekuraFmt.pct(r.pct)} · {r.cars}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- screens ----------
function AOverview({ t, lang, onPick, regionFilter, setRegionFilter, statusFilter, setStatusFilter }) {
  const [hovered, setHovered] = useState(null);
  const filtered = SEKURA_PROPERTIES.filter(p =>
    (regionFilter === 'all' || p.region === regionFilter) &&
    (statusFilter === 'all' || p.status === statusFilter)
  );
  const today = new Date('2026-05-04').toLocaleDateString(lang === 'en' ? 'en-US' : (lang === 'es' ? 'es-ES' : 'pt-BR'), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timelineDef = SEKURA_TIMELINE.map(d => d.def);

  return (
    <div style={aStyles.main}>
      <div style={aStyles.masthead}>
        <div style={aStyles.mastTop}>
          <div style={aStyles.mastDate}>{today}</div>
          <div style={aStyles.mastIssue}>Vol. III · No. 124</div>
        </div>
        <div style={aStyles.h1}>{t.welcome}<span style={{ fontStyle: 'italic' }}>{t.admin}.</span></div>
        <div style={aStyles.h1Sub}>{t.tagline} — {t.metrics.cars}: {sekuraFmt.int(SEKURA_AGG.totalCars, lang)} · {t.metrics.alerts}: {sekuraFmt.int(SEKURA_AGG.totalAlerts, lang)}</div>
      </div>

      {/* metrics row */}
      <div style={aStyles.metricsRow}>
        {[
          { k: t.metrics.portfolio, v: sekuraFmt.ha(SEKURA_AGG.totalHa, lang),    s: '+2.4% YoY' },
          { k: t.metrics.exposure,  v: sekuraFmt.brl(SEKURA_AGG.exposureBrl, lang), s: SEKURA_AGG.totalCars + ' ' + t.table.car },
          { k: t.metrics.alerts,    v: sekuraFmt.int(SEKURA_AGG.totalAlerts, lang), s: '+12 ' + (lang === 'pt' ? 'esta semana' : (lang === 'es' ? 'esta semana' : 'this week')) },
          { k: t.metrics.risk,      v: SEKURA_AGG.avgRisk + '/100',                s: t.metrics.breach + ': ' + SEKURA_AGG.breachCount },
        ].map((m, i) => (
          <div key={i} style={aStyles.metricCell(i)}>
            <div style={aStyles.metricLabel}>{m.k}</div>
            <div style={aStyles.metricValue}>{m.v}</div>
            <div style={aStyles.metricSub}>{m.s}</div>
          </div>
        ))}
      </div>

      {/* feature row */}
      <div style={aStyles.twoCol}>
        <div>
          <div style={aStyles.featureLabel}>§ {t.geoTitle}</div>
          <div style={aStyles.featureH}>{lang === 'pt' ? 'O território, em proporção.' : (lang === 'es' ? 'El territorio, en proporción.' : 'The territory, in proportion.')}</div>
          <ABrazilMap regions={SEKURA_REGIONS} t={t} lang={lang} hovered={hovered} setHovered={setHovered} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: `1px solid ${A_PALETTE.rule}`, marginTop: 16 }}>
            {SEKURA_REGIONS.map((r, i) => (
              <div key={r.id}
                   onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(null)}
                   onClick={() => setRegionFilter(r.id)}
                   style={{ padding: '10px 8px', borderRight: i < 4 ? `1px solid ${A_PALETTE.rule}` : 'none', cursor: 'pointer', background: hovered === r.id ? A_PALETTE.paperDeep : 'transparent' }}>
                <div style={{ fontFamily: aSerif, fontSize: 14, fontWeight: 600 }}>{r[lang]}</div>
                <div style={{ fontFamily: aMono, fontSize: 10, color: A_PALETTE.inkSoft, letterSpacing: '0.06em' }}>{sekuraFmt.pct(r.pct)}</div>
                <div style={{ fontFamily: aMono, fontSize: 10, color: A_PALETTE.inkSoft, marginTop: 2 }}>{r.cars} {t.table.car.toLowerCase()}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={aStyles.featureLabel}>§ {t.detTitle}</div>
          <div style={aStyles.featureH}>{lang === 'pt' ? 'O ritmo das detecções.' : (lang === 'es' ? 'El ritmo de las detecciones.' : 'The rhythm of detections.')}</div>
          <div style={{ border: `1px solid ${A_PALETTE.rule}`, padding: 20, background: A_PALETTE.paperDeep + '40' }}>
            <ASparkline data={timelineDef} color={A_PALETTE.clay} width={320} height={80} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: aMono, fontSize: 10, color: A_PALETTE.inkSoft, letterSpacing: '0.08em' }}>
              <span>W01</span><span>W06</span><span>W12</span>
            </div>
            <div style={{ borderTop: `1px solid ${A_PALETTE.rule}`, marginTop: 16, paddingTop: 14 }}>
              {[
                { k: t.alertKinds.deforestation, v: 358, c: A_PALETTE.clay },
                { k: t.alertKinds.fire,           v: 103, c: A_PALETTE.watch },
                { k: t.alertKinds.embargo,        v: 9,   c: A_PALETTE.ink },
                { k: t.alertKinds.overlap,        v: 24,  c: A_PALETTE.inkSoft },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 0', borderBottom: i < 3 ? `1px solid ${A_PALETTE.ruleSoft}` : 'none' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, background: row.c, display: 'inline-block' }} />
                    <span style={{ fontFamily: aSerif, fontSize: 14 }}>{row.k}</span>
                  </span>
                  <span style={{ fontFamily: aMono, fontSize: 13, fontWeight: 600 }}>{sekuraFmt.int(row.v, lang)} ha</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div style={aStyles.tableWrap}>
        <div style={aStyles.tableHead}>
          <div>
            <div style={aStyles.featureLabel}>§ {lang === 'pt' ? 'Registro' : (lang === 'es' ? 'Registro' : 'Ledger')}</div>
            <div style={aStyles.tableTitle}>{lang === 'pt' ? 'Propriedades em destaque' : (lang === 'es' ? 'Propiedades destacadas' : 'Featured properties')}</div>
          </div>
          <div style={aStyles.filterRow}>
            {['all', 'ok', 'watch', 'breach'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={aStyles.filterChip(statusFilter === s)}>
                {s === 'all' ? (lang === 'pt' ? 'Todos' : (lang === 'es' ? 'Todos' : 'All')) : t.status[s]}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          <button onClick={() => setRegionFilter('all')} style={aStyles.filterChip(regionFilter === 'all')}>
            {lang === 'pt' ? 'Todas regiões' : (lang === 'es' ? 'Todas regiones' : 'All regions')}
          </button>
          {SEKURA_REGIONS.map(r => (
            <button key={r.id} onClick={() => setRegionFilter(r.id)} style={aStyles.filterChip(regionFilter === r.id)}>
              {r[lang]} <span style={{ fontFamily: aMono, fontSize: 10, opacity: 0.7, marginLeft: 4 }}>{r.cars}</span>
            </button>
          ))}
        </div>
        <table style={aStyles.table}>
          <thead>
            <tr>
              <th style={aStyles.th}>{t.table.car}</th>
              <th style={aStyles.th}>{t.table.owner}</th>
              <th style={aStyles.th}>{t.table.muni}</th>
              <th style={aStyles.th}>{t.biome}</th>
              <th style={{ ...aStyles.th, textAlign: 'right' }}>{t.table.area}</th>
              <th style={{ ...aStyles.th, textAlign: 'right' }}>{t.loan}</th>
              <th style={{ ...aStyles.th, textAlign: 'right' }}>{t.table.risk}</th>
              <th style={aStyles.th}>{t.table.status}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const statusColor = p.status === 'ok' ? A_PALETTE.ok : (p.status === 'watch' ? A_PALETTE.watch : A_PALETTE.breach);
              return (
                <tr key={p.car} onClick={() => onPick(p)} style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = A_PALETTE.paperDeep + '50'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ ...aStyles.td, fontFamily: aMono, fontSize: 11, color: A_PALETTE.inkSoft }}>{p.car}</td>
                  <td style={{ ...aStyles.td, fontFamily: aSerif, fontSize: 14 }}>{p.owner}</td>
                  <td style={aStyles.td}>{p.muni}, {p.uf}</td>
                  <td style={{ ...aStyles.td, fontStyle: 'italic', color: A_PALETTE.inkSoft, fontFamily: aSerif }}>{p.biome}</td>
                  <td style={{ ...aStyles.td, textAlign: 'right', fontFamily: aMono }}>{sekuraFmt.int(p.ha, lang)}</td>
                  <td style={{ ...aStyles.td, textAlign: 'right', fontFamily: aMono }}>{sekuraFmt.brl(p.loanBrl, lang)}</td>
                  <td style={{ ...aStyles.td, textAlign: 'right', fontFamily: aMono }}>
                    <span style={{ display: 'inline-block', width: 32, height: 4, background: A_PALETTE.rule, position: 'relative', verticalAlign: 'middle', marginRight: 6 }}>
                      <span style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: p.risk + '%', background: p.risk > 60 ? A_PALETTE.breach : (p.risk > 30 ? A_PALETTE.watch : A_PALETTE.ok) }} />
                    </span>
                    {p.risk}
                  </td>
                  <td style={aStyles.td}>
                    <span style={aStyles.chip(statusColor)}>{t.status[p.status]}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ADetail({ t, lang, prop, onBack }) {
  if (!prop) return null;
  return (
    <div style={aStyles.main}>
      <div style={{ marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', fontFamily: aMono, fontSize: 11, letterSpacing: '0.12em', color: A_PALETTE.inkSoft, cursor: 'pointer', textTransform: 'uppercase', padding: 0, marginBottom: 16 }}>
          ← {lang === 'pt' ? 'Voltar ao registro' : (lang === 'es' ? 'Volver al registro' : 'Back to ledger')}
        </button>
        <div style={aStyles.mastTop}>
          <div style={aStyles.mastDate}>{t.nav.detail}</div>
          <div style={aStyles.mastIssue}>{prop.car}</div>
        </div>
        <div style={{ ...aStyles.h1, fontSize: 36 }}>{prop.owner}</div>
        <div style={aStyles.h1Sub}>{prop.muni}, {prop.uf} · {prop.biome} · {sekuraFmt.ha(prop.ha, lang)}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
        <div>
          <div style={aStyles.featureLabel}>§ {lang === 'pt' ? 'Cobertura do solo' : (lang === 'es' ? 'Cobertura del suelo' : 'Land cover')}</div>
          <div style={{ border: `1px solid ${A_PALETTE.rule}`, padding: 20, background: A_PALETTE.paperDeep + '50', height: 320, position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 400 280" style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="aField" patternUnits="userSpaceOnUse" width="6" height="6">
                  <rect width="6" height="6" fill={A_PALETTE.ok} opacity="0.3" />
                  <line x1="0" y1="3" x2="6" y2="3" stroke={A_PALETTE.ok} strokeWidth="0.5" opacity="0.6" />
                </pattern>
                <pattern id="aForest" patternUnits="userSpaceOnUse" width="8" height="8">
                  <rect width="8" height="8" fill="#3a5c2a" />
                  <circle cx="2" cy="2" r="1" fill="#5C7A4A" />
                  <circle cx="6" cy="6" r="1" fill="#5C7A4A" />
                </pattern>
              </defs>
              <path d="M 30 30 Q 60 20 120 40 T 250 50 Q 320 45 370 70 L 370 250 Q 300 260 200 245 T 50 240 Z" fill="url(#aForest)" />
              <path d="M 80 90 Q 130 80 180 110 Q 230 140 280 120 Q 320 110 350 130 L 350 200 Q 300 210 240 195 Q 180 180 130 195 Q 100 200 80 180 Z" fill="url(#aField)" />
              <path d="M 140 150 Q 170 145 200 160 Q 220 170 240 165 L 240 195 Q 200 200 170 190 Q 145 180 140 170 Z" fill={A_PALETTE.clay} opacity="0.5" />
              <text x="50" y="65" fontFamily={aSerif} fontStyle="italic" fontSize="11" fill={A_PALETTE.paper}>{t.forest}</text>
              <text x="180" y="155" fontFamily={aSerif} fontStyle="italic" fontSize="11" fill={A_PALETTE.ink}>{t.crop2}</text>
              <text x="155" y="180" fontFamily={aMono} fontSize="9" fill={A_PALETTE.paper} letterSpacing="0.1em">{t.defl.toUpperCase()} 18.4 HA</text>
            </svg>
            <div style={{ position: 'absolute', bottom: 12, right: 16, fontFamily: aMono, fontSize: 9, color: A_PALETTE.inkSoft, letterSpacing: '0.12em' }}>
              SENTINEL-2 · 2026-04-29
            </div>
          </div>
        </div>

        <div>
          <div style={aStyles.featureLabel}>§ {lang === 'pt' ? 'Ficha' : (lang === 'es' ? 'Ficha' : 'Record')}</div>
          <div style={{ border: `1px solid ${A_PALETTE.rule}`, background: A_PALETTE.paper }}>
            {[
              [t.table.cpf, prop.cpf, aMono],
              [t.biome, prop.biome, aSerif],
              [t.crop, prop.crop, aSerif],
              [t.region, SEKURA_REGIONS.find(r => r.id === prop.region)[lang], aSerif],
              [t.loan, sekuraFmt.brl(prop.loanBrl, lang), aMono],
              [t.lastScan, prop.lastScan, aMono],
              [t.table.risk, prop.risk + '/100', aMono],
              [t.table.status, t.status[prop.status], aSerif],
            ].map(([k, v, ff], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < 7 ? `1px solid ${A_PALETTE.ruleSoft}` : 'none' }}>
                <span style={{ fontFamily: aMono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: A_PALETTE.inkSoft }}>{k}</span>
                <span style={{ fontFamily: ff, fontSize: 13, fontWeight: ff === aSerif ? 500 : 400 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={aStyles.featureLabel}>§ {t.alertsPanel} ({SEKURA_ALERTS.filter(a => a.car === prop.car).length})</div>
        <div style={{ border: `1px solid ${A_PALETTE.rule}` }}>
          {SEKURA_ALERTS.filter(a => a.car === prop.car).map((al, i, arr) => {
            const sevColor = al.severity === 'high' ? A_PALETTE.breach : (al.severity === 'medium' ? A_PALETTE.watch : A_PALETTE.inkSoft);
            return (
              <div key={al.id} style={{ display: 'grid', gridTemplateColumns: '80px 1.5fr 1fr 1fr 1fr 100px', padding: '14px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${A_PALETTE.ruleSoft}` : 'none', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: aMono, fontSize: 11, color: A_PALETTE.inkSoft }}>{al.id}</span>
                <span style={{ fontFamily: aSerif, fontSize: 14, fontWeight: 500 }}>{t.alertKinds[al.kind]}</span>
                <span style={{ fontFamily: aMono, fontSize: 11 }}>{al.detected}</span>
                <span style={{ fontFamily: aMono, fontSize: 11 }}>{al.area ? al.area + ' ha' : '—'}</span>
                <span style={{ fontFamily: aMono, fontSize: 11, color: A_PALETTE.inkSoft }}>{al.confidence}% · {al.sat}</span>
                <span style={aStyles.chip(sevColor)}>{t.severity[al.severity]}</span>
              </div>
            );
          })}
          {SEKURA_ALERTS.filter(a => a.car === prop.car).length === 0 && (
            <div style={{ padding: 20, fontFamily: aSerif, fontStyle: 'italic', color: A_PALETTE.inkSoft }}>
              {lang === 'pt' ? 'Sem alertas registrados.' : (lang === 'es' ? 'Sin alertas registradas.' : 'No alerts on record.')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AMap({ t, lang }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={aStyles.main}>
      <div style={aStyles.masthead}>
        <div style={aStyles.mastTop}>
          <div style={aStyles.mastDate}>{t.nav.map}</div>
          <div style={aStyles.mastIssue}>{lang === 'pt' ? 'Cobertura nacional' : (lang === 'es' ? 'Cobertura nacional' : 'National coverage')}</div>
        </div>
        <div style={{ ...aStyles.h1, fontSize: 36 }}>{lang === 'pt' ? 'Atlas da carteira' : (lang === 'es' ? 'Atlas de la cartera' : 'Portfolio atlas')}</div>
        <div style={aStyles.h1Sub}>{sekuraFmt.int(SEKURA_AGG.totalCars, lang)} {t.table.car} · {sekuraFmt.ha(SEKURA_AGG.totalHa, lang)}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
        <div style={{ border: `1px solid ${A_PALETTE.rule}`, padding: 24, background: A_PALETTE.paperDeep + '30' }}>
          <ABrazilMap regions={SEKURA_REGIONS} t={t} lang={lang} hovered={hovered} setHovered={setHovered} />
        </div>
        <div>
          <div style={aStyles.featureLabel}>§ {t.legend}</div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ height: 8, background: `linear-gradient(to right, ${A_PALETTE.paperDeep}, ${A_PALETTE.clay})`, marginBottom: 6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: aMono, fontSize: 10, color: A_PALETTE.inkSoft }}>
              <span>0%</span><span>30%</span>
            </div>
            <div style={{ fontFamily: aSerif, fontStyle: 'italic', fontSize: 12, color: A_PALETTE.inkSoft, marginTop: 4 }}>
              {lang === 'pt' ? 'concentração da carteira' : (lang === 'es' ? 'concentración de cartera' : 'portfolio concentration')}
            </div>
          </div>
          <div style={aStyles.featureLabel}>§ {t.regions}</div>
          {SEKURA_REGIONS.map((r, i) => (
            <div key={r.id}
                 onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(null)}
                 style={{ padding: '14px 0', borderBottom: i < SEKURA_REGIONS.length - 1 ? `1px solid ${A_PALETTE.ruleSoft}` : 'none', cursor: 'pointer', background: hovered === r.id ? A_PALETTE.paperDeep + '60' : 'transparent', paddingLeft: hovered === r.id ? 8 : 0, transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: aSerif, fontSize: 16, fontWeight: 600 }}>{r[lang]}</span>
                <span style={{ fontFamily: aMono, fontSize: 12 }}>{sekuraFmt.pct(r.pct)}</span>
              </div>
              <div style={{ fontFamily: aMono, fontSize: 10, color: A_PALETTE.inkSoft, marginTop: 4, letterSpacing: '0.06em' }}>
                {r.cars} {t.table.car} · {sekuraFmt.ha(r.ha, lang)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AAlerts({ t, lang, onPickProp }) {
  const [sev, setSev] = useState('all');
  const filtered = SEKURA_ALERTS.filter(a => sev === 'all' || a.severity === sev);
  return (
    <div style={aStyles.main}>
      <div style={aStyles.masthead}>
        <div style={aStyles.mastTop}>
          <div style={aStyles.mastDate}>{t.nav.alerts}</div>
          <div style={aStyles.mastIssue}>{t.queue}</div>
        </div>
        <div style={{ ...aStyles.h1, fontSize: 36 }}>{lang === 'pt' ? 'Triagem da semana' : (lang === 'es' ? 'Triaje de la semana' : 'Weekly triage')}</div>
        <div style={aStyles.h1Sub}>{filtered.length} {t.alertsPanel.toLowerCase()} · {t.sla}: 48h</div>
      </div>

      <div style={{ ...aStyles.metricsRow, marginBottom: 24 }}>
        {[
          { k: t.severity.high, v: SEKURA_ALERTS.filter(a => a.severity === 'high').length, c: A_PALETTE.breach },
          { k: t.severity.medium, v: SEKURA_ALERTS.filter(a => a.severity === 'medium').length, c: A_PALETTE.watch },
          { k: t.severity.low, v: SEKURA_ALERTS.filter(a => a.severity === 'low').length, c: A_PALETTE.inkSoft },
          { k: t.resolved, v: 142, c: A_PALETTE.ok },
        ].map((m, i) => (
          <div key={i} style={aStyles.metricCell(i)}>
            <div style={aStyles.metricLabel}>{m.k}</div>
            <div style={{ ...aStyles.metricValue, color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>

      <div style={aStyles.filterRow}>
        {['all', 'high', 'medium', 'low'].map(s => (
          <button key={s} onClick={() => setSev(s)} style={aStyles.filterChip(sev === s)}>
            {s === 'all' ? (lang === 'pt' ? 'Todos' : (lang === 'es' ? 'Todos' : 'All')) : t.severity[s]}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, border: `1px solid ${A_PALETTE.rule}` }}>
        {filtered.map((al, i) => {
          const prop = SEKURA_PROPERTIES.find(p => p.car === al.car);
          const sevColor = al.severity === 'high' ? A_PALETTE.breach : (al.severity === 'medium' ? A_PALETTE.watch : A_PALETTE.inkSoft);
          return (
            <div key={al.id} onClick={() => prop && onPickProp(prop)}
                 style={{ display: 'grid', gridTemplateColumns: '80px 1.4fr 1.2fr 90px 110px 110px 90px', padding: '16px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${A_PALETTE.ruleSoft}` : 'none', alignItems: 'center', gap: 16, cursor: 'pointer' }}
                 onMouseEnter={(e) => e.currentTarget.style.background = A_PALETTE.paperDeep + '40'}
                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontFamily: aMono, fontSize: 11, color: A_PALETTE.inkSoft }}>{al.id}</span>
              <span>
                <div style={{ fontFamily: aSerif, fontSize: 16, fontWeight: 600 }}>{t.alertKinds[al.kind]}</div>
                <div style={{ fontFamily: aMono, fontSize: 10, color: A_PALETTE.inkSoft, marginTop: 2 }}>{al.car}</div>
              </span>
              <span>
                <div style={{ fontFamily: aSerif, fontSize: 13 }}>{prop?.owner}</div>
                <div style={{ fontFamily: aMono, fontSize: 10, color: A_PALETTE.inkSoft }}>{prop?.muni}, {prop?.uf}</div>
              </span>
              <span style={{ fontFamily: aMono, fontSize: 11 }}>{al.detected}</span>
              <span style={{ fontFamily: aMono, fontSize: 11 }}>{al.area ? al.area + ' ha' : '—'}</span>
              <span style={{ fontFamily: aMono, fontSize: 11, color: A_PALETTE.inkSoft }}>{al.confidence}% · {al.sat}</span>
              <span style={aStyles.chip(sevColor)}>{t.severity[al.severity]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- shell ----------
function DirectionA({ lang, setLang }) {
  const [screen, setScreen] = useState('overview');
  const [picked, setPicked] = useState(null);
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const t = SEKURA_I18N[lang];

  const handlePick = (p) => { setPicked(p); setScreen('detail'); };

  return (
    <div style={aStyles.root}>
      <div style={aStyles.topbar}>
        <div style={aStyles.brand}>
          <div style={aStyles.brandMark}>S</div>
          <div style={aStyles.brandName}>Sekura</div>
          <div style={aStyles.brandTag}>· {t.tagline}</div>
        </div>
        <div style={aStyles.navTabs}>
          {[
            ['overview', t.nav.overview],
            ['map', t.nav.map],
            ['alerts', t.nav.alerts],
          ].map(([k, label]) => (
            <button key={k} onClick={() => setScreen(k)} style={aStyles.navTab(screen === k || (k === 'overview' && screen === 'detail'))}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={aStyles.langPill}>
            {['pt', 'es', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={aStyles.langBtn(lang === l)}>{l}</button>
            ))}
          </div>
          <div style={aStyles.user}>
            <div style={aStyles.userAvatar}>JS</div>
            <span style={{ fontFamily: aSerif, fontSize: 14 }}>Juan Silva</span>
          </div>
        </div>
      </div>
      <div style={aStyles.body}>
        {screen === 'overview' && <AOverview t={t} lang={lang} onPick={handlePick} regionFilter={regionFilter} setRegionFilter={setRegionFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}
        {screen === 'detail' && <ADetail t={t} lang={lang} prop={picked} onBack={() => setScreen('overview')} />}
        {screen === 'map' && <AMap t={t} lang={lang} />}
        {screen === 'alerts' && <AAlerts t={t} lang={lang} onPickProp={handlePick} />}
      </div>
    </div>
  );
}

window.DirectionA = DirectionA;
