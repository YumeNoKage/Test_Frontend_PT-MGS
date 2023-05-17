<template>
  <nav class="navbar bg-body-tertiary bg-info">
    <div class="container-fluid">
      <div class="collapse w-100 mb-3" id="navbarToggleExternalContent">
        <Profile class="d-block d-lg-none"/>
      </div>
      <div class="d-flex justify-content-between w-100">
        <a class="navbar-brand" href="#">
          <img src="../../assets/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
          Frontend Developer
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Profile from '../Profile/Profile.vue';

export default{
  name: 'Navigation',
  components: {
    Profile
  }
}
</script>