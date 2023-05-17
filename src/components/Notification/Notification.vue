<template>
  <div class="absolute top-0">
      <div class="toast" :class="show ? 'show': ''" style="position: absolute; top: 10px; right: 10px; z-index: 999;">
        <div class="toast-header d-flex justify-content-between">
          <strong class="mr-auto">{{ notification.title }}</strong>
          <button type="button" class="ml-2 mb-1 close border-0 bg-white" @click="closeBtn()" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          {{ notification.message }}
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data(){
    return {
      show: false
    }
  },

  computed: {
    ...mapGetters({
      notification: 'notification'
    })
  },

  watch: {
    'notification':{
      deep: true,
      handler(newValue){
        if (newValue.title) {
          this.show = true
        }
      }
    }
  },

  methods: {
    ...mapMutations({
      setNotification: 'setNotification'
    }),

    closeBtn(){
      this.show = false
      this.setNotification({
        title: null,
        message: null
      })
    }
  },

}
</script>