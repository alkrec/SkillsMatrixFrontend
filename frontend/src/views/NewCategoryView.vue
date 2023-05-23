<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Form from '../components/Form.vue'
import { useRouter } from 'vue-router'

const categoryName = ref('')
const categoryDescription = ref('')

const router = useRouter()

//
// Summary: event handler for category create
const handleCreate = async (event) => {
  event.preventDefault(); //prevent refresh
  const newCategory = { //create new Category object from user input
    name: categoryName.value,
    description: categoryDescription.value,
    isActive: true
  }

  try {
    const response = await axios.post('https://localhost:7191/api/category', newCategory) //post request with new category
    alert(`Successfully added name: ${response.data.name} description: ${response.data.description}`)
    router.push('/') //redirect to home page
  } catch (error) {
    console.log(error)
  }

}
</script>

<template>
  <div>
    <Form 
      title="New Category"
      v-model:name="categoryName"
      v-model:description="categoryDescription"
      :handleSubmit="handleCreate"></Form>
  </div>
</template>