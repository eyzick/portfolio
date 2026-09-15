import {
  Brain,
  Calendar,
  Camera,
  Cloud,
  Code2,
  Blend,
  GlassWater,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

export interface Project {
  title: string;
  kicker: string;
  description: string;
  proof: string;
  tech: string[];
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  accent: string;
  github: string;
  demo: string;
}

export interface Capability {
  title: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
  accent: string;
}

export const projects: Project[] = [
  {
    title: 'RSVP Site',
    kicker: 'Interactive RSVP',
    description:
      'A Harry Potter themed RSVP page featuring interactive elements, animations, and seasonal content.',
    proof: 'Live experience · Seasonal',
    tech: ['React', 'TypeScript', 'CSS3', 'JavaScript', 'HTML5'],
    icon: Calendar,
    image: '/project-rsvp.jpg',
    imageAlt: 'Lit candles and handwritten pages on a dark table.',
    accent: '#f7ad55',
    github: 'https://github.com/eyzick/harry-potter-halloween',
    demo: 'https://halloween.eyzick.com',
  },
  {
    title: 'Blendle',
    kicker: 'Daily Game',
    description:
      'A daily game about blending two colors to hit the target result.',
    proof: 'Daily puzzle · Full stack',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Express'],
    icon: Blend,
    image: '/project-blendle.jpg',
    imageAlt: 'Bright abstract paint with blue, green, and yellow shapes.',
    accent: '#7bc7bd',
    github: 'https://github.com/eyzick/',
    demo: 'https://www.blendle.fun',
  },
  {
    title: 'DIY Baby Monitor',
    kicker: 'Raspberry Pi',
    description:
      'A Raspberry Pi monitor that streams video and audio securely across a local network.',
    proof: 'Private LAN · Video + audio',
    tech: ['Python', 'Raspberry Pi', 'Flask', 'OpenCV', 'WebRTC'],
    icon: Camera,
    image: '/project-baby-monitor.jpg',
    imageAlt: 'Close view of a Raspberry Pi circuit board.',
    accent: '#d6ff7f',
    github: 'https://github.com/eyzick/baby-monitor',
    demo: '#',
  },
  {
    title: 'Thirsti',
    kicker: 'Recommendations',
    description:
      'A web application for cocktail recommendations based on preferences and ingredients on hand.',
    proof: 'Live app · Ingredient-led',
    tech: ['React', 'TypeScript', 'Node.js'],
    icon: GlassWater,
    image: '/project-thirsti.jpg',
    imageAlt: 'Cocktail glass with citrus and herbs on a bar.',
    accent: '#f2c8a0',
    github: 'https://github.com/eyzick/thirsti',
    demo: 'https://thirsti.eyzick.com',
  },
];

export const capabilities: Capability[] = [
  {
    title: 'AI & Machine Learning',
    description:
      'Building intelligent systems and AI-powered applications.',
    skills: ['OpenAI API', 'LangChain', 'Computer Vision', 'NLP', 'PyTorch'],
    icon: Brain,
    accent: '#d6ff7f',
  },
  {
    title: 'TypeScript & React',
    description:
      'Creating modern, scalable web applications.',
    skills: ['React', 'Next.js', 'TypeScript', 'Redux', 'GraphQL'],
    icon: Code2,
    accent: '#7bc7bd',
  },
  {
    title: 'Python Development',
    description:
      'Backend development and data science solutions.',
    skills: ['FastAPI', 'Django', 'Pandas', 'NumPy', 'Scikit-learn'],
    icon: Terminal,
    accent: '#f7ad55',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Scalable infrastructure and deployment strategies.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    icon: Cloud,
    accent: '#f2c8a0',
  },
];

export const toolStack = [
  'AI/ML',
  'TypeScript',
  'Python',
  'React',
  'Node.js',
  'AWS',
  'Docker',
  'Kubernetes',
];
