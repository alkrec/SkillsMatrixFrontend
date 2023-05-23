<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Form from '../components/Form.vue'

const categories = ref([])
const categoryId = ref('')
const categoryName = ref('')
const categoryDescription = ref('')
// const categoryIsActive = ref(null)



//
// Summary: Get all categories
onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7191/api/category') //retrieve categories from db
    categories.value = response.data //assign categories to reactive array
  } catch (error) {
    console.log(error)
  }
})


//
// Summary: get form ready for update
const fillForm = (id, name, description) => { //assigning values to these reactive variables, activates form with v-if
  categoryId.value = id
  categoryName.value = name
  categoryDescription.value = description
  // categoryIsActive.value = isActive
}


//
// Summary: event handler for category update
const handleUpdate = async (event) => {
  event.preventDefault() //prevent refresh
  const updatedCategory = { //create new Category object from user input
    name: categoryName.value,
    description: categoryDescription.value,
    isActive: true
    // isActive: categoryIsActive.value
  }

  try {
    const response = await axios.put(`https://localhost:7191/api/category/${categoryId.value}`, updatedCategory) //put request with updated category
    const updatedCategories = categories.value.reduce((filteredArray, category) => { //create new categories array with updated category object
      if (category.id === categoryId.value) {
        return [...filteredArray, response.data] //add updated category to category array
      }
      return [...filteredArray, category] //add unchanged categories to array
    }, [])
    categories.value = updatedCategories // assign updatedCategories Array
    // categoryId.value = '' //clear form
    // categoryName.value = '' //clear form
    // categoryDescription.value = '' //clear form
    // // categoryIsActive.value = '' //clear form
    clearForm();
    alert(`Successfully updated name: ${response.data.name} description: ${response.data.description}`)
  } catch (error) {
    console.log(error)
  }
}

// const clearForm = () => {
//   categoryId.value = '' 
//   categoryName.value = '' 
//   categoryDescription.value = '' 
//   categoryIsActive.value = null 
// }

//
// Summary: event handler for category update
const handleDelete = async (id) => {
  try {
    const removedCategory = categories.value.find(category => category.id === id) //locate category to be removed
    await axios.delete(`https://localhost:7191/api/category/${id}`) //delete request for category to be removed
    categories.value = categories.value.filter(category => category.id !== id) //remove category and assign new categories array
    alert(`Successfully Deleted name: ${removedCategory.name} description: ${removedCategory.description}`)
  } catch (error) {
    console.log(error)
  }
}

//
// Summary: event handler for category update
const clearForm = () => {
  categoryId.value = '' 
  categoryName.value = '' 
  categoryDescription.value = '' 
  // categoryIsActive.value = null 
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
      <button v-on:click="clearForm">Cancel</button>
    </div>
    <!-- v-model:isActive="categoryIsActive" -->
    
  </main>
</template>