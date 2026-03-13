/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShelfBook {
  id: string;
  callNumber: {
    line1: string; // e.g., "700" or "QA76"
    line2: string; // e.g., "Ma178" or ".A12"
    line3?: string; // e.g., "2006"
    prefix?: string; // e.g., "Fil."
  };
}

export type Difficulty = 'Easy' | 'Average' | 'Difficult';

export interface ShelfShuffleLevel {
  id: number;
  difficulty: Difficulty;
  type: 'Dewey' | 'LC';
  books: ShelfBook[];
}

const createDeweyBooks = (data: string[], activityId: string): ShelfBook[] => {
  return data.map((item, index) => {
    const [num, author] = item.split(' ');
    return {
      id: `${activityId}-${index}`,
      callNumber: { line1: num, line2: author }
    };
  });
};

export const SHELF_SHUFFLE_LEVELS: ShelfShuffleLevel[] = [
  // EASY LEVELS (1-10)
  {
    id: 1,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['001.5 ANA', '002.3 JAY', '002.8 CRU', '003.2 BEN', '004.1 ELA', '005.4 DIA', '006.7 FLO', '007.3 GON', '008.6 HEN', '009.1 IVY'], 'e1')
  },
  {
    id: 2,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['100.4 ALI', '101.6 BOY', '102.3 CRU', '103.5 ELM', '104.7 DIA', '105.8 FOX', '106.4 HAY', '107.1 GIL', '108.9 IRV', '109.2 JIM'], 'e2')
  },
  {
    id: 3,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['200.1 ADA', '201.7 CAR', '202.5 BEN', '203.2 ELI', '204.6 DAN', '205.4 FAY', '206.8 GUS', '207.3 HAL', '208.6 IVA', '209.9 JON'], 'e3')
  },
  {
    id: 4,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['300.2 ALI', '301.4 BLA', '302.7 CRU', '303.1 DIA', '304.6 ELI', '305.8 FOX', '306.3 GIL', '307.5 HEN', '308.9 IAN', '309.4 JAY'], 'e4')
  },
  {
    id: 5,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['400.3 ADA', '401.5 BEN', '402.7 CAL', '403.1 DAN', '404.9 ELI', '405.2 FLO', '406.8 GIN', '407.4 HAL', '408.6 IVA', '409.1 JON'], 'e5')
  },
  {
    id: 6,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['500.2 ALI', '501.3 BEN', '502.5 CRU', '503.9 DIA', '504.1 ELI', '505.4 FOX', '506.7 GIL', '507.6 HEN', '508.2 IVY', '509.8 JAY'], 'e6')
  },
  {
    id: 7,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['600.4 ADA', '601.7 BEN', '602.5 CAR', '603.1 DAN', '604.9 ELI', '605.3 FLO', '606.8 GIL', '607.4 HAL', '608.6 IAN', '609.2 JON'], 'e7')
  },
  {
    id: 8,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['700.3 ALI', '701.1 BEN', '702.5 CRU', '703.7 DIA', '704.2 ELI', '705.8 FOX', '706.4 GIL', '707.6 HEN', '708.3 IVY', '709.9 JAY'], 'e8')
  },
  {
    id: 9,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['800.1 ADA', '801.5 BEN', '802.7 CAR', '803.2 DAN', '804.6 ELI', '805.4 FLO', '806.9 GIL', '807.3 HAL', '808.8 IVA', '809.5 JON'], 'e9')
  },
  {
    id: 10,
    difficulty: 'Easy',
    type: 'Dewey',
    books: createDeweyBooks(['900.4 ALI', '901.6 BEN', '902.1 CRU', '903.7 DIA', '904.5 ELI', '905.3 FLO', '906.9 GIL', '907.4 HEN', '908.8 IVY', '909.2 JAY'], 'e10')
  },

  // AVERAGE LEVELS (11-20)
  {
    id: 11,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['510.24 GAR', '510.8 MOR', '511.3 CLA', '511.9 ADA', '512.04 DIA', '512.6 HEN', '513.9 RAM', '514.2 BEN', '514.72 LEE', '515.3 TAN', '515.7 CAL', '516.15 CRU', '516.4 LOZ', '517.1 IVY', '518.6 FOX', '519.2 SMI'], 'a1')
  },
  {
    id: 12,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['610.12 ADA', '611.4 CRU', '611.9 KEN', '612.1 LEE', '612.8 BEN', '613.2 DIA', '614.8 JON', '615.3 MAR', '615.9 ELI', '616.3 FOX', '616.8 NOR', '617.2 OLI', '617.7 GIL', '618.4 HAL', '618.9 PAM', '619.1 IVY'], 'a2')
  },
  {
    id: 13,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['320.5 ADA', '320.9 KAY', '321.2 LEE', '321.9 BEN', '322.3 CAR', '322.8 MAR', '323.5 NEL', '323.7 DAN', '324.1 ELI', '324.6 OLI', '325.3 PAM', '325.8 FOX', '326.4 GIL', '327.2 HAL', '328.6 IVA', '329.1 JON'], 'a3')
  },
  {
    id: 14,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['711.8 CRU', '712.1 ADA', '712.6 KEN', '713.1 LEE', '713.5 ELI', '714.4 CAR', '714.9 JON', '715.2 GAR', '715.9 FOX', '716.1 GIL', '716.9 FLO', '717.7 HAL', '718.2 MOR', '718.6 DIA', '719.3 BEN', '719.8 IVY'], 'a4')
  },
  {
    id: 15,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['420.6 CRU', '421.4 ADA', '421.9 FOX', '422.1 BEN', '423.1 JON', '423.5 CAR', '424.7 DIA', '424.9 KEN', '425.2 ELI', '426.2 LEE', '426.8 FLO', '427.1 MOR', '427.6 GIL', '428.3 NOR', '428.9 HAL', '429.3 IVY'], 'a5')
  },
  {
    id: 16,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['530.6 CRU', '531.1 ADA', '531.9 FOX', '532.4 BEN', '532.8 NOR', '533.1 KEN', '533.5 CAR', '534.2 IVY', '534.7 DIA', '535.9 ELI', '536.8 FLO', '537.1 GIL', '537.6 MOR', '538.2 HAL', '538.9 LEE', '539.6 JON'], 'a6')
  },
  {
    id: 17,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['651.4 LEE', '651.9 BEN', '652.2 MOR', '652.6 CRU', '653.7 FOX', '653.9 NOR', '654.1 ADA', '654.9 GIL', '655.4 DIA', '656.2 ELI', '656.7 HAL', '657.1 JON', '657.5 CAR', '658.3 KEN', '658.8 FLO', '659.3 IVY'], 'a7')
  },
  {
    id: 18,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['740.4 ADA', '741.3 BEN', '741.9 CRU', '742.1 FOX', '742.7 CAR', '743.1 DIA', '743.8 IVY', '744.3 KEN', '744.9 ELI', '745.1 LEE', '745.8 HAL', '746.5 FLO', '746.9 MOR', '747.2 NOR', '747.6 GIL', '748.2 JON'], 'a8')
  },
  {
    id: 19,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['850.9 CRU', '851.4 BEN', '851.9 FOX', '852.2 GIL', '852.6 CAR', '853.1 ADA', '853.7 KEN', '854.2 DIA', '854.9 LEE', '855.1 MOR', '855.5 ELI', '856.2 NOR', '856.8 FLO', '857.4 HAL', '858.7 JON', '859.3 IVY'], 'a9')
  },
  {
    id: 20,
    difficulty: 'Average',
    type: 'Dewey',
    books: createDeweyBooks(['920.4 ADA', '921.6 FLO', '921.9 CRU', '922.8 BEN', '923.1 FOX', '923.4 CAR', '924.2 KEN', '924.9 DIA', '925.3 JON', '926.1 ELI', '926.8 LEE', '927.1 MOR', '927.7 GIL', '928.2 HAL', '928.9 NOR', '929.5 IVY'], 'a10')
  },

  // DIFFICULT LEVELS (21-30)
  {
    id: 21,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['823.91 AUS', '823.91 DIC', '823.911 KAY', '823.912 LEW', '823.912 OLI', '823.912 ORW', '823.913 ELI', '823.913 PAM', '823.914 GAI', '823.914 KIN', '823.914 MAR', '823.914 NOR', '823.914 ROW', '823.915 FOX', '823.916 LEE', '823.917 HAL', '823.918 IVY', '823.919 JON', '823.92 CLA', '823.92 TOL'], 'd1')
  },
  {
    id: 22,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['940.53 ADA', '940.531 CAR', '940.5311 LEE', '940.5312 MAR', '940.5313 NOR', '940.5314 OLI', '940.5315 PAM', '940.5316 QUA', '940.5317 RAY', '940.5318 SAM', '940.5319 TOM', '940.532 DAN', '940.533 ELI', '940.534 FOX', '940.535 GIL', '940.536 HAL', '940.537 IVA', '940.538 JON', '940.539 KEN', '940.54 BEN'], 'd2')
  },
  {
    id: 23,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['641.560 CRU', '641.561 FOX', '641.562 BEN', '641.563 ADA', '641.5630 SAM', '641.5631 MOR', '641.5632 DIA', '641.5633 QUA', '641.5634 PAM', '641.5635 FLO', '641.5636 RAY', '641.5637 ELI', '641.5638 LEE', '641.5639 NOR', '641.564 GIL', '641.565 CAR', '641.566 HAL', '641.567 IVY', '641.568 JON', '641.569 KEN'], 'd3')
  },
  {
    id: 24,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['305.890 CRU', '305.891 BEN', '305.892 ADA', '305.8921 KEN', '305.8922 PAM', '305.8923 LEE', '305.8924 NOR', '305.8925 MOR', '305.8926 QUA', '305.8927 RAY', '305.8928 SAM', '305.8929 TOM', '305.893 DIA', '305.8931 UMA', '305.894 ELI', '305.895 FOX', '305.896 GIL', '305.897 HAL', '305.898 IVY', '305.899 JON'], 'd4')
  },
  {
    id: 25,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['796.331 CRU', '796.334 ADA', '796.335 BEN', '796.336 DIA', '796.337 ELI', '796.338 FLO', '796.339 GIL', '796.340 HAL', '796.341 IVY', '796.342 JON', '796.343 KEN', '796.344 LEE', '796.345 MOR', '796.346 NOR', '796.347 PAM', '796.348 QUA', '796.349 RAY', '796.350 SAM', '796.351 TOM', '796.352 UMA'], 'd5')
  },
  {
    id: 26,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['973.90 CRU', '973.91 ADA', '973.92 BEN', '973.93 CAR', '973.94 DIA', '973.95 ELI', '973.951 KEN', '973.952 LEE', '973.953 MOR', '973.954 NOR', '973.955 PAM', '973.956 QUA', '973.957 RAY', '973.958 SAM', '973.959 TOM', '973.960 UMA', '973.96 GIL', '973.97 HAL', '973.98 IVY', '973.99 JON'], 'd6')
  },
  {
    id: 27,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['811.54 ADA', '811.55 BEN', '811.56 CAR', '811.57 DIA', '811.58 ELI', '811.59 FLO', '811.60 GIL', '811.61 HAL', '811.62 IVY', '811.63 JON', '811.64 KEN', '811.65 LEE', '811.66 MOR', '811.67 NOR', '811.68 PAM', '811.69 QUA', '811.70 RAY', '811.71 SAM', '811.72 TOM', '811.73 UMA'], 'd7')
  },
  {
    id: 28,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['371.394 ADA', '371.395 BEN', '371.397 CAR', '371.398 DIA', '371.399 ELI', '371.401 FLO', '371.402 GIL', '371.403 HAL', '371.404 IVY', '371.405 JON', '371.406 KEN', '371.407 LEE', '371.408 MOR', '371.409 NOR', '371.410 PAM', '371.411 QUA', '371.412 RAY', '371.413 SAM', '371.414 TOM', '371.415 UMA'], 'd8')
  },
  {
    id: 29,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['629.132 ADA', '629.133 BEN', '629.134 CAR', '629.135 DIA', '629.136 ELI', '629.137 FLO', '629.138 GIL', '629.139 HAL', '629.140 IVY', '629.141 JON', '629.142 KEN', '629.143 LEE', '629.144 MOR', '629.145 NOR', '629.146 PAM', '629.147 QUA', '629.148 RAY', '629.149 SAM', '629.150 TOM', '629.151 UMA'], 'd9')
  },
  {
    id: 30,
    difficulty: 'Difficult',
    type: 'Dewey',
    books: createDeweyBooks(['004.671 BEN', '004.672 CAR', '004.673 DIA', '004.674 ELI', '004.675 FLO', '004.676 GIL', '004.677 HAL', '004.678 ADA', '004.679 IVY', '004.680 JON', '004.681 KEN', '004.682 LEE', '004.683 MOR', '004.684 NOR', '004.685 PAM', '004.686 QUA', '004.687 RAY', '004.688 SAM', '004.689 TOM', '004.690 UMA'], 'd10')
  },
];

// Helper to generate more levels if needed
export const getLevelById = (id: number) => SHELF_SHUFFLE_LEVELS.find(l => l.id === id);
