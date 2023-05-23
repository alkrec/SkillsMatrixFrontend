<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import Form from '../components/Form.vue'

const categories = ref([])
const categoryId = ref('')
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
// Summary: get form ready for update
const fillForm = (id, name, description) => {
  categoryId.value = id
  categoryName.value = name
  categoryDescription.value = description
}


//
// Summary: event handler for category update
const handleUpdate = async (event) => {
  event.preventDefault()
  const updatedCategory = { //create new Category object from user input
    name: categoryName.value,
    description: categoryDescription.value,
    isActive: true
  }

  try {
    console.log(`within ${categoryId.value}`)
    const response = await axios.put(`https://localhost:7191/api/category/${categoryId.value}`, updatedCategory) //post request with new category
    // const returnedCategory = response.data
    // const a = [...categories.value, {...returnedCategory}] // create new array from existing categories, with updated category added
    const filteredCategories = categories.value.filter(category => category.id !== categoryId.value)
    categories.value = [...filteredCategories, response.data] // create new array from existing categories, with updated category added
    categoryId.value = ''
    categoryName.value = ''
    categoryDescription.value = ''
    alert(`Successfully updated name: ${response.data.name} description: ${response.data.description}`)
  } catch (error) {
    console.log(error)
  }
}

//
// Summary: event handler for category update
const handleDelete = async (id) => {
  try {
    const removedCategory = categories.value.find(category => category.id === id)
    await axios.delete(`https://localhost:7191/api/category/${id}`) //post request with new category
    categories.value = categories.value.filter(category => category.id !== id)
    alert(`Successfully Deleted name: ${removedCategory.name} description: ${removedCategory.description}`)
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <main>
    <h2>Category List</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }} {{ category.description }}
        <button v-on:click="() => fillForm(category.id, category.name, category.description)">Update</button>
      <button v-on:click="() => handleDelete(category.id)">Delete</button>
      </li>
    </ul>
    <div v-if="categoryId">
      <Form 
      title="Update Category"
      v-model:name="categoryName"
      v-model:description="categoryDescription"
      :handleSubmit="handleUpdate"></Form>
    </div>
    
  </main>
</template>