import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, "dist");
const siteUrl = "https://urbanarts.co.in";
const assetVersion = "20261001-06";

const residential = [
  {
    slug: "kompally-residence",
    title: "Kompally Residence",
    eyebrow: "Residence · Interiors and landscape · Hyderabad",
    status: "Completed",
    role: "Design + build",
    scope: "Interior architecture · Kitchen design · Furniture · Landscape · Turnkey implementation",
    award: "Häfele Kitchen Ideas Design Challenge 2021 · Winner, South Zone · Runner-up, All India · Open Kitchen, Built Category",
    intro: "At Kompally, the kitchen is not backstage. It sits openly within family life, its planning, cabinetry and lighting developed as carefully as the rooms and garden around it.",
    note: "Urban Arts carried the interior from space planning to making and installation. The open kitchen—winner, South Zone and runner-up, All India in the Häfele Kitchen Ideas Design Challenge—was conceived as a social room adjoining the dining and family spaces. Custom joinery, furniture and wall treatments continue that close attention to use through the bedrooms, while the landscape extends daily life into shaded garden rooms.",
    images: ["lalitha-04", "lalitha-v2-02", "lalitha-v2-01", "lalitha-v2-03", "lalitha-v2-05", "lalitha-v2-06", "lalitha-v2-07", "lalitha-06", "lalitha-05", "lalitha-v2-04"],
    alt: ["Landscaped garden with timber pavilion", "Award-winning open kitchen with blue-green cabinetry and island", "Dining room adjoining the open kitchen", "Open-kitchen island and custom brass shelving", "Bedroom with custom furniture and layered lighting", "Upholstered bed and detailed wall panelling", "Custom green wall panelling and furniture detail", "Curved lawn and garden path", "Garden pavilion and planting", "Kitchen storage and joinery detail"],
  },
  {
    slug: "amara-model-homes",
    title: "Amara Model Homes",
    eyebrow: "Residential development · Model homes",
    status: "Completed",
    role: "Design + build",
    scope: "Model-home interiors · Furniture · Styling · Turnkey implementation",
    intro: "A model home must make an unbuilt life legible. These interiors use furniture, storage, light and circulation to help prospective residents understand each apartment beyond its plan.",
    note: "Urban Arts designed and delivered a family of model homes for different apartment types. Each has its own colour and material identity, but the purpose remains consistent: to make dimensions, movement, storage and daily occupation immediately understandable rather than merely stage a photogenic interior.",
    images: ["amara-01", "amara-02", "amara-render", "amara-03", "amara-04", "amara-05"],
    renderImages: ["amara-render"],
    alt: ["Model-home living room in muted green", "Dining space beneath a double-height void", "Design visualisation of a model-home living room", "Neutral bedroom with illuminated wardrobe", "Blue model-home bedroom", "Model-home passage and living room"],
  },
  {
    slug: "thyagraj-residence",
    title: "Thyagaraj Residence",
    eyebrow: "Residential interiors · Hyderabad",
    status: "Completed",
    role: "Design + build",
    scope: "Interior architecture · Furniture · Turnkey implementation",
    intro: "Timber screens, patterned surfaces and an open kitchen organise this home from the inside out, giving family life a centre without erasing the identity of individual rooms.",
    note: "The screens are not applied decoration: they filter views, mark transitions and allow connected spaces to retain a degree of enclosure. Custom cabinetry, wall treatments and furniture carry a common material language through the house, while changes in colour and detail keep it from becoming uniform.",
    images: ["thyagraj-01", "thyagraj-02", "thyagraj-03", "thyagraj-04", "thyagraj-05", "thyagraj-06"],
    alt: ["Living room with custom swing and patterned screen", "Open-plan living and kitchen", "Orange and white kitchen", "Bedroom with full-height cabinetry", "Bedroom with window-side study", "Dining area adjoining the kitchen"],
  },
  {
    slug: "brr-residence",
    title: "BRR Residence",
    eyebrow: "Architecture · Interiors · Landscape",
    status: "Completed",
    role: "Design + build",
    scope: "Architecture · Interiors · Landscape · Turnkey implementation",
    intro: "A city house capable of another life. Originally designed by Urban Arts as the owner’s home, it was later converted into a café after the family moved to their farm.",
    note: "Deep verandahs, stone arcades and planted courts temper the climate and place semi-open space at the centre of the house. Rooms open onto this shaded framework rather than simply facing outward. Its later conversion into a café was not anticipated as a theme; it was made possible by the generosity and adaptability of the original residential plan.",
    images: ["mla-01", "mla-02", "mla-03", "mla-04", "mla-05", "mla-06", "mla-07", "mla-08", "mla-09"],
    alt: ["Stone courtyard and shaded verandahs at BRR Residence", "Landscaped courtyard with outdoor seating", "Arched stone verandah and stone floor", "Dining terrace framed by stone arches", "Courtyard elevation and shaded upper gallery", "Deep colonnaded passage through the residence", "BRR Residence and courtyard illuminated at night", "Stone tower rising above the planted courtyard", "Interior display and handcrafted lighting beneath a timber ceiling"],
  },
  {
    slug: "ravi-residence",
    title: "Ravi Residence",
    eyebrow: "Residential interiors · Hyderabad",
    status: "Completed",
    role: "Design + build",
    scope: "Interior architecture · Custom cabinetry · Lighting · Turnkey implementation",
    intro: "Living, dining and circulation are treated as one continuous interior, while cabinetry, screens and lighting give individual rooms their own degree of enclosure and character.",
    note: "Rather than divide the shared spaces with walls, the design uses furniture, ceiling planes, lighting and changes in material to establish different territories. Purpose-built storage is absorbed into the architecture, leaving the main sequence open while allowing each bedroom to respond to a different occupant.",
    images: ["ravi-01", "ravi-02", "ravi-03", "ravi-04", "ravi-05", "ravi-06"],
    alt: ["Warm living room with layered lighting", "Open living and dining interior", "Living room with dark stone media wall", "Black and white residential kitchen", "Blue children's bedroom with custom joinery", "Dining area with custom screen"],
  },
  {
    slug: "begumpet-apartment",
    title: "Begumpet Apartment",
    eyebrow: "Turnkey implementation · Hyderabad",
    status: "Completed",
    role: "Site execution · Furniture · Furnishings",
    scope: "Turnkey implementation",
    intro: "Execution is also a design discipline. This apartment was designed by another practice and realised on site by Urban Arts, including its furniture and furnishings.",
    note: "Urban Arts entered the project as the turnkey implementation partner. The work lay in reading the design accurately, resolving interfaces between trades, coordinating site decisions and carrying the intended finish through furniture, furnishings and installation—without claiming authorship of the original design.",
    images: ["smit-01", "smit-02", "smit-03", "smit-09", "smit-07", "smit-08"],
    alt: ["Long living room in blue and grey", "Dining area adjoining the living room", "Grey modular kitchen", "Bedroom with grey upholstered bed and integrated media unit", "Bedroom dressing table and integrated storage", "Bathroom finished in deep red stone"],
  },
];

