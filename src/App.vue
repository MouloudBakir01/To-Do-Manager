<template>
  <div class="layout">
    <AppHeader />

    <main class="content" role="main">
      <section class="panel">
        <h2 class="panel-title">Create task</h2>
        <TodoForm @create="addTask" />
      </section>

      <section class="panel">
        <header class="panel-row">
          <h2 class="panel-title">Your tasks</h2>
          <span class="meta">{{ doneCount }} / {{ total }} done</span>
        </header>

        <TodoList
          :tasks="tasks"
          @remove="removeTask"
          @status="({ id, status }) => updateStatus(id, status)"
        />
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// composants
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'

// état et actions
import { useTodos } from '@/composables/useTodos'
const { tasks, total, doneCount, addTask, removeTask, updateStatus } = useTodos()
</script>
