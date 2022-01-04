<template>
  <BCard v-bind="$attrs" :class="{ 'no-shadow': noShadow }">
    <template
      v-slot:header
      v-if="header || $slots['header-right'] || $slots['header-left']"
    >
      <h3 class="card-title" v-if="header">
        {{ header }}
      </h3>
      <h3 class="card-title" v-else>
        <div class="card-options card-options-header-left">
          <slot name="header-left"></slot>
        </div>
      </h3>
      <div class="card-options" v-if="$slots['header-right']">
        <slot name="header-right"></slot>
      </div>
    </template>
    <slot />
    <template v-slot:footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </BCard>
</template>

<script>
import { BCard } from 'bootstrap-vue'

export default {
  name: 'FCard',
  components: { BCard },
  props: {
    header: {
      type: String
    },
    noShadow: { type: Boolean, default: false }
  }
}
</script>