const assortedResidential = {
  slug: "other-residential-projects",
  title: "Other Residential Projects",
  eyebrow: "Residential archive · Selected work",
  status: "Completed and design-stage work",
  role: "Design + build",
  scope: "Architecture · Interior design · Furniture · Turnkey implementation",
  intro: "Not every project survives as a complete photographic record. These fragments nevertheless reveal recurring concerns across the residential archive.",
  note: "The selection moves between built interiors and architectural studies: clarity of planning, furniture treated as part of architecture, the character of materials and the relationship between rooms and landscape. It also records work that would otherwise disappear simply because its photographic documentation is incomplete.",
  images: ["other-res-01", "other-res-02", "other-res-07", "other-res-04", "other-res-05", "other-res-06"],
  renderImages: ["other-res-01", "other-res-02"],
  captions: ["Cherlapally House · Design study", "Farmhouse · Courtyard study", "Home Studio · Furniture study", "Home Studio · Living room", "Home Studio · Bedroom", "Home Studio · Furniture detail"],
  alt: ["Design study for Cherlapally House", "Design study of a farmhouse courtyard and pool", "Geometric timber chairs arranged in the Home Studio workshop", "Warmly lit living room with carved furniture", "Bedroom with dark timber furniture and patterned rug", "Upholstered chairs and settee against a deep red wall"],
};

const residentialProjects = [
  "kompally-residence",
  "brr-residence",
  "amara-model-homes",
  "ravi-residence",
  "thyagraj-residence",
  "begumpet-apartment",
].map((slug) => residential.find((project) => project.slug === slug)).concat(assortedResidential);

const janwadaFarmhouse = {
  slug: "janwada-farmhouse",
  title: "Janwada Farmhouse",
  eyebrow: "Presently ongoing · Janwada",
  status: "Design development",
  role: "Design",
  scope: "Architecture · Interiors · Landscape",
  intro: "A long water court is the organising line of this farmhouse. Rooms, planted courts and deep roofs are arranged around it to alternate between openness, shade and retreat.",
  note: "The project is being developed as a low sequence rather than a single emphatic object. Stone walls give the private rooms weight and protection; glazed shared spaces open across water and planting; broad roofs temper Hyderabad’s sun. Drawings and visualisations continue to test how structure, landscape and interior life meet along the court.",
  images: ["janwada-v2-01", "janwada-v2-02", "janwada-v2-03", "janwada-v2-04", "janwada-v2-05", "janwada-v2-06", "janwada-v2-07", "janwada-v2-08", "janwada-v2-09"],
  renderImages: ["janwada-v2-01", "janwada-v2-02", "janwada-v2-03", "janwada-v2-04", "janwada-v2-05", "janwada-v2-06", "janwada-v2-07", "janwada-v2-08", "janwada-v2-09"],
  alt: ["Design visualisation of the Janwada Farmhouse entrance at dusk", "Concept plan for Janwada Farmhouse", "Rear courtyard and pool", "Long water court between glazed farmhouse wings", "Twilight view of the north wing and stepped landscape", "Farmhouse bedroom opening to a private garden at twilight", "Bathroom opening to a planted court", "Second bathroom with a planted open-air court", "Entertainment room opening to the landscape"],
};

const ongoing = [janwadaFarmhouse];

