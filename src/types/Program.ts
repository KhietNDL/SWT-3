export interface Program {
    id: number;
    name: string;
    description: string;
    duration: string;
    startDate: string;
    endDate: string;
    status: "Open" | "Full" | "Closed";
  }