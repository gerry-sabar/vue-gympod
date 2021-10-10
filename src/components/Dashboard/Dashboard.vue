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
            <!-- /.row -->
            <!-- Main row -->
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header bg-info text-light">
                    <div class="float-left font-weight-bold">
                      POD Detail
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row">

                      <div class="col-sm-12 mt-3">

              <div id="app">
                <main>

                  <!-- data table -->
                  <div>

                  <template>
                    <v-card>
                      <v-card-title>
                        Nutrition
                        <v-spacer></v-spacer>
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-card-title>
                      <v-data-table
                        :headers="headers"
                        :items="podData"
                        :search="search"
                      >
                      <template v-slot:item.id="props">
                        <a :href="'detail/'+ props.item.id">
                          {{ props.item.id }}
                        </a>
                      </template>    
                      </v-data-table>
                    </v-card>
                  </template>
                  </div>

                </main>
              </div>


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
        search: '',
        headers: [
          { text: 'ID', value: 'id' },
          {
            text: 'Pod Name',
            align: 'start',
            sortable: false,
            value: 'pod_name',
          },
          { text: 'User Name', value: 'username' },
          { text: 'Phone', value: 'phone' },
          { text: 'Status', value: 'status' },
          { text: 'Price', value: 'price' },
          { text: 'Booking Date', value: 'booking_date' },
          { text: 'Booking Time', value: 'booking_time' },
        ],
        podData: [],
      }
    },
    mounted: function() {
      this.getPod()
    },
    methods: {
      async getPod(){
        await this.$store.dispatch('podData')
        this.podData = this.$store.getters.getPodDetails
      },
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
    }
  }


</script>

<style>
.uppercase{
  text-transform: uppercase;
}
</style>