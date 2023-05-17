<template>
  <div v-if="userProfile">
    <div class="card w-auto border-0 mb-3 shadow">
      <img src="../../assets/logo.png" class="card-img-top d-none d-lg-block" alt="Dummy User">
      <div class="card-body bg-info d-none d-md-none d-lg-block rounded-bottom">
        <h5 class="card-title mb-0">{{ userProfile.profileName }}</h5>
      </div>
      <div class="card-body bg-white d-block d-lg-none rounded">
        <h5 class="card-title mb-0 text-center">{{ userProfile.profileName }}</h5>
      </div>
    </div>
    <div class="card w-auto border-0 mb-3 shadow">
      <div class="card-body bg-info d-none d-lg-block rounded-top">
        <h5 class="card-title mb-0">Menu</h5>
      </div>
      <div class="card-body d-block d-lg-none rounded">
        <h5 class="card-title mb-0 text-center">Menu</h5>
      </div>
      <div class="card-body" :class="$route.path === '/barang' ? 'text-bg-primary' : ''" @click="$router.push('/barang')">
        <h6 class="card-title mb-0 fst-normal">Barang</h6>
      </div>
      <div class="card-body rounded-bottom overflow-hidden" :class="$route.path === '/supplier' ? 'text-bg-primary' : ''" @click="$router.push('/supplier')">
        <h6 class="card-title mb-0 fst-normal">Supplier</h6>
      </div>
    </div>
    <div class="card w-auto border-0 mb-3 shadow">
      <div class="card-body bg-info d-none d-lg-flex rounded-top justify-content-center align-items-center">
        <h5 class="card-title mb-0 pr-2">Online</h5>
        <div class="bg-success rounded-circle ms-2" style="width: 10px; height: 10px"></div>
      </div>
      <div class="card-body d-flex d-lg-none rounded justify-content-center align-items-center">
        <h5 class="card-title mb-0 pr-2">Online</h5>
        <div class="bg-success rounded-circle ms-2" style="width: 10px; height: 10px"></div>
      </div>
      <div class="card-body py-1 row">
        <p class="card-title mb-0 fst-normal col">Hari Online</p>
        <p class="card-title mb-0 fst-normal col">: {{ new Date(userOnline).toISOString().split('T')[0] }}</p>
      </div>
      <div class="card-body py-1 pb-3 row">
        <p class="card-title mb-0 fst-normal col">Waktu Online</p>
        <p class="card-title mb-0 fst-normal col">: {{ new Date(new Date(userOnline).setUTCHours(7)).toISOString().split('T')[1].substring(0,8) }}</p>
      </div>
    </div>
    <div class="card w-auto border-0 shadow">
      <div class="card-body rounded" @click="logOut()" style="cursor: pointer">
        <h6 class="card-title mb-0">Log Out</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default{
  computed: {
    ...mapGetters({
      userProfile: 'userProfile',
      userOnline: 'userOnline'
    })
  },

  methods: {
    ...mapMutations({
      removeToken: 'removeToken'
    }),

    logOut(){
      this.removeToken()
      localStorage.removeItem('userOnline')

      window.location.reload()
    }
  },
}
</script>