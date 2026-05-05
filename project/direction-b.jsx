// Direction B — Operations Console
// Dark slate, signal-cyan accent, monospace metadata. The analyst's cockpit.

const { useState: useStateB, useMemo: useMemoB } = React;

const B_PAL = {
  bg: '#0B0F14',
  panel: '#11161D',
  panelHi: '#161D26',
  line: '#1E2630',
  lineHi: '#2A3340',
  text: '#D8E0EA',
  textDim: '#7A8694',
  textFaint: '#4A5462',
  cyan: '#3DD9D6',
  cyanDim: '#1F8B8A',
  amber: '#E8A93C',
  red: '#E5484D',
  green: '#3DD978',
  violet: '#9B7EE8',
};

const bMono = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";
const bSans = "'Inter', -apple-system, system-ui, sans-serif";

const bStyles = {
  root: {
    fontFamily: bSans, color: B_PAL.text, background: B_PAL.bg,
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    minWidth: 0, overflow: 'hidden', fontSize: 13,
  },
  topbar: {
    display: 'flex', alignItems: 'center', height: 44, padding: '0 12px',
    background: B_PAL.panel, borderBottom: `1px solid ${B_PAL.line}`,
    fontFamily: bMono, fontSize: 11, gap: 16,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10, paddingRight: 16, borderRight: `1px solid ${B_PAL.line}`, height: '100%' },
  brandMark: {
    width: 22, height: 22, background: B_PAL.cyan, color: B_PAL.bg, display: 'grid', placeItems: 'center',
    fontFamily: bMono, fontWeight: 700, fontSize: 12, borderRadius: 3,
  },
  brandName: { fontFamily: bSans, fontSize: 14, fontWeight: 600, letterSpacing: '0.04em' },
  navItem: (active) => ({
    padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center',
    fontFamily: bMono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: active ? B_PAL.cyan : B_PAL.textDim, cursor: 'pointer', background: 'none', border: 'none',
    borderBottom: active ? `2px solid ${B_PAL.cyan}` : '2px solid transparent',
  }),
  status: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, color: B_PAL.textDim },
  pulse: { width: 7, height: 7, borderRadius: '50%', background: B_PAL.green, boxShadow: `0 0 0 0 ${B_PAL.green}`, animation: 'b-pulse 2s infinite' },
  body: { flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' },
  side: { width: 200, background: B_PAL.panel, borderRight: `1px solid ${B_PAL.line}`, padding: '12px 0', overflow: 'auto' },
  sideGroup: { padding: '8px 12px', fontFamily: bMono, fontSize: 9, letterSpacing: '0.16em', color: B_PAL.textFaint, textTransform: 'uppercase' },
  sideItem: (active) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px',
    fontFamily: bMono, fontSize: 11, cursor: 'pointer',
    color: active ? B_PAL.text : B_PAL.textDim,
    background: active ? B_PAL.panelHi : 'transparent',
    borderLeft: active ? `2px solid ${B_PAL.cyan}` : '2px solid transparent',
  }),
  main: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' },
  panelHead: {
    height: 36, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 12,
    borderBottom: `1px solid ${B_PAL.line}`, background: B_PAL.panel,
    fontFamily: bMono, fontSize: 11, color: B_PAL.textDim, letterSpacing: '0.08em',
  },
  hToken: { color: B_PAL.cyan, marginRight: 6 },
  metricsBar: {
    display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderBottom: `1px solid ${B_PAL.line}`,
  },
  metricCell: (i) => ({
    padding: '14px 16px', borderRight: i < 5 ? `1px solid ${B_PAL.line}` : 'none',
    background: B_PAL.bg,
  }),
  metricLabel: { fontFamily: bMono, fontSize: 9, letterSpacing: '0.14em', color: B_PAL.textFaint, textTransform: 'uppercase', marginBottom: 6 },
  metricValue: { fontFamily: bMono, fontSize: 22, fontWeight: 500, color: B_PAL.text },
  metricSub: { fontFamily: bMono, fontSize: 10, color: B_PAL.textDim, marginTop: 4 },
  table: { width: '100%', borderCollapse: 'collapse', fontFamily: bMono, fontSize: 11 },
  th: { textAlign: 'left', padding: '8px 12px', fontSize: 9, letterSpacing: '0.12em', color: B_PAL.textFaint, textTransform: 'uppercase', borderBottom: `1px solid ${B_PAL.line}`, fontWeight: 500, background: B_PAL.panel, position: 'sticky', top: 0 },
  td: { padding: '8px 12px', borderBottom: `1px solid ${B_PAL.line}`, color: B_PAL.text, verticalAlign: 'middle' },
  chip: (color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px',
    background: color + '20', color, border: `1px solid ${color}50`,
    fontSize: 10, fontFamily: bMono, letterSpacing: '0.06em', textTransform: 'uppercase',
  }),
  filterBar: { display: 'flex', gap: 6, padding: '8px 16px', borderBottom: `1px solid ${B_PAL.line}`, background: B_PAL.panel, alignItems: 'center', flexWrap: 'wrap' },
  fchip: (active) => ({
    padding: '3px 10px', fontFamily: bMono, fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
    background: active ? B_PAL.cyan : 'transparent', color: active ? B_PAL.bg : B_PAL.textDim,
    border: `1px solid ${active ? B_PAL.cyan : B_PAL.line}`, cursor: 'pointer',
  }),
};

