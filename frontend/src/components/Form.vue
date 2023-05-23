<script setup>
  defineProps({
    title: String,
    name: String,
    description: String,
    isActive: Boolean,
    handleSubmit: Function
  })
  
  defineEmits(['update:name', 'update:description', 'update:isActive'])
</script>

<template>
    <h2>{{ title }}</h2>
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
      <p>
        <input 
          type="checkbox" 
          :value="isActive"
          :checked="isActive"
          @input="$emit('update:isActive', $event.target.checked)"
          />
        <label for="isActive">Is Active</label>
      </p>
      <button type="submit">Submit</button>
    </form>
</template>