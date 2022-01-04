<template>
  <ValidationProvider
    :vid="name"
    :name="name"
    :rules="rules"
    v-slot="{ valid, errors }"
  >
    <BFormGroup :label="label">
      <BInputGroup v-if="!multiline">
        <slot name="label" v-if="inline">
          <legend class="bv-no-focus-ring col-form-label pt-0">
            <br />
          </legend>
        </slot>
        <BInputGroupAppend v-if="$slots.prepend">
          <slot name="prepend"></slot
        ></BInputGroupAppend>
        <BFormInput
          v-model="innerValue"
          v-bind="$attrs"
          :state="errors[0] ? false : valid && rules ? true : null"
          v-mask="maskValue"
          @maska="onMask"
          :disabled="disabled"
          @blur="onBlur"
        ></BFormInput>
        <BInputGroupAppend v-if="$slots.append">
          <slot name="append"></slot
        ></BInputGroupAppend>
        <BFormInvalidFeedback id="inputLiveFeedback">{{
          errors[0]
        }}</BFormInvalidFeedback>
      </BInputGroup>
      <BFormTextarea
        v-else
        v-model="innerValue"
        v-bind="$attrs"
        :state="errors[0] ? false : valid && rules ? true : null"
        :disabled="disabled"
      ></BFormTextarea>
    </BFormGroup>
  </ValidationProvider>
</template>

<script>
import formControl from './../formControl'
import { getDateString } from '../../services/date.service'
import {
  maskDirective,
  getMaskedValue,
  phoneMask,
  numberWithThousandSeparatorMask,
  numberMask
} from '../../services/mask.service'
import {
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BFormInvalidFeedback,
  BFormTextarea
} from 'bootstrap-vue'

export default {
  name: 'GInput',
  mixins: [formControl],
  directives: { mask: maskDirective },
  components: {
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BFormInvalidFeedback,
    BFormTextarea
  },
  props: {
    mask: {
      type: [String, Array]
    },
    rawValue: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiline: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    numberWithThousandSeparator: {
      type: Boolean,
      default: false
    },
    phone: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      maskValue: null
    }
  },
  mounted () {
    // this.setMaskValue()
  },
  watch: {
    innerValue (newValue) {
      if (newValue && this.$attrs.type === 'datetime-local') {
        this.innerValue = getDateString(new Date(newValue), {
          time: true
        })
      } else if (newValue === '' && this.$attrs.type === 'number') {
        this.innerValue = null
      }
    },
    rawValue (value) {
      if (value) {
        this.initMaskedValue(value)
      }
    },
    phone: {
      immediate: true,
      handler: function (value) {
        if (value) {
          this.maskValue = phoneMask
          this.initMaskedValue(this.rawValue)
        }
      }
    },
    numberWithThousandSeparator: {
      immediate: true,
      handler: function (value) {
        if (value) {
          this.maskValue = numberWithThousandSeparatorMask
          this.initMaskedValue(this.rawValue)
        }
      }
    },
    number: {
      immediate: true,
      handler: function (value) {
        if (value) {
          this.maskValue = numberMask
          this.initMaskedValue(this.rawValue)
        }
      }
    },
    mask: {
      immediate: true,
      handler: function (value) {
        if (value) {
          this.maskValue = value
          this.initMaskedValue(this.rawValue)
        }
      }
    }
  },
  methods: {
    onBlur () {
      this.$emit('blur', this.innerValue)
    },
    onMask (event) {
      if (this.maskValue) {
        let rawValue = event.target.dataset.maskRawValue
        if (rawValue === '') rawValue = null
        this.$emit('update:rawValue', rawValue)
      }
    },
    // setMaskValue () {
    //   if (this.mask) {
    //     this.maskValue = this.mask
    //   } else if (this.phone) {
    //     this.maskValue = phoneMask
    //   } else if (this.numberWithThousandSeparator) {
    //     this.maskValue = numberWithThousandSeparatorMask
    //   } else if (this.number) {
    //     this.maskValue = numberMask
    //   }
    //   if (this.maskValue && this.rawValue) {
    //     this.initMaskedValue(this.rawValue)
    //   }
    // },
    initMaskedValue (rawValue) {
      if (this.numberWithThousandSeparator) {
        if (rawValue && rawValue !== '') {
          const raw = rawValue ? rawValue.toString() : ''
          this.innerValue = getMaskedValue(raw, this.maskValue[raw.length - 1])
        }
      } else if (this.maskValue) {
        if (!rawValue) rawValue = ''
        this.innerValue = getMaskedValue(rawValue, this.maskValue)
      }
    }
  }
}
</script>