const wider = [
  {
    slug: "shanti-sarovar",
    title: "Shanti Sarovar",
    eyebrow: "Green campus · Institutional · Hyderabad",
    status: "Completed in phases",
    role: "Architecture · Campus planning · Landscape",
    scope: "35-acre green campus · Institutional buildings · Landscape rehabilitation",
    award: "IGBC Green Champion Award 2020 · Pioneering Institution in Sensitising the Masses by Going Green",
    preserveImageRatios: true,
    intro: "A 35-acre institutional campus conceived not by erasing a damaged quarry, but by building in, over and around its boulders, cliffs, ravines and water-holding depressions.",
    note: "Brahma Kumaris asked Urban Arts to create its South India headquarters on a recently operational stone quarry in Gachibowli. The commission was therefore as much an act of land repair as one of architecture: a campus for spiritual learning and Rajayoga meditation had to emerge from ground visibly altered by years of extraction.",
    images: ["shanti-model"],
    alt: ["Design model of the Shanti Sarovar campus"],
    chapters: [
      {
        kicker: "The inherited ground",
        title: "The quarry was not a blank site.",
        paragraphs: [
          "The damaged landscape established the project’s first responsibility: to heal the earth’s wounds through a green campus shaped by ecological measures. Approximately seventy per cent of the land was reserved for urban forestry, gardens, man-made lakes and recreation, including spaces for meditation. Plantation, landscape development and restoration became central parts of the architectural brief.",
          "The site also held large, unusually positioned granite boulders characteristic of Hyderabad’s natural landscape. Rather than treat them as obstructions, the plan retained them wherever possible and made deliberate use of the quarry’s low-lying ground. Loose rubble found on site was crushed and reused in place of river sand in parts of the reinforced-concrete work, internal paths and road infrastructure."
        ],
        quote: "Rather than fill the quarry with waste and landfill—flattening its topographic character at immense cost—we chose to build in, over and around the boulders, precipices and newly exposed rock, keeping its cliffs and water-holding depressions intact.",
        images: [
          { name: "shanti-quarry-before", alt: "The quarried site before landscape restoration", caption: "Quarry land before landscape restoration" },
          { name: "shanti-landscape-phase1-4", alt: "Early landscape work at Shanti Sarovar", caption: "Landscape development · Phase one" },
          { name: "shanti-lake-auditorium", alt: "Rain-fed lake with the auditorium beyond", caption: "Rain-fed lake with the auditorium beyond" }
        ]
      },
      {
        kicker: "Land, water and climate",
        title: "Landscape became infrastructure.",
        paragraphs: [
          "Some exposed edges and deep ravines remain legible; others were blanketed with new soil and plant cover to begin a long process of rehabilitation. The existing ravines also retain future potential for harnessing wind and solar energy.",
          "The largest quarry pit was converted into an artificial lake. Seasonal rainwater flowing from the surrounding high ground collects here, bringing water, humidity and cooling to an otherwise dry site. Together with a second lake, check-dams, forestry and planted gardens, it allows the campus buildings to sit more comfortably through Hyderabad’s severe summers."
        ],
        images: [
          { name: "shanti-lake", alt: "The second artificial lake at Shanti Sarovar", caption: "The second artificial lake" },
          { name: "shanti-quarry-landscape", alt: "Landscape restoration in progress within the quarry", caption: "Quarry landscape in progress" },
          { name: "shanti-landscape-works", alt: "Landscape and site works in progress", caption: "Landscape and site works in progress" }
        ]
      },
      {
        kicker: "Architecture from the site",
        title: "Buildings follow the rock rather than overwrite it.",
        paragraphs: [
          "The architecture is organised as a sequence of courts, halls, accommodation and paths embedded in the terrain. Boulders enter courtyards and meditative spaces; changing levels become thresholds; and shaded passages join large collective rooms to quieter places of retreat.",
          "Sketches, models and measured drawings were working instruments throughout the process. They tested how walls might meet exposed rock, how a reception block could bridge different levels, and how the large programme could remain comprehensible without losing the particular character of the ground."
        ],
        images: [
          { name: "shanti-sketch", alt: "Concept sketch for a meditation cave among boulders", caption: "Meditation cave among the boulders", wide: true },
          { name: "shanti-sketch-auditorium", alt: "Sketch study for an auditorium wall", caption: "Auditorium wall study" },
          { name: "shanti-sketch-reception", alt: "Sketch study for the reception block", caption: "Reception block study" },
          { name: "shanti-boulders", alt: "Existing boulder landscape retained within the campus", caption: "Existing boulder landscape" }
        ]
      },
      {
        kicker: "A campus for collective life",
        title: "A large and varied programme held together by landscape.",
        paragraphs: [
          "The campus was planned to support spiritual learning, Rajayoga meditation, teaching, administration, accommodation and large public gatherings. Its principal components include a reception and information block; offices and staff rooms; eight 125-seat training halls; two 250-seat seminar halls; a library and reading room; a 3,500-seat auditorium; an art gallery and museum; a meditation hall; and dining and kitchen facilities for 2,000 people.",
          "Residential provision includes rooms for trainees, faculty, staff, senior Rajyoginis and visiting guests. The wider plan also accommodates a dispensary, technical services, solar park, water treatment, electrical infrastructure, an 8,000-seat open-air theatre, children’s educational park, peace park, viewing pavilion, walking trails, parking, check-dams and a bridge across one of the quarry ravines."
        ],
        images: [
          { name: "shanti-conference-front", alt: "Front elevation of the conference block", caption: "Conference block · Front", portrait: true },
          { name: "shanti-conference-court", alt: "Courtyard of the conference block", caption: "Conference block · Courtyard", portrait: true },
          { name: "shanti-campus", alt: "Conference and training blocks at Shanti Sarovar", caption: "Conference and training blocks", wide: true },
          { name: "shanti-01", alt: "Detailed institutional façade at Shanti Sarovar", caption: "Institutional building detail", portrait: true },
          { name: "shanti-02", alt: "Courtyard built around an exposed rock face", caption: "Courtyard formed around exposed rock", portrait: true }
        ]
      },
      {
        kicker: "Drawn and built",
        title: "The proposition carried through drawing, construction and landscape work.",
        paragraphs: [
          "Plans and sections coordinate the public route, the relationship between halls and courts, and the points at which construction negotiates the quarry profile. Site work proceeded in phases, allowing buildings and landscape rehabilitation to develop together rather than as separate operations.",
          "Shanti Sarovar is a highly site-specific response. Its broader lesson is not the reproduction of rocky cliffs and valleys elsewhere, but the discipline of finding opportunity within the difficult conditions a project already possesses."
        ],
        images: [
          { name: "shanti-plan-reception", alt: "Plan of the proposed reception hall", caption: "Plan · Reception hall" },
          { name: "shanti-plan-gallery", alt: "Plan of the proposed art gallery and museum", caption: "Plan · Art gallery and museum" },
          { name: "shanti-section-reception.svg", alt: "Section through the proposed reception hall", caption: "Section · Reception hall", wide: true },
          { name: "shanti-auditorium-construction", alt: "Auditorium construction in progress", caption: "Auditorium under construction" },
          { name: "shanti-conference-construction", alt: "Conference block construction in progress", caption: "Conference block under construction" },
          { name: "shanti-landscape-phase1-3", alt: "Completed first-phase landscape at Shanti Sarovar", caption: "Landscape development · Phase one" }
        ]
      }
    ]
  },
  {
    slug: "atithi-inn",
    title: "Atithi Inn",
    eyebrow: "Hospitality · Ameerpet, Hyderabad",
    status: "Completed",
    role: "Design + project management",
    scope: "Architecture · Interior design · Furniture · MEP coordination",
    preserveImageRatios: true,
    intro: "Chettinad architecture is used here as a working spatial language—not as a decorative theme—across guest rooms, circulation, dining and gathering spaces.",
    note: "Courtyards, deep verandahs, patterned floors and timber columns translate the spatial character of Chettinad architecture into a functioning city hotel. Urban Arts worked across guest rooms, banquet and conference spaces, MEP services, customised wardrobes, bathrooms, furniture and furnishings. Antique doors and architectural elements were retrofitted into the new work, allowing memory, making and hotel operations to occupy the same project.",
    images: ["atithi-01", "atithi-02", "atithi-06", "atithi-03", "atithi-04", "atithi-08"],
    wideImages: ["atithi-03", "atithi-04", "atithi-08"],
    alt: ["Atithi Inn courtyard and hotel exterior at dusk", "Chettinad-inspired dining verandah at Atithi Inn", "Hotel corridor with timber columns and patterned flooring", "Carved fireplace and column detail", "Guest room with carved timber furniture", "Banquet hall with ornate columns and ceremonial seating"],
  },
  {
    slug: "kachiguda-railway-station",
    title: "Kachiguda Railway Station",
    eyebrow: "Conservation · Hyderabad",
    status: "Completed",
    scope: "Condition assessment · Restoration guidance · Conservation",
    intro: "Conservation planning and technical guidance for the repair of critically damaged slabs, walls and central domes at one of Hyderabad’s busiest historic landmarks.",
    note: "Kachiguda Railway Station was built in 1916 under Mir Osman Ali Khan, the seventh Nizam, and was declared a heritage structure in 2003. Working with South Central Railway and the Department of Archaeology, Urban Arts prepared a condition assessment, repair recommendations and tender documentation, then guided restoration using compatible lime mortar and jack-arch roofing systems. Parts approaching permanent failure were made safe without surrendering the construction logic of the original building.",
    images: ["kachiguda-01", "kachiguda-02"],
    alt: ["Historic Kachiguda Railway Station frontage", "Historic tower and façade details at Kachiguda Railway Station"],
  },
  {
    slug: "state-archaeology-museum",
    title: "AP State Archaeology Museum",
    eyebrow: "Museum restoration and extension · Hyderabad",
    status: "Completed",
    scope: "Restoration · Extension architecture · Interior and exhibition design",
    intro: "Restoration of the existing museum together with the architectural and interior design of its extension, bringing old fabric, new galleries and exhibition requirements into one project.",
    note: "The commission crossed the usual boundary between conservation and new work. Urban Arts addressed the restoration of the existing museum, designed the new extension and developed its interiors and exhibition environment. Display cases, lighting, circulation and architectural detail were coordinated so that the collection—not the apparatus around it—remains visually primary.",
    images: ["museum-01", "museum-02"],
    alt: ["State archaeology museum gallery interior", "Museum display gallery with integrated lighting"],
  },
  {
    slug: "pvnr-expressway",
    title: "PVNR Elevated Expressway",
    eyebrow: "Urban infrastructure · Hyderabad",
    status: "Completed",
    scope: "Architectural design visualisation · Piers and undercarriage",
    intro: "Architectural design visualisation for the piers and undercarriage of Hyderabad’s elevated expressway—the parts of this large infrastructure most directly experienced from the street.",
    note: "Urban Arts was not responsible for the engineering of the expressway. Its commission addressed the architectural articulation and visualisation of the pier forms and undercarriage, testing how repetition, span and the view from below could give civic character to an otherwise purely infrastructural system.",
    images: ["pvnr-01", "pvnr-02", "pvnr-03", "pvnr-04"],
    alt: ["Long view of the PVNR Elevated Expressway", "Expressway pier and undercarriage", "Arcaded space beneath the expressway", "Black and white view beneath the expressway"],
  },
];

