<template>
  <li class="todo-item" :data-status="task.status">
    <span class="task-title">{{ task.title }}</span>

    <select
      class="select"
      :value="task.status"
      @change="onChange(($event.target as HTMLSelectElement).value)"
      aria-label="Change task status"
    >
      <option :value="Status.TODO">A faire</option>
      <option :value="Status.IN_PROGRESS">En cours</option>
      <option :value="Status.DONE">Fait</option>
    </select>

    <button
      class="icon danger"
      @click="emit('remove', task.id)"
      aria-label="Delete task"
    >
      ✕
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Task } from '@/types'
import { Status } from '@/types'

// Props + événements
const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  (e: 'remove', id: string): void
  (e: 'status', payload: { id: string; status: Status }): void
}>()

// vérifie qu'une string correspond bien à une valeur de Status
function isStatus(x: string): x is Status {
  return x === Status.TODO || x === Status.IN_PROGRESS || x === Status.DONE
}

function onChange(next: string) {
  if (!isStatus(next)) return
  emit('status', { id: props.task.id, status: next })
}
</script>
