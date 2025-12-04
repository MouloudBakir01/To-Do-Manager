// enum des statuts de tâche
export enum Status {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

// contrat de données d'une tâche
export interface Task {
  id: string
  title: string
  status: Status
}
