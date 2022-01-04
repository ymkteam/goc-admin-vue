<template>
  <div>
    <div class="page-header" style="padding:0.75rem 2rem !important;">
      <f-row style="width:100%" class="pr-0">
        <f-col>
          <div class="page-title">
            <h4 v-if="!$slots.title">{{ this.title }}</h4>
            <slot name="title"></slot>
          </div>
        </f-col>
        <f-col class="col-auto pr-0" v-if="parentRoute || $slots.right">
          <div class="breadcrumb float-right">
            <slot name="right"></slot>
            <router-link
              v-if="parentRoute"
              :to="{ name: parentRoute }"
              class="float-right"
            >
              <i class="fa fa-times"></i>
            </router-link>
          </div>
        </f-col>
      </f-row>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GPage',
  props: {
    title: {
      type: String
    },
    parentRoute: {
      type: String
    }
  }
}
</script>
