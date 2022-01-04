<template>
  <ValidationProvider
    :vid="name"
    :name="name"
    :rules="rules"
    v-slot="{ errors }"
  >
    <BFormGroup v-bind="$attrs" :label="label">
      <f-row>
        <f-col>
          <Select2
            ref="selectControl"
            :id="id"
            v-model="innerValue"
            v-bind="$attrs"
            v-on="inputListeners"
            :options="data"
            :class="{ 'select2-has-error': errors.length > 0 }"
            :settings="settings"
          ></Select2>
          <span class="select2-error-text">
            {{ errors[0] }}
          </span>
        </f-col>
        <div class="col-auto select-append" v-if="$slots.append">
          <slot name="append"></slot>
        </div>
      </f-row>
    </BFormGroup>
  </ValidationProvider>
</template>

<script>
import Select2 from './Select2'
import formControl from './../formControl'
import { BFormGroup } from 'bootstrap-vue'

export default {
  name: 'GSelect',
  mixins: [formControl],
  components: { Select2, BFormGroup },
  props: {
    value: { type: null },
    multiple: { type: Boolean },
    options: { type: Array, default: () => [] },
    dataUrl: { type: String },
    dataParams: { type: Object },
    valueType: { type: String, default: 'int' },
    hasSelectAll: { type: Boolean, default: false },
    textProp: { type: String, default: 'name' },
    selectFirst: { type: Boolean, default: false },
    selectAllOptionText: { type: String }
  },
  data () {
    return {
      innerValue: null,
      settings: {
        minimumResultsForSearch: 10,
        allowClear: true
        // selectOnClose: true
      },
      data: [],
      selectAllOption: { id: -999, text: '-- Tümü --' }
    }
  },
  async mounted () {
    if (this.multiple) this.settings.multiple = true
    if (this.$attrs.settings) {
      this.settings = Object.assign(this.settings, this.$attrs.settings)
    }
    if (this.dataUrl) {
      await this.loadDataFromUrl()
    }
  },
  computed: {
    inputListeners: function () {
      const _self = this
      return Object.assign({}, this.$listeners, {
        'select2:unselecting': event => {
          window.setTimeout(() => {
            _self.$refs.selectControl.close()
          }, 1)
        }
      })
    }
  },
  watch: {
    dataParams (newValue, oldValue) {
      if (newValue !== oldValue && this.dataUrl) {
        for (const key of Object.keys(newValue)) {
          if (newValue[key] !== oldValue[key]) {
            this.loadDataFromUrl()
            break
          }
        }
      }
    },
    options: {
      immediate: true,
      handler: function (newValue) {
        if (this.options) {
          this.loadData(this.options)
        }
      }
    }
  },
  methods: {
    loadData (options) {
      if (!options) return
      const data = options.map(x => {
        if (typeof x === 'object') {
          return {
            ...x,
            text: x[this.textProp] || x.text
          }
        } else {
          return { id: x, text: x }
        }
      })

      if (
        (this.hasSelectAll || this.selectAllOptionText) &&
        data.length > 0 &&
        data[0].id !== this.selectAllOption.id
      ) {
        data.unshift({
          id: this.selectAllOption.id,
          text: this.selectAllOptionText || this.selectAllOption.text
        })
      }

      this.data = data

      if (this.selectFirst && data.length === 1) {
        this.innerValue = data[0].id
      }
    },
    async loadDataFromUrl () {
      const options = await this.$http.get(this.dataUrl, {
        params: this.dataParams
      })
      this.loadData(options)
    },
    getTypedValue (value) {
      return value && this.valueType === 'int' ? parseInt(value) : value
    },
    valueWatcher (newVal, oldVal) {
      newVal = this.getTypedValue(newVal)
      this.innerValue = newVal
    },
    innerValueWatcher (newVal) {
      newVal = this.getTypedValue(newVal)
      let selectedItem = null
      if (newVal) {
        const filteredData = this.data.filter(x => x.id === newVal)
        if (filteredData.length > 0) {
          selectedItem = filteredData[0]
          if (selectedItem.id === this.selectAllOption.id) {
            selectedItem.isAll = true
            selectedItem.data = this.data.filter(
              x => x.id !== this.selectAllOption.id
            )
          }
        }
      }
      this.$emit('input', newVal)
      this.$emit('select', selectedItem)
    }
  }
}
</script>
