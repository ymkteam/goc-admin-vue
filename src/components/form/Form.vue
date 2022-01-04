<template>
  <ValidationObserver v-slot="ctx" :ref="id" :disabled="validationDisabled">
    <BForm v-bind="$attrs" @submit.prevent="ctx.handleSubmit(onSubmit)">
      <slot v-bind="ctx" />
    </BForm>
  </ValidationObserver>
</template>

<script>
import { BForm } from 'bootstrap-vue'

export default {
  name: 'GForm',
  components: { BForm },
  props: {
    validationDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: this.generateId()
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit')
    },
    async validate () {
      await this.$nextTick()
      if (this.validationDisabled) {
        return true
      }
      return this.$refs[this.id].validate()
    }
  }
}
</script>
