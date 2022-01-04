<template>
  <BAlert v-bind="$attrs" :variant="variant">
    <i v-if="iconValue" :class="`fa fa-${iconValue} mr-2`" />
    <slot></slot>
  </BAlert>
</template>

<script>
import { BAlert } from 'bootstrap-vue'

export default {
  name: 'FAlert',
  components: {
    BAlert
  },
  props: {
    icon: {
      type: String
    },
    type: { type: String, default: 'success' }
  },
  data () {
    return {
      variant: null,
      iconValue: null
    }
  },
  mounted () {
    if (this.$attrs.variant) {
      this.variant = this.$attrs.variant
    } else {
      this.variant = this.type
      switch (this.type) {
        case 'success':
          this.iconValue = 'check-circle'
          break
        case 'warning':
          this.iconValue = 'exclamation'
          break
        case 'danger':
          this.iconValue = 'bell-o'
          break
      }
    }
  },
  watch: {
    icon (value) {
      this.iconValue = value
    }
  }
}
</script>
