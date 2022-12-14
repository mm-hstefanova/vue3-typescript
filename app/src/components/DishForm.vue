<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Dish } from '@/types'

type PropTypes = {
  dish: Dish | null
}
const props = defineProps<PropTypes>()

const emit = defineEmits<{
  (e: 'add-new-dish', dish: Dish): void
  (e: 'edit-dish', dish: Dish): void
  (e: 'cancel-new-dish'): void
}>()

const addDish = (dish: Dish): void => {
  emit('add-new-dish', dish)
}

const editDish = (dish: Dish): void => {
  emit('edit-dish', dish)
}

const cancel = (): void => {
  emit('cancel-new-dish')
}

const elNameInput = ref<HTMLInputElement | null>(null)
onMounted(() => elNameInput.value?.focus())

const newDish = ref<Dish>({
  id: props.dish?.id || uuidv4(),
  name: props.dish?.name || '',
  status: props.dish?.status || 'Want to Try',
  diet: props.dish?.diet || '',
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="newDish.name"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="editDish(newDish)" v-if="dish" class="button is-success">Edit</button>

          <button @click="addDish(newDish)" v-else class="button is-success">Create</button>
          <button @click="cancel" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
