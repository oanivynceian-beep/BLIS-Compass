/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShelfBook {
  id: string;
  callNumber: {
    line1: string; // e.g., "700" or "QA76"
    line2: string; // e.g., "Ma178" or ".A12"
    line3: string; // e.g., "2006"
    prefix?: string; // e.g., "Fil."
  };
}

export interface ShelfShuffleLevel {
  id: number;
  type: 'Dewey' | 'LC';
  books: ShelfBook[];
}

export const SHELF_SHUFFLE_LEVELS: ShelfShuffleLevel[] = [
  {
    id: 1,
    type: 'Dewey',
    books: [
      { id: 'b1', callNumber: { line1: '110', line2: 'G10', line3: '1989', prefix: 'Fil.' } },
      { id: 'b2', callNumber: { line1: '160', line2: 'Pe555', line3: '2009', prefix: 'Fil.' } },
      { id: 'b3', callNumber: { line1: '700', line2: 'Ma178', line3: '2006', prefix: 'Fil.' } },
      { id: 'b4', callNumber: { line1: '800', line2: 'L116', line3: '2004', prefix: 'Fil.' } },
      { id: 'b5', callNumber: { line1: '850', line2: 'Gr60', line3: '2004', prefix: 'Fil.' } },
      { id: 'b6', callNumber: { line1: '900', line2: 'R222', line3: '1990', prefix: 'Fil.' } },
    ],
  },
  {
    id: 2,
    type: 'Dewey',
    books: [
      { id: 'b1', callNumber: { line1: '100', line2: 'B265', line3: '2000', prefix: 'Fil.' } },
      { id: 'b2', callNumber: { line1: '120', line2: 'K652', line3: '1990', prefix: 'Fil.' } },
      { id: 'b3', callNumber: { line1: '450', line2: 'Ni752', line3: '2004', prefix: 'Fil.' } },
      { id: 'b4', callNumber: { line1: '700', line2: 'Ma178', line3: '2006', prefix: 'Fil.' } },
      { id: 'b5', callNumber: { line1: '700', line2: 'Ma178', line3: '2010', prefix: 'Fil.' } },
      { id: 'b6', callNumber: { line1: '800', line2: 'D212', line3: '2005', prefix: 'Fil.' } },
    ],
  },
  {
    id: 11,
    type: 'LC',
    books: [
      { id: 'b1', callNumber: { line1: 'BF76', line2: '.A25', line3: '2017' } },
      { id: 'b2', callNumber: { line1: 'BF76', line2: '.B38', line3: '2022' } },
      { id: 'b3', callNumber: { line1: 'DS101', line2: '.A25', line3: '2016' } },
      { id: 'b4', callNumber: { line1: 'QA76', line2: '.B45', line3: '2019' } },
      { id: 'b5', callNumber: { line1: 'Z665', line2: '.A12', line3: '2016' } },
      { id: 'b6', callNumber: { line1: 'Z665', line2: '.B45', line3: '2023' } },
    ],
  },
  {
    id: 12,
    type: 'LC',
    books: [
      { id: 'b1', callNumber: { line1: 'PN199', line2: '.B62', line3: '2021' } },
      { id: 'b2', callNumber: { line1: 'QA76', line2: '.A12', line3: '2018' } },
      { id: 'b3', callNumber: { line1: 'QA76', line2: '.A12', line3: '2021' } },
      { id: 'b4', callNumber: { line1: 'QA76', line2: '.C78', line3: '2020' } },
      { id: 'b5', callNumber: { line1: 'TX714', line2: '.A25', line3: '2018' } },
      { id: 'b6', callNumber: { line1: 'TX714', line2: '.B38', line3: '2022' } },
    ],
  },
];

// Helper to generate more levels if needed
export const getLevelById = (id: number) => SHELF_SHUFFLE_LEVELS.find(l => l.id === id);
