// data/mock-boxes.ts
import { Box, Document } from '../interfaces/box.interface'

export const MOCK_BOXES: Box[] = [
  {
    id: 1,
    name: 'Коробка 1',
    totalSlots: 50,
    occupiedSlots: 38,
    documentsInBox: 32,
    missingDocuments: 6,
    documents: Array.from({ length: 50 }, (_, i) => {
      const code = '3.06.008';
      const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][Math.floor(Math.random() * 10)] || 'A';
      const status = Math.random() > 0.9 ? 'missing' : 'active';
      // Явно указываем тип Document
      const doc: Document = { code: `${code} ${letter}`, status };
      return doc;
    })
  },
  {
    id: 2,
    name: 'Коробка 2',
    totalSlots: 50,
    occupiedSlots: 50,
    documentsInBox: 46,
    missingDocuments: 4,
    documents: Array.from({ length: 50 }, (_, i) => {
      const code = '3.06.008';
      const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][Math.floor(Math.random() * 10)] || 'A';
      const status = Math.random() > 0.9 ? 'missing' : 'active';
      // Явно указываем тип Document
      const doc: Document = { code: `${code} ${letter}`, status };
      return doc;
    })
  },
  // Добавь ещё несколько коробок по аналогии
  ...Array.from({ length: 14 }, (_, i) => ({
    id: i + 3,
    name: `Коробка ${i + 3}`,
    totalSlots: 50,
    occupiedSlots: 38-i,
    documentsInBox: 32,
    missingDocuments: 6,
    documents: Array.from({ length: 50 }, (_, j) => {
      const code = '3.06.008';
      const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][Math.floor(Math.random() * 10)] || 'A';
      const status = Math.random() > 0.9 ? 'missing' : 'active';
      const doc: Document = { code: `${code} ${letter}`, status };
      return doc;
    })
  }))
];