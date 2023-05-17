<template>
  <div class="container" style="height: 100vh">
    <div class="d-flex h-100 justify-content-center align-items-center">
      <div class="row w-100">
        <div class="col-sm-12 col-md-12 col-lg-6 mb-5">
          <div class="d-flex justify-content-center align-items-center h-100">
            <img src="../assets/logo.png" alt="dummy logo">
          </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-6">
          <div class="mh-100 rounded-3 overflow-hidden shadow">
            <div class="bg-info">
              <h2 class="text-primary text-center py-2">Register</h2>
            </div>
            <form @submit.prevent="submit()" class="p-4">
              <div class="mb-3">
                <label for="username" class="form-label" >Username</label>
                <input v-model="form.username" type="text" class="form-control" id="username" placeholder="Enter Username" required>
              </div>
              <div class="mb-3">
                <label for="profileName" class="form-label" >Profile Name</label>
                <input v-model="form.profileName" type="text" class="form-control" id="profileName" placeholder="Enter Profile Name" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label" >Password</label>
                <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Enter Password" autocomplete="on" required>
              </div>
              <button type="submit" class="btn btn-primary d-block mx-auto">Daftar</button>
            </form>
            <a href="/login" class="text-center w-100 d-block mb-4">
              Sudah Punya Akun
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data(){
    return {
      form: {
        password: null,
        profileName: null,
        username: null,
      }
    }
  },

  methods:{
    ...mapActions({
      postData: 'postData'
    }),

    ...mapMutations({
      setNotification: 'setNotification'
    }),

    async submit(){
      const data = this.form
      try {
        const response = await this.postData({url: 'auth/register', params: {...data}})
        if (response.status === 200) {
          this.setNotification({
            title: 'Registration',
            message: response.data.message
          })

          this.$router.push('login')
        } else {
          this.setNotification({
            title: 'Login',
            message: response.data.message
          })
        }
      } catch (error) {
        this.setNotification({
          title: 'Login',
          message: error
        })
        console.log(error);
      }
    }
  },
}
</script>
