<template>
  <div class="index-view">
        <b-modal :active.sync="isRunModaiActive" has-modal-card>
            <SpiderConfirm ></SpiderConfirm>
        </b-modal>
        <b-modal :active.sync="isCancelModaiActive" has-modal-card>
            <CancelConfirm ></CancelConfirm>
        </b-modal>
        <section class="section">
            <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
                <h1 class="title">Spiders</h1>
                <div v-if="sleepingSpider.length == 0">
                    <p>Not found.</p>
                </div>
                <div v-else>
                    <div class="columns">
                        <div class="column is-narrow" v-for="spider in sleepingSpider" :key="spider.id">
                            <a class="button" @click="launchRunConfirmView(spider.name)">
                                {{ spider.name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tile is-child box">
                <h1 class="title">Pending Jobs</h1>
                <div v-if="pendingJobs.length == 0">
                    <p>Not found.</p>
                </div>
                <div v-else>
                    <b-table
                    :data="pendingJobs"
                    >
                        <template slot-scope="props">
                            <b-table-column label="ID" width="40">
                                {{ props.row.id}}
                            </b-table-column>
                            <b-table-column label="Spider">
                                {{ props.row.spider}}
                            </b-table-column>
                        </template>
                    </b-table>
                </div>
            </div>
            <div class="tile is-child box">
                <h1 class="title">Running Jobs</h1>
                <div v-if="runningJobs.length == 0">
                    <p>Not found.</p>
                </div>
                <div v-else>
                    <b-table
                    :data="runningJobs"
                    default-sort-direction="desc"
                    default-sort="start_time"
                    >
                        <template slot-scope="props">
                            <b-table-column label="ID" width="40">
                                {{ props.row.id}}
                            </b-table-column>
                            <b-table-column label="Spider">
                                {{ props.row.spider}}
                            </b-table-column>
                            <b-table-column label="Start time" sortable>
                                {{ props.row.start_time}}
                            </b-table-column>
                            <b-table-column label="Cancel">
                                <a class="button is-primary" @click="launchCancelConfirm(props.row.id)">Cancel</a>
                            </b-table-column>
                            <b-table-column label="Log">
                                <a class="button is-primary"
                                :href= "apiBase + '/logs/' + selectedProject + '/' + props.row.spider + '/' + props.row.id + '.log'"
                                >Log</a>
                            </b-table-column>
                        </template>
                    </b-table>
                </div>
            </div>
            <div class="tile is-child box">
                <h1 class="title">Completed jobs</h1>
                <div v-if="finishedJobs.length == 0">
                    <p>Not found.</p>
                </div>
                <div v-else>
                    <b-table
                    :data="finishedJobs"
                    :paginated="true"
                    per-page="6"
                    default-sort-direction="desc"
                    default-sort="end_time"
                    >
                        <template slot-scope="props">
                            <b-table-column label="ID" width="40">
                                {{ props.row.id}}
                            </b-table-column>
                            <b-table-column label="Spider">
                                {{ props.row.spider}}
                            </b-table-column>
                            <b-table-column label="Start time">
                                {{ props.row.start_time}}
                            </b-table-column>
                            <b-table-column field="end_time" label="End time" sortable>
                                {{ props.row.end_time}}
                            </b-table-column>
                            <b-table-column label="Log">
                                <a class="button is-primary"
                                :href= "apiBase + '/logs/' + selectedProject + '/' + props.row.spider + '/' + props.row.id + '.log'"
                                >Log</a>
                            </b-table-column>
                        </template>
                    </b-table>
                </div>
            </div>
            </div>
            </div>
        </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SpiderConfirm from '../components/modal/SpiderConfirm'
import CancelConfirm from '../components/modal/CancelConfirm'
export default {
  name: 'index',
  components: {SpiderConfirm, CancelConfirm},
  data () {
    return {
      apiBase: process.env.API_ENDPOINT,
      isRunModaiActive: false,
      isCancelModaiActive: false
    }
  },
  computed: mapGetters({
    selectedProject: 'selectedProject',
    sleepingSpider: 'sleepingSpider',
    runningJobs: 'runningJobs',
    finishedJobs: 'finishedJobs',
    pendingJobs: 'pendingJobs'
  }),
  methods: {
    ...mapActions(['selectProject', 'initState', 'selectSpider', 'selectJob', 'update']),
    launchRunConfirmView (spider) {
      this.selectSpider(spider)
      this.isRunModaiActive = true
    },
    launchCancelConfirm (jobId) {
      this.selectJob(jobId)
      this.isCancelModaiActive = true
    }
  },
  async mounted () {
    await this.initState()
    this.timer = setInterval(async () => {
      await this.update()
    }, 3000)
  }
}
</script>
