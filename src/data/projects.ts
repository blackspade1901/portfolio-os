export type ProjectStatus = 'Featured' | 'AI/ML' | 'Android' | 'Mini'

export interface ProjectImage {
  src: string
  alt: string
}

export interface PortfolioProject {
  id: string
  name: string
  shortName: string
  status: ProjectStatus
  role: string
  tagline: string
  problem: string
  idea: string
  impact: string
  color: string
  repo?: string
  images: ProjectImage[]
  tech: string[]
  highlights: string[]
  myWork: string[]
}

export const projects: PortfolioProject[] = [
  {
    id: 'localserve',
    name: 'LocalServe',
    shortName: 'LocalServe',
    status: 'Featured',
    role: 'Group project · full-stack developer, database designer, UI structure lead',
    tagline: 'A local service provider platform for Panjim, Goa.',
    problem:
      'Small local service providers often lack a reliable digital presence, while customers struggle to find verified nearby professionals.',
    idea:
      'LocalServe connects customers with verified local service providers through location-based discovery, real-time booking, secure chat, and role-aware admin tooling.',
    impact:
      'Built RBAC across Admin and Provider modules: KYC verification dashboard, multi-step onboarding, and a three-strike complaint and suspension system.',
    color: '#22c55e',
    repo: 'https://github.com/blackspade1901/LocalServe',
    images: [
      { src: '/projects/localserve/localserve-01.jpg', alt: 'LocalServe output screen' },
      { src: '/projects/localserve/localserve-02.jpg', alt: 'LocalServe interface screen' },
      { src: '/projects/localserve/localserve-04.png', alt: 'LocalServe dashboard screen' },
      { src: '/projects/localserve/localserve-05.png', alt: 'LocalServe admin or provider screen' },
      { src: '/projects/localserve/localserve-08.png', alt: 'LocalServe map or workflow screen' },
    ],
    tech: ['TypeScript', 'Next.js 15', 'Supabase', 'PostGIS', 'Cloudinary', 'Redis', 'Razorpay', 'Leaflet'],
    highlights: [
      'Three-role platform: customer, provider, admin',
      'KYC verification and certification workflow',
      'Realtime booking updates with calendar flow',
      'Encrypted chat with Redis-backed recent-message cache',
      'Complaint moderation with a 3-strike provider safety system',
    ],
    myWork: [
      'Created the web structure and main design flow',
      'Handled the complete database design',
      'Built provider profile and dashboard flows',
      'Implemented admin KYC actions and email notifications',
      'Integrated Razorpay payment verification',
      'Added role-based access checks and complaint moderation',
    ],
  },
  {
    id: 'bird-id',
    name: 'Bird Identification Through Voices',
    shortName: 'Bird ID',
    status: 'AI/ML',
    role: 'Machine learning developer',
    tagline: 'Teaching a model to recognize Goan birds by voice.',
    problem:
      'Bird calls are beautiful but difficult to identify, especially for students, nature learners, and biodiversity enthusiasts.',
    idea:
      'The project transforms audio calls into mel-spectrogram images, then trains a deep-learning classifier to identify bird species from visual sound patterns.',
    impact:
      'Achieved 95.28% test accuracy (F1: 0.953) on 10 bird species from Goa and the Western Ghats, with confidence scores per prediction.',
    color: '#38bdf8',
    repo: 'https://github.com/blackspade1901/Bird-Identification-Through-Voices',
    images: [
      { src: '/projects/bird-id/bird-spectrogram.svg', alt: 'Generated spectrogram-style Bird ID visual' },
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'EfficientNetB0', 'librosa', 'Streamlit', 'Kaggle'],
    highlights: [
      'Collected A/B quality audio for 10 bird species',
      'Generated 48,650 spectrogram images',
      'Used augmentation and fixed dB scaling for consistency',
      'Trained EfficientNetB0 transfer-learning model',
      'Reached 95.28% test accuracy across 3,346 test samples',
    ],
    myWork: [
      'Built the audio preprocessing pipeline',
      'Converted calls into mel-spectrogram datasets',
      'Configured model training and evaluation',
      'Tracked accuracy, loss, confusion matrix, and class metrics',
    ],
  },
  {
    id: 'truerate',
    name: 'TrueRate - Smart GST Calculator & Scanner',
    shortName: 'TrueRate',
    status: 'Android',
    role: 'Android developer',
    tagline: 'A GST scanner that races four data sources.',
    problem:
      'Indian shoppers see final prices, but rarely know exactly how much GST is hidden inside everyday products.',
    idea:
      'TrueRate scans a barcode, identifies the product, applies the right GST slab, and reveals the exact net cost and tax split.',
    impact:
      'Offline-capable Android app with 100+ automated tests at 100% pass rate; crowd-sourced unknown products become searchable for all users.',
    color: '#6366f1',
    repo: 'https://github.com/blackspade1901/TrueRate',
    images: [
      { src: '/projects/truerate/welcome-screen.jpeg', alt: 'TrueRate welcome screen' },
      { src: '/projects/truerate/home-screen.jpeg', alt: 'TrueRate home screen' },
      { src: '/projects/truerate/scanner.jpeg', alt: 'TrueRate scanner screen' },
      { src: '/projects/truerate/add-product-details.jpeg', alt: 'TrueRate manual product entry dialog' },
      { src: '/projects/truerate/gst-breakdown.jpeg', alt: 'TrueRate GST breakdown screen' },
      { src: '/projects/truerate/scan-history.jpeg', alt: 'TrueRate scan history screen' },
      { src: '/projects/truerate/home-dark-mode.jpeg', alt: 'TrueRate dark mode home screen' },
      { src: '/projects/truerate/settings-dark-mode.jpeg', alt: 'TrueRate settings dark mode screen' },
    ],
    tech: ['Java', 'Android', 'Firebase', 'Room', 'Retrofit', 'ML Kit', 'CameraX', 'Material Design'],
    highlights: [
      'Hybrid parallel scan lookup using Firestore, OpenFoodFacts, OpenBeautyFacts, and UPCItemDB',
      'Crowdsourced fallback when a product is unknown',
      'Dynamic GST slabs for exempt, essential, standard, and luxury categories',
      'Offline scan history with Room persistence',
      '100+ unit, integration, and UI tests with full pass rate',
    ],
    myWork: [
      'Built barcode scanning and product lookup flow',
      'Implemented GST breakdown experience',
      'Added scan history and offline persistence',
      'Designed light/dark UI screens and settings flow',
    ],
  },
  {
    id: 'portfolio-os',
    name: 'Portfolio OS',
    shortName: 'Portfolio OS',
    status: 'Featured',
    role: 'Frontend developer',
    tagline: 'This portfolio, rebuilt as a playful desktop world.',
    problem:
      'A normal portfolio can become a flat list. I wanted something visitors can explore, poke, open, move, and remember.',
    idea:
      'A browser-based operating system with draggable windows, widgets, project case studies, terminal commands, and motion-rich interactions.',
    impact:
      'Turns profile, projects, screenshots, resume, and contact into an interactive workspace instead of a static page.',
    color: '#a855f7',
    repo: 'https://github.com/blackspade1901/portfolio-os',
    images: [],
    tech: ['React', 'TypeScript', 'Zustand', 'Framer Motion', 'Vite', 'CSS 3D'],
    highlights: [
      'Desktop shell with draggable and resizable windows',
      'Taskbar, boot screen, app registry, and terminal',
      'Animated wallpaper, widgets, and 3D project cards',
      'Theme support and responsive layouts',
    ],
    myWork: [
      'Designed the OS concept and app structure',
      'Built the window manager and app registry',
      'Created interactive project presentation flows',
    ],
  },
]

export const miniProjects = [
  {
    name: 'PacMan',
    desc: 'HTML5 Canvas game with ghosts, food, scoring, level progression, audio, and local leaderboard.',
    tech: ['JavaScript', 'Canvas', 'CSS', 'localStorage'],
    repo: 'https://github.com/blackspade1901/PacMan',
  },
  {
    name: 'Hostel Management',
    desc: 'C project for student registration, room allocation, fee generation, search, and file handling.',
    tech: ['C', 'File Handling', 'Structures'],
    repo: 'https://github.com/blackspade1901/Hostel-Management-Using-c',
  },
  {
    name: 'Link-Up',
    desc: 'Campus communication app replacing notice boards with role-based dashboards, notices, complaints, and feedback for students, faculty, and staff.',
    tech: ['Java', 'Android', 'Firebase Realtime Database'],
    repo: 'https://github.com/blackspade1901/linkup2',
  },
]
