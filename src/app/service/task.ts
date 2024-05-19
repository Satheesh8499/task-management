
export interface Task {
    id: number;
    name: string;
    description: string;
    assignedTo: string;
    priority: string;
    status: string;
    startDate: Date;
    dueDate: Date;
    completedDate: Date | null;
    labels: string[];
  }