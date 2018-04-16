<template>
<div id="header">
    <section class="hero is-primary is-medium">
    <div class="hero-head">
    <header class="navbar is-primary">
        <div class="navbar-start">
            <span class="navbar-item">
                <h1 class="title">
                    NEST
                </h1>
            </span>
            <span class="navbar-item">
                <h1 class="subtitle">
                    Project: {{ selectedProject }}
                </h1>
            </span>
        </div>
    <div class="navbar-right ">
        <div class="navbar-item">
                <b-dropdown class="is-active">
                    <a class="navbar-item" slot="trigger">
                    <b-icon icon="menu-down"></b-icon>
                    <span>Project</span>
                </a>
                    <b-dropdown-item v-for="project in projects" :key="project.id" @click="selectProject(project)">
                        <div class="media">
                            <b-icon v-show="selectedProject===project" class="media-left" icon="check"></b-icon>
                            <div class="media-content">
                            {{ project }}
                            </div>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
        </div>
    </div>
    </header>
    </div>
    </section>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    projects: 'projects',
    selectedProject: 'selectedProject'
  }),
  methods: {
    ...mapActions(['selectProject'])
  }
}
</script>
