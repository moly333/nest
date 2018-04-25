<template>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
          <p class="modal-card-title">Confirm</p>
      </header>
      <section class="modal-card-body">
          <p>Are you sure running {{ selectedSpider }}?</p>
      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="go_run()">Run</button>
      </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    selectedSpider: 'selectedSpider'
  }),
  methods: {
    async go_run () {
      this.$parent.close()
      await this.$store.dispatch('runSpider', this.selectedSpider)
      this.$notify({
        group: 'msg',
        title: 'Message',
        text: `${this.selectedSpider} is runnning!`
      })
    }
  }
}
</script>
