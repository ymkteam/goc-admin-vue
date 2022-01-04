<template>
  <ValidationProvider
    :vid="name"
    :name="name"
    :rules="!disabledValidation ? rules : ''"
    v-slot="{ valid, errors }"
    ref="appUpload"
  >
    <BFormGroup :class="{ dragDrop: dragDrop }" v-bind="$attrs">
      <slot name="label" v-if="!dragDrop">
        <legend class="bv-no-focus-ring col-form-label pt-0">
          <br v-if="inline" />
          <span v-else>
            {{ label }} :
            <a v-if="data" :href="data.url" target="_blank"
              ><b>{{ data.name }}</b></a
            >
          </span>
        </legend>
      </slot>
      <BFormFile
        v-model="innerValue"
        v-bind="$attrs"
        :multiple="dragDrop"
        :state="errors[0] ? false : valid ? true : null"
        :placeholder="placeholder ? placeholder : ''"
        :file-name-formatter="
          files => (dragDrop ? placeholder : formatNames(files))
        "
        @change="onChange"
      ></BFormFile>
      <BFormInvalidFeedback id="inputLiveFeedback">
        {{ errors[0] }}
      </BFormInvalidFeedback>
    </BFormGroup>
  </ValidationProvider>
</template>

<script>
import config from '../../utils/config'
import formControl from './../formControl'
import { ValidationProvider } from 'vee-validate'
import { BFormGroup, BFormFile, BFormInvalidFeedback } from 'bootstrap-vue'

export default {
  name: 'GUpload',
  mixins: [formControl],
  components: {
    BFormGroup,
    BFormFile,
    BFormInvalidFeedback,
    ValidationProvider
  },
  props: {
    disabledValidation: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    dragDrop: { type: Boolean, default: false },
    data: { type: Object },
    placeholder: { type: String }
  },
  methods: {
    async onChange (event) {
      const { valid } = await this.$refs.appUpload.validate()
      if (this.dragDrop && event.dataTransfer && event.dataTransfer.files) {
        this.innerValue = [...event.dataTransfer.files]
      }
      this.$emit('change', event)
      return valid
    },
    formatNames (files) {
      return files.length === 1
        ? files[0].name
        : `${config.upload.labels.selectedFileCount}: ${files.length}`
    }
  }
}
</script>
