/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ClassifyOption {
  id: string;
  label: string;
}

export interface ClassifyLevel {
  id: number;
  book: {
    title: string;
    author: string;
    keywords: string[];
    imageUrl: string;
  };
  correctMainClassId: string;
  correctSubclassId: string;
  correctAuthorNumber: string;
  explanation: string;
}

export const MAIN_CLASSES: ClassifyOption[] = [
  { id: '000', label: '000 – General Works' },
  { id: '100', label: '100 – Philosophy & Psychology' },
  { id: '200', label: '200 – Religion' },
  { id: '300', label: '300 – Social Sciences' },
  { id: '400', label: '400 – Languages' },
  { id: '500', label: '500 – Natural Sciences' },
  { id: '600', label: '600 – Technology' },
  { id: '700', label: '700 – Arts & Recreation' },
  { id: '800', label: '800 – Literature' },
  { id: '900', label: '900 – History & Geography' },
];

export const ALL_SUBCLASSES: Record<string, ClassifyOption[]> = {
  '000': [
    { id: '000', label: '000 – Computer science, information & general works' },
    { id: '010', label: '010 – Bibliography' },
    { id: '020', label: '020 – Library & information sciences' },
    { id: '030', label: '030 – General encyclopedic works' },
    { id: '050', label: '050 – General serial publications' },
    { id: '060', label: '060 – General organizations & museum science' },
    { id: '070', label: '070 – News media, journalism & publishing' },
    { id: '080', label: '080 – General collections' },
    { id: '090', label: '090 – Manuscripts & rare books' },
  ],
  '100': [
    { id: '100', label: '100 – Philosophy & psychology' },
    { id: '110', label: '110 – Metaphysics' },
    { id: '120', label: '120 – Epistemology, causation, humankind' },
    { id: '130', label: '130 – Parapsychology & occultism' },
    { id: '140', label: '140 – Specific philosophical schools' },
    { id: '150', label: '150 – Psychology' },
    { id: '160', label: '160 – Logic' },
    { id: '170', label: '170 – Ethics' },
    { id: '180', label: '180 – Ancient, medieval, Eastern philosophy' },
    { id: '190', label: '190 – Modern Western philosophy' },
  ],
  '200': [
    { id: '200', label: '200 – Religion' },
    { id: '210', label: '210 – Philosophy & theory of religion' },
    { id: '220', label: '220 – Bible' },
    { id: '230', label: '230 – Christianity & Christian theology' },
    { id: '240', label: '240 – Christian practice & observance' },
    { id: '250', label: '250 – Christian pastoral practice & religious orders' },
    { id: '260', label: '260 – Christian organization, social work & worship' },
    { id: '270', label: '270 – History of Christianity' },
    { id: '280', label: '280 – Christian denominations & sects' },
    { id: '290', label: '290 – Other religions' },
  ],
  '300': [
    { id: '300', label: '300 – Social sciences' },
    { id: '310', label: '310 – Collections of general statistics' },
    { id: '320', label: '320 – Political science' },
    { id: '330', label: '330 – Economics' },
    { id: '340', label: '340 – Law' },
    { id: '350', label: '350 – Public administration & military science' },
    { id: '360', label: '360 – Social problems & social services' },
    { id: '370', label: '370 – Education' },
    { id: '380', label: '380 – Commerce, communications & transportation' },
    { id: '390', label: '390 – Customs, etiquette & folklore' },
  ],
  '400': [
    { id: '400', label: '400 – Language' },
    { id: '410', label: '410 – Linguistics' },
    { id: '420', label: '420 – English & Old English languages' },
    { id: '430', label: '430 – Germanic languages' },
    { id: '440', label: '440 – French & related Romance languages' },
    { id: '450', label: '450 – Italian, Romanian & related languages' },
    { id: '460', label: '460 – Spanish, Portuguese & Galician languages' },
    { id: '470', label: '470 – Latin & related Italic languages' },
    { id: '480', label: '480 – Classical Greek & related Hellenic languages' },
    { id: '490', label: '490 – Other languages' },
  ],
  '500': [
    { id: '500', label: '500 – Science' },
    { id: '510', label: '510 – Mathematics' },
    { id: '520', label: '520 – Astronomy & allied sciences' },
    { id: '530', label: '530 – Physics' },
    { id: '540', label: '540 – Chemistry & allied sciences' },
    { id: '550', label: '550 – Earth sciences' },
    { id: '560', label: '560 – Paleontology' },
    { id: '570', label: '570 – Biology' },
    { id: '580', label: '580 – Plants (Botany)' },
    { id: '590', label: '590 – Animals (Zoology)' },
  ],
  '600': [
    { id: '600', label: '600 – Technology' },
    { id: '610', label: '610 – Medicine & health' },
    { id: '620', label: '620 – Engineering & allied operations' },
    { id: '630', label: '630 – Agriculture & related technologies' },
    { id: '640', label: '640 – Home & family management' },
    { id: '650', label: '650 – Management & public relations' },
    { id: '660', label: '660 – Chemical engineering' },
    { id: '670', label: '670 – Manufacturing' },
    { id: '680', label: '680 – Manufacture for specific uses' },
    { id: '690', label: '690 – Construction of buildings' },
  ],
  '700': [
    { id: '700', label: '700 – The arts' },
    { id: '710', label: '710 – Area planning & landscape architecture' },
    { id: '720', label: '720 – Architecture' },
    { id: '730', label: '730 – Sculpture, ceramics & metalwork' },
    { id: '740', label: '740 – Graphic arts & decorative arts' },
    { id: '750', label: '750 – Painting' },
    { id: '760', label: '760 – Printmaking & prints' },
    { id: '770', label: '770 – Photography, computer art, film, video' },
    { id: '780', label: '780 – Music' },
    { id: '790', label: '790 – Sports, games & entertainment' },
  ],
  '800': [
    { id: '800', label: '800 – Literature' },
    { id: '810', label: '810 – American literature in English' },
    { id: '820', label: '820 – English & Old English literatures' },
    { id: '830', label: '830 – German & related literatures' },
    { id: '840', label: '840 – French & related literatures' },
    { id: '850', label: '850 – Italian, Romanian & related literatures' },
    { id: '860', label: '860 – Spanish, Portuguese & Galician literatures' },
    { id: '870', label: '870 – Latin & related Italic literatures' },
    { id: '880', label: '880 – Classical Greek & related literatures' },
    { id: '890', label: '890 – Other literatures' },
  ],
  '900': [
    { id: '900', label: '900 – History & geography' },
    { id: '910', label: '910 – Geography & travel' },
    { id: '920', label: '920 – Biography, genealogy, insignia' },
    { id: '930', label: '930 – History of ancient world to ca. 499' },
    { id: '940', label: '940 – History of Europe' },
    { id: '950', label: '950 – History of Asia' },
    { id: '960', label: '960 – History of Africa' },
    { id: '970', label: '970 – History of North America' },
    { id: '980', label: '980 – History of South America' },
    { id: '990', label: '990 – History of other areas' },
  ],
};