const projects = [...residentialProjects, ...ongoing, ...wider];

const experienceSections = [
  {
    title: "Homes and residential development",
    intro: "Individual houses, model homes, apartment interiors and larger residential layouts—often carried from architecture and planning through interiors, furniture, landscape and implementation.",
    projects: [
      ["BRR Residence · Banjara Hills, Hyderabad", "Architecture, interiors, landscape and turnkey implementation; originally a city home, later adapted as a café."],
      ["Kompally Residence · Hyderabad", "Interior architecture, award-winning open kitchen, custom furniture, landscape and turnkey implementation."],
      ["Amara Model Homes", "Model-home interiors, furniture, styling and turnkey implementation across multiple apartment types."],
      ["Siri Malli Brindawan Gardens · Hyderabad", "Residential plotting layout; north-, west- and east-facing farmhouse units; clubhouse and landscape design."],
      ["Silent Valley Resorts · Hyderabad", "Residential plotting layout; north-, west- and east-facing farmhouse units; clubhouse and landscape design."],
      ["Rainbow Vistas, Phase 1 · Model Apartments · Hyderabad", "Interior design; customised furniture and furnishings; partitions and built-in furniture; wardrobes, modular kitchens, lighting and accessories."],
      ["Aditya Empress Park · Model Houses · Hyderabad", "Custom furniture design and supply; window treatments, wall coverings, interior colour palette and accessories."],
    ],
  },
  {
    title: "Interiors, furniture and turnkey delivery",
    intro: "The interior practice combines space planning with cabinetry, furniture, services, lighting, furnishings and site coordination. Urban Arts has completed hundreds of turnkey interior projects for private and institutional clients.",
    projects: [
      ["Brahma Kumaris Educational Society Auditorium · Gachibowli, Hyderabad", "Complete interior design; acoustic wall panelling; stage flooring; sound-insulating doors; fire-retardant drapery, carpets, furniture and entrance-door design."],
      ["Apollo Life Gym & Spa · Madhapur, Hyderabad", "Guest and staff lockers; built-in cabinetry and partitions; poolside and seating furniture; blinds and curtains."],
      ["Adani Wilmar Office · Hyderabad", "Interior design, office furniture, window treatments and custom wall graphics."],
      ["Airtel Guest House · Hyderabad", "Soft furnishings and window treatments."],
      ["Uninor Guest House · Hyderabad", "Furniture, soft furnishings and window treatments."],
      ["HTC Global Guest House · Hyderabad", "Furniture, upholstery, leather, soft furnishings and window treatments."],
      ["Raj Bhavan · Governor’s Residence and Durbar Hall · Hyderabad", "Custom furniture; dais, flooring and built-in furniture; refurbishment of old furniture."],
    ],
  },
  {
    title: "Hospitality, retail and workplaces",
    intro: "Hotels, restaurants, guest rooms, showrooms and offices developed around operations, guest experience, speed of delivery and the precise scope entrusted to the practice.",
    projects: [
      ["Atithi Inn · Hyderabad", "Architecture for guest rooms, banquet and conference halls; interiors, MEP services, custom furniture and furnishings, retrofit of antique elements and project management."],
      ["Ullasa Rooftop Restaurant · Hyderabad", "Architecture, interiors, landscape, furniture and lighting design, custom wall treatments and project management."],
      ["Park Hyatt · Guest Rooms and Public Areas · Hyderabad", "Custom-manufactured furnishings, upholstery, curtains, blinds, wall coverings and selected floor coverings."],
      ["Hotel Quality Inn Pearl · Hyderabad", "Custom lobby furniture; curtains, upholstery and leatherwork for guest rooms."],
      ["Rococco Resorts · Goa", "Custom furniture for lobbies and guest rooms; curtains, upholstery and leatherwork."],
      ["HomeStudio, Habitat Interiors and Best Buy · Hyderabad", "Architecture and interiors for furniture and furnishings showrooms."],
      ["Chandubhai Jewellery Mall · Hyderabad", "Architecture and interiors."],
      ["Adani Wilmar Application Technology Centre · Hyderabad", "Office interiors."],
      ["MIDHANI and TRIFED offices · Hyderabad", "Office interiors."],
      ["Fat Pigeon, La Calypso, Filmy Junction and Spoil · Hyderabad", "Project-specific custom seating, furniture supply and, where commissioned, refurbishment."],
    ],
  },
  {
    title: "Institutional, educational and cultural",
    intro: "Campuses, schools, universities, museums, hospitals and places of assembly, with architecture, landscape and interiors brought together according to each institution’s programme.",
    projects: [
      ["Shanti Sarovar · Brahma Kumaris South India Campus · Hyderabad", "Thirty-five-acre green campus, landscape and architecture for reception, training, meditation, auditorium, seminar, residential, dining and large-congregation facilities."],
      ["Jawaharlal Nehru Technological University · Hyderabad", "Campus development plan and design of important buildings."],
      ["Osmania University · Hyderabad", "Architecture, interiors, landscape and mural work across NERTU, the Science Faculty Library, Pedagogy Block and College of Engineering teaching spaces."],
      ["Visvesvaraya Regional College of Engineering / VNIT · Nagpur", "Architecture for postgraduate departments in Public Health Engineering, Metallurgical Engineering and Computer Science, and the Students’ Amenities Centre."],
      ["Froebel’s High School · Hyderabad", "Conservation of historic campus structures and architecture for a new academic block."],
      ["Vivek Vardhini Educational Society · Hyderabad", "Vivek Vardhini High School and proposed Institute of Technology."],
      ["Srisailam Devasthanam", "Architecture for the administrative office, VIP guest house, 100-room choultry and annadanam building."],
      ["AP State Museum · Hyderabad", "Restoration; architecture and interiors for a new extension."],
      ["AP State Archaeology Museum · Khammam", "Architecture and interior design."],
      ["Bhadrachalam Devasthanam Jewellery Museum · Andhra Pradesh", "Interior design."],
      ["Museums at Pillalamarri and Gun Foundry · Telangana", "Architecture and interiors at Pillalamarri; architecture for the Gun Foundry Museum centenary extension."],
    ],
  },
  {
    title: "Heritage conservation and adaptive reuse",
    intro: "Condition assessment, conservation planning, restoration guidance and adaptive reuse grounded in the material logic and cultural significance of each historic place.",
    projects: [
      ["Kachiguda Railway Station · Hyderabad", "Condition assessment and recommendations; tendering and bid selection; guidance for restoration using compatible lime-mortar and jack-arch systems."],
      ["Hill Fort Palace / Ritz Hotel · Hyderabad", "Adaptive-reuse interior design, landscape design and condition assessment."],
      ["Raj Bhavan Durbar Hall · Hyderabad", "Condition assessment; conservation-led interiors; renewed and antique-styled furniture; ceilings, wall panelling and flooring."],
      ["Alampur Tourism Infrastructure Development Plan", "Regional and temple-precinct planning, Sangameshwara Temple and Tungabhadra riverfront proposals, visitor amenities and an architectural fact-file for the region."],
      ["Princess Esin Women’s Educational Centre · Purani Haveli, Hyderabad", "Condition assessment and conservation recommendations."],
      ["Khusro Manzil · Hyderabad", "Detailed project report, guidance for Grade III heritage listing and architectural conservation."],
      ["Golden Threshold / Sarojini Naidu School for Fine Arts · Hyderabad", "Architectural-conservation proposal, selected among four finalists in an invited competition."],
    ],
  },
  {
    title: "Urban design, planning and infrastructure",
    intro: "Work at the scale of settlements, transport, public space and regional systems, from architectural studies to planning and mobility advice.",
    projects: [
      ["Narasimhapuram Township · Andhra Pradesh", "Architecture for the rehabilitation settlement of 20,000 people displaced by coal mining at Ramagundam–Godavarikhani."],
      ["PVNR / HUDA Elevated Expressway · Hyderabad", "Architectural design visualisation for the piers and undercarriage."],
      ["DWACRA Shopping and Children’s Park · Hyderabad", "Front-space development for Lalitha Kala Thoranam and design guidelines."],
      ["Nagpur Metropolitan Planning Region Development Plan", "Traffic and transportation study; participation as a non-governmental expert."],
      ["Harduaganj Thermal Power Plant · Uttar Pradesh", "Design for the Stage II extension."],
      ["Matatila Hydroelectric Project · Uttar Pradesh", "Architectural design."],
      ["Damodar Valley Regional Plan", "Traffic and transportation study for the Middle Damodar Region."],
    ],
  },
];

