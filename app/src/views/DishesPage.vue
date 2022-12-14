<script setup lang="ts">
import DishForm from '../components/DishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { ref, defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Dish } from '@/types'
import { useDishStore } from '@/store/DishStore'

const filterText = ref('')
const dishStore = useDishStore()

const showNewForm = ref(false)
const dishToEdit = ref<Dish | null>(null)

const filteredDishList = computed((): Dish[] => {
  return dishStore.list.filter((dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishStore.list
    }
  })
})

const numberOfDishes = computed((): number => {
  return filteredDishList.value.length
})

const addDish = (payload: Dish) => {
  dishStore.addDish(payload)
  hideForm()
}

const editDish = (payload: Dish) => {
  dishStore.editDish(payload)
  dishToEdit.value = null
  hideForm()
}

const redirectToEditMode = (payload: Dish) => {
  dishToEdit.value = payload
  showNewForm.value = true
}

const hideForm = () => {
  showNewForm.value = false
}

onMounted(() => {
  const route = useRoute()

  if (route.query.new) {
    showNewForm.value = true
  }
})

const updateFilterText = (event: KeyboardEvent) => {
  filterText.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Dish name"
                    :value="filterText"
                    @keyup.enter="updateFilterText"
                    @keyup.backspace="filterText = ''"
                  />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <DishForm
          v-if="showNewForm"
          @add-new-dish="addDish"
          :dish="dishToEdit"
          @edit-dish="editDish"
          @cancel-new-dish="hideForm"
        />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @edit-dish="redirectToEditMode" @delete-dish="dishStore.deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
