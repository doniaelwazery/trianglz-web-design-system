await figma.setCurrentPageAsync(page);
const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
const generic = /^(property ?\d*|type|variant\d*)$/i;
const placeholder = /^(variant|status|state|type|property|frame|default ?)\d+$|^\d+$/i;
const res = [];
for (const s of sets) {
  let props = null, broken = false;
  try { props = s.componentPropertyDefinitions; } catch (e) { broken = true; }
  const p = {};
  if (props) for (const [k, d] of Object.entries(props)) p[k.split('#')[0]] = d.type === 'VARIANT' ? d.variantOptions : d.type;
  let unboundPaint = 0, unboundRadius = 0, unboundGap = 0, noAL = 0, hardHex = {};
  const nodes = s.findAll(() => true);
  for (const n of [s, ...nodes]) {
    if (n.type === 'INSTANCE' && n !== s) {} 
    for (const key of ['fills', 'strokes']) {
      const arr = n[key];
      if (Array.isArray(arr)) arr.forEach(pt => {
        if (pt.type === 'SOLID' && pt.visible !== false && !(pt.boundVariables && pt.boundVariables.color)) {
          if (n === s) return; // set container fill (purple dashed frame) ignored
          unboundPaint++;
          const c = pt.color; const h = '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
          hardHex[h] = (hardHex[h] || 0) + 1;
        }
      });
    }
    if (n !== s && 'cornerRadius' in n && typeof n.cornerRadius === 'number' && n.cornerRadius > 0 && !(n.boundVariables && (n.boundVariables.topLeftRadius))) unboundRadius++;
    if (n !== s && 'layoutMode' in n && n.layoutMode !== 'NONE' && n.itemSpacing > 0 && !(n.boundVariables && n.boundVariables.itemSpacing)) unboundGap++;
    if (n !== s && (n.type === 'FRAME' || n.type === 'COMPONENT') && n.layoutMode === 'NONE' && n.children && n.children.length > 1) noAL++;
  }
  const top = Object.entries(hardHex).sort((a, b) => b[1] - a[1]).slice(0, 4).map(e => e.join('×'));
  const genericProps = Object.keys(p).filter(k => generic.test(k));
  const phValues = Object.values(p).flat().filter(v => typeof v === 'string' && placeholder.test(v));
  res.push({ id: s.id, name: s.name, parent: s.parent && s.parent.name, variants: s.children.length, broken, props: p,
    genericProps, phValues: phValues.slice(0, 6), unboundPaint, top, unboundRadius, unboundGap, noAL, desc: !!s.description });
}
return res;