const bGlobal = `
@keyframes b-pulse {
  0%   { box-shadow: 0 0 0 0 ${B_PAL.green}80; }
  70%  { box-shadow: 0 0 0 6px ${B_PAL.green}00; }
  100% { box-shadow: 0 0 0 0 ${B_PAL.green}00; }
}
@keyframes b-blink { 50% { opacity: 0.3; } }
`;

function BSparkBars({ data, color, w = 220, h = 50 }) {
  const max = Math.max(...data);
  const bw = w / data.length - 2;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {data.map((v, i) => (
        <rect key={i} x={i * (bw + 2)} y={h - (v / max) * h} width={bw} height={(v / max) * h} fill={color} opacity={0.3 + (v / max) * 0.7} />
      ))}
    </svg>
  );
}

function BHexMap({ regions, t, lang, onClick, hovered, setHovered }) {
  // Simplified hex grid representing Brazil
  const hexes = [
    { id: 'north', q: 0, r: 0 }, { id: 'north', q: 1, r: 0 }, { id: 'north', q: 2, r: 0 }, { id: 'north', q: 0, r: 1 }, { id: 'north', q: 1, r: 1 },
    { id: 'northeast', q: 3, r: 0 }, { id: 'northeast', q: 4, r: 0 }, { id: 'northeast', q: 3, r: 1 }, { id: 'northeast', q: 4, r: 1 }, { id: 'northeast', q: 3, r: 2 },
    { id: 'midwest', q: 1, r: 2 }, { id: 'midwest', q: 2, r: 2 }, { id: 'midwest', q: 1, r: 3 }, { id: 'midwest', q: 2, r: 3 },
    { id: 'southeast', q: 3, r: 3 }, { id: 'southeast', q: 2, r: 4 }, { id: 'southeast', q: 3, r: 4 },
    { id: 'south', q: 2, r: 5 }, { id: 'south', q: 1, r: 5 },
  ];
  const size = 28;
  const w = Math.sqrt(3) * size, h2 = 2 * size * 0.75;
  const colorFor = (id) => {
    const r = regions.find(x => x.id === id);
    const intensity = r ? r.pct / 30 : 0;
    return hovered === id ? B_PAL.cyan : `rgba(61, 217, 214, ${0.1 + intensity * 0.6})`;
  };
  return (
    <svg viewBox="0 0 320 280" style={{ width: '100%', display: 'block' }}>
      {hexes.map((hex, i) => {
        const cx = 30 + hex.q * w + (hex.r % 2) * (w / 2);
        const cy = 30 + hex.r * h2;
        const pts = [0, 1, 2, 3, 4, 5].map(k => {
          const ang = (Math.PI / 3) * k - Math.PI / 2;
          return `${cx + size * Math.cos(ang)},${cy + size * Math.sin(ang)}`;
        }).join(' ');
        return (
          <polygon key={i} points={pts} fill={colorFor(hex.id)}
            stroke={hovered === hex.id ? B_PAL.cyan : B_PAL.lineHi} strokeWidth="1"
            onMouseEnter={() => setHovered(hex.id)} onMouseLeave={() => setHovered(null)}
            onClick={() => onClick && onClick(hex.id)}
            style={{ cursor: 'pointer' }} />
        );
      })}
      {/* labels per region cluster */}
      {SEKURA_REGIONS.map((r, i) => {
        const cluster = hexes.filter(h => h.id === r.id);
        const avgQ = cluster.reduce((s, h) => s + h.q, 0) / cluster.length;
        const avgR = cluster.reduce((s, h) => s + h.r, 0) / cluster.length;
        const cx = 30 + avgQ * w + (Math.round(avgR) % 2) * (w / 2);
        const cy = 30 + avgR * h2;
        return (
          <g key={r.id} pointerEvents="none">
            <text x={cx} y={cy - 2} textAnchor="middle" fontFamily={bMono} fontSize="9" fill={B_PAL.bg} fontWeight="700" letterSpacing="0.08em">{r[lang].toUpperCase()}</text>
            <text x={cx} y={cy + 9} textAnchor="middle" fontFamily={bMono} fontSize="9" fill={B_PAL.bg} fontWeight="700">{sekuraFmt.pct(r.pct)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function BOverview({ t, lang, onPick, regionFilter, setRegionFilter, statusFilter, setStatusFilter }) {
  const [hovered, setHovered] = useStateB(null);
  const filtered = SEKURA_PROPERTIES.filter(p =>
    (regionFilter === 'all' || p.region === regionFilter) &&
    (statusFilter === 'all' || p.status === statusFilter)
  );
  return (
    <>
      <div style={bStyles.metricsBar}>
        {[
          { k: t.metrics.portfolio, v: sekuraFmt.int(SEKURA_AGG.totalHa, lang), s: 'ha · +2.4% YoY', c: B_PAL.text },
          { k: t.metrics.cars,      v: sekuraFmt.int(SEKURA_AGG.totalCars, lang), s: '+18 wk', c: B_PAL.text },
          { k: t.metrics.exposure,  v: 'R$ 1.85B', s: 'BRL', c: B_PAL.text },
          { k: t.metrics.alerts,    v: sekuraFmt.int(SEKURA_AGG.totalAlerts, lang), s: '+12 24h', c: B_PAL.amber },
          { k: t.metrics.breach,    v: sekuraFmt.int(SEKURA_AGG.breachCount, lang), s: '15.1% portfolio', c: B_PAL.red },
          { k: t.metrics.risk,      v: SEKURA_AGG.avgRisk + '/100', s: 'σ 22', c: B_PAL.cyan },
        ].map((m, i) => (
          <div key={i} style={bStyles.metricCell(i)}>
            <div style={bStyles.metricLabel}>{m.k}</div>
            <div style={{ ...bStyles.metricValue, color: m.c }}>{m.v}</div>
            <div style={bStyles.metricSub}>{m.s}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', borderBottom: `1px solid ${B_PAL.line}` }}>
        <div style={{ borderRight: `1px solid ${B_PAL.line}` }}>
          <div style={bStyles.panelHead}><span style={bStyles.hToken}>$</span> {t.geoTitle.toUpperCase()}</div>
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 200px', gap: 16 }}>
            <BHexMap regions={SEKURA_REGIONS} t={t} lang={lang} hovered={hovered} setHovered={setHovered} onClick={(id) => setRegionFilter(id === regionFilter ? 'all' : id)} />
            <div>
              <div style={{ fontFamily: bMono, fontSize: 9, color: B_PAL.textFaint, letterSpacing: '0.14em', marginBottom: 8 }}>REGION_TABLE</div>
              {SEKURA_REGIONS.map(r => (
                <div key={r.id} onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(null)}
                     onClick={() => setRegionFilter(r.id === regionFilter ? 'all' : r.id)}
                     style={{ padding: '6px 8px', fontFamily: bMono, fontSize: 11, cursor: 'pointer',
                              background: hovered === r.id ? B_PAL.panelHi : 'transparent',
                              color: regionFilter === r.id ? B_PAL.cyan : B_PAL.text,
                              borderLeft: regionFilter === r.id ? `2px solid ${B_PAL.cyan}` : '2px solid transparent',
                              display: 'flex', justifyContent: 'space-between' }}>
                  <span>{r[lang]}</span>
                  <span style={{ color: B_PAL.textDim }}>{sekuraFmt.pct(r.pct)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={bStyles.panelHead}><span style={bStyles.hToken}>$</span> {t.detTitle.toUpperCase()}</div>
          <div style={{ padding: 16 }}>
            <BSparkBars data={SEKURA_TIMELINE.map(d => d.def)} color={B_PAL.cyan} w={320} h={70} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: bMono, fontSize: 9, color: B_PAL.textFaint }}>
              <span>W01</span><span>W06</span><span>W12</span>
            </div>
            <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
              {[
                { k: t.alertKinds.deforestation, v: 358, c: B_PAL.cyan },
                { k: t.alertKinds.fire,           v: 103, c: B_PAL.amber },
                { k: t.alertKinds.embargo,        v: 9,   c: B_PAL.red },
                { k: t.alertKinds.overlap,        v: 24,  c: B_PAL.violet },
              ].map((row, i) => {
                const max = 358;
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 50px', alignItems: 'center', gap: 8, fontFamily: bMono, fontSize: 11 }}>
                    <span style={{ color: B_PAL.textDim }}>{row.k}</span>
                    <span style={{ height: 6, background: B_PAL.line, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: (row.v / max * 100) + '%', background: row.c }} />
                    </span>
                    <span style={{ color: row.c, textAlign: 'right' }}>{row.v}ha</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={bStyles.filterBar}>
        <span style={{ fontFamily: bMono, fontSize: 10, color: B_PAL.textFaint, letterSpacing: '0.14em', marginRight: 8 }}>STATUS:</span>
        {['all', 'ok', 'watch', 'breach'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={bStyles.fchip(statusFilter === s)}>
            {s === 'all' ? 'ALL' : t.status[s]}
          </button>
        ))}
        <span style={{ width: 1, height: 20, background: B_PAL.line, margin: '0 8px' }} />
        <span style={{ fontFamily: bMono, fontSize: 10, color: B_PAL.textFaint, letterSpacing: '0.14em', marginRight: 8 }}>{t.region.toUpperCase()}:</span>
        <button onClick={() => setRegionFilter('all')} style={bStyles.fchip(regionFilter === 'all')}>ALL</button>
        {SEKURA_REGIONS.map(r => (
          <button key={r.id} onClick={() => setRegionFilter(r.id)} style={bStyles.fchip(regionFilter === r.id)}>
            {r[lang]} <span style={{ opacity: 0.6, marginLeft: 4 }}>{r.cars}</span>
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: bMono, fontSize: 10, color: B_PAL.textDim }}>
          {filtered.length} / {SEKURA_PROPERTIES.length} rows
        </span>
      </div>

      <div style={{ overflow: 'auto' }}>
        <table style={bStyles.table}>
          <thead>
            <tr>
              <th style={bStyles.th}>{t.table.car}</th>
              <th style={bStyles.th}>{t.table.owner}</th>
              <th style={bStyles.th}>{t.table.muni}</th>
              <th style={bStyles.th}>{t.biome}</th>
              <th style={{ ...bStyles.th, textAlign: 'right' }}>{t.table.area}</th>
              <th style={{ ...bStyles.th, textAlign: 'right' }}>{t.loan}</th>
              <th style={{ ...bStyles.th, textAlign: 'right' }}>{t.table.risk}</th>
              <th style={{ ...bStyles.th, textAlign: 'right' }}>{t.table.alerts}</th>
              <th style={bStyles.th}>{t.table.last}</th>
              <th style={bStyles.th}>{t.table.status}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const sc = p.status === 'ok' ? B_PAL.green : (p.status === 'watch' ? B_PAL.amber : B_PAL.red);
              return (
                <tr key={p.car} onClick={() => onPick(p)} style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = B_PAL.panelHi}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ ...bStyles.td, color: B_PAL.cyan }}>{p.car}</td>
                  <td style={bStyles.td}>{p.owner}</td>
                  <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{p.muni} <span style={{ color: B_PAL.textFaint }}>{p.uf}</span></td>
                  <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{p.biome}</td>
                  <td style={{ ...bStyles.td, textAlign: 'right' }}>{sekuraFmt.int(p.ha, lang)}</td>
                  <td style={{ ...bStyles.td, textAlign: 'right', color: B_PAL.textDim }}>{sekuraFmt.brl(p.loanBrl, lang)}</td>
                  <td style={{ ...bStyles.td, textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', width: 30, height: 4, background: B_PAL.line, marginRight: 6, verticalAlign: 'middle', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: p.risk + '%', background: p.risk > 60 ? B_PAL.red : (p.risk > 30 ? B_PAL.amber : B_PAL.green) }} />
                    </span>
                    {p.risk}
                  </td>
                  <td style={{ ...bStyles.td, textAlign: 'right', color: p.alerts > 0 ? B_PAL.amber : B_PAL.textFaint }}>{p.alerts}</td>
                  <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{p.lastScan}</td>
                  <td style={bStyles.td}><span style={bStyles.chip(sc)}>{t.status[p.status]}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function BDetail({ t, lang, prop, onBack }) {
  if (!prop) return null;
  const propAlerts = SEKURA_ALERTS.filter(a => a.car === prop.car);
  return (
    <>
      <div style={bStyles.panelHead}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: B_PAL.cyan, fontFamily: bMono, fontSize: 11, cursor: 'pointer', padding: 0 }}>← BACK</button>
        <span style={bStyles.hToken}>$</span> PROPERTY / {prop.car}
        <span style={{ marginLeft: 'auto', color: B_PAL.textFaint }}>SCAN_AT {prop.lastScan}</span>
      </div>
      <div style={{ padding: 20, borderBottom: `1px solid ${B_PAL.line}` }}>
        <div style={{ fontFamily: bSans, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{prop.owner}</div>
        <div style={{ fontFamily: bMono, fontSize: 11, color: B_PAL.textDim }}>
          {prop.muni}, {prop.uf} · {prop.biome} · {sekuraFmt.ha(prop.ha, lang)} · CPF {prop.cpf}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', borderBottom: `1px solid ${B_PAL.line}`, minHeight: 0 }}>
        <div style={{ borderRight: `1px solid ${B_PAL.line}` }}>
          <div style={bStyles.panelHead}><span style={bStyles.hToken}>></span> SATELLITE_OVERLAY</div>
          <div style={{ padding: 16, background: B_PAL.bg }}>
            <svg viewBox="0 0 400 260" style={{ width: '100%', display: 'block', background: '#06090C', border: `1px solid ${B_PAL.line}` }}>
              <defs>
                <pattern id="bGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={B_PAL.line} strokeWidth="0.5" />
                </pattern>
                <pattern id="bHatchRed" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke={B_PAL.red} strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect width="400" height="260" fill="url(#bGrid)" />
              <path d="M 40 40 L 360 50 L 350 220 L 50 210 Z" fill={B_PAL.cyanDim} fillOpacity="0.15" stroke={B_PAL.cyan} strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M 80 80 Q 150 70 220 90 Q 280 100 320 130 L 320 180 Q 250 190 180 180 Q 120 170 80 150 Z" fill={B_PAL.green} fillOpacity="0.25" stroke={B_PAL.green} strokeWidth="0.5" />
              <path d="M 180 110 L 240 110 L 240 150 L 180 150 Z" fill="url(#bHatchRed)" fillOpacity="0.4" stroke={B_PAL.red} strokeWidth="1" />
              <circle cx="210" cy="130" r="3" fill={B_PAL.red}>
                <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="245" y="105" fontFamily={bMono} fontSize="9" fill={B_PAL.red} letterSpacing="0.1em">A-2281 · 7.2HA</text>
              <text x="60" y="35" fontFamily={bMono} fontSize="9" fill={B_PAL.cyan} letterSpacing="0.1em">CAR_BOUNDARY</text>
              <text x="100" y="100" fontFamily={bMono} fontSize="9" fill={B_PAL.green}>FOREST_COVER</text>
              <text x="20" y="245" fontFamily={bMono} fontSize="9" fill={B_PAL.textDim}>SENTINEL-2 · 10m · {prop.lastScan}</text>
              <text x="370" y="245" textAnchor="end" fontFamily={bMono} fontSize="9" fill={B_PAL.textDim}>RGB+NDVI</text>
            </svg>
            <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
              {[['FOREST', B_PAL.green, '64%'], ['PASTURE', B_PAL.amber, '21%'], ['CROP', B_PAL.cyan, '8%'], ['CLEARED', B_PAL.red, '7%']].map(([k, c, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: bMono, fontSize: 10 }}>
                  <span style={{ width: 10, height: 10, background: c }} />
                  <span style={{ color: B_PAL.textDim }}>{k}</span>
                  <span style={{ color: B_PAL.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={bStyles.panelHead}><span style={bStyles.hToken}>></span> RECORD</div>
          <div style={{ padding: 0 }}>
            {[
              ['CAR_ID', prop.car],
              ['CPF', prop.cpf],
              ['BIOME', prop.biome],
              ['CROP', prop.crop],
              ['REGION', SEKURA_REGIONS.find(r => r.id === prop.region)[lang]],
              ['AREA_HA', sekuraFmt.int(prop.ha, lang)],
              ['LOAN_BRL', sekuraFmt.brl(prop.loanBrl, lang)],
              ['RISK', prop.risk + '/100'],
              ['ALERTS', propAlerts.length],
              ['STATUS', t.status[prop.status]],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '10px 16px', borderBottom: `1px solid ${B_PAL.line}`, fontFamily: bMono, fontSize: 11 }}>
                <span style={{ color: B_PAL.textFaint, letterSpacing: '0.08em' }}>{k}</span>
                <span style={{ color: k === 'CAR_ID' ? B_PAL.cyan : B_PAL.text }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div style={bStyles.panelHead}><span style={bStyles.hToken}>></span> ALERTS / {propAlerts.length}</div>
        <table style={bStyles.table}>
          <thead><tr>
            <th style={bStyles.th}>ID</th><th style={bStyles.th}>{t.alertsPanel}</th><th style={bStyles.th}>{t.detected}</th>
            <th style={{ ...bStyles.th, textAlign: 'right' }}>{t.area}</th><th style={{ ...bStyles.th, textAlign: 'right' }}>{t.confidence}</th>
            <th style={bStyles.th}>{t.satellite}</th><th style={bStyles.th}>SEV</th>
          </tr></thead>
          <tbody>
            {propAlerts.map(al => {
              const sc = al.severity === 'high' ? B_PAL.red : (al.severity === 'medium' ? B_PAL.amber : B_PAL.violet);
              return (
                <tr key={al.id}>
                  <td style={{ ...bStyles.td, color: B_PAL.cyan }}>{al.id}</td>
                  <td style={bStyles.td}>{t.alertKinds[al.kind]}</td>
                  <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{al.detected}</td>
                  <td style={{ ...bStyles.td, textAlign: 'right' }}>{al.area || '—'}</td>
                  <td style={{ ...bStyles.td, textAlign: 'right' }}>{al.confidence}%</td>
                  <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{al.sat}</td>
                  <td style={bStyles.td}><span style={bStyles.chip(sc)}>{t.severity[al.severity]}</span></td>
                </tr>
              );
            })}
            {propAlerts.length === 0 && <tr><td colSpan="7" style={{ ...bStyles.td, color: B_PAL.textFaint, fontStyle: 'italic' }}>{lang === 'pt' ? 'Sem alertas.' : (lang === 'es' ? 'Sin alertas.' : 'No alerts.')}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function BMap({ t, lang, onPick }) {
  const [hovered, setHovered] = useStateB(null);
  return (
    <>
      <div style={bStyles.panelHead}><span style={bStyles.hToken}>$</span> {t.nav.map.toUpperCase()} / NATIONAL_GRID</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 0, flex: 1 }}>
        <div style={{ padding: 24, borderRight: `1px solid ${B_PAL.line}` }}>
          <BHexMap regions={SEKURA_REGIONS} t={t} lang={lang} hovered={hovered} setHovered={setHovered} />
        </div>
        <div>
          <div style={bStyles.panelHead}><span style={bStyles.hToken}>></span> {t.legend}</div>
          <div style={{ padding: 16 }}>
            {SEKURA_REGIONS.map((r, i) => (
              <div key={r.id} onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(null)}
                   style={{ padding: '12px 0', borderBottom: i < SEKURA_REGIONS.length - 1 ? `1px solid ${B_PAL.line}` : 'none', fontFamily: bMono, fontSize: 11, background: hovered === r.id ? B_PAL.panelHi : 'transparent', paddingLeft: hovered === r.id ? 8 : 0, transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: B_PAL.text }}>{r[lang]}</span>
                  <span style={{ color: B_PAL.cyan }}>{sekuraFmt.pct(r.pct)}</span>
                </div>
                <div style={{ color: B_PAL.textFaint, marginTop: 4, fontSize: 10 }}>{r.cars} CARS · {sekuraFmt.int(r.ha, lang)} HA</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function BAlerts({ t, lang, onPick }) {
  const [sev, setSev] = useStateB('all');
  const filtered = SEKURA_ALERTS.filter(a => sev === 'all' || a.severity === sev);
  return (
    <>
      <div style={bStyles.panelHead}><span style={bStyles.hToken}>$</span> {t.queue.toUpperCase()}</div>
      <div style={bStyles.metricsBar}>
        {[
          { k: t.severity.high, v: SEKURA_ALERTS.filter(a => a.severity === 'high').length, c: B_PAL.red },
          { k: t.severity.medium, v: SEKURA_ALERTS.filter(a => a.severity === 'medium').length, c: B_PAL.amber },
          { k: t.severity.low, v: SEKURA_ALERTS.filter(a => a.severity === 'low').length, c: B_PAL.violet },
          { k: t.resolved, v: 142, c: B_PAL.green },
          { k: t.sla, v: '94%', c: B_PAL.cyan },
          { k: 'MTTR', v: '2.3h', c: B_PAL.text },
        ].map((m, i) => (
          <div key={i} style={bStyles.metricCell(i)}>
            <div style={bStyles.metricLabel}>{m.k}</div>
            <div style={{ ...bStyles.metricValue, color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div style={bStyles.filterBar}>
        <span style={{ fontFamily: bMono, fontSize: 10, color: B_PAL.textFaint, letterSpacing: '0.14em', marginRight: 8 }}>SEV:</span>
        {['all', 'high', 'medium', 'low'].map(s => (
          <button key={s} onClick={() => setSev(s)} style={bStyles.fchip(sev === s)}>{s.toUpperCase()}</button>
        ))}
      </div>
      <table style={bStyles.table}>
        <thead><tr>
          <th style={bStyles.th}>ID</th><th style={bStyles.th}>{t.alertsPanel}</th><th style={bStyles.th}>{t.table.car}</th>
          <th style={bStyles.th}>{t.table.owner}</th><th style={bStyles.th}>{t.detected}</th>
          <th style={{ ...bStyles.th, textAlign: 'right' }}>{t.area}</th><th style={{ ...bStyles.th, textAlign: 'right' }}>CONF</th>
          <th style={bStyles.th}>{t.satellite}</th><th style={bStyles.th}>SEV</th>
        </tr></thead>
        <tbody>
          {filtered.map(al => {
            const prop = SEKURA_PROPERTIES.find(p => p.car === al.car);
            const sc = al.severity === 'high' ? B_PAL.red : (al.severity === 'medium' ? B_PAL.amber : B_PAL.violet);
            return (
              <tr key={al.id} onClick={() => prop && onPick(prop)} style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = B_PAL.panelHi}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <td style={{ ...bStyles.td, color: B_PAL.cyan }}>{al.id}</td>
                <td style={bStyles.td}>{t.alertKinds[al.kind]}</td>
                <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{al.car}</td>
                <td style={bStyles.td}>{prop?.owner}</td>
                <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{al.detected}</td>
                <td style={{ ...bStyles.td, textAlign: 'right' }}>{al.area || '—'}</td>
                <td style={{ ...bStyles.td, textAlign: 'right' }}>{al.confidence}%</td>
                <td style={{ ...bStyles.td, color: B_PAL.textDim }}>{al.sat}</td>
                <td style={bStyles.td}><span style={bStyles.chip(sc)}>{t.severity[al.severity]}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function DirectionB({ lang, setLang }) {
  const [screen, setScreen] = useStateB('overview');
  const [picked, setPicked] = useStateB(null);
  const [regionFilter, setRegionFilter] = useStateB('all');
  const [statusFilter, setStatusFilter] = useStateB('all');
  const t = SEKURA_I18N[lang];
  const handlePick = (p) => { setPicked(p); setScreen('detail'); };

  return (
    <div style={bStyles.root}>
      <style>{bGlobal}</style>
      <div style={bStyles.topbar}>
        <div style={bStyles.brand}>
          <div style={bStyles.brandMark}>S</div>
          <div style={bStyles.brandName}>SEKURA</div>
          <div style={{ fontFamily: bMono, fontSize: 10, color: B_PAL.textFaint, letterSpacing: '0.1em' }}>v3.2</div>
        </div>
        {[['overview', t.nav.overview], ['map', t.nav.map], ['alerts', t.nav.alerts]].map(([k, l]) => (
          <button key={k} onClick={() => setScreen(k)} style={bStyles.navItem(screen === k || (k === 'overview' && screen === 'detail'))}>
            {l}
          </button>
        ))}
        <div style={bStyles.status}>
          <span style={bStyles.pulse} />
          <span style={{ fontFamily: bMono, fontSize: 10, letterSpacing: '0.1em' }}>STREAM_LIVE</span>
          <span style={{ fontFamily: bMono, fontSize: 10, color: B_PAL.textFaint }}>2026.05.04 · 14:23:07 BRT</span>
          <div style={{ display: 'flex', border: `1px solid ${B_PAL.line}` }}>
            {['pt', 'es', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ padding: '3px 8px', fontFamily: bMono, fontSize: 10, letterSpacing: '0.1em',
                         background: lang === l ? B_PAL.cyan : 'transparent',
                         color: lang === l ? B_PAL.bg : B_PAL.textDim,
                         border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>{l}</button>
            ))}
          </div>
          <span style={{ fontFamily: bMono, fontSize: 10 }}>JS@SEKURA</span>
        </div>
      </div>
      <div style={bStyles.body}>
        <div style={bStyles.side}>
          <div style={bStyles.sideGroup}>WORKSPACE</div>
          {[
            ['overview', t.nav.overview, SEKURA_AGG.totalCars],
            ['map', t.nav.map, '—'],
            ['alerts', t.nav.alerts, SEKURA_ALERTS.length],
          ].map(([k, l, c]) => (
            <div key={k} onClick={() => setScreen(k)} style={bStyles.sideItem(screen === k || (k === 'overview' && screen === 'detail'))}>
              <span>{l}</span>
              <span style={{ color: B_PAL.textFaint }}>{c}</span>
            </div>
          ))}
          <div style={{ ...bStyles.sideGroup, marginTop: 16 }}>{t.region.toUpperCase()}</div>
          {SEKURA_REGIONS.map(r => (
            <div key={r.id} onClick={() => { setRegionFilter(r.id); setScreen('overview'); }}
                 style={bStyles.sideItem(regionFilter === r.id)}>
              <span>{r[lang]}</span>
              <span style={{ color: B_PAL.textFaint }}>{r.cars}</span>
            </div>
          ))}
          <div style={{ ...bStyles.sideGroup, marginTop: 16 }}>FEEDS</div>
          {[['Sentinel-2', B_PAL.green], ['MODIS', B_PAL.green], ['PRODES', B_PAL.green], ['IBAMA', B_PAL.amber]].map(([n, c]) => (
            <div key={n} style={{ padding: '6px 12px', fontFamily: bMono, fontSize: 11, color: B_PAL.textDim, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
              {n}
            </div>
          ))}
        </div>
        <div style={bStyles.main}>
          {screen === 'overview' && <BOverview t={t} lang={lang} onPick={handlePick} regionFilter={regionFilter} setRegionFilter={setRegionFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}
          {screen === 'detail' && <BDetail t={t} lang={lang} prop={picked} onBack={() => setScreen('overview')} />}
          {screen === 'map' && <BMap t={t} lang={lang} onPick={handlePick} />}
          {screen === 'alerts' && <BAlerts t={t} lang={lang} onPick={handlePick} />}
        </div>
      </div>
    </div>
  );
}

window.DirectionB = DirectionB;
