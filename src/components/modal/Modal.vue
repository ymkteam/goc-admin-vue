<template>
  <ValidationObserver v-slot="{ passes }" slim tag="form">
    <BModal
      :ref="id"
      v-bind="$attrs"
      :size="$attrs.size || 'xl'"
      ignore-enforce-focus-selector=".select2-container"
      @cancel="onCancel"
      @close="onClose"
      :hide-footer="hideFooter"
    >
      <template v-slot:modal-header id="modal-header">
        <h5 class="modal-title">
          {{ title }}
        </h5>
        <slot name="header-right"></slot>
      </template>
      <template v-slot:default>
        <slot />
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <slot name="footer-left"></slot>
        <f-button
          variant="light"
          @click="cancel()"
          :label="cancelLabel"
          v-if="!cancelDisabled"
        />
        <slot name="footer"></slot>
        <f-button
          type="submit"
          variant="primary"
          :label="submitLabel"
          @click="passes(onSubmit)"
          v-if="!submitDisabled"
        />
      </template>
    </BModal>
  </ValidationObserver>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  name: 'GModal',
  components: { BModal },
  props: {
    submitLabel: { type: String, default: 'Save' },
    cancelLabel: { type: String, default: 'Cancel' },
    submitDisabled: { type: Boolean, default: false },
    cancelDisabled: { type: Boolean, default: false },
    hideFooter: { type: Boolean, default: false },
    title: { type: String }
  },
  data () {
    return { id: this.generateId() }
  },
  methods: {
    show () {
      this.$refs[this.id].show()
    },
    hide () {
      this.$refs[this.id].hide()
    },
    onSubmit () {
      this.$emit('submit')
    },
    onClose () {
      this.$emit('close')
    },
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>