const portraitAssets = new Set([
  "amara-01", "amara-02", "amara-03", "amara-04", "amara-05",
  "atithi-02", "atithi-06", "atithi-07",
  "janwada-03", "janwada-06", "janwada-08", "janwada-09",
  "janwada-v2-06", "janwada-v2-07", "janwada-v2-08", "janwada-v2-09",
  "lalitha-05", "lalitha-06", "lalitha-v2-04",
  "mla-03", "mla-06", "mla-09", "museum-01", "other-res-02",
  "ravi-04", "ravi-06", "shanti-01", "shanti-02", "smit-03", "smit-04", "smit-08", "thyagraj-06",
]);

const image = (name, alt, eager = false, cls = "") => name.endsWith(".svg") ? `
  <picture class="${cls}"><img src="/images/${name}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>` : `
  <picture class="${cls}">
    <source media="(max-width: 760px)" srcset="/images/${name}-small.webp">
    <img src="/images/${name}.webp" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
  </picture>`;

const header = (current = "") => `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <a class="brand" href="/" aria-label="Urban Arts home"><img class="brand-logo" src="/urban-arts-logo.png" width="512" height="512" alt=""><span class="brand-name">URBAN ARTS<small>Architecture • Interiors • Landscape</small></span></a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span class="sr-only">Menu</span></button>
  <nav id="site-nav" aria-label="Main navigation">
    <a ${current === "work" ? 'aria-current="page"' : ""} href="/work/">Work</a>
    <a ${current === "ongoing" ? 'aria-current="page"' : ""} href="/ongoing/">Ongoing</a>
    <a ${current === "practice" ? 'aria-current="page"' : ""} href="/practice/">Practice</a>
    <a ${current === "contact" ? 'aria-current="page"' : ""} href="/contact/">Contact</a>
  </nav>
</header>`;

const footer = `
<footer class="site-footer">
  <p class="footer-primary"><strong>URBAN ARTS</strong><span> • Architecture • Interiors • Landscape • Urban Design • Conservation • Since 1978</span><br><span class="footer-links"><a href="https://maps.google.com/?q=Ashoka+Plaza+Masab+Tank+Hyderabad">Locate Us on Map</a> • <a href="mailto:info@urbanarts.co.in">Email Us</a> • <a href="https://wa.me/917702211162">WhatsApp Us</a></span></p>
  <p class="copyright">© ${new Date().getFullYear()} Urban Arts | 301, Ashoka Plaza, Masab Tank, Hyderabad, 500004 IN</p>
</footer>`;

