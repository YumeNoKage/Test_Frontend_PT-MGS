<template>
  <nav aria-label="pagination d-flex justify-content-center">
    <ul class="pagination justify-content-center">
      <li class="page-item" v-if="currentPage > 1"><a class="page-link" :href="$route.path + `?limit=${limit}&offset=${currentPage - 1}`">Previous</a></li>
      <li class="page-item"><span class="page-link">{{ currentPage }}</span></li>
      <li class="page-item" v-if="currentPage < totalPages"><a class="page-link" :href="$route.path + `?limit=${limit}&offset=${currentPage + 1}`">Next</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
  }
}
</script>