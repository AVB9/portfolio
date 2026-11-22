export const PROFILE = {
  name: 'Atharva Bedarkar',
  shortName: 'Atharva',
  roleTitle: 'EEE Undergraduate & Developer',
  tagline:
    'Building things where bioelectronics meets hardware, embedded control, and software. From wet electrodes to web tools.',
  email: 'atharva.bedarkar@example.com', // Update with your preferred contact email
  location: 'Amaravati, IN',
  githubUrl: 'https://github.com/', // Update with your GitHub profile URL
  linkedinUrl: 'https://linkedin.com/', // Update with your LinkedIn profile URL
  meta: [
    { label: 'Role', value: 'EEE Undergrad & Builder' },
    { label: 'School', value: 'SENSE @ VIT-AP University' },
    { label: 'Study', value: 'B.Tech Electrical & Electronics Eng.' },
    { label: 'Focus', value: 'Bioelectronics & Full-Stack' },
    { label: 'Base', value: 'Amaravati, IN' },
  ],
  aboutParagraphs: [
    "I like building things that bridge physical systems and clean software. I'm a first-year B.Tech Electrical and Electronics Engineering student at VIT-AP University (School of Electronics Engineering), working across interdisciplinary bio-electrochemical research and full-stack web engineering.",
    "On the research side, I explore closed-loop CMOS microelectrode arrays and in situ electrochemical sculpting of bio-complementary wet electrodes for Brain-Computer Interfaces. On the software side, I build cross-browser extensions, spatial 3D interfaces with React and Three.js, and Firebase-backed web apps.",
    "Long term, I want to work at the intersection of neurotechnology, hardware-software co-design, and fast, minimalist tools that feel effortless to use.",
  ],
  aboutTags: [
    'Bioelectronics',
    'Closed-Loop CMOS',
    'Full-Stack Web',
    '3D & Spatial UI',
  ],
  core: [
    { label: 'Bio-BCI', value: 'Wet Electrodes / EIS / PID' },
    { label: 'Frontend', value: 'React / Three.js / Canvas' },
    { label: 'Cloud', value: 'Firebase / Firestore / CI' },
    { label: 'Extensions', value: 'WebExtensions MV3' },
  ],
  experience: [
    {
      ref: '[HEAD]',
      role: 'Interdisciplinary Research Presenter (Team 26IR03)',
      period: '2026 — Present',
      org: 'Anveshan 2026 · VIT-AP University (SENSE)',
      bullets: [
        'Proposed a closed-loop CMOS high-density microelectrode array (HD-MEA) architecture for in situ electrochemical growth and PID-controlled anodic pruning of bio-complementary PETE-S wet electrodes for Brain-Computer Interfaces.',
        'Bridged published enzymatic hydrogel chemistry (water-soluble ETE-S trimers, HRP, and Glutamate Oxidase) with pad-by-pad 10 mV Electrical Impedance Spectroscopy diagnostics and strict sub-1.23 V water-window clamping.',
        'Presented solo as a first-year undergraduate at the Association of Indian Universities South Zone Convention at Osmania University, Hyderabad under Track VI: Interdisciplinary Research.',
      ],
    },
    {
      ref: '[main]',
      role: 'Team Lead & Systems Architect (SW-4)',
      period: '2026',
      org: 'STARFORGE Hackathon · Habitat Layout Creator',
      bullets: [
        'Led a 4-member team designing an interactive space-habitat floorplan creator combining a 2D Konva spatial editor with real-time 3D React Three Fiber / Three.js visualization.',
        'Architected a client-side composite scoring engine evaluating volume, adjacency, acoustics, and egress across 7 habitat zone types with split-screen NASA baseline comparison.',
      ],
    },
    {
      ref: '[v1.0]',
      role: 'Web Developer & Presenter (Group G6)',
      period: '2026',
      org: 'MGT1001 Exhibition · The Voiceless',
      bullets: [
        'Built and deployed a Firebase-hosted mobile-first interactive pledge blackboard and 6-question ethics quiz web app with live audience consensus visualization and passcode-protected moderation.',
        'Presented the scientific perspective on animal sentience and moral consideration during the university exhibition.',
      ],
    },
  ],
  stack: [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'C / C++'],
    },
    {
      category: '3D & Frontend',
      items: ['React', 'Three.js', 'Vite', 'Konva.js'],
    },
    {
      category: 'Cloud & Backend',
      items: ['Firebase', 'Firestore', 'Firebase Hosting', 'GitHub Actions'],
    },
    {
      category: 'Hardware & Systems',
      items: ['CMOS HD-MEA', 'EIS / PID Control', 'WebExtensions MV3', 'MATLAB'],
    },
  ],
  projects: [
    {
      slug: '/projects/wet-electrodes-bci',
      title: 'Bio-Complementary Wet Electrodes (BCI)',
      year: '2026',
      summary:
        'A systems-level closed-loop CMOS HD-MEA architecture for in situ electrochemical growth and PID-controlled anodic pruning of conductive PETE-S neural interfaces. Combines Glutamate Oxidase chemotactic steering with 10 mV EIS diagnostics and strict < 1.23 V water-window clamping.',
      details:
        'Entered in Anveshan 2026 (Track VI: Interdisciplinary Research, Team 26IR03) and presented at the South Zone Convention at Osmania University. Bridges enzymatic hydrogel polymerization (0.6–1.5 kPa brain-matched modulus, 57 mS/cm dry conductivity) with electronic spatial sculpting to eliminate stray branches and 50 Hz crosstalk.',
      tags: ['Bioelectronics', 'CMOS HD-MEA', 'EIS', 'PID Control', 'BCI'],
      repoUrl: '',
    },
    {
      slug: '/projects/pricelens',
      title: 'PriceLens v3.3 Extension',
      year: '2026',
      summary:
        'A universal Manifest V3 browser extension for Firefox, Zen, Chrome, Brave, Arc, and 15+ browsers that surfaces live price history charts and deal score breakdowns directly on e-commerce product pages.',
      details:
        'Features dual Gecko/Chromium background architecture, a client-side scraper with MAIN-world Highcharts series extraction and SVG path fallback, canonical slug caching, and an automated Firebase Hosting distribution portal powered by GitHub Actions CI/CD.',
      tags: ['JavaScript', 'WebExtensions MV3', 'Firebase Hosting', 'GitHub Actions'],
      repoUrl: '',
    },
    {
      slug: '/projects/habitat-layout-creator',
      title: 'Habitat Layout Creator',
      year: '2026',
      summary:
        'An interactive 2D-to-3D space habitat planner built for STARFORGE Hackathon (SW-4). Lets engineers draft multi-zone deck floorplans on a metric grid and inspect them immediately in Three.js.',
      details:
        'Implements a real-time composite validation rule engine weighing volume (30%), adjacency (25%), acoustics (25%), and egress (20%) across 7 functional zones plus perimeter airlocks, paired with split-screen radar chart comparisons against NASA baseline templates.',
      tags: ['React', 'TypeScript', 'Three.js', 'Konva.js', 'Zustand'],
      repoUrl: '',
    },
    {
      slug: '/projects/the-voiceless',
      title: 'The Voiceless — Live Pledge Board',
      year: '2026',
      summary:
        'A Firebase-hosted mobile-first interactive blackboard and 6-question animal ethics quiz built for a live campus exhibition, complete with organic non-overlapping quote placement and real-time audience consensus charts.',
      details:
        'Designed for zero-friction QR code participation on mobile devices with fullscreen exhibition counter mode, shuffled quiz choices, and a hidden 5-click passcode moderation drawer.',
      tags: ['Firebase', 'Firestore', 'Responsive Web', 'Interactive UI'],
      repoUrl: '',
    },
  ],
};

