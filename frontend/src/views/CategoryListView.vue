<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Form from '../components/Form.vue'

const categories = ref([])
const categoryName = ref('')
const categoryDescription = ref('')


//
// Summary: Retreive category list
onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7191/api/category')
    categories.value = response.data
  } catch (error) {
    console.log(error)
  }
})


//
// Summary: event handler for category create
const handleCreate = async (event) => {
  event.preventDefault(); //prevent refresh
  console.log('test')
  const newCategory = { //create new Category object from user input
    name: categoryName.value,
    description: categoryDescription.value,
    isActive: true
  }

  try {
    const response = await axios.post('https://localhost:7191/api/category', newCategory) //post request with new category
    categories.value = [...categories.value, response.data] // create new array from existing categories, with new category added
  } catch (error) {
    console.log(error)
  }

}


//
// Summary: event handler for category update
const handleUpdate = async (name, description) => {
  categoryName.value = name
  categoryDescription.value = description


}
</script>

<template>
  <main>
    <h2>Create/Update Category</h2>
    <Form 
      v-model:name="categoryName"
      v-model:description="categoryDescription"
      :handleSubmit="handleCreate"></Form>
    <p>------------------------</p>
    <p>------------------------</p>
    <p>------------------------</p>
    <h2>Category List</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }} {{ category.description }}
        <button v-on:click="() => handleUpdate(category.name, category.description)">Update</button>
      </li>
    </ul>
  </main>
</template>