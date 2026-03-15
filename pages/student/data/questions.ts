export interface Option {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Question {
  id: number;
  scenario: string;
  options: Option[];
  correctId: string;
  explanation: string;
}

export const REFERENCE_SOURCES: Record<string, Option> = {
  dictionary: {
    id: 'dictionary',
    label: 'Dictionary',
    imageUrl: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=300&h=400&auto=format&fit=crop',
  },
  thesaurus: {
    id: 'thesaurus',
    label: 'Thesaurus',
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=300&h=400&auto=format&fit=crop',
  },
  encyclopedia: {
    id: 'encyclopedia',
    label: 'Encyclopedia',
    imageUrl: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=300&h=400&auto=format&fit=crop',
  },
  atlas: {
    id: 'atlas',
    label: 'World Atlas',
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=300&h=400&auto=format&fit=crop',
  },
  almanac: {
    id: 'almanac',
    label: 'Almanac',
    imageUrl: 'https://images.unsplash.com/photo-1506784919141-177b7ec8ee65?q=80&w=300&h=400&auto=format&fit=crop',
  },
  etymological: {
    id: 'etymological',
    label: 'Etymological Dictionary',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=300&h=400&auto=format&fit=crop',
  },
  biographical: {
    id: 'biographical',
    label: 'Biographical Dictionary',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&h=400&auto=format&fit=crop',
  },
  bibliography: {
    id: 'bibliography',
    label: 'Bibliography',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=300&h=400&auto=format&fit=crop',
  },
  index_database: {
    id: 'index_database',
    label: 'Index / Database',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=300&h=400&auto=format&fit=crop',
  },
  directory: {
    id: 'directory',
    label: 'Directory',
    imageUrl: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=300&h=400&auto=format&fit=crop',
  },
  gazetteer: {
    id: 'gazetteer',
    label: 'Gazetteer',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300&h=400&auto=format&fit=crop',
  },
  yearbook: {
    id: 'yearbook',
    label: 'Yearbook',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300&h=400&auto=format&fit=crop',
  },
  statistical_abstract: {
    id: 'statistical_abstract',
    label: 'Statistical Abstract',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=300&h=400&auto=format&fit=crop',
  },
  archives: {
    id: 'archives',
    label: 'Archives / Special Collections',
    imageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=300&h=400&auto=format&fit=crop',
  },
  patent_database: {
    id: 'patent_database',
    label: 'Patent Database',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=300&h=400&auto=format&fit=crop',
  },
  legal_database: {
    id: 'legal_database',
    label: 'Legal Database',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=300&h=400&auto=format&fit=crop',
  },
  data_repository: {
    id: 'data_repository',
    label: 'Data Repository',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=300&h=400&auto=format&fit=crop',
  },
  gis_repository: {
    id: 'gis_repository',
    label: 'GIS Data Repository',
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=300&h=400&auto=format&fit=crop',
  }
};

export const QUESTIONS: Record<string, Question[]> = {
  easy: [
    // Set 1
    {
      id: 1,
      scenario: "A student asks for the meaning of the word 'ubiquitous.' Which source should the librarian use?",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.almanac],
      correctId: 'dictionary',
      explanation: "A dictionary provides definitions and meanings of words."
    },
    {
      id: 2,
      scenario: "A patron asks for the capital city of Canada. Which source is most appropriate?",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.bibliography],
      correctId: 'atlas',
      explanation: "An atlas contains maps and geographical information like capital cities."
    },
    {
      id: 3,
      scenario: "A user wants basic information about climate change. Which source should be recommended first?",
      options: [REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.yearbook],
      correctId: 'encyclopedia',
      explanation: "Encyclopedias provide general overviews and basic information on a wide range of topics."
    },
    {
      id: 4,
      scenario: "A student wants the correct spelling of 'accommodation.' Which reference source is best?",
      options: [REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.directory],
      correctId: 'dictionary',
      explanation: "Dictionaries are the primary source for checking word spellings."
    },
    {
      id: 5,
      scenario: "A user asks for the population of Japan in 2023. Which source is most appropriate?",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.thesaurus],
      correctId: 'almanac',
      explanation: "Almanacs provide current facts, statistics, and annual data like population figures."
    },
    // Set 2
    {
      id: 6,
      scenario: "A patron asks for synonyms of the word 'happy.' Which source should the librarian consult?",
      options: [REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.atlas],
      correctId: 'thesaurus',
      explanation: "A thesaurus is specifically used to find synonyms and antonyms."
    },
    {
      id: 7,
      scenario: "A user wants to locate Mount Everest on a map. Which source is best?",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.index_database],
      correctId: 'atlas',
      explanation: "Atlases are used to find geographical locations on maps."
    },
    {
      id: 8,
      scenario: "A student asks for a short biography of Albert Einstein. Which source is best?",
      options: [REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.atlas],
      correctId: 'encyclopedia',
      explanation: "Encyclopedias often contain short biographical entries for famous individuals."
    },
    {
      id: 9,
      scenario: "A user wants major events that happened in 2022. Which source is best?",
      options: [REFERENCE_SOURCES.yearbook, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.thesaurus],
      correctId: 'yearbook',
      explanation: "Yearbooks record major events and developments of a specific year."
    },
    {
      id: 10,
      scenario: "A student asks for the definition of biodiversity. Which reference source should be used?",
      options: [REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.almanac],
      correctId: 'dictionary',
      explanation: "Dictionaries provide definitions for terms like biodiversity."
    },
    // Set 3
    {
      id: 11,
      scenario: "A user asks for countries and their capitals.",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.thesaurus],
      correctId: 'atlas',
      explanation: "Atlases show countries and their capital cities on maps."
    },
    {
      id: 12,
      scenario: "A student asks for brief information about volcanoes.",
      options: [REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.dictionary],
      correctId: 'encyclopedia',
      explanation: "Encyclopedias provide brief, general information on topics like volcanoes."
    },
    {
      id: 13,
      scenario: "A patron wants the meaning of the word 'sustainable.'",
      options: [REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.directory],
      correctId: 'dictionary',
      explanation: "A dictionary is used to find the meaning of words."
    },
    {
      id: 14,
      scenario: "A user asks for synonyms of 'important.'",
      options: [REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.almanac],
      correctId: 'thesaurus',
      explanation: "A thesaurus provides synonyms for words."
    },
    {
      id: 15,
      scenario: "A patron wants a list of world rivers and their locations.",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.directory],
      correctId: 'atlas',
      explanation: "Atlases provide geographical information including rivers and their locations."
    }
  ],
  medium: [
    // Average Set 1
    {
      id: 101,
      scenario: "A researcher asks for a list of books written about renewable energy.",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.gazetteer],
      correctId: 'bibliography',
      explanation: "A bibliography is a list of books or other works on a particular subject."
    },
    {
      id: 102,
      scenario: "A student wants journal articles about artificial intelligence.",
      options: [REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.almanac],
      correctId: 'index_database',
      explanation: "An index or database is used to find articles in journals and other periodicals."
    },
    {
      id: 103,
      scenario: "A user wants addresses of universities in the Philippines.",
      options: [REFERENCE_SOURCES.directory, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.gazetteer],
      correctId: 'directory',
      explanation: "A directory provides contact information like addresses and phone numbers."
    },
    {
      id: 104,
      scenario: "A patron asks where the Amazon River is located.",
      options: [REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.directory],
      correctId: 'gazetteer',
      explanation: "A gazetteer is a geographical dictionary that provides locations of places."
    },
    {
      id: 105,
      scenario: "A student wants statistics on global literacy rates.",
      options: [REFERENCE_SOURCES.statistical_abstract, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.almanac],
      correctId: 'statistical_abstract',
      explanation: "A statistical abstract provides summaries of statistics on various topics."
    },
    // Average Set 2
    {
      id: 106,
      scenario: "A researcher wants a list of all works written by Shakespeare.",
      options: [REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.almanac],
      correctId: 'bibliography',
      explanation: "A bibliography lists works by a specific author."
    },
    {
      id: 107,
      scenario: "A user wants phone numbers of hospitals in the city.",
      options: [REFERENCE_SOURCES.directory, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.gazetteer],
      correctId: 'directory',
      explanation: "Directories are used to find contact information like phone numbers."
    },
    {
      id: 108,
      scenario: "A student asks for journal articles on climate change from 2020 onward.",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.thesaurus],
      correctId: 'index_database',
      explanation: "Databases and indexes are the best source for finding recent journal articles."
    },
    {
      id: 109,
      scenario: "A patron wants a brief explanation of quantum computing.",
      options: [REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.almanac],
      correctId: 'encyclopedia',
      explanation: "Encyclopedias provide brief explanations and overviews of complex topics."
    },
    {
      id: 110,
      scenario: "A researcher wants historical facts about World War II.",
      options: [REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.gazetteer],
      correctId: 'encyclopedia',
      explanation: "Encyclopedias are excellent sources for historical facts and overviews."
    }
  ],
  hard: [
    // Difficult Set 1
    {
      id: 201,
      scenario: "A graduate student needs peer-reviewed journal articles on machine learning applications in healthcare published in the last 5 years.",
      options: [REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.statistical_abstract, REFERENCE_SOURCES.thesaurus],
      correctId: 'index_database',
      explanation: "Academic databases (indexes) are essential for finding peer-reviewed research articles."
    },
    {
      id: 202,
      scenario: "A librarian receives a reference request for primary sources on the American Civil War, including letters, diaries, and government documents.",
      options: [REFERENCE_SOURCES.archives, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.thesaurus],
      correctId: 'archives',
      explanation: "Archives and special collections house primary source materials like letters and diaries."
    },
    {
      id: 203,
      scenario: "A researcher wants conference proceedings in computer science from the last 3 years.",
      options: [REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.statistical_abstract],
      correctId: 'index_database',
      explanation: "Specialized academic databases are the best place to find conference proceedings."
    },
    {
      id: 204,
      scenario: "A student asks for statistical comparisons of global economic growth across multiple decades, including GDP, inflation, and unemployment.",
      options: [REFERENCE_SOURCES.data_repository, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.almanac],
      correctId: 'data_repository',
      explanation: "Statistical databases and data repositories provide detailed economic data across time."
    },
    {
      id: 205,
      scenario: "A user remembers only the topic of an article on climate change policy but needs full citation details.",
      options: [REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.bibliography],
      correctId: 'index_database',
      explanation: "Indexing databases allow you to search by topic to find full citation details for articles."
    },
    // Difficult Set 2
    {
      id: 206,
      scenario: "A doctoral student wants the latest peer-reviewed research on artificial intelligence ethics.",
      options: [REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.encyclopedia, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.almanac],
      correctId: 'index_database',
      explanation: "Academic databases provide access to the latest peer-reviewed research."
    },
    {
      id: 207,
      scenario: "A reference interview requires guidance on combining multiple sources for a systematic review. Which type of reference service is this?",
      options: [REFERENCE_SOURCES.biographical, REFERENCE_SOURCES.archives, REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.etymological],
      correctId: 'index_database', // Mapping 'Research reference' to a source context
      explanation: "Research reference services often involve deep dives into academic databases."
    },
    {
      id: 208,
      scenario: "A patron wants online government policy documents related to environmental law.",
      options: [REFERENCE_SOURCES.legal_database, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.dictionary, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.index_database],
      correctId: 'legal_database',
      explanation: "Legal databases or official government portals are the best source for policy documents and laws."
    },
    {
      id: 209,
      scenario: "A researcher needs conference proceedings and technical papers on quantum computing.",
      options: [REFERENCE_SOURCES.index_database, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.statistical_abstract],
      correctId: 'index_database',
      explanation: "Academic databases like IEEE Xplore or ACM are the primary sources for technical papers."
    },
    {
      id: 210,
      scenario: "A user requests datasets for climate science modeling, including temperature, precipitation, and atmospheric CO2 levels.",
      options: [REFERENCE_SOURCES.data_repository, REFERENCE_SOURCES.thesaurus, REFERENCE_SOURCES.atlas, REFERENCE_SOURCES.almanac, REFERENCE_SOURCES.bibliography, REFERENCE_SOURCES.directory, REFERENCE_SOURCES.gazetteer, REFERENCE_SOURCES.encyclopedia],
      correctId: 'data_repository',
      explanation: "Research data repositories house datasets for scientific modeling."
    }
  ]
};