export const SEED_POSTS = [
  {
    id: 'seed-blog-1',
    slug: 'closed-loop-sculpting-wet-electrodes-bci',
    category: 'blogs',
    title: 'Closed-Loop Electrochemical Sculpting for Bio-Complementary Wet Electrodes',
    publishedAt: '2026-11-15',
    readTime: '4 min read',
    tags: ['Bioelectronics', 'BCI', 'CMOS'],
    excerpt:
      'Why unguided in vivo polymerization creates stray branches and crosstalk — and how pad-by-pad EIS plus PID-clamped anodic pruning can sculpt cleaner neural pathways.',
    content: `Rigid silicon and metal neural probes have a fundamental mechanical mismatch with brain tissue: cortical tissue sits around 1–3 kPa, while conventional probes are orders of magnitude stiffer. Bio-complementary conductive polymers like PETE-S grown enzymatically in hyaluronic acid scaffolds solve the stiffness problem (0.6–1.5 kPa), but unguided monomer diffusion introduces a spatial bottleneck.

When polymerization spreads isotropically, stray conductive branches form between adjacent channels. The result is capacitive crosstalk and 50 Hz ambient noise pickup.

## Two-Stage Growth and Sculpting

The architecture I presented at Anveshan 2026 separates the problem into two active electrical regimes on a high-density CMOS microelectrode array (1 CMOS Pad = 1 Pathway):

- **Growth Mode (Current Steering):** Exploiting the negative sulfonate charge on ETE-S monomers, the target pad is biased gently positive (+0.3 to +0.5 V) while neighboring pads act as cathodic virtual guard rings (0 V to -0.1 V), electrophoretically steering monomers alongside Glutamate Oxidase (GlOx) and HRP enzymatic elongation.
- **Diagnostic & Sculpting Mode:** Pad-by-pad 10 mV AC Electrical Impedance Spectroscopy (EIS) checks pathway integrity below 100 Hz (the LFP band). Stray high-impedance branches are selectively cleaved back into soluble oligomers using PID-controlled anodic pulses strictly clamped below the 1.23 V thermodynamic water-window limit.

Keeping drive voltage beneath 1.23 V prevents water splitting, micro-bubble formation, and local acidosis — making spatial control compatible with living tissue.`,
  },
  {
    id: 'seed-blog-2',
    slug: 'shipping-universal-mv3-extension-gecko-chromium',
    category: 'blogs',
    title: 'Shipping One MV3 Browser Extension Across 15+ Gecko & Chromium Browsers',
    publishedAt: '2026-11-10',
    readTime: '3 min read',
    tags: ['WebExtensions', 'JavaScript', 'Firebase'],
    excerpt:
      'Practical lessons from building PriceLens v3.3: handling dual service-worker vs. background-script manifests, MAIN-world chart bridges, and automated Firebase Hosting releases.',
    content: `Writing a Manifest V3 extension that runs cleanly on Chrome, Brave, Edge, Arc, Firefox, Zen Browser, and LibreWolf without maintaining two diverging codebases comes down to isolating browser quirks early.

## Key Architectural Decisions

- **Dual Background Declaration:** Chromium engines expect \`background.service_worker\`, whereas Gecko-based browsers rely on \`background.scripts\`. Packaging targeted ZIP bundles in GitHub Actions keeps every browser happy while sharing 99% of the source tree.
- **Hybrid Promise / Callback Wrappers:** Wrapping \`browser.*\` and \`chrome.*\` calls behind a single helper avoids subtle callback vs. Promise bugs across popup, content, and background contexts.
- **MAIN-World Extraction:** Injecting a tiny bridge script in \`world: "MAIN"\` lets us read live chart data cleanly with an SVG path fallback when needed.

Every push to \`main\` packages the Firefox, Chromium, and universal ZIPs and deploys the distribution portal straight to Firebase Hosting.`,
  },
  {
    id: 'seed-blog-3',
    slug: 'building-an-interactive-sleeping-cat-in-threejs',
    category: 'blogs',
    title: 'Building an Interactive 3D Sleeping Cat in Three.js for the Hero Viewport',
    publishedAt: '2026-11-22',
    readTime: '3 min read',
    tags: ['Three.js', 'React', 'WebGL'],
    excerpt:
      'How procedural geometry, smooth sine-wave breathing, raycasted petting interactions, and dual desk-lamp lighting bring a minimalist portfolio hero to life.',
    content: `Instead of a static image or heavy external GLTF model, the hero viewport on this site runs a procedural Three.js scene built entirely from lightweight primitives and custom animation curves.

## Making Motion Feel Alive

- **Breathing Cycle:** A slow sinusoidal scale modulation on the curled torso (~14 breaths per minute) gives an immediate calm rhythm.
- **Interactive Raycasting:** Clicking or tapping the cat triggers a gentle purr pulse, floating heart particles, and a livelier tail swish.
- **Wake & Lamp Toggles:** You can gently wake the cat to see it blink sleepily before curling back up, or toggle between warm amber desk-lamp light and cool midnight indigo.

Because there are zero external texture downloads, the WebGL canvas initializes almost instantaneously on both desktop and mobile.`,
  },
  {
    id: 'seed-personal-1',
    slug: 'first-semester-at-vit-ap-notes',
    category: 'personal',
    title: 'First Semester at VIT-AP: Late Nights, Labs, and Finding My Rhythm',
    publishedAt: '2026-11-18',
    readTime: '3 min read',
    tags: ['University', 'Reflection', 'VIT-AP'],
    excerpt:
      'A candid look back at my first few months in EEE — juggling circuit labs, hackathon sprints, and presenting at Osmania University.',
    content: `Starting college in Electrical and Electronics Engineering felt like drinking from a firehose for the first three weeks. Between morning lectures, lab records, and figuring out campus routines in Amaravati, it was easy to feel like there were never enough hours in the day.

What surprised me most was how much energy came from side projects. Staying up to refine slides for Anveshan 2026 or debugging a Three.js layout editor with teammates during STARFORGE made the classroom theory click in a completely different way.

## Small Habits That Helped

- Keeping a minimal daily list of just two non-negotiable tasks instead of a 15-item wish list.
- Treating every presentation and hackathon as a chance to learn one new tool deeply.
- Taking quiet evening walks around campus when a bug refuses to make sense.

Here is to keeping the curiosity high and the builds even cleaner next semester.`,
  },
  {
    id: 'seed-personal-2',
    slug: 'why-i-love-minimalist-dark-interfaces',
    category: 'personal',
    title: 'Why Minimalist Terminal Aesthetics Still Feel Like Home',
    publishedAt: '2026-11-12',
    readTime: '2 min read',
    tags: ['Design', 'Personal', 'Minimalism'],
    excerpt:
      'Notes on quiet dark surfaces, monospace typography, and why removing decorative clutter makes software feel calmer and faster.',
    content: `A lot of modern websites try to shout at you the moment they load — giant gradients, bouncing popups, and five competing accent colors. Every time I land on a quiet, dark, monospace-anchored page, my shoulders drop a little.

Good minimalism isn't about making a page look empty or flat. It's about letting subtle tonal contrast, crisp spacing, and one thoughtful interactive centerpiece — like a sleeping cat curled up beside your bio — carry the entire personality of the site.

That's the feeling I wanted this portfolio and personal blog corner to capture.`,
  },
];
