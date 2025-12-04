<template>
  <ul class="todo-list" aria-label="Task list">
    <TodoItem
      v-for="t in tasks"
      :key="t.id"
      :task="t"
      @remove="$emit('remove', $event)"
      @status="$emit('status', $event)"
    />
  </ul>
</template>

<script setup lang="ts">
import type { Task } from '@/types'
import TodoItem from './TodoItem.vue'

defineProps<{ tasks: Task[] }>()
defineEmits<{
  (e: 'remove', id: string): void
  (e: 'status', payload: { id: string; status: Task['status'] }): void
}>()
</script>
