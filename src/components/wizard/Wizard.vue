<template>
  <div class="card">
    <VueFormWizard
      ref="formWizard"
      v-bind="$attrs"
      :color="color"
      :shape="shape"
      @on-change="onChange"
      title=""
      subtitle=""
      stepSize="lg"
      :hideButtons="!wizard"
    >
      <div class="card-body">
        <slot></slot>
      </div>
      <template slot="footer" slot-scope="props">
        <div class="card-footer">
          <div class="wizard-footer-left">
            <f-button
              class="mr-2"
              variant="primary"
              t-label="previous"
              icon="chevron-left"
              v-if="props.activeTabIndex > 0 && !props.isLastStep"
              @click="props.prevTab()"
            />
          </div>
          <div class="wizard-footer-right">
            <table>
              <tr>
                <td>
                  <span class="select2-error-text mr-5">
                    {{ errorMessage }}
                  </span>
                </td>
                <td>
                  <f-button
                    class="mr-2"
                    variant="primary"
                    t-label="next"
                    icon="chevron-right"
                    icon-position="right"
                    v-if="!props.isLastStep"
                    @click="props.nextTab()"
                  />
                  <f-button
                    class="mr-2"
                    variant="secondary"
                    :label="doneLabel"
                    v-else
                    @click.native="onDone"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </template>
    </VueFormWizard>
  </div>
</template>

<script>
import formControl from './../formControl'
import { VueFormWizard } from 'vue-form-wizard'

export default {
  name: 'FWizard',
  mixins: [formControl],
  components: {
    VueFormWizard
  },
  props: {
    shape: {
      type: String,
      default: 'circle'
    },
    color: {
      type: String,
      default: '#9b59b6'
    },
    buttonsDisabled: {
      type: Boolean,
      default: false
    },
    wizard: { type: Boolean, default: true },
    doneTLabel: { type: String, default: 'done' },
    error: { type: String }
  },
  data () {
    return {
      lastActiveIndex: 0,
      prevActiveIndex: -1,
      errorMessage: '',
      doneLabel: ''
    }
  },
  mounted () {
    if (!this.wizard) {
      this.activateAll()
      this.hideWizardProgress()
    }
    this.doneLabel = this.$t(`labels.${this.doneTLabel}`)
  },
  updated () {
    if (this.lastActiveIndex === -1) {
      this.lastActiveIndex = this.prevActiveIndex
      this.changeTab(this.prevActiveIndex - 1, this.prevActiveIndex)
    }
  },
  watch: {
    error (value) {
      this.errorMessage = value
    }
  },
  methods: {
    reset () {
      window.setTimeout(() => {
        this.$refs.formWizard.reset()
      }, 1)
    },
    activateAll () {
      window.setTimeout(() => {
        this.$refs.formWizard.activateAll()
      }, 1)
    },
    nextTab () {
      this.$refs.formWizard.nextTab()
    },
    prevTab () {
      this.$refs.formWizard.prevTab()
    },
    changeTab (oldIndex, newIndex) {
      this.$refs.formWizard.changeTab(oldIndex, newIndex)
    },
    getActiveTabIndex () {
      return this.$refs.formWizard.activeTabIndex
    },
    hideWizardProgress () {
      const progress = document.getElementsByClassName(
        'wizard-progress-with-circle'
      )[0]
      progress.style.display = 'none'
    },
    onChange (prevIndex, nextIndex) {
      this.prevActiveIndex = this.lastActiveIndex
      this.lastActiveIndex = nextIndex
      this.errorMessage = null
      this.$emit('update:error', null)
    },
    onDone () {
      this.$emit('done')
    }
  }
}
</script>

<style>
@import 'vue-form-wizard/src/assets/wizard.scss';

.vue-form-wizard .wizard-tab-content {
  padding-top: 15px !important;
}
.wizard-nav-pills {
  padding-bottom: 40px !important;
  border-bottom: 1px solid #e8ebf3 !important;
}
.wizard-nav-pills .tab_shape {
  background-color: rgba(231, 220, 247) !important;
}
.wizard-nav-pills .active .wizard-icon-container {
  background: #ec296b !important;
  /* background: #ec296b !important; */
}

.wizard-nav-pills .checked {
  border-color: #ec296b !important;
}

.wizard-progress-bar {
  background-color: #ec296b !important;
  color: #ec296b !important;
}

.vue-form-wizard .wizard-nav-pills li a {
  color: rgba(0, 0, 0, 0.5) !important;
}
</style>
