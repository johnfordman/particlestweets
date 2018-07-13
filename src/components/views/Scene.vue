<template>
  <div class="page-scene">
    <form @submit.prevent="onSubmit">
      <div>
        <p class="error" v-if="error">The username is invalid</p>
        <input type="text" placeholder="username" v-model="username">
        <button>Login</button>
      </div>
    </form>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        error: false,
        username: ''
      }
    },
    created () {
      this.$store.$watch('user', (user) => {
        if (user.id) {
          this.$router.push('/')
        }
      })
    },
    methods: {
      onSubmit (e) {
        // Validation
        if (!this.username.match(/^\w{1,15}$/)) {
          this.error = true
        } else {
          this.error = false
          this.$emit('login', this.username)
          this.$router.push('/')
        }
      }
    }
  }
</script>
