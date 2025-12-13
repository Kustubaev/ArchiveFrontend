export interface Box {
  id: number;
  name: string; // "Коробка 1"
  totalSlots: number; // 50
  occupiedSlots: number; // 38
  documentsInBox: number; // 32
  missingDocuments: number; // 6
  documents: Document[]; // Массив дел
}

export interface Document {
  code: string; // "3.06.008 А"
  status: 'active' | 'missing' | 'partial'; // Статус дела
}