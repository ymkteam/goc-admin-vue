<template>
  <BFormGroup v-bind="$attrs" :label="label">
    <f-row>
      <f-col>
        <BDropdown
          ref="dropdown"
          @hide="onHide"
          @toggle="onToggle"
          @click="onClick"
          split
          split-variant="light"
          :text="selectedText"
          block
          right
          v-if="dropdown"
        >
          <div class="p-3">
            <v-multiselect-listbox
              :options="data"
              :reduce-display-property="option => option[displayProp]"
              :reduce-value-property="option => option[valueProp]"
              search-options-placeholder="Ara"
              selected-options-placeholder="Seçilenlerde Ara"
              no-options-text=""
              selected-no-options-text=""
              v-model="innerValue"
            >
            </v-multiselect-listbox>
          </div>
        </BDropdown>
        <v-multiselect-listbox
          v-else
          :options="data"
          :reduce-display-property="option => option[displayProp]"
          :reduce-value-property="option => option[valueProp]"
          search-options-placeholder="Ara"
          selected-options-placeholder="Seçilenlerde Ara"
          no-options-text="No states"
          selected-no-options-text="No states selected"
          v-model="innerValue"
        >
        </v-multiselect-listbox>
      </f-col>
    </f-row>
  </BFormGroup>
</template>

<script>
import formControl from './../formControl'
import vMultiselectListbox from 'vue-multiselect-listbox'
import { BFormGroup, BDropdown } from 'bootstrap-vue'

export default {
  name: 'GMultiselectListbox',
  mixins: [formControl],
  components: {
    BDropdown,
    BFormGroup,
    vMultiselectListbox
  },
  props: {
    value: { type: Array, default: () => [] },
    options: {
      type: Array,
      default: () => []
    },
    valueProp: { type: String, default: 'id' },
    displayProp: { type: String, default: 'name' },
    dataUrl: { type: String },
    dropdown: { type: Boolean, default: true }
  },
  data () {
    return {
      data: [],
      innerValue: [],
      toggle: false
    }
  },
  computed: {
    selectedText () {
      return this.innerValue.length > 0
        ? this.innerValue.map(x => x[this.displayProp]).join(', ')
        : '...'
    }
  },
  watch: {
    options: {
      immediate: true,
      handler: function (value) {
        this.data = value
      }
    },
    dataUrl: {
      immediate: true,
      handler: async function (value) {
        if (value) {
          this.data = await this.$http.get(value)
        }
      }
    }
  },
  methods: {
    onHide (event) {
      if (this.toggle) {
        event.preventDefault()
      }
    },
    onToggle () {
      this.toggle = !this.toggle
    },
    onClick () {
      if (this.toggle) {
        this.$refs.dropdown.hide()
        this.toggle = false
      } else {
        this.$refs.dropdown.show()
        this.toggle = true
      }
    }
  }
}
</script>
