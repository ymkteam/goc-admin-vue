<template>
  <div :class="{ formGroup: inline }">
    <slot name="label" v-if="inline">
      <legend class="bv-no-focus-ring col-form-label pt-0"><br /></legend>
    </slot>
    <BButton
      :icon="icon"
      aria-hidden="true"
      v-bind="$attrs"
      @click="$emit('click')"
    >
      <i
        v-if="icon && iconPosition === 'left'"
        :class="`fa fa-${icon}${$attrs.label ? ' mr-2' : ''}`"
      />
      {{ $attrs.label }}
      <i
        v-if="icon && iconPosition === 'right'"
        :class="`fa fa-${icon}${$attrs.label ? ' ml-2' : ''}`"
      />
    </BButton>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
  name: 'FButton',
  components: {
    BButton
  },
  props: {
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: 'left'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.value) {
      this.innerValue = this.value
    }
    this.name = this.$attrs.name
  }
}
</script>
