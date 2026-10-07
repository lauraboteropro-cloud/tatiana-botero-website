export type ProjectVisualVariant = "workforce" | "tempo" | "insurance" | "vertical-ai";

export function HeroSystemMap() {
  return (
    <svg className="hero-system-map" viewBox="0 0 620 470" role="img" aria-labelledby="hero-map-title hero-map-desc">
      <title id="hero-map-title">From complex signals to a clear product decision</title>
      <desc id="hero-map-desc">Customer, operations, technology, and business signals connect through discovery and problem framing into a focused product outcome.</desc>
      <defs>
        <linearGradient id="map-ribbon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9e9e0" stopOpacity=".68" />
          <stop offset=".54" stopColor="#d6eee7" stopOpacity=".36" />
          <stop offset="1" stopColor="#f5ba91" stopOpacity=".42" />
        </linearGradient>
        <radialGradient id="map-halo">
          <stop offset="0" stopColor="#f7d9c5" stopOpacity=".82" />
          <stop offset="1" stopColor="#f7d9c5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path className="map-landscape" d="M25 257 C81 177 127 163 189 211 C236 248 242 282 294 274 C355 264 357 174 424 166 C490 158 518 211 592 187 L592 380 C523 392 490 363 425 370 C348 378 323 423 253 390 C182 357 147 369 90 400 C65 414 40 412 25 407Z" fill="url(#map-ribbon)" />
      <ellipse cx="422" cy="265" rx="143" ry="139" fill="url(#map-halo)" />
      <path className="map-route map-route-soft" d="M60 106 C155 106 137 194 228 218 S325 253 390 241 S486 216 562 215" />
      <path className="map-route map-route-soft" d="M60 177 C137 177 152 212 228 218 S326 273 390 241 S478 226 562 215" />
      <path className="map-route map-route-soft" d="M60 335 C151 335 153 273 228 245 S325 212 390 241 S483 255 562 215" />
      <path className="map-route map-route-main" d="M60 106 C151 106 142 189 228 218 C293 240 318 252 390 241 C456 231 490 215 562 215" />
      <path className="map-route map-route-branch" d="M390 241 C442 293 478 332 562 336" />
      <g className="map-input map-node-cyan"><circle cx="60" cy="106" r="7" /><text x="31" y="83">CUSTOMERS</text></g>
      <g className="map-input map-node-teal"><circle cx="60" cy="177" r="7" /><text x="30" y="157">OPERATIONS</text></g>
      <g className="map-input map-node-peach"><circle cx="60" cy="335" r="7" /><text x="32" y="366">TECH + CONTEXT</text></g>
      <circle className="decision-orbit" cx="228" cy="231" r="42" />
      <circle className="decision-orbit decision-orbit-inner" cx="228" cy="231" r="27" />
      <circle className="decision-node" cx="228" cy="231" r="10" />
      <text className="map-label" x="228" y="294" textAnchor="middle">DISCOVERY</text>
      <text className="map-label map-label-secondary" x="228" y="307" textAnchor="middle">problem framing</text>
      <circle className="outcome-orbit" cx="390" cy="241" r="28" />
      <circle className="outcome-node" cx="390" cy="241" r="12" />
      <text className="map-label" x="390" y="292" textAnchor="middle">PRODUCT DECISION</text>
      <g className="map-outcome map-node-cyan"><circle cx="562" cy="215" r="12" /><text x="562" y="185" textAnchor="middle">CLEARER FLOW</text></g>
      <g className="map-outcome map-node-peach"><circle cx="562" cy="336" r="8" /><text x="562" y="366" textAnchor="middle">MEASURABLE OUTCOME</text></g>
      <text className="map-note" x="44" y="438">LISTEN</text><text className="map-note" x="218" y="438">MAKE SENSE</text><text className="map-note" x="496" y="438">MAKE IT USEFUL</text>
    </svg>
  );
}

export function ProjectVisual({ variant }: { variant: ProjectVisualVariant }) {
  if (variant === "workforce") {
    return (
      <figure className="project-visual visual-workforce">
        <svg viewBox="0 0 560 300" role="img" aria-labelledby="workforce-title workforce-desc">
          <title id="workforce-title">One workforce system, many connected teams</title>
          <desc id="workforce-desc">Recruitment, HR, training, IT, finance, payroll, operations, and employee self-service connect through a central workforce platform.</desc>
          <path className="diagram-line line-cyan" d="M280 147 C194 78 163 66 92 69 M280 147 C207 118 163 126 76 144 M280 147 C205 185 163 210 91 224 M280 147 C213 240 160 261 116 266 M280 147 C355 78 395 62 472 68 M280 147 C354 112 406 126 489 140 M280 147 C352 188 411 206 481 220 M280 147 C352 233 399 259 451 268" />
          <circle className="diagram-node node-teal" cx="92" cy="69" r="7" /><circle className="diagram-node node-cyan" cx="76" cy="144" r="7" /><circle className="diagram-node node-peach" cx="91" cy="224" r="7" /><circle className="diagram-node node-cyan" cx="116" cy="266" r="7" />
          <circle className="diagram-node node-peach" cx="472" cy="68" r="7" /><circle className="diagram-node node-cyan" cx="489" cy="140" r="7" /><circle className="diagram-node node-teal" cx="481" cy="220" r="7" /><circle className="diagram-node node-peach" cx="451" cy="268" r="7" />
          <text className="diagram-label label-left" x="107" y="73">RECRUITMENT</text><text className="diagram-label label-left" x="91" y="148">HR</text><text className="diagram-label label-left" x="106" y="228">TRAINING</text><text className="diagram-label label-left" x="131" y="270">IT</text>
          <text className="diagram-label label-right" x="457" y="72">FINANCE</text><text className="diagram-label label-right" x="474" y="144">PAYROLL</text><text className="diagram-label label-right" x="466" y="224">OPERATIONS</text><text className="diagram-label label-right" x="436" y="272">SELF-SERVICE</text>
          <circle className="hub-halo" cx="280" cy="147" r="71" /><circle className="hub-ring" cx="280" cy="147" r="53" /><circle className="hub-node" cx="280" cy="147" r="39" />
          <text className="hub-label" x="280" y="143" textAnchor="middle">WORKFORCE</text><text className="hub-label hub-label-small" x="280" y="159" textAnchor="middle">SYSTEM OF RECORD</text>
        </svg>
        <figcaption><span>Many teams</span><i>→</i><span>One connected system</span></figcaption>
      </figure>
    );
  }

  if (variant === "tempo") {
    return (
      <figure className="project-visual visual-tempo">
        <svg viewBox="0 0 560 300" role="img" aria-labelledby="tempo-title tempo-desc">
          <title id="tempo-title">Planning with time, priorities, capacity, and energy</title>
          <desc id="tempo-desc">Four human context signals inform an AI suggestion that remains open to a person&apos;s choice.</desc>
          <path className="diagram-line line-muted" d="M96 64 C168 64 166 118 225 138 M96 119 C160 119 172 130 225 144 M96 178 C158 178 177 158 225 148 M96 234 C165 234 169 178 225 153" />
          <text className="tempo-input" x="39" y="68">TIME</text><text className="tempo-input" x="39" y="123">PRIORITY</text><text className="tempo-input" x="39" y="182">CAPACITY</text><text className="tempo-input" x="39" y="238">ENERGY</text>
          <circle className="diagram-node node-cyan" cx="96" cy="64" r="6" /><circle className="diagram-node node-peach" cx="96" cy="119" r="6" /><circle className="diagram-node node-teal" cx="96" cy="178" r="6" /><circle className="diagram-node node-peach" cx="96" cy="234" r="6" />
          <path className="tempo-wave" d="M226 149 C256 149 265 106 293 106 S326 188 352 164 S383 130 409 149" />
          <circle className="tempo-ai-halo" cx="314" cy="147" r="45" /><circle className="tempo-ai" cx="314" cy="147" r="28" />
          <text className="tempo-ai-label" x="314" y="144" textAnchor="middle">AI</text><text className="tempo-ai-sub" x="314" y="158" textAnchor="middle">SUGGESTION</text>
          <path className="diagram-line line-teal" d="M342 147 C385 147 408 147 449 147" />
          <circle className="tempo-human" cx="465" cy="147" r="18" /><circle className="tempo-human-core" cx="465" cy="147" r="6" />
          <text className="diagram-label" x="465" y="190" textAnchor="middle">HUMAN CHOICE</text>
          <path className="capacity-track" d="M193 267 H474" /><path className="capacity-range" d="M231 267 H335" /><circle className="capacity-point" cx="231" cy="267" r="4" /><circle className="capacity-point" cx="335" cy="267" r="4" />
          <text className="diagram-note" x="194" y="286">A plan shaped around capacity, not empty slots</text>
        </svg>
        <figcaption><span>Context</span><i>→</i><span>Suggestion</span><i>→</i><span>Human choice</span></figcaption>
      </figure>
    );
  }

  if (variant === "insurance") {
    return (
      <figure className="project-visual visual-insurance">
        <svg viewBox="0 0 560 260" role="img" aria-labelledby="insurance-title insurance-desc">
          <title id="insurance-title">A clearer digital insurance journey</title>
          <desc id="insurance-desc">Quoting, authentication, payment, and policy issuance connect as a single digital journey.</desc>
          <path className="journey-fragment" d="M58 132 H167 M188 132 H292 M313 132 H412" />
          <path className="journey-route" d="M58 132 C102 132 129 132 169 132 S267 132 292 132 S388 132 412 132 S476 132 506 132" />
          <g className="journey-step step-peach"><circle cx="58" cy="132" r="18" /><text x="58" y="136" textAnchor="middle">01</text></g>
          <g className="journey-step step-cyan"><circle cx="179" cy="132" r="18" /><text x="179" y="136" textAnchor="middle">02</text></g>
          <g className="journey-step step-teal"><circle cx="302" cy="132" r="18" /><text x="302" y="136" textAnchor="middle">03</text></g>
          <g className="journey-step step-peach"><circle cx="424" cy="132" r="18" /><text x="424" y="136" textAnchor="middle">04</text></g>
          <circle className="journey-end" cx="506" cy="132" r="7" />
          <text className="diagram-label" x="58" y="184" textAnchor="middle">QUOTE</text><text className="diagram-label" x="179" y="184" textAnchor="middle">AUTHENTICATE</text><text className="diagram-label" x="302" y="184" textAnchor="middle">PAY</text><text className="diagram-label" x="424" y="184" textAnchor="middle">ISSUE POLICY</text>
          <text className="journey-caption" x="280" y="75" textAnchor="middle">FROM FRAGMENTED STEPS TO A CONNECTED JOURNEY</text>
        </svg>
        <figcaption><span>Quoting</span><i>→</i><span>Authentication</span><i>→</i><span>Payment</span><i>→</i><span>Policy</span></figcaption>
      </figure>
    );
  }

  return (
    <figure className="project-visual visual-vertical-ai">
      <svg viewBox="0 0 560 260" role="img" aria-labelledby="vertical-title vertical-desc">
        <title id="vertical-title">Data moving through an AI-enabled product workflow</title>
        <desc id="vertical-desc">Signals move through a workflow, an AI-supported step, a human decision, and an outcome.</desc>
        <path className="diagram-line line-muted" d="M62 130 H167 M186 130 H267 M290 130 H373 M397 130 H492" />
        <path className="workflow-highlight" d="M62 130 H167 M186 130 H267 M290 130 H373 M397 130 H492" />
        <g className="workflow-step workflow-data"><circle cx="62" cy="130" r="22" /><path d="M52 130h20M62 120v20" /></g>
        <g className="workflow-step workflow-flow"><rect x="164" y="109" width="25" height="42" rx="8" /><path d="M171 121h11M171 130h11M171 139h7" /></g>
        <g className="workflow-step workflow-ai"><circle cx="279" cy="130" r="26" /><text x="279" y="134" textAnchor="middle">AI</text></g>
        <g className="workflow-step workflow-human"><circle cx="385" cy="130" r="22" /><circle cx="385" cy="123" r="4" /><path d="M377 139c2-7 14-7 16 0" /></g>
        <g className="workflow-step workflow-outcome"><circle cx="502" cy="130" r="16" /><path d="m494 130 6 6 11-13" /></g>
        <text className="diagram-label" x="62" y="184" textAnchor="middle">DATA</text><text className="diagram-label" x="176" y="184" textAnchor="middle">WORKFLOW</text><text className="diagram-label" x="279" y="184" textAnchor="middle">AI SUPPORT</text><text className="diagram-label" x="385" y="184" textAnchor="middle">HUMAN DECISION</text><text className="diagram-label" x="502" y="184" textAnchor="middle">OUTCOME</text>
        <text className="diagram-note" x="280" y="229" textAnchor="middle">Automation supports judgment; it doesn’t replace it</text>
      </svg>
      <figcaption><span>Data</span><i>→</i><span>Workflow</span><i>→</i><span>AI + human judgment</span><i>→</i><span>Outcome</span></figcaption>
    </figure>
  );
}
