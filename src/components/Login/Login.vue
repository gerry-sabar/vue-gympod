<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <b>Admin</b> Login
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">

          <div v-if="alert_message != ''">
            <div class="alert alert-danger" id="alert_login" role="alert">
              {{ alert_message }}
            </div>
          </div>
          
          <form>
            <!-- <div style="color: red;">{{loginFail}}</div> -->
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Email" v-model="email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Password" v-model="password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="button" class="btn btn-primary btn-block" v-on:click='loginSubmit'>Sign In</button>
              </div>
              <!-- /.col -->
            </div>
          </form>

        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        alert_message: '',
      }
    },
    methods: {
      async loginSubmit() {
        if (this.email == '' || this.password == '') {
          this.alert_message = "Please insert Email / Password";
        } else {
          await this.$store.dispatch('login', {
            'email': this.email,
            'password': this.password
          })

          if (this.$store.getters.getLoginFail != null) {
            this.alert_message = this.$store.getters.getLoginFail.message
          }
        }
      }
    }
  }
</script>
