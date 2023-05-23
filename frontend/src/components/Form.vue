<script setup>
  // import { ref } from 'vue'
  // defineProps(['eventHandler', 'name', 'description'])
  defineProps({
    name: String,
    description: String,
    handleSubmit: Function
  })
  
  defineEmits(['update:name', 'update:description'])
</script>

<template>
    <form v-on:submit="handleSubmit">
      <p>Name
        <input 
          type="text" 
          :value="name"
          @input="$emit('update:name', $event.target.value)"
        />
      </p>
      <p> Description
        <input 
          type="text" 
          :value="description"
          @input="$emit('update:description', $event.target.value)"
        />
      </p>
      <button type="submit">Submit</button>
    </form>
</template>