import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, "dist");
const siteUrl = "https://urbanarts.co.in";
const assetVersion = "20261002-02";
const brandTitle = "Urban Arts Architects, Hyderabad";
const buildDate = new Date().toISOString().slice(0, 10);

const residential = [
  {
    slug: "kompally-residence",
    title: "Kompally Residence",
    eyebrow: "Residence · Interiors and landscape · Hyderabad",
    status: "Completed",
    year: "Interiors 2020 · Landscape 2021",
    location: "Kompally, Hyderabad",
    client: "Private client",
    role: "Design + build",
    scope: "Interior architecture · Kitchen design · Furniture · Landscape · Turnkey implementation",
    scale: "5,000 sq ft interiors · 2,500 sq ft garden",
    award: "Häfele Kitchen Ideas Design Challenge 2021 · Winner, South Zone · Runner-up, All India · Open Kitchen, Built Category",
    intro: "At Kompally, the kitchen is not backstage, and the garden is no longer something the house turns its back on. Urban Arts first redesigned the kitchen and master bedroom of this family home, and then the front garden that the original house had ignored.",
    note: "The interior and landscape were undertaken as two closely observed transformations of an existing home: one draws family life into an open kitchen, while the other gives an overlooked garden reasons to be entered and used.",
    images: ["lalitha-04"],
    alt: ["Landscaped garden with curving paths and a timber pavilion at Kompally Residence"],
    chapters: [
      {
        kicker: "Interiors · 2020",
        title: "The kitchen as a social room.",
        paragraphs: [
          "The redesign opened the former kitchen to the dining and living areas, so that the three spaces work together. A large central island organises food preparation, storage and informal meals, making the kitchen a place where family life gathers rather than a separate service room.",
          "The design sets tradition beside contemporary living, on the premise that the two need not exclude each other. Concrete, brass, walnut, lacquer, glass and stone are combined without disguising their differences. The result is durable, classic in character and contemporary in finish, with enough variety to reward a close look at every surface.",
          "Brass is the connecting thread. Custom-designed hardware carries geometric patterning across the skirting, entrance borders, shutters and pulls. It recalls the metalwork of older kitchens, but against white and blue-grey surfaces it reads as contemporary rather than period.",
          "Quartz on the countertops and dado gives the calm of Italian marble with greater durability, and forms a quiet backdrop to everything around it. Inside the cabinetry, walnut adds a dark, finely grained warmth. Technology, craftsmanship and everyday use are resolved as parts of one interior.",
          "The kitchen was the South Zone winner and the All India runner-up in the Häfele Kitchen Ideas Design Challenge 2021, Open Kitchen, Built Category."
        ],
        images: [
          { name: "lalitha-kitchen-opening.jpg", alt: "Dining room opening directly into the white and blue-grey kitchen", wide: true },
          { name: "lalitha-v2-02", alt: "Award-winning open kitchen with white and blue-grey cabinetry and island" },
          { name: "lalitha-v2-04", alt: "Kitchen island with custom brass and glass shelving", portrait: true },
          { name: "lalitha-kitchen-pull.jpg", alt: "Custom brass pull recessed into blue-grey cabinetry" },
          { name: "lalitha-kitchen-quartz.jpg", alt: "Quartz worktop, fluted glass and brass cabinet trim", portrait: true },
          { name: "lalitha-kitchen-inlay.jpg", alt: "Geometric brass inlay detail used through the kitchen" }
        ]
      },
      {
        kicker: "Private rooms",
        title: "The same attention, beyond the kitchen.",
        paragraphs: [
          "The master bedroom continues the interior commission through custom joinery, furniture and wall treatments. A restrained base allows colour, pattern and crafted details to give the room its individual character without separating it from the material language of the house."
        ],
        images: [
          { name: "lalitha-v2-05", alt: "Master bedroom with custom furniture and layered lighting", wide: true },
          { name: "lalitha-v2-06", alt: "Upholstered bed facing full-height custom joinery" },
          { name: "lalitha-v2-07", alt: "Detailed green wall panelling and concealed storage" }
        ]
      },
      {
        kicker: "Landscape · 2021",
        title: "The garden as a living room.",
        paragraphs: [
          "The brief was modest: an uncluttered, low-maintenance garden on the east side of the house, with a few feature elements, laid out in accordance with Vastu.",
          "The real problem lay elsewhere. The builder had provided a garden of reasonable size, but no window looked onto it and no door led into it. The first-floor balconies cut off even the view from the rooms above. The house had been designed as though the garden did not exist. Society rules prevented any new openings in the front elevation, so the garden had to find its way back into the house by other means.",
          "The design gives it reasons to be entered and used. A timber pavilion, curving paths and shaded corners make places to sit after yoga, to gather friends in the evening, or to spend a Sunday morning as a family room without a roof. Most interiors surround living people with inanimate things; a garden reverses that. Here, it draws the house outward.",
          "The design process is described in greater depth in <a class=\"inline-link\" href=\"https://shinde.co/how-a-design-project-starts/\" target=\"_blank\" rel=\"noopener\">How a Design Project Starts</a> on Harshal Shinde’s journal, <em>The Situated Eye</em>."
        ],
        quote: "Making a garden is designing with living forms.",
        images: [
          { name: "lalitha-05", alt: "Timber pavilion reached by curved garden paths", portrait: true },
          { name: "lalitha-06", alt: "Shaded garden edge with curved steps and sculpted wall", portrait: true }
        ]
      }
    ],
  },
  {
    slug: "amara-model-homes",
    title: "Amara Model Homes",
    eyebrow: "Residential development · Model homes · Shamshabad",
    status: "Completed",
    year: "2025",
    location: "Shamshabad, Hyderabad",
    client: "Deevyashakti Realty",
    role: "Design + build",
    scope: "Model-home interiors · Furniture · Styling · Turnkey implementation · Designs for three further styles",
    scale: "Four model homes · approx. 2,000–2,200 sq ft each",
    intro: "Four model homes for a 450-unit development at Shamshabad, each designed for a different buyer, and all taken from bare shell to fully furnished, move-in condition in six weeks.",
    note: "A model home has to do more than look finished. It must make an unbuilt life legible, so that a prospective buyer can see how the apartment will actually be lived in.",
    images: ["amara-01"],
    alt: ["Model-home living room in muted green"],
    chapters: [
      {
        kicker: "Four model homes",
        title: "Four homes for four buyers.",
        paragraphs: [
          "Deevyashakti Realty’s buyers would arrive with different budgets and different tastes, so Urban Arts designed four model homes to meet them, each of approximately 2,000 to 2,200 sq ft.",
          "Two are luxury homes: one neo-classical, the other contemporary in a clean, straight-line idiom. The third is in a style we call ethno-modern. It is a contemporary interior with Indian ethnic elements, weighted towards the contemporary, so that the home carries an Indian character without the upkeep that a heavily ornamented interior demands. The fourth is designed for buyers who purchase to let: an economical, hard-wearing interior, ready for tenants from the day of handover.",
          "Across all four, furniture, storage, light and circulation are used to make dimensions, movement and daily occupation immediately understandable, rather than merely to stage a photogenic interior."
        ],
        images: [
          { name: "amara-02", alt: "Dining space beneath a double-height void" },
          { name: "amara-03", alt: "Neutral bedroom with illuminated wardrobe", portrait: true },
          { name: "amara-04", alt: "Blue model-home bedroom", portrait: true },
          { name: "amara-05", alt: "Model-home passage and living room", portrait: true }
        ]
      },
      {
        kicker: "Turnkey delivery",
        title: "Four homes, delivered in parallel.",
        paragraphs: [
          "All four homes started at the same time, from bare shell. The ethno-modern and to-let homes were completed in a month and the two luxury homes in six weeks. Within six weeks of starting, all four were fully furnished and ready to move into.",
          "That pace came from the studio’s way of making. Cabinetry and woodwork were produced in the factory while work proceeded on site, then fitted and finished by hand. Machine precision was used where repetition and control mattered, and hand skill for the fitting, finishing and particularities of each apartment."
        ],
        images: []
      },
      {
        id: "further-styles",
        kicker: "Design options",
        title: "Three further styles.",
        paragraphs: [
          "Alongside the built homes, Urban Arts developed designs for three further interior styles, shown here as visualisations. They were offered to buyers as interior options, extending the choice beyond the four model homes."
        ],
        images: [],
        sliderImages: [
          { name: "amara-render-01", alt: "Visualisation of a light-filled model-home living and dining space", caption: "Living and dining" },
          { name: "amara-render-02", alt: "Visualisation of a child’s bedroom with study and display storage", caption: "Child’s bedroom" },
          { name: "amara-render-03", alt: "Visualisation of a terracotta-toned master bedroom", caption: "Master bedroom" },
          { name: "amara-render-04", alt: "Visualisation of a symmetrical living room with full-height glazing", caption: "Living room" },
          { name: "amara-render-05", alt: "Visualisation of a warm ochre and white kitchen", caption: "Kitchen" },
          { name: "amara-render-06", alt: "Visualisation of a restrained master bedroom with integrated storage", caption: "Master bedroom" },
          { name: "amara-render-07", alt: "Visualisation of an open-plan living, dining and kitchen space", caption: "Living, dining and kitchen" }
        ]
      }
    ],
  },
  {
    slug: "thyagaraj-residence",
    title: "Thyagaraj Residence",
    eyebrow: "Residential interiors · Sainikpuri, Hyderabad",
    status: "Completed",
    year: "2024",
    location: "Sainikpuri, Hyderabad",
    client: "Private client",
    role: "Design + build",
    scope: "Interior architecture · Furniture · Turnkey implementation",
    intro: "The house had to be transformed without being altered. Existing tiled floors were to remain untouched; no wall could be moved, no plan opened up and no window added.",
    note: "Every change had to be made within the house as it stood. Mirrors, bespoke screens, cabinetry, wall treatments and furniture became the means by which its character and sense of space could change.",
    images: ["thyagraj-01"],
    alt: ["Living room with custom swing and patterned screen"],
    chapters: [
      {
        kicker: "The brief",
        title: "Vibrant, layered and made for a family that cooks.",
        paragraphs: [
          "The client wanted a vibrant, colourful home with a rich, multi-material palette. It was to be dense and layered to the point of exuberance, and closely interwoven with elements that celebrate the family’s South Indian heritage. It also had to suit an unusual household: everyone in the family, from the grandparents to the grandchildren, loves to cook.",
          "The kitchen was already open, and it became the centre of the house: a shared room around which three generations gather."
        ],
        images: [
          { name: "thyagraj-02", alt: "Open living spaces organised around the kitchen" },
          { name: "thyagraj-03", alt: "Orange and white open kitchen used by the whole family" }
        ]
      },
      {
        kicker: "The design approach",
        title: "Changing space without moving walls.",
        paragraphs: [
          "Elsewhere, mirrors and bespoke screens do the work that walls could not. The mirrors extend rooms that could not be enlarged. The screens are not applied decoration: they filter views, mark transitions between zones and allow connected spaces to keep a degree of enclosure.",
          "Custom cabinetry, wall treatments and furniture carry a common material language through the house. Variations in colour and detail keep that language from becoming uniform, so the home holds together without losing the density the client asked for."
        ],
        images: [
          { name: "thyagraj-04", alt: "Bedroom with full-height custom cabinetry" },
          { name: "thyagraj-05", alt: "Bedroom with a window-side study" },
          { name: "thyagraj-06", alt: "Dining area adjoining the open kitchen", portrait: true }
        ]
      }
    ],
  },
  {
    slug: "brr-residence",
    title: "BRR Residence",
    eyebrow: "Architecture · Interiors · Landscape · Banjara Hills",
    status: "Completed",
    year: "2002 · converted to a café in 2018",
    location: "Banjara Hills, Hyderabad",
    client: "Private client",
    role: "Design + build",
    scope: "Architecture · Interiors · Landscape · Turnkey implementation",
    scale: "Approx. 7,000 sq ft",
    intro: "A city house capable of another life. Originally designed by Urban Arts as the owner’s home, it was later converted into a café after the family moved to their farm.",
    note: "Deep verandahs, stone arcades and planted courts temper the climate and place semi-open space at the centre of the house. Rooms open onto this shaded framework rather than simply facing outward. Its later conversion into a café was not anticipated as a theme; it was made possible by the generosity and adaptability of the original residential plan.",
    images: ["mla-01", "mla-02", "mla-03", "mla-04", "mla-05", "mla-06", "mla-07", "mla-08", "mla-09"],
    alt: ["Stone courtyard and shaded verandahs at BRR Residence", "Landscaped courtyard with outdoor seating", "Arched stone verandah and stone floor", "Dining terrace framed by stone arches", "Courtyard elevation and shaded upper gallery", "Deep colonnaded passage through the residence", "BRR Residence and courtyard illuminated at night", "Stone tower rising above the planted courtyard", "Interior display and handcrafted lighting beneath a timber ceiling"],
  },
  {
    slug: "doctors-residence",
    title: "Doctors’ Residence",
    eyebrow: "Residential interiors · Jubilee Hills, Hyderabad",
    status: "Completed",
    year: "2025",
    location: "Jubilee Hills, Hyderabad",
    client: "Private client",
    role: "Design + build",
    scope: "Interior architecture · Custom cabinetry · Lighting · Turnkey implementation",
    scale: "2,800 sq ft",
    intro: "A home for two doctors, their two children and a frequently visiting extended family: open where it gathers people, and quiet where one of them works.",
    note: "The clients came with clear requirements and little time to spare. Their professional commitments meant that the brief had to be understood quickly and resolved decisively: the design was finalised in three meetings over three weeks, and the site works were completed in ten.",
    images: ["ravi-01"],
    alt: ["Warm living room with layered lighting at Doctors’ Residence"],
    chapters: [
      {
        kicker: "The brief",
        title: "A brief set by busy lives.",
        paragraphs: [
          "The clients wanted interiors that were elegant but easy to maintain, contemporary in character, with light-coloured walls and a few deliberate accents. With two children in the house, the youngest a toddler, they were also particular that no furniture detail should become a hazard.",
          "Edges and handles are rounded, tall units are anchored to walls and, where possible, to ceilings, and there is no glass at low level."
        ],
        images: [
          { name: "ravi-02", alt: "Open living and dining interior for a frequently visiting extended family" },
          { name: "ravi-03", alt: "Living room with a dark stone media wall" }
        ]
      },
      {
        kicker: "Planning for family and work",
        title: "Open for family, quiet for work.",
        paragraphs: [
          "The couple’s extended family lives in the city and visits often, so living, dining and circulation are treated as one continuous interior. Rather than divide the shared spaces with walls, the design uses furniture, ceiling planes, lighting and changes in material to mark out different territories within it. Purpose-built storage is absorbed into the architecture, keeping the main sequence open.",
          "Against the light walls, a few accents carry the character: a dark stone media wall, a black-and-white kitchen and a blue bedroom with custom joinery.",
          "One of the couple works largely from home, on work that demands sustained concentration. The large master bedroom made room for a dedicated workstation, set apart from the life of the house. It is planned for multiple screens under low, glare-free ambient light, in quiet."
        ],
        images: [
          { name: "ravi-04", alt: "Black and white residential kitchen", portrait: true },
          { name: "ravi-05", alt: "Blue children’s bedroom with custom joinery" },
          { name: "ravi-06", alt: "Dining area with a custom screen", portrait: true }
        ]
      }
    ],
  },
  {
    slug: "begumpet-apartment",
    title: "Begumpet Apartment",
    eyebrow: "Turnkey implementation · Begumpet, Hyderabad",
    status: "Completed",
    year: "2023",
    location: "Begumpet, Hyderabad",
    client: "Private client",
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
  intro: "Houses, interiors and furniture settings from across the residential practice, sharing recurring concerns: clarity of planning, furniture treated as architecture, and rooms that open to landscape.",
  note: "The selection moves between built interiors and architectural studies: clarity of planning, furniture treated as part of architecture, the character of materials and the relationship between rooms and landscape.",
  images: ["other-res-01", "other-res-02", "other-res-07", "other-res-04", "other-res-05", "other-res-06"],
  renderImages: ["other-res-01", "other-res-02"],
  captions: ["Cherlapally House · Design study", "Farmhouse · Courtyard study", "HomeStudio showroom · Furniture setting", "HomeStudio showroom · Living-room setting", "HomeStudio showroom · Bedroom setting", "HomeStudio showroom · Furniture detail"],
  alt: ["Design study for Cherlapally House", "Design study of a farmhouse courtyard and pool", "Geometric timber chairs arranged in the HomeStudio showroom", "Living-room setting with carved furniture in the HomeStudio showroom", "Bedroom setting with dark timber furniture in the HomeStudio showroom", "Upholstered chairs and settee against a deep red wall in the HomeStudio showroom"],
};

const residentialProjects = [
  "kompally-residence",
  "brr-residence",
  "amara-model-homes",
  "doctors-residence",
  "thyagaraj-residence",
  "begumpet-apartment",
].map((slug) => residential.find((project) => project.slug === slug)).concat(assortedResidential);

const janwadaFarmhouse = {
  slug: "janwada-farmhouse",
  title: "Janwada Farmhouse",
  eyebrow: "Presently ongoing · Janwada",
  status: "Design development · Construction expected to begin in early 2027",
  location: "Janwada, Hyderabad",
  client: "Private client",
  role: "Design",
  scope: "Architecture · Interiors · Landscape",
  scale: "3,000 sq yd site",
  description: "A low, horizontal farmhouse organised as a sequence of hospitality, landscape and retreat.",
  intro: "A low, horizontal farmhouse organised as a sequence of hospitality, landscape and retreat. A long water court, planted courts and deep roofs structure movement through the house, while a half-sunken entertainment level opens directly into the garden.",
  note: "The house is conceived less as a single object than as a sequence of changing atmospheres, with a long water court as its organising line.",
  images: ["janwada-v2-01"],
  alt: ["Design visualisation of the Janwada Farmhouse entrance at dusk"],
  chapters: [
    {
      kicker: "The organising idea",
      title: "A house as a sequence.",
      paragraphs: [
        "Shared spaces, glazed and open, look across water and landscape. Quieter rooms withdraw behind stone walls into planted courts and shaded edges. Between them, thresholds compress and release in turn, shifting light, sound, temperature and privacy as one moves through the house. Broad roofs temper Hyderabad’s sun throughout."
      ],
      images: [
        { name: "janwada-v2-02", alt: "Concept plan for Janwada Farmhouse", wide: true, caption: "Design visualisation" },
        { name: "janwada-v2-04", alt: "Long water court between glazed farmhouse wings", wide: true, caption: "Design visualisation" },
        { name: "janwada-v2-05", alt: "Twilight view of the north wing and stepped landscape", wide: true, caption: "Design visualisation" }
      ]
    },
    {
      kicker: "Shared and private life",
      title: "Hospitality at the centre.",
      paragraphs: [
        "Entertaining is the social heart of the house. Living, dining and cooking open onto the pool and garden, while a games lounge and bar occupy a darker, more intimate half-sunken level set into the terrain.",
        "Behind these spaces, a parallel service network lets food, housekeeping and staff move discreetly, without interrupting the life of the house. The private rooms are reached through quieter passages of landscape, where the architecture recedes and planting takes over."
      ],
      images: [
        { name: "janwada-v2-03", alt: "Rear courtyard and pool", wide: true, caption: "Design visualisation" },
        { name: "janwada-v2-06", alt: "Farmhouse bedroom opening to a private garden at twilight", portrait: true, caption: "Design visualisation" },
        { name: "janwada-v2-09", alt: "Half-sunken entertainment room opening to the landscape", portrait: true, caption: "Design visualisation" }
      ]
    },
    {
      kicker: "Presently ongoing",
      title: "Landscape and building, developed together.",
      paragraphs: [
        "Landscape, water and architecture are being developed together rather than as separate layers, and tested in drawings and visualisations as the design proceeds. The aim is a house that makes its presence felt on arrival, then gradually gives way to shade, water, planting and the rhythms of daily occupation."
      ],
      images: [
        { name: "janwada-v2-07", alt: "Bathroom opening to a planted court", portrait: true, caption: "Design visualisation" },
        { name: "janwada-v2-08", alt: "Second bathroom with a planted open-air court", portrait: true, caption: "Design visualisation" }
      ]
    }
  ],
};

const ongoing = [janwadaFarmhouse];

const wider = [
  {
    slug: "shanti-sarovar",
    title: "Shanti Sarovar",
    eyebrow: "Green campus · Institutional · Hyderabad",
    status: "Ongoing · 4 of 6 phases complete",
    year: "2002 onwards",
    location: "Gachibowli, Hyderabad",
    client: "Brahma Kumaris",
    role: "Architecture · Campus planning · Landscape",
    scope: "Green campus · Institutional buildings · Landscape rehabilitation",
    scale: "35 acres",
    award: "IGBC Green Champion Award 2020 · Pioneering Institution in Sensitising the Masses by Going Green",
    preserveImageRatios: true,
    intro: "A 35-acre institutional campus conceived not by erasing a damaged quarry, but by building in, over and around its boulders, cliffs, ravines and water-holding depressions.",
    note: "Brahma Kumaris asked Urban Arts to create its South India headquarters on a recently operational stone quarry in Gachibowli. The commission was therefore as much an act of land repair as one of architecture: a campus for spiritual learning and Rajyoga meditation had to emerge from ground visibly altered by years of extraction.",
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
          "The campus was planned to support spiritual learning, Rajyoga meditation, teaching, administration, accommodation and large public gatherings. Its principal components include a reception and information block; offices and staff rooms; eight 125-seat training halls; two 250-seat seminar halls; a library and reading room; a 3,500-seat auditorium; an art gallery and museum; a meditation hall; and dining and kitchen facilities for 2,000 people.",
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
    year: "2002",
    location: "Ameerpet, Hyderabad",
    role: "Design + project management",
    scope: "Architecture · Interior design · Furniture · MEP coordination",
    scale: "50 guest rooms",
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
    year: "2008–2018",
    location: "Kachiguda, Hyderabad",
    client: "South Central Railway",
    role: "Conservation consultant",
    scope: "Condition assessment · Tender documentation · Restoration guidance",
    intro: "Conservation planning and technical guidance for the repair of critically damaged slabs, walls and central domes at one of Hyderabad’s busiest historic landmarks.",
    note: "Kachiguda Railway Station was built in 1916 under Mir Osman Ali Khan, the seventh Nizam, and was declared a heritage structure in 2003. Working with South Central Railway and the Department of Archaeology, Urban Arts prepared a condition assessment, repair recommendations and tender documentation, then guided restoration using compatible lime mortar and jack-arch roofing systems. Parts approaching permanent failure were made safe without surrendering the construction logic of the original building.",
    images: ["kachiguda-01", "kachiguda-02"],
    alt: ["Historic Kachiguda Railway Station frontage", "Historic tower and façade details at Kachiguda Railway Station"],
  },
  {
    slug: "state-archaeology-museum",
    title: "AP State Archaeology Museum",
    seoTitle: "AP State Archaeology Museum (now Telangana State Archaeology Museum)",
    presentName: "Telangana State Archaeology Museum",
    eyebrow: "Museum restoration · Interiors and displays · Hyderabad",
    status: "Completed",
    location: "Hyderabad",
    client: "Department of Archaeology & Museums, Andhra Pradesh (now the Department of Heritage Telangana)",
    scope: "Restoration · Interior design · Display design",
    intro: "Restoration of the historic museum building, together with the design of its interiors and displays, so that the building and the collection it houses are read together.",
    note: "Urban Arts undertook the restoration of the existing museum building and the design of its interiors and displays. Display cases, lighting, circulation and architectural detail were coordinated so that the collection—not the apparatus around it—remains visually primary.",
    images: ["museum-01", "museum-02"],
    alt: ["State archaeology museum gallery interior", "Museum display gallery with integrated lighting"],
  },
  {
    slug: "pvnr-expressway",
    title: "PVNR Elevated Expressway",
    eyebrow: "Urban infrastructure · Hyderabad",
    status: "Completed",
    year: "2001–2002",
    location: "Hyderabad",
    client: "Hyderabad Urban Development Authority (HUDA)",
    scope: "Architectural design · Piers and undercarriage",
    intro: "The architectural design of the piers and underside of Hyderabad’s 11.6 km elevated expressway, drawn from the arches of Golkonda and the Qutb Shahi tombs.",
    note: "When the PVNR Expressway opened in 2009, it was India’s longest flyover. Its route cuts through the existing fabric of the city, where the structure is experienced most closely from the streets below.",
    images: ["pvnr-01"],
    alt: ["Long view of the completed PVNR Elevated Expressway"],
    chapters: [
      {
        kicker: "Infrastructure and the street",
        title: "A large insertion into a living city.",
        paragraphs: [
          "Motorists on the deck see little of the structure itself, but those beneath it live alongside it every day: drivers on the adjoining streets and people on foot. For them, the long, serpentine underside is the expressway, and its strangeness is felt at close range."
        ],
        images: [
          { name: "pvnr-03", alt: "Arcaded space beneath the completed expressway", wide: true },
          { name: "pvnr-04", alt: "Black-and-white view of the street beneath the expressway", wide: true }
        ]
      },
      {
        kicker: "Architectural language",
        title: "Familiar arches at a new scale.",
        paragraphs: [
          "In 2001–2002, Urban Arts designed the architectural form of the piers and undercarriage, the parts of the structure experienced from the street. Their curves are drawn from the arches of the Qutb Shahi tombs and Golkonda Fort.",
          "The intention was that a vast piece of modern infrastructure might feel familiar rather than alien, at a level below conscious recognition. The expressway was built as designed, and its piers carry that curve along the length of the route. The structural engineering lay with others."
        ],
        images: [
          { name: "pvnr-02", alt: "Photomontage comparing a Qutb Shahi arcade with the expressway underside", wide: true }
        ]
      },
      {
        kicker: "Design process",
        title: "An early digital model.",
        paragraphs: [
          "This was Harshal Shinde’s first large commission after returning from the United States. The expressway was modelled in SketchUp in 2001, within a year of the program’s first release."
        ],
        images: []
      }
    ],
  },
];

const projects = [...residentialProjects, ...ongoing, ...wider];

const experienceSections = [
  {
    title: "Homes and residential development",
    intro: "Individual houses, model homes, apartment interiors and larger residential layouts—often carried from architecture and planning through interiors, furniture, landscape and implementation.",
    projects: [
      ["BRR Residence · Banjara Hills, Hyderabad · 2002", "Architecture, interiors, landscape and turnkey implementation; originally a city home, later adapted as a café."],
      ["Kompally Residence · Hyderabad · 2020", "Interior architecture, award-winning open kitchen, custom furniture, landscape and turnkey implementation."],
      ["Amara Model Homes · Shamshabad · 2025", "Four model homes for Deevyashakti Realty: interiors, furniture, styling and turnkey implementation."],
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
      ["Atithi Inn · Ameerpet, Hyderabad · 2002", "Architecture for guest rooms, banquet and conference halls; interiors, MEP services, custom furniture and furnishings, retrofit of antique elements and project management."],
      ["Ullasa Rooftop Restaurant · Hyderabad", "Architecture, interiors, landscape, furniture and lighting design, custom wall treatments and project management."],
      ["Park Hyatt · Guest Rooms and Public Areas · Hyderabad", "Custom-manufactured furnishings, upholstery, curtains, blinds, wall coverings and selected floor coverings."],
      ["Hotel Quality Inn Pearl · Hyderabad", "Custom lobby furniture; curtains, upholstery and leatherwork for guest rooms."],
      ["Rococco Resorts · Goa", "Custom furniture for lobbies and guest rooms; curtains, upholstery and leatherwork."],
      ["HomeStudio, Habitat Interiors and Best Buy · Hyderabad", "Architecture and interiors for furniture and furnishings showrooms."],
      ["Chandubhai Jewellery Mall · Hyderabad", "Architecture and interiors."],
      ["Lakshmi Ceramics Showroom · Coimbatore, Tamil Nadu · 2016", "Interior design."],
      ["Kailas Marbles Showroom · Tiruppur, Tamil Nadu · 2017", "Interior design."],
      ["Adani Wilmar Application Technology Centre · Hyderabad", "Office interiors."],
      ["MIDHANI and TRIFED offices · Hyderabad", "Office interiors."],
      ["Fat Pigeon, La Calypso, Filmy Junction and Spoil · Hyderabad", "Project-specific custom seating, furniture supply and, where commissioned, refurbishment."],
    ],
  },
  {
    title: "Institutional, educational and cultural",
    intro: "Campuses, schools, universities, museums, hospitals and places of assembly, with architecture, landscape and interiors brought together according to each institution’s programme.",
    projects: [
      ["Shanti Sarovar · Brahma Kumaris South India Campus · Hyderabad · 2002 onwards", "Thirty-five-acre green campus, landscape and architecture for reception, training, meditation, auditorium, seminar, residential, dining and large-congregation facilities."],
      ["Jawaharlal Nehru Technological University · Hyderabad", "Campus development plan and design of important buildings."],
      ["Osmania University · Hyderabad", "Architecture, interiors, landscape and mural work across NERTU, the Science Faculty Library, Pedagogy Block and College of Engineering teaching spaces."],
      ["Visvesvaraya Regional College of Engineering / VNIT · Nagpur", "Architecture for postgraduate departments in Public Health Engineering, Metallurgical Engineering and Computer Science, and the Students’ Amenities Centre."],
      ["Froebel’s High School · Hyderabad", "Conservation of historic campus structures and architecture for a new academic block."],
      ["Vivek Vardhini Educational Society · Hyderabad", "Vivek Vardhini High School and proposed Institute of Technology."],
      ["Srisailam Devasthanam · Andhra Pradesh", "Architecture for the administrative office, VIP guest house, 100-room choultry and annadanam building."],
      ["AP State Archaeology Museum (now Telangana State Archaeology Museum) · Hyderabad", "Restoration of the museum building; interior and display design. For the Department of Archaeology & Museums, Andhra Pradesh (now the Department of Heritage Telangana)."],
      ["State Archaeology Museum · Khammam, Telangana (then Andhra Pradesh)", "Architecture and interior design. For the Department of Archaeology & Museums, Andhra Pradesh (now the Department of Heritage Telangana)."],
      ["Bhadrachalam Devasthanam Jewellery Museum · Telangana (then Andhra Pradesh)", "Interior design."],
      ["Museums at Pillalamarri and Gun Foundry · Telangana (then Andhra Pradesh)", "Architecture and interiors at Pillalamarri; architecture for the Gun Foundry Museum centenary extension."],
    ],
  },
  {
    title: "Heritage conservation and adaptive reuse",
    intro: "Condition assessment, conservation planning, restoration guidance and adaptive reuse grounded in the material logic and cultural significance of each historic place.",
    projects: [
      ["Kachiguda Railway Station · Hyderabad · 2008–2018", "Condition assessment and recommendations; tendering and bid selection; guidance for restoration using compatible lime-mortar and jack-arch systems."],
      ["Hill Fort Palace / Ritz Hotel · Hyderabad", "Adaptive-reuse interior design, landscape design and condition assessment."],
      ["Raj Bhavan Durbar Hall · Hyderabad", "Condition assessment; conservation-led interiors; renewed and antique-styled furniture; ceilings, wall panelling and flooring."],
      ["Alampur Tourism Infrastructure Development Plan · Telangana (then Andhra Pradesh)", "Regional and temple-precinct planning, Sangameshwara Temple and Tungabhadra riverfront proposals, visitor amenities and an architectural fact-file for the region."],
      ["Princess Esin Women’s Educational Centre · Purani Haveli, Hyderabad", "Condition assessment and conservation recommendations."],
      ["Khusro Manzil · Hyderabad", "Detailed project report, guidance for Grade III heritage listing and architectural conservation."],
      ["Golden Threshold / Sarojini Naidu School for Fine Arts · Hyderabad", "Architectural-conservation proposal, selected among four finalists in an invited competition."],
    ],
  },
  {
    title: "Urban design, planning and infrastructure",
    intro: "Work at the scale of settlements, transport, public space and regional systems, from architectural studies to planning and mobility advice.",
    projects: [
      ["Narasimhapuram Township · Telangana (then Andhra Pradesh)", "Architecture for the rehabilitation settlement of 20,000 people displaced by coal mining at Ramagundam–Godavarikhani."],
      ["PVNR / HUDA Elevated Expressway · Hyderabad · 2001–2002", "Architectural design of the piers and undercarriage, built as designed."],
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
    <source media="(max-width: 760px)" srcset="/images/${name.endsWith(".jpg") ? name.replace(/\.jpg$/, "-small.jpg") : `${name}-small.webp`}">
    <img src="/images/${name.endsWith(".jpg") ? name : `${name}.webp`}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
  </picture>`;

const header = (current = "") => `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <a class="brand" href="/" aria-label="Urban Arts home"><img class="brand-logo" src="/urban-arts-logo.png" width="512" height="512" alt=""><span class="brand-name">URBAN ARTS<small>Architecture • Interiors • Landscape</small></span></a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span class="sr-only">Menu</span></button>
  <nav id="site-nav" aria-label="Main navigation">
    <a ${current === "work" ? 'aria-current="page"' : ""} href="/work/">Work</a>
    <a ${current === "record" ? 'aria-current="page"' : ""} href="/project-record/">Project Record</a>
    <a ${current === "ongoing" ? 'aria-current="page"' : ""} href="/ongoing/">Ongoing</a>
    <a ${current === "practice" ? 'aria-current="page"' : ""} href="/practice/">Practice</a>
    <a ${current === "contact" ? 'aria-current="page"' : ""} href="/contact/">Contact</a>
  </nav>
</header>`;

const footer = `
<footer class="site-footer">
  <p class="footer-primary"><strong>URBAN ARTS</strong><span> • Architecture • Interiors • Landscape • Urban Design • Conservation • Since 1978</span><br><span class="footer-links"><a href="https://maps.google.com/?q=Ashoka+Plaza+Masab+Tank+Hyderabad">Locate Us on Map</a> • <a href="mailto:info@urbanarts.co.in">Email Us</a> • <a href="/project-record/">Project Record</a> • <a href="https://wa.me/917702211162">WhatsApp Us</a> • <a href="https://www.instagram.com/urban.arts.architects/" target="_blank" rel="noopener">Instagram</a></span></p>
  <p class="copyright">© ${new Date().getFullYear()} Urban Arts | 301, Ashoka Plaza, Masab Tank, Hyderabad, 500004 IN</p>
</footer>`;

// Social-sharing images are 1200 × 630 JPEGs in public/og/, made by scripts/make_og_images.py.
// A page without its own image falls back to the homepage image.
const ogImage = (name) => `${siteUrl}/og/${existsSync(path.join(root, "public/og", `${name}.jpg`)) ? name : "lalitha-04"}.jpg`;

const organisation = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organisation`,
  name: brandTitle,
  alternateName: ["Urban Arts", "Urban Arts Architects"],
  description: "Urban Arts Architects is an architecture and interior design practice in Hyderabad, established in 1978.",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/urban-arts-logo.png`,
  image: `${siteUrl}/og/lalitha-04.jpg`,
  foundingDate: "1978",
  founder: { "@type": "Person", name: "Deoyani Shinde" },
  telephone: "+91 94944 54393",
  email: "info@urbanarts.co.in",
  address: { "@type": "PostalAddress", streetAddress: "301 Ashoka Plaza, Masab Tank", addressLocality: "Hyderabad", addressRegion: "Telangana", postalCode: "500004", addressCountry: "IN" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "17:00" }],
  areaServed: "Hyderabad",
  sameAs: ["https://www.instagram.com/urban.arts.architects/", "https://shinde.co/"],
};

function layout({ title, description, body, current = "", className = "", canonicalPath = "/", og = "lalitha-04", structuredData = false }) {
  const canonical = `${siteUrl}${canonicalPath}`;
  return `<!doctype html>
<html lang="en-IN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website">
<meta property="og:url" content="${canonical}"><meta property="og:site_name" content="${brandTitle}"><meta property="og:locale" content="en_IN">
<meta property="og:image" content="${ogImage(og)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">${structuredData ? `
<script type="application/ld+json">${JSON.stringify(organisation)}</script>` : ""}
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
  { project: residential.find((p) => p.slug === "doctors-residence"), image: "ravi-01", alt: "Warm living room at Doctors’ Residence" },
  { project: wider.find((p) => p.slug === "atithi-inn"), image: "atithi-08", alt: "Chettinad-inspired banquet interior at Atithi Inn" },
  { project: wider.find((p) => p.slug === "shanti-sarovar"), image: "shanti-lake-auditorium", alt: "Rain-fed lake with the auditorium beyond at Shanti Sarovar" },
];

const sliderCard = ({ project, image: imageName, alt }, index) => `<article class="slider-card" id="selected-work-slide-${index + 1}">
  <a href="/projects/${project.slug}/">${image(imageName, alt)}<div class="slider-card-copy"><p>${project.eyebrow}</p><h3>${project.title}</h3></div></a>
</article>`;

const home = layout({
  title: "Urban Arts Architects, Hyderabad · Architecture, Interiors and Landscape",
  structuredData: true,
  description: "Urban Arts is a Hyderabad architecture and interior design practice established in 1978, working from furniture and homes to institutions, conservation and urban design.",
  body: `
  <section class="hero">
    <div class="hero-copy reveal"><h1>From a humble chair to large urban layouts.</h1><p>An architecture and interiors practice in Hyderabad since 1978. We carry homes, hotels, campuses and heritage buildings from the first plan to the final installation—or take on only the part of a project you need.</p><div class="hero-actions"><a class="button" href="/work/">View all work</a><a class="text-link" href="/contact/">Discuss a project</a></div></div>
    <div class="hero-image">${image("lalitha-04", "Landscaped residential garden with timber pavilion", true)}</div>
    <p class="hero-caption">Kompally Residence · Interiors and landscape</p>
  </section>
  <section class="intro-band home-intro"><p>Scale changes; the obligation does not. Across generations, the studio has moved between architecture, interiors, furniture, landscape, conservation and city-scale work—each discipline informing the others, and each project held to conceptual clarity, a balance of form and function, and a design particular to its people, place and making.</p><a class="text-link" href="/practice/">About the practice</a></section>
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
  title: `Selected Work · ${brandTitle}`,
  description: "Selected residential, interior, conservation, institutional and urban projects by Urban Arts.",
  current: "work",
  className: "work-page",
  canonicalPath: "/work/",
  body: `<section class="page-hero"><p class="kicker">Selected work</p><h1>Homes, interiors and a broader practice.</h1><p>This collection begins with <strong>houses</strong> and <strong>interior spaces</strong> realised by Urban Arts, before expanding into our wider work across <strong>hospitality, civic buildings, heritage conservation</strong> and <strong>urban spaces</strong>.</p></section><section class="section" id="residential"><div class="section-head"><div><p class="kicker">Residential</p><h2>Architecture, Interiors and Landscape</h2></div></div><div class="project-grid">${residentialProjects.map(projectCard).join("")}</div></section><section class="section ongoing-section" id="ongoing"><div class="section-head"><div><p class="kicker">Presently ongoing</p><h2>On the drawing board and on site</h2></div><a class="text-link" href="/ongoing/">View ongoing work</a></div><div class="project-grid ongoing-grid">${ongoing.map(projectCard).join("")}</div></section><section class="section section-dark" id="wider-practice"><div class="section-head"><div><p class="kicker">Wider practice</p><h2>Hospitality, institutions, heritage and the city</h2></div></div><div class="wider-grid">${wider.map(projectCard).join("")}</div></section>`,
});

const ongoingPage = layout({
  title: `Presently Ongoing · ${brandTitle}`,
  description: "Current architecture and interior design work in development at Urban Arts.",
  current: "ongoing",
  className: "ongoing-page",
  canonicalPath: "/ongoing/",
  body: `<section class="page-hero"><p class="kicker">Presently ongoing</p><h1>Design evolves before it becomes building.</h1><p>Our drawings and visualisations are working instruments—not promises of a finished photograph. Through them, planning, structure, material, climate and landscape are tested against one another and resolved together.</p></section><section class="section"><div class="project-grid ongoing-grid">${ongoing.map(projectCard).join("")}</div></section>`,
});

const practicePage = layout({
  title: `Practice · ${brandTitle}`,
  description: "Urban Arts is a Hyderabad design practice established in 1978, bringing architecture, interiors, furniture, landscape and the knowledge of making together.",
  current: "practice",
  canonicalPath: "/practice/",
  og: "practice-model",
  body: `<section class="page-hero practice-hero"><p class="kicker">The practice</p><h1>A practice shaped across generations by inquiry and the knowledge of making.</h1><p>Its work draws on the complementary experience of architects Deoyani Shinde, Dr Pramod Shinde and Harshal Shinde, who leads the practice as Chief Architect.</p></section>
  <section class="practice-image practice-model">${image("practice-model", "Architectural model of the Guwahati Convention Centre")}</section>
  <section class="split-copy"><div><p class="kicker">Since 1978</p><h2>One practice, built across generations.</h2></div><div><p>Deoyani Shinde founded Urban Arts in 1978, establishing a collaborative practice across homes, campuses and institutional buildings. Dr Pramod Shinde extended that work through environmental design, planning, conservation and a sustained study of Hyderabad. After returning to the city in 2001, Harshal Shinde brought architecture into closer contact with interiors, furniture, fabrication and turnkey delivery.</p><p>Across nearly five decades and hundreds of commissions, the scale has changed—from furniture and private rooms to green campuses, heritage buildings and large urban layouts. The obligation remains the same: to find conceptual clarity, balance form with function and give each project a character particular to its people, place and making.</p><p>Urban Arts is empanelled with the Department of Heritage Telangana and the Youth Advancement, Tourism &amp; Culture Department, Government of Telangana, and with the University of Hyderabad, Osmania University and Jawaharlal Nehru Technological University, Hyderabad.</p></div></section>
  <section class="practice-section services-section"><header><p class="kicker">What we do</p><h2>Architecture at every scale of use.</h2><p>A client may engage one discipline or ask Urban Arts to hold the project together from the first plan to the last installation.</p></header><div class="service-grid"><article><h3>Residential architecture</h3><p>Homes and residential developments shaped by climate, context and the patterns of daily life—from site planning and architecture to landscape and consultant coordination.</p><a class="text-link" href="/projects/brr-residence/">See BRR Residence</a></article><article><h3>Interiors and turnkey delivery</h3><p>Interiors treated as architecture at close range. Planning, services, lighting, materials and budgets are carried through drawings, site decisions and final installation.</p><a class="text-link" href="/projects/doctors-residence/">See Doctors’ Residence</a></article><article><h3>Kitchens, furniture and furnishings</h3><p>Ergonomics, material and making brought together in kitchens, wardrobes, cabinetry and loose furniture, combining precise factory production with bespoke hand finishing where each serves best.</p><a class="text-link" href="/projects/kompally-residence/">See the Kompally kitchen</a></article><article><h3>Hospitality and commercial spaces</h3><p>Hotels, restaurants, showrooms and workplaces developed around operations, guest experience, speed of delivery and the discipline of a defined budget.</p><a class="text-link" href="/projects/atithi-inn/">See Atithi Inn</a></article><article><h3>Institutional and campus design</h3><p>Complex programmes resolved at the scale of building, campus and landscape, with ecology and public use treated as part of the architectural brief.</p><a class="text-link" href="/projects/shanti-sarovar/">See Shanti Sarovar</a></article><article><h3>Conservation, planning and urban design</h3><p>Historic fabric and urban systems approached through measured study—condition, material, context and use—before repair, adaptation or new intervention is proposed.</p><a class="text-link" href="/projects/kachiguda-railway-station/">See Kachiguda Railway Station</a></article></div></section>
  <section class="practice-section team-section"><header><p class="kicker">Who we are</p><h2>Complementary experience, shared across the studio.</h2></header><div class="team-grid"><article><h3>Deoyani Shinde</h3><p class="role">Founder · Architect</p><p>Founded Urban Arts in 1978. Her work across residences, campuses and institutions is grounded in collaboration, clarity of planning, respect for nature and the comfort of the people who will inhabit a place.</p></article><article><h3>Dr Pramod Shinde</h3><p class="role">Urban Designer · Planner · Conservation Architect</p><p>An architect, educator and author working across environmental design, planning, conservation and Hyderabad’s architectural history. He was the first architect in India to receive a PhD in Architecture, in Environmental Design from IIT Kharagpur, and served on HUDA’s Heritage Conservation Committee through the 1980s and 1990s.</p></article><article><h3>Harshal Shinde, MS Arch</h3><p class="role">Chief Architect</p><p>Leads the practice across architecture, interiors, furniture and implementation, joining design development to a close understanding of materials, manufacturing and the realities of the building site.</p></article><article><h3>Er Sudhir Shinde</h3><p class="role">Structural Engineer</p><p>Provides the practice’s in-house structural engineering capability, bringing structural logic into direct conversation with architectural design and construction.</p></article></div></section>
  <section class="practice-section principal-section"><header><p class="kicker">Chief Architect</p><h2>Architecture, interiors and the intelligence of making.</h2></header><div class="principal-grid"><figure class="principal-media">${image("harshal-profile", "Architect Harshal Shinde seated on broad outdoor steps")}</figure><div class="principal-copy"><p>Harshal Shinde studied architecture in Hyderabad before completing his MS Arch at the University of Cincinnati. He worked with Otis Koglin Wilson Architects in Chicago and returned to join Urban Arts in 2001. Since then, his work has included hundreds of turnkey interior projects alongside architecture, adaptive reuse, sustainability, emergency architecture and rapid housing.</p><p>In 2006, Harshal and Anita Shinde began a furniture venture that grew from bespoke work into advanced manufacturing and four retail outlets. Harshal developed a method combining factory-made woodwork with bespoke hand finishing, reducing installation that traditionally took three to four months to approximately two to three weeks. That experience continues to inform the studio: machine precision is used where repetition and control matter; hand skill remains indispensable for fitting, finishing and the particularities of a site.</p><p>Alongside practice, Harshal has served as Director of the JNIAS School of Planning &amp; Architecture at JNAFA University and as a frequent juror at schools of architecture. In 2000 he was, at the time, the youngest architect to present a refereed paper at an international conference of the Association of Collegiate Schools of Architecture.</p><p><a class="text-link" href="https://shinde.co/" target="_blank" rel="noopener">Read The Situated Eye · Notes by Harshal Shinde</a></p></div></div></section>
  <section class="practice-section experience-section"><header><p class="kicker">Project record</p><h2>A track record spanning hundreds of commissions.</h2><p>Our selected work pages provide an in-depth look at key projects. For a wider view, our <a class="inline-link" href="/project-record/">Project Record</a> showcases the breadth of our practice, clearly outlining the exact role Urban Arts undertook in each commission.</p></header><div class="experience-preview"><p>Homes and residential development · Interiors and turnkey delivery · Hospitality, retail and workplaces · Institutional and cultural buildings · Heritage conservation · Urban design and infrastructure</p><a class="button" href="/project-record/">View Project Record</a></div></section>
  <section class="practice-section recognition-section"><header><p class="kicker">Recognition</p><h2>Recent awards.</h2></header><div class="awards-grid"><article><time>2021</time><h3>Häfele Kitchen Ideas Design Challenge</h3><p>Open Kitchen, Built Category · Winner, South Zone · Runner-up, All India. Awarded for the design and execution of the <a class="inline-link" href="/projects/kompally-residence/">Kompally Residence</a> kitchen.</p></article><article><time>2020</time><h3>IGBC Green Champion Award</h3><p><a class="inline-link" href="/projects/shanti-sarovar/">Shanti Sarovar</a> · “Pioneering Institution in Sensitising the Masses by Going Green,” recognising the 35-acre green campus design.</p></article><article><time>2019</time><h3>IIA Madhav Achwal Gold Medal</h3><p>Awarded by the Indian Institute of Architects to Dr Pramod Shinde.</p></article></div></section>
  <section class="approach-section">
    <header class="approach-heading"><p class="kicker">Design approach</p><h2>Each project has its own logic.</h2><p>Research, conversation and drawing test every idea against its place, its people and the means by which it will be made.</p></header>
    <figure class="approach-graphic approach-sketch">${image("practice-sketch", "Hand-drawn architectural concept and detail studies from the Urban Arts archive")}<figcaption>Concept and detail studies · Urban Arts archive</figcaption></figure>
    <div class="approach-intro"><p>We look for the project’s DNA: the relationship between its physical and cultural context, the lives it must hold and the means by which it can be made. Research, environmental responsibility, traditional craft and contemporary fabrication are not separate themes; they are resources brought into one line of thought.</p><blockquote>For us, giving form and imparting meaning are intrinsically intertwined.</blockquote></div>
    <div class="approach-steps"><article><span>01</span><h3>Listen</h3><p>Trust and openness come first. We listen for the client’s mission, core values, priorities and constraints before drawing conclusions.</p></article><article><span>02</span><h3>Research &amp; learn</h3><p>We delve into place, precedent, climate, material and use, looking for associations that belong to this project rather than to a generic style.</p></article><article><span>03</span><h3>Distil &amp; decide</h3><p>A fuzzy concept is tested through repeated drawings, models and conversations until the project’s defining idea becomes precise.</p></article><article><span>04</span><h3>Create</h3><p>That storyline becomes a working instrument, guiding decisions from planning and structure to light, furniture, fabrication and the final detail.</p></article></div>
  </section>`,
});

// Project Record names that have their own project page. The first matching prefix links the entry.
const recordPages = [
  ["BRR Residence", "brr-residence"], ["Kompally Residence", "kompally-residence"], ["Amara Model Homes", "amara-model-homes"],
  ["Doctors’ Residence", "doctors-residence"],
  ["Atithi Inn", "atithi-inn"], ["Shanti Sarovar", "shanti-sarovar"], ["AP State Archaeology Museum (now", "state-archaeology-museum"],
  ["Kachiguda Railway Station", "kachiguda-railway-station"], ["PVNR / HUDA Elevated Expressway", "pvnr-expressway"],
];
const recordLink = (name) => {
  const match = recordPages.find(([prefix]) => name.startsWith(prefix));
  return match ? `<a class="inline-link" href="/projects/${match[1]}/">${name}</a>` : name;
};

const experienceCategory = (section, index) => `<section class="experience-category" aria-labelledby="experience-${index + 1}">
  <header><p class="kicker">${String(index + 1).padStart(2, "0")}</p><h2 id="experience-${index + 1}">${section.title}</h2><p>${section.intro}</p></header>
  <dl class="experience-list">${section.projects.map(([project, scope]) => `<div><dt>${recordLink(project)}</dt><dd>${scope}</dd></div>`).join("")}</dl>
</section>`;

const experiencePage = layout({
  title: `Project Record · ${brandTitle}`,
  description: "A selected register of Urban Arts projects across homes, interiors, hospitality, institutions, conservation, planning and urban infrastructure.",
  current: "record",
  className: "experience-page",
  canonicalPath: "/project-record/",
  body: `<section class="page-hero experience-hero"><p class="kicker">Project record</p><h1>Nearly five decades of commissions, by type, with Urban Arts’ role in each.</h1><p>A representative selection of our projects, grouped by type, setting out the specific role Urban Arts was engaged to undertake in each. Where a project has its own page, its name links to it.</p></section>
  <nav class="experience-index" aria-label="Project Record categories">${experienceSections.map((section, index) => `<a href="#experience-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span>${section.title}</a>`).join("")}</nav>
  <div class="experience-register">${experienceSections.map(experienceCategory).join("")}</div>
  <section class="experience-closing"><p>For experience related to a particular building type, location or service, speak to the studio.</p><a class="button" href="/contact/">Discuss a project</a></section>`,
});

const contactPage = layout({
  title: `Contact · ${brandTitle}`,
  description: "Start a conversation with Urban Arts about a room, home, hotel, campus, landscape, conservation problem or urban project.",
  current: "contact",
  canonicalPath: "/contact/",
  structuredData: true,
  body: `<section class="contact-page">
    <div><p class="kicker">Contact</p><h1>Tell us about your project.</h1><p>A room, a home, a hotel, a campus or a conservation problem: tell us what needs to change, what must remain and where the project presently stands—and, if you can, its location, approximate area and timeline.</p></div>
    <div class="contact-list"><article><p class="kicker">Call</p><p class="contact-label">Project enquiries</p><a href="tel:+919494454393">+91 94944 54393</a><p class="contact-label">Studio</p><a href="tel:+917702211162">+91 77022 11162</a></article><article><p class="kicker">Write</p><a href="mailto:info@urbanarts.co.in">info@urbanarts.co.in</a><a href="https://wa.me/917702211162?text=Hello%20Urban%20Arts%2C%20I%20would%20like%20to%20discuss%20a%20project.">WhatsApp for enquiries · +91 77022 11162</a></article><article><p class="kicker">Visit</p><p>301 Ashoka Plaza<br>Masab Tank<br>Hyderabad, Telangana 500004</p><p class="contact-hours">Monday to Saturday, 9 am – 5 pm<br>Closed on Sundays</p><a href="https://maps.google.com/?q=Ashoka+Plaza+Masab+Tank+Hyderabad">Locate Us on Map</a></article><article><p class="kicker">Follow &amp; read</p><a href="https://www.instagram.com/urban.arts.architects/" target="_blank" rel="noopener">Urban Arts on Instagram</a><a href="https://shinde.co/" target="_blank" rel="noopener">The Situated Eye · Harshal Shinde</a></article></div>
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
    const media = chapter.images.map((item) => `<figure class="project-chapter-image ${item.wide ? "chapter-wide" : ""} ${(item.portrait || portraitAssets.has(item.name)) ? "chapter-portrait" : ""}">${image(item.name, item.alt)}${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}</figure>`).join("");
    const slider = chapter.sliderImages ? `<div class="chapter-slider selected-work"><div class="slider-actions"><button class="slider-button slider-prev" type="button" aria-label="Show previous visualisation">←</button><button class="slider-button slider-next" type="button" aria-label="Show next visualisation">→</button></div><div class="project-slider" data-project-slider tabindex="0" aria-label="Further model-home design visualisations">${chapter.sliderImages.map((item) => `<figure class="slider-card visualisation-card">${image(item.name, item.alt)}<figcaption>${item.caption} · Design visualisation</figcaption></figure>`).join("")}</div></div>` : "";
    return `<section class="project-chapter"${chapter.id ? ` id="${chapter.id}"` : ""}><div class="project-chapter-copy"><p class="kicker">${chapter.kicker}</p><h2>${chapter.title}</h2><div class="project-chapter-text">${copy}${chapter.quote ? `<blockquote>${chapter.quote}</blockquote>` : ""}</div></div>${media ? `<div class="project-chapter-gallery">${media}</div>` : ""}${slider}</section>`;
  }).join("");
}

// Facts rows render only when a value is supplied, so unknown facts simply do not appear.
const factRow = (label, value) => value ? `<div><dt>${label}</dt><dd>${value}</dd></div>` : "";

function projectPage(p) {
  const renderSet = new Set(p.renderImages || []);
  const gallery = p.images.slice(1).map((name, i) => {
    const caption = p.captions?.[i + 1] || (renderSet.has(name) ? "Design visualisation" : "");
    const orientation = portraitAssets.has(name) ? "gallery-portrait" : "gallery-landscape";
    return `<figure class="gallery-item ${orientation}">${image(name, p.alt[i + 1], i === 0)}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  }).join("");
  return layout({
    title: `${p.seoTitle || p.title} · ${brandTitle}`,
    description: p.description || p.intro,
    og: p.images[0].replace(/\.svg$/, ""),
    current: "work",
    className: "project-page",
    canonicalPath: `/projects/${p.slug}/`,
    body: `<article><header class="project-hero"><p class="kicker">${p.eyebrow}</p><h1>${p.title}</h1><p>${p.intro}</p><dl>${factRow("Present name", p.presentName)}${factRow("Status", p.status)}${factRow("Year", p.year)}${factRow("Location", p.location)}${p.client === "Private client" ? "" : factRow("Client", p.client)}${factRow("Urban Arts role", p.role)}${factRow("Scope", p.scope)}${factRow("Scale", p.scale)}${p.award ? `<div class="award-row"><dt>Recognition</dt><dd>${p.award}</dd></div>` : ""}</dl></header><div class="project-lead project-lead-natural ${portraitAssets.has(p.images[0]) ? "project-lead-portrait" : ""}">${image(p.images[0], p.alt[0], true)}</div><section class="project-story"><p class="kicker">Project note</p><p>${p.note}</p></section>${p.chapters ? projectChapters(p) : `<section class="gallery gallery-natural">${gallery}</section>`}<nav class="project-next" aria-label="Project navigation"><a href="/work/">All selected work</a><a href="/contact/">Discuss a project</a></nav></article>`,
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
await page("project-record/index.html", experiencePage);
await page("contact/index.html", contactPage);
for (const p of projects) await page(`projects/${p.slug}/index.html`, projectPage(p));
await page("404.html", layout({ title: `Page not found · ${brandTitle}`, description: "The page could not be found.", body: '<section class="page-hero"><p class="kicker">404</p><h1>This page could not be found.</h1><p>The address may be mistyped, or the page may have moved.</p><p><a class="button" href="/work/">View selected work</a></p></section>' }));

const redirects = {
  "about.html": "/practice/", "about-deoyani-shinde.html": "/practice/", "about-harshal-shinde.html": "/practice/", "about-pramod-shinde.html": "/practice/",
  "approach.html": "/practice/", "contact.html": "/contact/", "type-housing.html": "/work/#residential", "type-interiors.html": "/work/#residential",
  "type-conservation.html": "/work/#wider-practice", "type-institutional.html": "/work/#wider-practice", "type-urban-design.html": "/work/#wider-practice",
  "type-furniture.html": "/work/", "type-hospitality.html": "/work/#wider-practice", "type-retail.html": "/work/#wider-practice", "project-institutional-shanti-sarovar.html": "/projects/shanti-sarovar/",
  // Fallbacks for addresses renamed after launch; public/.htaccess sends true 301s where Apache honours it.
  "experience/index.html": "/project-record/", "projects/thyagraj-residence/index.html": "/projects/thyagaraj-residence/",
  "projects/ravi-residence/index.html": "/projects/doctors-residence/"
};
for (const [file, destination] of Object.entries(redirects)) await page(file, `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${siteUrl}${destination}"><title>Moved · ${brandTitle}</title><a href="${destination}">Continue to Urban Arts</a>`);

await page("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
const urls = ["/", "/work/", "/project-record/", "/ongoing/", "/practice/", "/contact/", ...projects.map(p => `/projects/${p.slug}/`)];
await page("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${siteUrl}${u}</loc><lastmod>${buildDate}</lastmod></url>`).join("")}</urlset>`);
console.log(`Built ${urls.length} pages in ${out}`);
