import { ref, computed, watch } from 'vue'
import type { Task } from '@/types'
import { Status } from '@/types'

const STORAGE_KEY = 'tdm.tasks.v1'

// charge les tâches depuis localStorage
function load(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

// génère un id simple et unique
function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

const tasks = ref<Task[]>(load())

// persistance automatique
watch(
  tasks,
  (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
  { deep: true }
)

// computed utiles
const total = computed(() => tasks.value.length)
const doneCount = computed(() => tasks.value.filter(t => t.status === Status.DONE).length)

function addTask(title: string): void {
  const t = title.trim()
  if (!t) return
  tasks.value.unshift({ id: uid(), title: t, status: Status.TODO }) // unshift = met en haut de la liste
}

function removeTask(id: string): void {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

function updateStatus(id: string, status: Status): void {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.status = status
}

export function useTodos() {
  return { tasks, total, doneCount, addTask, removeTask, updateStatus, Status }
}
