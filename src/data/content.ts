/**
 * Toute la copy française du site COOPACAS — éditable sans toucher aux composants.
 * Chemins médias : à mettre à jour quand Dav dépose des fichiers dans public/media/.
 */

export const identity = {
  name: 'COOPACAS',
  fullName: 'Coopérative Agricole du Cacao de Soubré',
  baseline: 'Le cacao ivoirien, cultivé avec exigence depuis 2003',
  foundedYear: 2003,
  region: 'Région de la Nawa, Côte d’Ivoire',
  city: 'Soubré',
  address: 'BP 124, Soubré, Région de la Nawa, Côte d’Ivoire',
  email: 'contact@coopacas.ci',
  phone: '+225 07 00 00 00 00',
  hours: 'Lundi – vendredi · 08h00 – 17h00',
} as const;

export const nav = {
  links: [
    { label: 'La coopérative', href: '#about' },
    { label: 'Activités', href: '#activities' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Traçabilité', href: '#traceability' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Nous contacter', href: '#contact' },
} as const;

export const hero = {
  eyebrow: 'Coopérative Agricole du Cacao de Soubré',
  title: 'Le cacao ivoirien, cultivé avec exigence depuis 2003.',
  subtitle:
    '3 247 producteurs unis pour un cacao durable, traçable et équitable, au cœur de la Nawa.',
  ctaPrimary: { label: 'Découvrir la coopérative', href: '#about' },
  ctaSecondary: { label: 'Nous contacter', href: '#contact' },
  image: { src: '/media/hero1.jpg', alt: 'Plantation de cacao ivoirienne au lever du jour' },
} as const;

export const keyFigures = {
  items: [
    { value: 8500, suffix: '', label: 'Tonnes produites chaque année' },
    { value: 3247, suffix: '', label: 'Producteurs membres' },
    { value: 12400, suffix: '', label: 'Hectares cultivés' },
    { value: 45, suffix: '', label: 'Villages couverts' },
  ],
} as const;

export const about = {
  eyebrow: 'Notre histoire',
  title: 'Une coopérative née de la terre, portée par ses membres.',
  paragraphs: [
    'Fondée en 2003 à Soubré, au cœur de la première région cacaoyère de Côte d’Ivoire, COOPACAS rassemble aujourd’hui 3 247 productrices et producteurs sur 45 villages de la Nawa.',
    'Notre modèle est simple et exigeant : un membre, une voix. Le conseil d’administration est élu en assemblée générale, les ristournes de campagne sont redistribuées aux membres, et chaque décision est prise dans l’intérêt durable de la filière.',
    'Vingt ans plus tard, nous exportons un cacao dont la traçabilité, la qualité et l’éthique font notre fierté — et celle de toute une région.',
  ],
  pullQuote: 'Notre force, ce sont nos membres.',
  pullQuoteAuthor: 'Le Conseil d’Administration',
  image: { src: '/media/coop.jpg', alt: 'Producteurs de la coopérative COOPACAS' },
} as const;

export const activities = {
  eyebrow: 'Ce que nous faisons',
  title: 'De la plantation à l’exportation.',
  items: [
    {
      icon: 'Sprout',
      title: 'Production',
      description:
        'Itinéraires techniques partagés, plants greffés, formations agroforestières dans 45 villages.',
    },
    {
      icon: 'Truck',
      title: 'Collecte',
      description:
        'Réseau de magasins de groupage et bascules certifiées, au plus près de chaque producteur.',
    },
    {
      icon: 'Factory',
      title: 'Transformation',
      description:
        'Fermentation maîtrisée, séchage solaire, tri qualité et calibrage avant chaque expédition.',
    },
    {
      icon: 'Ship',
      title: 'Commercialisation',
      description:
        'Contrats d’exportation directs vers l’Europe, en partenariat avec des chocolatiers exigeants.',
    },
  ],
} as const;

export const certifications = {
  eyebrow: 'Nos garanties',
  title: 'Reconnus par les standards internationaux.',
  items: [
    {
      name: 'Rainforest Alliance',
      monogram: 'RA',
      summary: 'Préservation des forêts et conditions de travail dignes dans nos plantations.',
      since: 2014,
      logo: '/media/RA.png',
    },
    {
      name: 'Fairtrade / Commerce Équitable',
      monogram: 'FT',
      summary: 'Prix minimum garanti et prime de développement reversée aux communautés.',
      since: 2011,
      logo: '/media/Fairtrade-Logo.png',
    },
    {
      name: 'ISO 9001',
      monogram: 'ISO',
      summary: 'Système de management de la qualité audité chaque année.',
      since: 2019,
      logo: '/media/gold-certified.png',
    },
  ],
} as const;

export const traceability = {
  badge: 'Conforme EUDR — Règlement UE 2023/1115',
  eyebrow: 'Traçabilité & conformité',
  title: 'Chaque fève est traçable, de la parcelle à l’exportation.',
  intro:
    'Toutes nos parcelles sont géolocalisées et nos lots sont identifiés à chaque étape. Nous fournissons à nos acheteurs européens la documentation complète exigée par le règlement EUDR.',
  eudrLogo: '/media/logo-complainte-eudr__plan-de-travail-1.png',
  mapImage: '/media/cartographie.png',
  points: [
    { icon: 'MapPin', text: '100 % des parcelles géolocalisées' },
    { icon: 'ScanLine', text: 'Chaque lot identifié et suivi' },
    { icon: 'FileCheck', text: 'Documentation export complète' },
  ],
} as const;

export const gallery = {
  eyebrow: 'En images',
  title: 'La coopérative au quotidien.',
  images: [
    { src: '/media/item9.jpg', alt: 'Plantation de cacao dans la région de la Nawa', span: 'wide' },
    { src: '/media/item1.jpg', alt: 'Cabosses de cacao mûres sur l’arbre', span: 'normal' },
    { src: '/media/item6.avif', alt: 'Fèves de cacao en cours de séchage solaire', span: 'tall' },
    { src: '/media/item2.jpg', alt: 'Producteur ouvrant une cabosse à la machette', span: 'normal' },
    { src: '/media/tiem4.jpg', alt: 'Sacs de cacao prêts à l’expédition', span: 'normal' },
    { src: '/media/item10.jpg', alt: 'Détail de cabosses fraîchement récoltées', span: 'normal' },
    { src: '/media/item5.jfif', alt: 'Productrices en réunion de groupement', span: 'normal' },
    { src: '/media/item11.jpg', alt: 'Producteurs au cœur de la plantation', span: 'tall' },
    { src: '/media/item8.jpg', alt: 'Entrepôt et activité quotidienne de la coopérative', span: 'wide' },
    { src: '/media/item12.jpg', alt: 'Vue large sur les hectares cultivés par la coopérative', span: 'wide' },
    { src: '/media/steptodown.com836479.jpg', alt: 'Détail de fèves de cacao triées à la main', span: 'normal' },
  ] as const,
} as const;

export const video = {
  eyebrow: 'Découvrir',
  title: 'La filière cacao en Côte d’Ivoire.',
  description:
    'Quelques minutes pour comprendre les enjeux d’un cacao durable et équitable, raconté depuis les plantations de la Nawa.',
  videoSrc: '/media/12000309-hd_1920_1080_30fps.mp4',
  videoType: 'video/mp4',
  // Affiche : montrée pendant le chargement (desktop) et à la place de la vidéo sur mobile
  // pour éviter de télécharger ~11 Mo sur téléphone.
  poster: '/media/item9.jpg',
  posterAlt: 'Plantation de cacao de la coopérative dans la région de la Nawa',
} as const;

export const testimonials = {
  eyebrow: 'Paroles de membres',
  title: 'Ce que disent celles et ceux qui nous font confiance.',
  subtitle:
    'Productrices, producteurs, acheteurs européens — dix voix qui racontent la coopérative au quotidien.',
  items: [
    {
      quote:
        'Avant la coopérative, je vendais ma récolte au prix du marché de bord-champ. Aujourd’hui, je sais ce que mon cacao vaut, et j’ai des plants greffés qui doublent mes rendements.',
      author: 'Akissi Konan',
      role: 'Productrice, membre depuis 2011',
      initials: 'AK',
      avatar: '/media/avatar 1.png',
    },
    {
      quote:
        'COOPACAS a formé tous nos jeunes du village aux bonnes pratiques. La prime Fairtrade nous a permis de réhabiliter notre école primaire. C’est ça, une coopérative qui tient parole.',
      author: 'Yao Kouamé',
      role: 'Producteur et délégué de village, membre depuis 2006',
      initials: 'YK',
      avatar: '/media/avatar 2.png',
    },
    {
      quote:
        'Nous achetons à COOPACAS depuis huit ans. La traçabilité est irréprochable, la qualité constante. Avec l’EUDR, c’est devenu un partenaire stratégique pour notre filière chocolatière.',
      author: 'Claire Lemoine',
      role: 'Responsable approvisionnement, chocolaterie française',
      initials: 'CL',
      avatar: '/media/avatar 3.png',
    },
    {
      quote:
        'Ce que la coopérative m’a apporté de plus précieux, c’est la formation. J’ai appris à soigner mes cabosses, à fermenter, à sécher proprement. Mon revenu a presque triplé en cinq ans.',
      author: 'Akissi Konan',
      role: 'Productrice, membre depuis 2011',
      initials: 'AK',
      avatar: '/media/avatar 1.png',
    },
    {
      quote:
        'On nous a souvent promis des choses dans cette région. COOPACAS, c’est la première organisation qui livre — un forage par-ci, un séchoir solaire par-là, une école rénovée.',
      author: 'Yao Kouamé',
      role: 'Producteur et délégué de village, membre depuis 2006',
      initials: 'YK',
      avatar: '/media/avatar 2.png',
    },
    {
      quote:
        'Très peu de coopératives ivoiriennes peuvent fournir le niveau de documentation EUDR que COOPACAS livre lot par lot. C’est ce qui sécurise notre approvisionnement à long terme.',
      author: 'Claire Lemoine',
      role: 'Responsable approvisionnement, chocolaterie française',
      initials: 'CL',
      avatar: '/media/avatar 3.png',
    },
    {
      quote:
        'Pour la première fois, j’ai pu inscrire mes deux filles à l’école secondaire. Sans la prime de commerce équitable, jamais je n’aurais eu cette tranquillité.',
      author: 'Akissi Konan',
      role: 'Productrice, membre depuis 2011',
      initials: 'AK',
      avatar: '/media/avatar 1.png',
    },
    {
      quote:
        'Je siège au conseil d’administration depuis deux ans. Voir les comptes ouverts en assemblée générale, voter pour les ristournes — c’est ça, la vraie démocratie paysanne.',
      author: 'Yao Kouamé',
      role: 'Producteur et délégué de village, membre depuis 2006',
      initials: 'YK',
      avatar: '/media/avatar 2.png',
    },
    {
      quote:
        'La régularité du séchage, la précision du calibrage, la rigueur de l’expédition — chaque lot ressemble au précédent. Pour un chocolatier exigeant, ça vaut de l’or.',
      author: 'Claire Lemoine',
      role: 'Responsable approvisionnement, chocolaterie française',
      initials: 'CL',
      avatar: '/media/avatar 3.png',
    },
    {
      quote:
        'Quand je vois les jeunes du village reprendre les plantations de leurs parents au lieu de partir en ville, je me dis que nous faisons quelque chose de juste.',
      author: 'Akissi Konan',
      role: 'Productrice, membre depuis 2011',
      initials: 'AK',
      avatar: '/media/avatar 1.png',
    },
  ],
} as const;

export const callToAction = {
  buyer: {
    eyebrow: 'Acheteurs & exportateurs',
    title: 'Préparons ensemble votre approvisionnement EUDR.',
    description:
      'Volumes garantis, traçabilité parcelle par parcelle, documentation export complète. Travaillons sur votre prochaine campagne cacaoyère.',
    primary: { label: 'Devenir acheteur', href: '#contact' },
    secondary: { label: 'Demander un échantillon', href: '#contact' },
  },
  partner: {
    eyebrow: 'Partenariats institutionnels',
    title: 'Vous êtes une coopérative, une banque ou une ONG ?',
    description:
      'Nous mutualisons nos formations, nos infrastructures et nos canaux de commercialisation avec celles et ceux qui partagent notre exigence.',
    primary: { label: 'Devenir partenaire', href: '#contact' },
    secondary: { label: 'Nous contacter', href: '#contact' },
  },
} as const;

export const partners = {
  eyebrow: 'Ils nous font confiance',
  items: [
    { name: 'Cargill', logo: '/media/Cargill_logo.png' },
    { name: 'Lindt', logo: '/media/Lindt-Logo.png' },
    { name: 'Nestlé', logo: '/media/Nestlé-logo.png' },
    { name: 'Syngenta', logo: '/media/Syngenta_Logo.png' },
    { name: 'Conseil du Café-Cacao', logo: '/media/le_conseil_du_caf_cacao_logo.jpg' },
  ],
} as const;

export const impact = {
  eyebrow: 'Gouvernance & impact',
  title: 'Une coopérative au service de ses membres et de sa région.',
  governance: {
    title: 'Une gouvernance transparente.',
    text: 'Notre conseil d’administration est élu en assemblée générale. Les ristournes de chaque campagne sont restituées aux membres, en toute transparence, après validation collective des comptes.',
    highlight: {
      value: '100 %',
      label: 'des ristournes redistribuées en assemblée générale',
    },
  },
  community: {
    title: 'Un impact concret pour nos villages.',
    tiles: [
      { icon: 'School', value: '2', label: 'écoles réhabilitées' },
      { icon: 'Heart', value: '1', label: 'centre de santé soutenu' },
      { icon: 'Users', value: '12', label: 'groupements féminins accompagnés' },
      { icon: 'Droplets', value: '8', label: 'forages réalisés' },
    ],
  },
} as const;

export const contact = {
  eyebrow: 'Contact',
  title: 'Travaillons ensemble.',
  intro:
    'Acheteur, partenaire institutionnel ou journaliste : écrivez-nous, nous vous répondons sous 48 heures ouvrées.',
  form: {
    name: 'Nom complet',
    email: 'Adresse e-mail',
    phone: 'Téléphone (facultatif)',
    message: 'Votre message',
    submit: 'Envoyer le message',
    success: 'Merci, votre message a bien été envoyé. Nous vous recontactons rapidement.',
  },
  mapEmbedUrl:
    'https://www.google.com/maps?q=Soubr%C3%A9%2C+C%C3%B4te+d%27Ivoire&output=embed',
} as const;

export const footer = {
  baseline: 'Coopérative Agricole du Cacao de Soubré — depuis 2003.',
  linksTitle: 'Navigation',
  certificationsTitle: 'Certifications',
  contactTitle: 'Contact',
  socials: [
    { icon: 'Facebook', label: 'Facebook', href: '#' },
    { icon: 'Linkedin', label: 'LinkedIn', href: '#' },
    { icon: 'Instagram', label: 'Instagram', href: '#' },
  ],
  legal:
    '© 2026 COOPACAS — Coopérative Agricole du Cacao de Soubré. Site réalisé par NIMBAA Digital Agency.',
} as const;

/**
 * Liste des sections de l’ordre de la page (utile pour générer les stubs).
 */
export const sectionOrder = [
  { id: 'hero', label: 'Hero' },
  { id: 'figures', label: 'Chiffres clés' },
  { id: 'about', label: 'Notre histoire' },
  { id: 'activities', label: 'Nos activités' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'traceability', label: 'Traçabilité & EUDR' },
  { id: 'gallery', label: 'Galerie' },
  { id: 'video', label: 'Vidéo' },
  { id: 'testimonials', label: 'Témoignages' },
  { id: 'partners', label: 'Partenaires' },
  { id: 'impact', label: 'Gouvernance & impact' },
  { id: 'contact', label: 'Contact' },
] as const;
