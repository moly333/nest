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
                    <MenuDown />
                    <span>Project</span>
                </a>
                    <b-dropdown-item v-for="project in projects" :key="project.id" @click="selectProject(project)">
                        <div class="media">
                            <Check v-show="selectedProject===project" class="media-left"/>
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
import MenuDown from 'vue-material-design-icons/menu-down.vue'
import Check from 'vue-material-design-icons/check.vue'
export default {
  computed: mapGetters({
    projects: 'projects',
    selectedProject: 'selectedProject'
  }),
  methods: {
    ...mapActions(['selectProject'])
  },
  components: {
    MenuDown,
    Check
  }
}
</script>
