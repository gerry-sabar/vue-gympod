<style>
  @import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css";
</style>

<template>
  <div class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <Navbar />
      <Sidebar />
      <!-- CONTENT -->
      <div class="content-wrapper">
        <section class="content">
          <div class="container-fluid">
            <!-- Small boxes (Stat box) -->

            <!-- Main row -->
            <div class="row">
              <div class="col-lg-6">
                
              <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Booking Detail</h3>
              </div>
              <!-- /.card-header -->
                <div class="card-body">
                  
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Pod Name</label>
                    <div class="col-sm-10">
                      <input class="form-control" v-model="pod_name" readonly>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">User Name</label>
                    <div class="col-sm-10">
                      <input class="form-control" v-model="username" readonly>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Phone</label>
                    <div class="col-sm-10">
                      <input class="form-control" v-model="phone" readonly>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Status</label>
                    <div class="col-sm-10">
                      <input class="form-control" v-model="status" readonly>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-10">
                      <input class="form-control" v-model="price" readonly>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Booking Date</label>
                    <div class="col-sm-10">
                      <input class="form-control" v-model="booking_date" readonly>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Booking Time</label>
                    <div class="col-sm-10">
                      <input class="form-control" v-model="booking_time" readonly>
                    </div>
                  </div>

                </div>
            </div>

              </div>
            </div>

            <div class="row">

            </div>
            <!-- /.row (main row) -->
          </div><!-- /.container-fluid -->
        </section>
      </div>
      <!-- /CONTENT -->
      <Footer />
    </div>
  </div>
</template>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
main {
  padding: 32px;
}
</style>

<script>
  import Navbar from '@/components/Navbar'
  import Sidebar from '@/components/Sidebar'
  import Footer from '@/components/Footer'
  
  export default {
    components: {
      Navbar,
      Sidebar,
      Footer
    },

  computed: {
  },

    data() {
      return {
        pod_name: '',
        username: '',
        phone: '',
        status: '',
        price: '',
        booking_date: '',
        booking_time: '',
        bookingDetail: [],
      }
    },
    mounted: function() {
      this.getDetail()
    },
    methods: {
      async getDetail(){
        await this.$store.dispatch('bookingDetail', {
          'pod_id': this.$route.params.id,
        })
        let booking = this.$store.getters.getBookingDetails
        this.pod_name = booking.pod_name
        this.username = booking.username
        this.phone = booking.phone
        this.status = booking.status
        this.price = booking.price
        this.booking_date = booking.booking_date
        this.booking_time = booking.booking_time
      },
    }
  }


</script>

<style>
.uppercase{
  text-transform: uppercase;
}
</style>