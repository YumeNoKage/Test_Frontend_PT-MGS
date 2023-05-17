<template>
  <Notification/>
  <div v-if="isLoginIn">
    <Navigation/>
    <div class="px-4 my-4">
      <div class="row">
        <div class="d-none d-lg-block col-lg-2">
          <Profile/>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-10">
          <router-view :key="$route.path"/>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue'
import Profile from '@/components/Profile/Profile.vue'
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Navigation,
    Profile
  },

  computed:{
    ...mapGetters({
      isLoginIn: 'isLoginIn',
      notification: 'notification'
    })
  },

  watch:{
    '$route.path'(newValue){
      const token = localStorage.getItem('token')

      if ((newValue === '/login' || newValue === '/registration') && token) {
        this.$router.push('/barang')
      }
    }
  },

  methods:{
    ...mapMutations({
      setIsLogin: 'setIsLogin'
    })
  },

  mounted() {
    const token = localStorage.getItem('token')

    if(token && !this.isLoginIn){
      this.setIsLogin(token || false)
  //     this.$router.push('/barang')
  //   } else {
    } else if (!token){
      this.$router.push('/')
    }
    
  //   if ((this.$route.path === '/login' || this.$route.path === '/registration') && token) {
  //     this.$router.push('/barang')
  //   }
  },
}
</script>