export default {
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    value: {
      type: null
    }
  },
  data () {
    return {
      innerValue: null,
      name: '',
      id: ''
    }
  },
  mounted () {
    if (this.value) {
      this.innerValue = this.value
    }

    this.name = this.$attrs.name
    this.id = this.$attrs.id || this.generateId()
  },
  computed: {
    label () {
      return this.$attrs.label || null
    }
  },
  watch: {
    innerValue (newVal, oldVal) {
      this.innerValueWatcher(newVal, oldVal)
    },
    value (newVal, oldVal) {
      this.valueWatcher(newVal, oldVal)
    }
  },
  methods: {
    valueWatcher (newVal) {
      this.innerValue = newVal
    },
    innerValueWatcher (newVal) {
      this.$emit('input', newVal)
    }
  }
}
