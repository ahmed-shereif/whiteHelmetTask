export interface WeeklySalesResponse {
    series: {
      name: string; // e.g., "dog", "cat"
      data: number[]; // daily sales numbers
    }[];
    categories: string[]; // dates like "2023-01-23"
  }