function layout({ title, description, body, current = "", className = "", canonicalPath = "/" }) {
  const canonical = `${siteUrl}${canonicalPath}`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website">
<meta name="theme-color" content="#171815">
<link rel="icon" type="image/png" href="/urban-arts-logo.png"><link rel="stylesheet" href="/style.css?v=${assetVersion}">
</head><body class="${className}">${header(current)}<main id="main">${body}</main>${footer}<script src="/site.js?v=${assetVersion}" defer></script></body></html>`;
}

const projectCard = (p, index = 0) => `<article class="project-card reveal" style="--delay:${index * 70}ms">
  <a href="/projects/${p.slug}/">${image(p.images[0], p.alt[0])}<div class="project-card-copy"><p>${p.eyebrow}</p><h3>${p.title}</h3><span>View project</span></div></a>
</article>`;

const selectedHomeProjects = [
  { project: residential.find((p) => p.slug === "kompally-residence"), image: "lalitha-04", alt: "Landscaped garden at Kompally Residence" },
  { project: residential.find((p) => p.slug === "brr-residence"), image: "mla-08", alt: "Stone tower and planted courtyard at BRR Residence" },
  { project: residential.find((p) => p.slug === "ravi-residence"), image: "ravi-01", alt: "Warm living room at Ravi Residence" },
  { project: wider.find((p) => p.slug === "atithi-inn"), image: "atithi-08", alt: "Chettinad-inspired banquet interior at Atithi Inn" },
];

const sliderCard = ({ project, image: imageName, alt }, index) => `<article class="slider-card" id="selected-work-slide-${index + 1}">
  <a href="/projects/${project.slug}/">${image(imageName, alt)}<div class="slider-card-copy"><p>${project.eyebrow}</p><h3>${project.title}</h3></div></a>
</article>`;

const home = layout({
  title: "Urban Arts",
  description: "Urban Arts is a Hyderabad architecture and interior design practice established in 1978, working from furniture and homes to institutions, conservation and urban design.",
  body: `
  <section class="hero">
    <div class="hero-copy reveal"><h1>From a humble chair to the scale of a township.</h1><p>Scale changes; the obligation does not. We look for conceptual clarity, a balance of form and function, and a design particular to its people, place and making.</p><div class="hero-actions"><a class="button" href="/work/">View all work</a><a class="text-link" href="/contact/">Discuss a project</a></div></div>
    <div class="hero-image">${image("lalitha-04", "Landscaped residential garden with timber pavilion", true)}</div>
    <p class="hero-caption">Kompally Residence · Interiors and landscape</p>
  </section>
  <section class="intro-band home-intro"><p>Urban Arts has practised in Hyderabad since 1978. Across generations, the studio has moved between architecture, interiors, furniture, landscape, conservation and city-scale work—each discipline informing the others.</p><a class="text-link" href="/practice/">About the practice</a></section>
  <section class="section selected-work" aria-labelledby="selected-work-title">
    <div class="section-head slider-heading"><div><h2 id="selected-work-title">Selected work</h2></div><div class="slider-actions"><button class="slider-button slider-prev" type="button" aria-label="Show previous project">←</button><button class="slider-button slider-next" type="button" aria-label="Show next project">→</button><a class="text-link" href="/work/">View all work</a></div></div>
    <div class="project-slider" data-project-slider tabindex="0" aria-label="Selected projects">${selectedHomeProjects.map(sliderCard).join("")}</div>
  </section>
  <section class="home-feature developer-feature">
    <div class="home-feature-media">${image("amara-01", "Living room at Amara Model Homes")}</div>
    <div class="home-feature-copy"><p class="kicker">For residential developers</p><h2>A model home should make the plan intelligible.</h2><p>We use furniture, light, storage, material and circulation to help prospective residents understand how a home will actually work—not merely how it can be styled for a photograph.</p><a class="text-link" href="/projects/amara-model-homes/">See model-home work</a></div>
  </section>
  <section class="home-feature ongoing-feature">
    <div class="home-feature-media">${image("janwada-v2-01", "Design visualisation of Janwada Farmhouse at dusk")}</div>
    <div class="home-feature-copy"><p class="kicker">Presently ongoing · Design visualisation</p><h2>Janwada Farmhouse</h2><p>A long water court organises the farmhouse. Rooms, planted courts and deep roofs alternate between openness, shade and retreat.</p><a class="text-link" href="/projects/janwada-farmhouse/">View the ongoing project</a></div>
  </section>`,
});

const workPage = layout({
  title: "Selected Work · Urban Arts",
  description: "Selected residential, interior, conservation, institutional and urban projects by Urban Arts.",
  current: "work",
  className: "work-page",
  canonicalPath: "/work/",
  body: `<section class="page-hero"><p class="kicker">Selected work</p><h1>Homes, interiors and a broader practice.</h1><p>This collection begins with <strong>houses</strong> and <strong>interior spaces</strong> realised by Urban Arts, before expanding into our wider work across <strong>hospitality, civic buildings, heritage conservation</strong> and <strong>urban spaces</strong>.</p></section><section class="section" id="residential"><div class="section-head"><div><p class="kicker">Residential</p><h2>Architecture, Interiors and Landscape</h2></div></div><div class="project-grid">${residentialProjects.map(projectCard).join("")}</div></section><section class="section ongoing-section" id="ongoing"><div class="section-head"><div><p class="kicker">Presently ongoing</p><h2>On the drawing board and on site</h2></div><a class="text-link" href="/ongoing/">View ongoing work</a></div><div class="project-grid ongoing-grid">${ongoing.map(projectCard).join("")}</div></section><section class="section section-dark" id="wider-practice"><div class="section-head"><div><p class="kicker">Wider practice</p><h2>Hospitality, institutions, heritage and the city</h2></div></div><div class="wider-grid">${wider.map(projectCard).join("")}</div></section>`,
});

const ongoingPage = layout({
  title: "Presently Ongoing · Urban Arts",
  description: "Current architecture and interior design work in development at Urban Arts.",
  current: "ongoing",
  className: "ongoing-page",
  canonicalPath: "/ongoing/",
  body: `<section class="page-hero"><p class="kicker">Presently ongoing</p><h1>Design evolves before it becomes building.</h1><p>Our drawings and visualisations are working instruments—not promises of a finished photograph. Through them, planning, structure, material, climate and landscape are tested against one another and resolved together.</p></section><section class="section"><div class="project-grid ongoing-grid">${ongoing.map(projectCard).join("")}</div></section>`,
});

const practicePage = layout({
  title: "Practice · Urban Arts",
  description: "Urban Arts is a Hyderabad design practice established in 1978, bringing architecture, interiors, furniture, landscape and the knowledge of making together.",
  current: "practice",
  canonicalPath: "/practice/",
  body: `<section class="page-hero practice-hero"><p class="kicker">The practice</p><h1>A design practice shaped across generations by rigorous inquiry and the knowledge of making.</h1><p>Its work draws on the complementary experience of architects Deoyani Shinde, Dr Pramod Shinde and Harshal Shinde, who leads the practice as Chief Architect.</p></section>
  <section class="practice-image practice-model">${image("practice-model", "Architectural model of the Guwahati Convention Centre")}</section>
  <section class="split-copy"><div><p class="kicker">Since 1978</p><h2>One practice, built across generations.</h2></div><div><p>Deoyani Shinde founded Urban Arts in 1978, establishing a collaborative practice across homes, campuses and institutional buildings. Dr Pramod Shinde extended that work through environmental design, planning, conservation and a sustained study of Hyderabad. After returning to the city in 2001, Harshal Shinde brought architecture into closer contact with interiors, furniture, fabrication and turnkey delivery.</p><p>Across nearly five decades and hundreds of commissions, the scale has changed—from furniture and private rooms to green campuses, heritage buildings and very large urban layouts. The obligation remains the same: to find conceptual clarity, balance form with function and give each project a character particular to its people, place and making.</p></div></section>
  <section class="practice-section services-section"><header><p class="kicker">What we do</p><h2>Architecture at every scale of use.</h2><p>A client may engage one discipline or ask Urban Arts to hold the project together from the first plan to the last installation.</p></header><div class="service-grid"><article><h3>Residential architecture</h3><p>Homes and residential developments shaped by climate, context and the patterns of daily life—from site planning and architecture to landscape and consultant coordination.</p></article><article><h3>Interiors and turnkey delivery</h3><p>Interiors treated as architecture at close range. Planning, services, lighting, materials and budgets are carried through drawings, site decisions and final installation.</p></article><article><h3>Kitchens, furniture and furnishings</h3><p>Ergonomics, material and making brought together in kitchens, wardrobes, cabinetry and loose furniture, combining precise factory production with bespoke hand finishing where each serves best.</p></article><article><h3>Hospitality and commercial spaces</h3><p>Hotels, restaurants, showrooms and workplaces developed around operations, guest experience, speed of delivery and the discipline of a defined budget.</p></article><article><h3>Institutional and campus design</h3><p>Complex programmes resolved at the scale of building, campus and landscape, with ecology and public use treated as part of the architectural brief.</p></article><article><h3>Conservation, planning and urban design</h3><p>Historic fabric and urban systems approached through measured study—condition, material, context and use—before repair, adaptation or new intervention is proposed.</p></article></div></section>
  <section class="practice-section team-section"><header><p class="kicker">Who we are</p><h2>Complementary experience, shared across the studio.</h2></header><div class="team-grid"><article><h3>Deoyani Shinde</h3><p class="role">Founder · Architect</p><p>Founded Urban Arts in 1978. Her work across residences, campuses and institutions is grounded in collaboration, clarity of planning, respect for nature and the comfort of the people who will inhabit a place.</p></article><article><h3>Dr Pramod Shinde</h3><p class="role">Urban Designer · Planner · Conservation Architect</p><p>An architect, educator and author working across environmental design, planning, conservation and Hyderabad’s architectural history. He was the first architect in India to receive a PhD in Architecture, in Environmental Design from IIT Kharagpur.</p></article><article><h3>Harshal Shinde, MS Arch</h3><p class="role">Chief Architect</p><p>Leads the practice across architecture, interiors, furniture and implementation, joining design development to a close understanding of materials, manufacturing and the realities of the building site.</p></article><article><h3>Er Sudhir Shinde</h3><p class="role">Structural Engineer</p><p>Provides the practice’s in-house structural engineering capability, bringing structural logic into direct conversation with architectural design and construction.</p></article></div></section>
  <section class="practice-section principal-section"><header><p class="kicker">Chief Architect</p><h2>Architecture, interiors and the intelligence of making.</h2></header><div class="principal-grid"><figure class="principal-media">${image("harshal-profile", "Architect Harshal Shinde seated on broad outdoor steps")}</figure><div class="principal-copy"><p>Harshal Shinde studied architecture in Hyderabad before completing his MS Arch at the University of Cincinnati. He worked with Otis Koglin Wilson Architects in Chicago and returned to join Urban Arts in 2001. Since then, his work has included hundreds of turnkey interior projects alongside architecture, adaptive reuse, sustainability, emergency architecture and rapid housing.</p><p>In 2006, Harshal and Anita Shinde began a furniture venture that grew from bespoke work into advanced manufacturing and four retail outlets. Harshal developed a method combining factory-made woodwork with bespoke hand finishing, reducing installation that traditionally took three to four months to approximately two to three weeks. That experience continues to inform the studio: machine precision is used where repetition and control matter; hand skill remains indispensable for fitting, finishing and the particularities of a site.</p><p>Alongside practice, Harshal has served as Director of the JNIAS School of Planning &amp; Architecture at JNAFA University and as a frequent juror at schools of architecture. He was the youngest architect to present a refereed paper at an international conference of the Association of Collegiate Schools of Architecture.</p><p>Photography, travel, writing and painting are not presented as a separate creative persona; they are other ways of looking closely, recording context and testing an idea.</p></div></div></section>
  <section class="practice-section experience-section"><header><p class="kicker">Project experience</p><h2>A record extending across hundreds of commissions.</h2><p>The selected work pages show projects in depth. The experience register records more of the practice’s breadth while retaining the precise role Urban Arts held in each commission.</p></header><div class="experience-preview"><p>Homes and residential development · Interiors and turnkey delivery · Hospitality, retail and workplaces · Institutional and cultural buildings · Heritage conservation · Urban design and infrastructure</p><a class="button" href="/experience/">View project experience</a></div><p class="client-note"><strong>Selected clients and institutions include</strong> private homeowners and residential developers, South Central Railway, the Government of Telangana, the University of Hyderabad, Brahma Kumaris, Adani Wilmar, MIDHANI and TRIFED.</p></section>
  <section class="practice-section recognition-section"><header><p class="kicker">Recognition</p><h2>Recent awards.</h2></header><div class="awards-grid"><article><time>2021</time><h3>Häfele Kitchen Ideas Design Challenge</h3><p>Open Kitchen, Built Category · Winner, South Zone · Runner-up, All India. Awarded for the design and execution of the Kompally Residence kitchen.</p></article><article><time>2020</time><h3>IGBC Green Champion Award</h3><p>Shanti Sarovar · “Pioneering Institution in Sensitising the Masses by Going Green,” recognising the 35-acre green campus design.</p></article><article><time>2019</time><h3>IIA Madhav Achwal Gold Medal</h3><p>Awarded by the Indian Institute of Architects to Dr Pramod Shinde.</p></article></div></section>
  <section class="approach-section">
    <header class="approach-heading"><p class="kicker">Design approach</p><h2>Every project has a story.</h2><p>Research and collaboration help us discover the most truthful way to tell it.</p></header>
    <figure class="approach-graphic approach-sketch">${image("practice-sketch", "Hand-drawn architectural concept and detail studies from the Urban Arts archive")}<figcaption>Concept and detail studies · Urban Arts archive</figcaption></figure>
    <div class="approach-intro"><p>We look for the project’s DNA: the relationship between its physical and cultural context, the lives it must hold and the means by which it can be made. Research, environmental responsibility, traditional craft and contemporary fabrication are not separate themes; they are resources brought into one line of thought.</p><blockquote>For us, giving form and imparting meaning are intrinsically intertwined.</blockquote></div>
    <div class="approach-steps"><article><span>01</span><h3>Listen</h3><p>Trust and openness come first. We listen for the client’s mission, core values, priorities and constraints before drawing conclusions.</p></article><article><span>02</span><h3>Research &amp; learn</h3><p>We delve into place, precedent, climate, material and use, looking for associations that belong to this project rather than to a generic style.</p></article><article><span>03</span><h3>Distil &amp; decide</h3><p>A fuzzy concept is tested through repeated drawings, models and conversations until the project’s defining idea becomes precise.</p></article><article><span>04</span><h3>Create</h3><p>That storyline becomes a working instrument, guiding decisions from planning and structure to light, furniture, fabrication and the final detail.</p></article></div>
  </section>`,
});

const experienceCategory = (section, index) => `<section class="experience-category" aria-labelledby="experience-${index + 1}">
  <header><p class="kicker">${String(index + 1).padStart(2, "0")}</p><h2 id="experience-${index + 1}">${section.title}</h2><p>${section.intro}</p></header>
  <dl class="experience-list">${section.projects.map(([project, scope]) => `<div><dt>${project}</dt><dd>${scope}</dd></div>`).join("")}</dl>
</section>`;

const experiencePage = layout({
  title: "Project Experience · Urban Arts",
  description: "A selected register of Urban Arts projects across homes, interiors, hospitality, institutions, conservation, planning and urban infrastructure.",
  current: "practice",
  className: "experience-page",
  canonicalPath: "/experience/",
  body: `<section class="page-hero experience-hero"><p class="kicker">Project experience</p><h1>Covering nearly five decades of practice, our portfolio is categorised by scope.</h1><p>Below is a representative selection of our projects by type, clearly outlining the specific role that Urban Arts was engaged to undertake for each.</p></section>
  <nav class="experience-index" aria-label="Experience categories">${experienceSections.map((section, index) => `<a href="#experience-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span>${section.title}</a>`).join("")}</nav>
  <div class="experience-register">${experienceSections.map(experienceCategory).join("")}</div>
  <section class="experience-closing"><p>For experience related to a particular building type, location or service, speak to the studio.</p><a class="button" href="/contact/">Discuss a project</a></section>`,
});

const contactPage = layout({
  title: "Contact · Urban Arts",
  description: "Start a conversation with Urban Arts about a room, home, hotel, campus, landscape, conservation problem or urban project.",
  current: "contact",
  canonicalPath: "/contact/",
  body: `<section class="contact-page">
    <div><p class="kicker">Contact</p><h1>Start with a conversation.</h1><p>A room, a home, a hotel, a campus or a conservation problem: tell us what needs to change, what must remain and where the project presently stands.</p></div>
    <div class="contact-list"><article><p class="kicker">Call</p><a href="tel:+919494454393">+91 94944 54393</a><a href="tel:+919704166630">+91 97041 66630</a></article><article><p class="kicker">Write</p><a href="mailto:info@urbanarts.co.in">info@urbanarts.co.in</a><a href="https://wa.me/917702211162?text=Hello%20Urban%20Arts%2C%20I%20would%20like%20to%20discuss%20a%20project.">WhatsApp · +91 77022 11162</a></article><article><p class="kicker">Visit</p><p>301 Ashoka Plaza<br>Masab Tank<br>Hyderabad, Telangana 500004</p><a href="https://maps.google.com/?q=Ashoka+Plaza+Masab+Tank+Hyderabad">Locate Us on Map</a></article></div>
  </section>
  <section class="careers-section">
    <div><p class="kicker">Jobs &amp; training apprenticeships</p><h2>We put real effort into training tomorrow’s architects.</h2></div>
    <div class="careers-copy"><p>Our team is a select group of talented architects who take personal ownership of their work. We do not cultivate a culture of long hours or late nights. That helps us stay focused on delivering what is required—and we strongly believe that happy designers create happy designs.</p><p>We enjoy working alongside people with diverse interests and backgrounds. If you are self-motivated, communicate clearly and have a portfolio you are proud of, come experience a research-oriented architecture practice.</p><a class="text-link" href="mailto:info@urbanarts.co.in?subject=Jobs%20and%20training%20apprenticeships%20at%20Urban%20Arts">Send us a link to your work</a></div>
  </section>`,
});

function projectChapters(p) {
  if (!p.chapters) return "";
  return p.chapters.map((chapter) => {
    const copy = chapter.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
    const media = chapter.images.map((item) => `<figure class="project-chapter-image ${item.wide ? "chapter-wide" : ""} ${item.portrait ? "chapter-portrait" : ""}">${image(item.name, item.alt)}${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}</figure>`).join("");
    return `<section class="project-chapter"><div class="project-chapter-copy"><p class="kicker">${chapter.kicker}</p><h2>${chapter.title}</h2><div class="project-chapter-text">${copy}${chapter.quote ? `<blockquote>${chapter.quote}</blockquote>` : ""}</div></div><div class="project-chapter-gallery">${media}</div></section>`;
  }).join("");
}

function projectPage(p) {
  const renderSet = new Set(p.renderImages || []);
  const gallery = p.images.slice(1).map((name, i) => {
    const caption = p.captions?.[i + 1] || (renderSet.has(name) ? "Design visualisation" : "");
    const orientation = portraitAssets.has(name) ? "gallery-portrait" : "gallery-landscape";
    return `<figure class="gallery-item ${orientation}">${image(name, p.alt[i + 1], i === 0)}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  }).join("");
  return layout({
    title: `${p.title} · Urban Arts`,
    description: p.intro,
    current: "work",
    className: "project-page",
    canonicalPath: `/projects/${p.slug}/`,
    body: `<article><header class="project-hero"><p class="kicker">${p.eyebrow}</p><h1>${p.title}</h1><p>${p.intro}</p><dl><div><dt>Status</dt><dd>${p.status}</dd></div>${p.role ? `<div><dt>Urban Arts role</dt><dd>${p.role}</dd></div>` : ""}<div><dt>Scope</dt><dd>${p.scope}</dd></div>${p.award ? `<div class="award-row"><dt>Recognition</dt><dd>${p.award}</dd></div>` : ""}</dl></header><div class="project-lead project-lead-natural ${portraitAssets.has(p.images[0]) ? "project-lead-portrait" : ""}">${image(p.images[0], p.alt[0], true)}</div><section class="project-story"><p class="kicker">Project note</p><p>${p.note}</p></section>${p.chapters ? projectChapters(p) : `<section class="gallery gallery-natural">${gallery}</section>`}<nav class="project-next" aria-label="Project navigation"><a href="/work/">All selected work</a><a href="/contact/">Discuss a project</a></nav></article>`,
  });
}

