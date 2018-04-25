<template>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
          <p class="modal-card-title">Confirm</p>
      </header>
      <section class="modal-card-body">
          <p>Are you sure cancel {{ selectedJob }}?</p>
      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="go_cancel()">Cancel</button>
      </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    selectedJob: 'selectedJob'
  }),
  methods: {
    async go_cancel () {
      this.$parent.close()
      await this.$store.dispatch('cancelJob', this.selectedJob)
      this.$notify({
        group: 'msg',
        title: 'Message',
        text: `${this.selectedJob} is canceled!`
      })
    }
  }
}
</script>
