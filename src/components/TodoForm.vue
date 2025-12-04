<template>
  <form class="todo-form" @submit.prevent="submit">
    <label for="title" class="sr-only">New task title</label>
    <input
      id="title"
      v-model="title"
      type="text"
      class="field"
      placeholder="Ajouter une tache…"
      :aria-invalid="hasError ? 'true' : 'false'"
    />
    <button type="submit" class="btn">Ajouter</button>

    <p v-if="hasError" class="error" role="alert">Titre obligatoire</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// émission d'un titre valide vers le parent
const emit = defineEmits<{ (e: 'create', title: string): void }>()

const title = ref('')
const hasError = ref(false)

function submit() {
  hasError.value = title.value.trim().length === 0
  if (hasError.value) return
  emit('create', title.value)
  title.value = '' 
}
</script>
