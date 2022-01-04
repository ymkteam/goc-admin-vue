<template>
  <div>
    <BTooltip
      target="tagCreate"
      title="Oluşturulma"
      v-if="createdInfo"
    ></BTooltip>
    <BTooltip
      target="tagUpdate"
      title="Son Güncelleme"
      v-if="updatedInfo"
    ></BTooltip>
    <span class="tag tag mr-2" id="tagCreate" v-if="createdInfo">
      {{ createdInfo }}
      <span class="tag-addon tag-primary"><i class="fe fe-plus"></i></span>
    </span>
    <span class="tag tag" id="tagUpdate" v-if="updatedInfo">
      {{ updatedInfo }}
      <span class="tag-addon tag-primary"><i class="fe fe-edit"></i></span>
    </span>
  </div>
</template>

<script>
import { getDateTime } from '../../services/date.service'
import { BTooltip } from 'bootstrap-vue'

export default {
  name: 'FUserEditInfo',
  components: { BTooltip },
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    createdInfo () {
      if (this.data && this.data.createdBy) {
        const changedCreatedAt = getDateTime(this.data.createdAt)
        return `${this.data.createdBy.firstName} ${this.data.createdBy.lastName} ${changedCreatedAt}`
      }
      return null
    },
    updatedInfo () {
      if (this.data && this.data.updatedBy) {
        const changedUpdateAt = getDateTime(this.data.updatedAt)
        return `${this.data.updatedBy.firstName} ${this.data.updatedBy.lastName} ${changedUpdateAt}`
      }
      return null
    }
  }
}
</script>
