export interface Activity {
  id: string,
  date: string,
  distance: string,
  correct: boolean
}

export type ListActivity = Array<Activity>
