/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MARCTag {
  tag: string;
  label: string;
  description: string;
}

export interface MARCQuestion {
  id: string;
  content: string;
  correctTag: string;
}

export const MARC_TAGS: MARCTag[] = [
  { tag: '020', label: 'ISBN', description: 'International Standard Book Number' },
  { tag: '100', label: 'Personal Name', description: 'Main entry - Personal Name (Author)' },
  { tag: '245', label: 'Title', description: 'Title Statement' },
  { tag: '260', label: 'Publication', description: 'Publication, Distribution, etc. (Imprint)' },
  { tag: '300', label: 'Physical Description', description: 'Physical Description (Pages, size)' },
  { tag: '490', label: 'Series', description: 'Series Statement' },
  { tag: '500', label: 'General Note', description: 'General Note' },
  { tag: '650', label: 'Subject', description: 'Subject Added Entry - Topical Term' },
  { tag: '700', label: 'Added Name', description: 'Added Entry - Personal Name' },
  { tag: '856', label: 'Electronic Access', description: 'Electronic Location and Access (URL)' },
];

export const MARC_QUESTIONS: MARCQuestion[] = [
  { id: 'q1', content: '978-0-123456-78-9', correctTag: '020' },
  { id: 'q2', content: 'Miyazaki, Hayao, 1941-', correctTag: '100' },
  { id: 'q3', content: 'The Boy and the Heron', correctTag: '245' },
  { id: 'q4', content: 'New York : Studio Ghibli, 2023.', correctTag: '260' },
  { id: 'q5', content: '124 pages : color illustrations ; 24 cm', correctTag: '300' },
  { id: 'q6', content: 'Includes bibliographical references.', correctTag: '500' },
  { id: 'q7', content: 'Animated films -- Japan.', correctTag: '650' },
  { id: 'q8', content: 'Studio Ghibli Collection', correctTag: '490' },
  { id: 'q9', content: 'Suzuki, Toshio, 1948-', correctTag: '700' },
  { id: 'q10', content: 'https://www.ghibli.jp/works/kimitachi/', correctTag: '856' },
  { id: 'q11', content: '0-545-01022-5', correctTag: '020' },
  { id: 'q12', content: 'Rowling, J. K.', correctTag: '100' },
  { id: 'q13', content: 'Harry Potter and the Deathly Hallows', correctTag: '245' },
  { id: 'q14', content: 'London : Bloomsbury, 2007.', correctTag: '260' },
  { id: 'q15', content: '607 p. ; 21 cm.', correctTag: '300' },
  { id: 'q16', content: 'First American edition.', correctTag: '500' },
  { id: 'q17', content: 'Wizards -- Fiction.', correctTag: '650' },
  { id: 'q18', content: 'Harry Potter series', correctTag: '490' },
  { id: 'q19', content: 'GrandPré, Mary', correctTag: '700' },
  { id: 'q20', content: 'http://www.jkrowling.com', correctTag: '856' },
];
