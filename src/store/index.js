import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export const myaxios = axios.create({
  baseURL: process.env.API_ENDPOINT
})
export default new Vuex.Store({
  state: {
    spiders: [],
    running_spiders: [],
    running_jobs: [],
    pending_jobs: [],
    finished_jobs: [],
    selected_project: '',
    projects: [],
    selected_spider: '',
    selected_job: '',
    error: ''
  },
  mutations: {
    SET_SPIDERS (state, spiders) {
      state.spiders = spiders
    },
    SET_SPIDER_STATUS (state, { spider, status }) {
      state.spiders.forEach(s => {
        if (s.name === spider) {
          s.running = status
        }
      })
    },
    SELECT_SPIDER (state, spider) {
      state.selected_spider = spider
    },
    SET_RUNNING_JOBS (state, jobs) {
      state.running_jobs = jobs
    },
    SET_RUNNING_SPIDERS (state, spiders) {
      state.running_spiders = spiders
    },
    SELECT_JOB (state, jobId) {
      state.selected_job = jobId
    },
    SET_FINISHED_JOBS (state, jobs) {
      state.finished_jobs = jobs
    },
    SET_PENDING_JOBS (state, jobs) {
      state.pending_jobs = jobs
    },
    SET_PROJECTS (state, projects) {
      state.projects = projects
    },
    SELECT_PROJECT (state, project) {
      state.selected_project = project
      state.spiders = []
      state.running_spiders = []
      state.running_jobs = []
      state.pending_jobs = []
      state.finished_jobs = []
    },
    SET_ERROR (state, error) {
      state.error = error
    },
    CLEAR (state) {
      state.spiders = []
      state.running_spiders = []
      state.running_jobs = []
      state.spending_jobs = []
      state.finished_jobs = []
      state.selected_project = ''
      state.projects = []
      state.selected_spider = ''
      state.selected_job = ''
      state.error = ''
    }
  },
  actions: {
    clearState ({ commit }) {
      commit('CLEAR')
    },
    setError ({ commit }, error) {
      commit('SET_ERROR', error)
    },
    async initState ({ dispatch }) {
      await dispatch('getProjects')
      await dispatch('getjobs')
      await dispatch('getSpiders')
    },
    async update ({ dispatch }) {
      await dispatch('getjobs')
      await dispatch('getSpiders')
    },
    async getProjects ({ dispatch, commit, state }) {
      const url = '/listprojects.json'
      const projects = await myaxios.get(url)
      if (projects.status !== 200 || projects.data.status !== 'ok') {
        dispatch('setError', 'something went wrong')
        return
      }
      commit('SET_PROJECTS', projects.data.projects)
      commit('SELECT_PROJECT', projects.data.projects[0])
    },
    async getSpiders ({ dispatch, state }) {
      const url = `/listspiders.json?project=${state.selected_project}`
      const spiders = await myaxios.get(url)
      if (spiders.status !== 200 || spiders.data.status !== 'ok') {
        dispatch('setError', 'something went wrong')
      } else {
        dispatch('setSpiders', spiders.data.spiders)
      }
    },
    setSpiders ({ commit, state }, spiders) {
      const rawSpiders = spiders.filter(s => s !== 'list index out of range')
      var commitSpiders = []
      rawSpiders.forEach(s => {
        commitSpiders.push({
          running: (state.running_spiders.indexOf(s) >= 0),
          name: s
        })
      })
      commit('SET_SPIDERS', commitSpiders)
    },
    selectSpider ({ commit }, spider) {
      commit('SELECT_SPIDER', spider)
    },
    selectJob ({ commit }, jobId) {
      commit('SELECT_JOB', jobId)
    },
    async getjobs ({ dispatch, state }) {
      const url = `/listjobs.json?project=${state.selected_project}`
      const jobs = await myaxios.get(url)
      if (jobs.status !== 200 || jobs.data.status !== 'ok') {
        dispatch('setError', 'something went wrong')
      } else {
        dispatch('setJobs', jobs.data)
      }
    },
    setJobs ({ commit }, jobs) {
      commit('SET_RUNNING_JOBS', jobs.running)
      commit('SET_FINISHED_JOBS', jobs.finished)
      commit('SET_PENDING_JOBS', jobs.pending)
      var runningSpiders = []
      jobs.running.forEach(s => {
        runningSpiders.push(s.spider)
      })
      jobs.pending.forEach(s => {
        runningSpiders.push(s.spider)
      })
      commit('SET_RUNNING_SPIDERS', runningSpiders)
    },
    selectProject ({ commit }, project) {
      commit('SELECT_PROJECT', project)
    },
    async runSpider ({ dispatch, commit, state }, spider) {
      const url = '/schedule.json'
      var params = new URLSearchParams()
      params.append('project', state.selected_project)
      params.append('spider', spider)
      const res = await myaxios.post(url, params)
      if (res.status !== 200 && res.data.status !== 'ok') {
        dispatch('setError', 'something went wrong')
      } else {
        commit('SET_SPIDER_STATUS', { spider: spider, status: true, pending: true })
      }
    },
    async cancelJob ({ dispatch, state }, jobId) {
      const url = '/cancel.json'
      var params = new URLSearchParams()
      params.append('project', state.selected_project)
      params.append('job', jobId)
      const spiders = await myaxios.post(url, params)
      if (spiders.status !== 200 || spiders.data.status !== 'ok') {
        dispatch('setError', 'something went wrong')
      } else {
        dispatch('update')
      }
    }
  },
  getters: {
    sleepingSpider: state => {
      return state.spiders.filter(s => !s.running)
    },
    runningSpider: state => {
      return state.spiders.filter(s => s.runnig)
    },
    selectedProject: state => {
      return state.selected_project
    },
    projects: state => {
      return state.projects
    },
    runningJobs: state => {
      return state.running_jobs
    },
    finishedJobs: state => {
      return state.finished_jobs
    },
    pendingJobs: state => {
      return state.pending_jobs
    },
    selectedSpider: state => {
      return state.selected_spider
    },
    selectedJob: state => {
      return state.selected_job
    }
  }
})