export const CLASSIFY_LEVELS: ClassifyLevel[] = [
  {
    id: 1,
    book: {
      title: 'Introduction to Technology',
      author: 'Juan Dela Cruz',
      keywords: ['Technology', 'Innovation'],
      imageUrl: 'https://picsum.photos/seed/techbook/300/400',
    },
    correctMainClassId: '600',
    correctSubclassId: '620',
    correctAuthorNumber: 'C78',
    explanation: 'This book covers Engineering and Applied Operations, which falls under the 600 Main Class (Technology) and 620 Subclass. C78 is the Author Number for Dela Cruz.',
  },
  {
    id: 2,
    book: {
      title: 'Basics of Library Science',
      author: 'Maria Santos',
      keywords: ['Libraries', 'Information'],
      imageUrl: 'https://picsum.photos/seed/library/300/400',
    },
    correctMainClassId: '000',
    correctSubclassId: '020',
    correctAuthorNumber: 'S26',
    explanation: 'Library and Information Sciences fall under the 000 Main Class (General Works) and 020 Subclass. S26 is the Author Number for Santos.',
  },
  {
    id: 3,
    book: {
      title: 'Understanding Philosophy',
      author: 'Carlo Reyes',
      keywords: ['Philosophy', 'Thought'],
      imageUrl: 'https://picsum.photos/seed/philosophy/300/400',
    },
    correctMainClassId: '100',
    correctSubclassId: '110',
    correctAuthorNumber: 'R49',
    explanation: 'Metaphysics is a branch of Philosophy, falling under the 100 Main Class and 110 Subclass. R49 is the Author Number for Reyes.',
  },
  {
    id: 4,
    book: {
      title: 'Earth and Its Processes',
      author: 'Ana Lopez',
      keywords: ['Earth', 'Geology'],
      imageUrl: 'https://picsum.photos/seed/earth/300/400',
    },
    correctMainClassId: '500',
    correctSubclassId: '550',
    correctAuthorNumber: 'L67',
    explanation: 'Earth Sciences and Geology fall under the 500 Main Class (Natural Sciences) and 550 Subclass. L67 is the Author Number for Lopez.',
  },
  {
    id: 6,
    book: {
      title: 'Fundamentals of Psychology',
      author: 'Sofia Mendoza',
      keywords: ['Mind', 'Behavior'],
      imageUrl: 'https://picsum.photos/seed/psychology/300/400',
    },
    correctMainClassId: '100',
    correctSubclassId: '150',
    correctAuthorNumber: 'M46',
    explanation: 'Psychology falls under the 100 Main Class (Philosophy & Psychology) and 150 Subclass. M46 is the Author Number for Mendoza.',
  },
  {
    id: 7,
    book: {
      title: 'History of Ancient Civilizations',
      author: 'Roberto Castillo',
      keywords: ['History', 'Civilization'],
      imageUrl: 'https://picsum.photos/seed/ancient/300/400',
    },
    correctMainClassId: '900',
    correctSubclassId: '930',
    correctAuthorNumber: 'C37',
    explanation: 'The History of the Ancient World falls under the 900 Main Class (History & Geography) and 930 Subclass. C37 is the Author Number for Castillo.',
  },
  {
    id: 11,
    book: {
      title: 'Principles of Economics',
      author: 'Angela Bautista',
      keywords: ['Economics', 'Trade'],
      imageUrl: 'https://picsum.photos/seed/economics/300/400',
    },
    correctMainClassId: '300',
    correctSubclassId: '330',
    correctAuthorNumber: 'B38',
    explanation: 'Economics is a Social Science, falling under the 300 Main Class and 330 Subclass. B38 is the Author Number for Bautista.',
  },
  {
    id: 13,
    book: {
      title: 'Introduction to Political Science',
      author: 'Kevin Torres',
      keywords: ['Politics', 'Government'],
      imageUrl: 'https://picsum.photos/seed/politics/300/400',
    },
    correctMainClassId: '300',
    correctSubclassId: '320',
    correctAuthorNumber: 'T67',
    explanation: 'Political Science falls under the 300 Main Class (Social Sciences) and 320 Subclass. T67 is the Author Number for Torres.',
  },
  {
    id: 16,
    book: {
      title: 'Principles of Education',
      author: 'Teresa Delgado',
      keywords: ['Teaching', 'Learning'],
      imageUrl: 'https://picsum.photos/seed/education/300/400',
    },
    correctMainClassId: '300',
    correctSubclassId: '370',
    correctAuthorNumber: 'D45',
    explanation: 'Education falls under the 300 Main Class (Social Sciences) and 370 Subclass. D45 is the Author Number for Delgado.',
  },
  {
    id: 17,
    book: {
      title: 'Fundamentals of Chemistry',
      author: 'Eric Fernandez',
      keywords: ['Chemistry', 'Elements'],
      imageUrl: 'https://picsum.photos/seed/chemistry/300/400',
    },
    correctMainClassId: '500',
    correctSubclassId: '540',
    correctAuthorNumber: 'F47',
    explanation: 'Chemistry falls under the 500 Main Class (Natural Sciences) and 540 Subclass. F47 is the Author Number for Fernandez.',
  },
  {
    id: 18,
    book: {
      title: 'Astronomy and the Universe',
      author: 'Noel Cabrera',
      keywords: ['Space', 'Stars'],
      imageUrl: 'https://picsum.photos/seed/astronomy/300/400',
    },
    correctMainClassId: '500',
    correctSubclassId: '520',
    correctAuthorNumber: 'C33',
    explanation: 'Astronomy falls under the 500 Main Class (Natural Sciences) and 520 Subclass. C33 is the Author Number for Cabrera.',
  },
  {
    id: 19,
    book: {
      title: 'Introduction to Law',
      author: 'Grace Aquino',
      keywords: ['Law', 'Justice'],
      imageUrl: 'https://picsum.photos/seed/law/300/400',
    },
    correctMainClassId: '300',
    correctSubclassId: '340',
    correctAuthorNumber: 'A68',
    explanation: 'Law is a Social Science, falling under the 300 Main Class and 340 Subclass. A68 is the Author Number for Aquino.',
  },
];
