<template>
  <BFormGroup v-bind="$attrs">
    <template v-slot:label v-if="label">
      <table>
        <tr>
          <td v-if="!leftLabel">{{ label }}</td>
          <td>
            <BFormCheckbox
              class="ml-2"
              v-if="showCheckbox"
              v-model="showSwitch"
              @change="onChangeCheckbox"
            />
          </td>
        </tr>
      </table>
    </template>
    <span v-if="leftLabel">
      {{ label }}
    </span>
    <BFormCheckbox
      :class="leftLabel ? 'ml-2 pt-2' : null"
      v-show="!showCheckbox || showSwitch"
      v-model="innerValue"
      v-bind="$attrs"
      @change="onChange"
      switch
    >
      {{ innerValue === true ? trueLabel : falseLabel }}
    </BFormCheckbox>
  </BFormGroup>
</template>

<script>
import formControl from './../formControl'
import { BFormGroup, BFormCheckbox } from 'bootstrap-vue'

export default {
  name: 'FSwitch',
  mixins: [formControl],
  components: { BFormGroup, BFormCheckbox },
  props: {
    trueLabel: {
      type: String
    },
    falseLabel: { type: String },
    defaultValue: { type: Boolean, default: false },
    showCheckbox: { type: Boolean, default: false },
    leftLabel: { type: Boolean, default: false }
  },
  data () {
    return {
      showSwitch: false
    }
  },
  mounted () {
    if (this.showCheckbox) {
      this.innerValue = null
    } else if (this.innerValue === null) {
      this.innerValue = this.defaultValue
    }
  },
  methods: {
    onChangeCheckbox (value) {
      if (!value) {
        this.innerValue = null
      } else {
        this.innerValue = true
      }
    },
    setCheckboxValue (value) {
      this.showSwitch = value
    },
    onChange () {
      this.$emit('change')
    }
  }
}
</script>
