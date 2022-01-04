<template>
  <f-row v-bind="rowAttrs">
    <f-col>
      <f-select
        :label="parentLabelValue"
        :options="parentData"
        :rules="rules"
        v-model="selectedParentIdValue"
        :disabled="disableParent || disabled"
        @change="onChangeParent"
      />
    </f-col>
    <g-col>
      <f-select
        :label="childLabelValue"
        :options="childData"
        :rules="rules"
        v-model="selectedChildIdValue"
        :disabled="disableChildValue || disabled"
      >
        <template v-slot:append v-if="$slots.append || loading">
          <div v-if="loading" class="select-spinner"></div>
          <slot name="append"></slot>
        </template>
      </f-select>
    </g-col>
  </f-row>
</template>

<script>
export default {
  name: 'GSelectGroup',
  props: {
    parentTLabel: {
      type: String
    },
    selectedParentId: { type: [Number, String] },
    parentProp: { type: String, default: 'parentId' },
    parentOptions: { type: Array, default: () => [] },
    parentDataUrl: { type: String },
    parentDataParams: { type: Object },
    parentHasSelectAll: { type: Boolean, default: false },
    parentLabel: { type: String },
    childLabel: { type: String },
    childTLabel: { type: String },
    selectedChildId: { type: [Number, String] },
    valueProp: { type: String, default: 'id' },
    childOptions: { type: Array, default: () => [] },
    childDataUrl: { type: String },
    childDataParams: { type: Object },
    rules: { type: String },
    hasSelectAll: { type: Boolean, default: false },
    disableParent: { type: Boolean, default: false },
    disableChild: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      rowAttrs: null,
      selectedParentIdValue: null,
      selectedChildIdValue: null,
      selectedParentItem: null,
      selectedChildItem: null,
      parentData: [],
      childData: [],
      parentLabelValue: null,
      childLabelValue: null,
      selectAllOption: { value: -999, text: '-- Tümü --' },
      disableChildValue: null,
      loading: false
    }
  },
  mounted () {
    if (this.parentTLabel) {
      this.parentLabelValue = this.$t(`labels.${this.parentTLabel}`)
    }
    if (this.childTLabel) {
      this.childLabelValue = this.$t(`labels.${this.childTLabel}`)
    }
  },
  watch: {
    disableChild: {
      immediate: true,
      handler: function (val) {
        this.disableChildValue = val
      }
    },
    async parentDataParams (newValue, oldValue) {
      if (newValue !== oldValue && this.parentDataUrl) {
        for (const key of Object.keys(newValue)) {
          if (newValue[key] !== oldValue[key]) {
            await this.loadParentDataFromUrl()
            break
          }
        }
      }
    },
    childLabel: {
      immediate: true,
      handler: function (value) {
        this.childLabelValue = value
      }
    },
    parentLabel: {
      immediate: true,
      handler: function (value) {
        this.parentLabelValue = value
      }
    },
    parentOptions: {
      immediate: true,
      handler: function (parentOptions) {
        if (parentOptions !== null) {
          if (this.parentHasSelectAll) {
            this.addParentSelectAllOption(parentOptions)
          }
          this.parentData = parentOptions
        }
      }
    },
    parentData (parentData) {
      if (this.selectedParentIdValue && !this.selectedParentItem) {
        this.selectedParentItem = this.getSelectedParentItem()
        this.$emit('selectParent', this.selectedParentItem)
      }
    },
    childData (childData) {
      if (this.selectedChildIdValue && !this.selectedChildItem) {
        this.selectedChildItem = this.getSelectedChildItem()
        this.$emit('selectChild', this.selectedChildItem)
      }
    },
    selectedParentId: {
      immediate: true,
      handler: function (selectedParentId) {
        if (selectedParentId === null) {
          this.selectedChildIdValue = null
        }
        this.selectedParentIdValue = selectedParentId
      }
    },
    selectedChildId: {
      immediate: true,
      handler: function (selectedChildId) {
        this.selectedChildIdValue = selectedChildId
      }
    },
    selectedParentIdValue: {
      immediate: true,
      handler: async function (selectedParentIdValue) {
        this.$emit('update:selectedParentId', selectedParentIdValue)
        let selectedParentItem = null
        if (selectedParentIdValue) {
          selectedParentItem = this.getSelectedParentItem()
          if (this.childDataUrl) {
            this.disableChildValue = this.loading = true
            this.childData = await this.$http.get(
              `${this.childDataUrl}/${this.selectedParentIdValue}`,
              {
                params: this.childDataParams
              }
            )
            this.disableChildValue = this.loading = false
          } else {
            const filteredChildOptions = this.childOptions.filter(
              x => x[this.parentProp] === selectedParentIdValue
            )
            this.childData = filteredChildOptions
          }
          if (this.hasSelectAll) {
            this.childData.unshift({
              [this.valueProp]: this.selectAllOption.value,
              name: this.selectAllOption.text
            })
          }
        } else {
          this.childData = []
        }
        if (selectedParentItem) {
          this.selectedParentItem = selectedParentItem
          this.$emit('selectParent', selectedParentItem)
        }
      }
    },
    selectedChildIdValue: {
      immediate: false,
      handler: function (selectedChildIdValue) {
        this.$emit('update:selectedChildId', selectedChildIdValue)
        let selectedChildItem = null
        if (selectedChildIdValue) {
          selectedChildItem = this.getSelectedChildItem()

          if (this.selectedParentIdValue === null && selectedChildItem) {
            this.selectedParentIdValue = this.parentData.filter(
              x => x[this.valueProp] === selectedChildItem[this.parentProp]
            )[0][this.valueProp]
          }
        }
        if (selectedChildItem) {
          this.selectedChildItem = selectedChildItem
          this.$emit('selectChild', selectedChildItem)
        }
      }
    }
  },
  async created () {
    const { cols, colsMd, colsSm, colsLg } = this.$attrs
    this.rowAttrs = { cols, colsMd, colsSm, colsLg }
    if (this.parentDataUrl) {
      await this.loadParentDataFromUrl()
    }
  },
  methods: {
    async loadParentDataFromUrl () {
      const data = await this.$http.get(this.parentDataUrl, {
        params: this.parentDataParams
      })
      if (this.parentHasSelectAll) {
        this.addParentSelectAllOption(data)
      }

      this.parentData = data
    },
    addParentSelectAllOption (parentData) {
      if (
        parentData.length > 0 &&
        parentData[0][this.valueProp] !== this.selectAllOption.value
      ) {
        parentData.unshift({
          [this.valueProp]: this.selectAllOption.value,
          name: this.selectAllOption.text
        })
      }
    },
    getSelectedParentItem () {
      const filteredSelectedItems = this.parentData.filter(
        x => x[this.valueProp] === this.selectedParentIdValue
      )
      const selectedParentItem =
        filteredSelectedItems.length > 0 ? filteredSelectedItems[0] : null
      this.disableChildValue = false

      if (
        selectedParentItem &&
        selectedParentItem[this.valueProp] === this.selectAllOption.value
      ) {
        selectedParentItem.isAll = true
        this.selectedChildIdValue = null
        this.disableChildValue = true
      }

      return selectedParentItem
    },
    getSelectedChildItem () {
      let filteredSelectedItems = []
      let selectedChildItem = null
      if (this.childDataUrl) {
        filteredSelectedItems = this.childData.filter(
          x => x[this.valueProp] === this.selectedChildIdValue
        )
      } else {
        filteredSelectedItems = this.childOptions.filter(
          x => x[this.valueProp] === this.selectedChildIdValue
        )
      }
      if (filteredSelectedItems.length > 0) {
        selectedChildItem = filteredSelectedItems[0]
      }
      if (
        selectedChildItem &&
        this.selectedChildIdValue === this.selectAllOption.value
      ) {
        selectedChildItem.isAll = true
        selectedChildItem.data = this.childData.filter(
          x => x.id !== this.selectAllOption.value
        )
      }
      return selectedChildItem
    },
    onChangeParent () {
      this.selectedChildIdValue = null
    }
  }
}
</script>