async function page(file, html) {
  const target = path.join(out, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, "public"), out, { recursive: true });
await cp(path.join(root, "src/style.css"), path.join(out, "style.css"));
await cp(path.join(root, "src/site.js"), path.join(out, "site.js"));
await page("index.html", home);
await page("work/index.html", workPage);
await page("ongoing/index.html", ongoingPage);
await page("practice/index.html", practicePage);
await page("experience/index.html", experiencePage);
await page("contact/index.html", contactPage);
for (const p of projects) await page(`projects/${p.slug}/index.html`, projectPage(p));
await page("404.html", layout({ title: "Page not found · Urban Arts", description: "The page could not be found.", body: '<section class="page-hero"><p class="kicker">404</p><h1>This page has moved.</h1><p><a class="button" href="/work/">View selected work</a></p></section>' }));

const redirects = {
  "about.html": "/practice/", "about-deoyani-shinde.html": "/practice/", "about-harshal-shinde.html": "/practice/", "about-pramod-shinde.html": "/practice/",
  "approach.html": "/practice/", "contact.html": "/contact/", "type-housing.html": "/work/#residential", "type-interiors.html": "/work/#residential",
  "type-conservation.html": "/work/#wider-practice", "type-institutional.html": "/work/#wider-practice", "type-urban-design.html": "/work/#wider-practice",
  "type-furniture.html": "/work/", "type-hospitality.html": "/work/#wider-practice", "type-retail.html": "/work/#wider-practice", "project-institutional-shanti-sarovar.html": "/projects/shanti-sarovar/"
};
for (const [file, destination] of Object.entries(redirects)) await page(file, `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${siteUrl}${destination}"><title>Moved · Urban Arts</title><a href="${destination}">Continue to Urban Arts</a>`);

await page("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
const urls = ["/", "/work/", "/ongoing/", "/practice/", "/experience/", "/contact/", ...projects.map(p => `/projects/${p.slug}/`)];
await page("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${siteUrl}${u}</loc></url>`).join("")}</urlset>`);
console.log(`Built ${urls.length} pages in ${out}`);
