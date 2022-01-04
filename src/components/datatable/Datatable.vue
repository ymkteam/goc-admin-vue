<template>
  <div>
    <div :id="toolbarId">
      <BForm inline>
        <slot name="toolbar-left"></slot>
        <f-button
          class="mr-2"
          @click="onCreate()"
          variant="primary"
          icon="plus"
          :label="labels.create"
          v-if="componentFeatures.create"
        />
        <slot name="toolbar-right"></slot>
      </BForm>
    </div>
    <BootstrapTable
      :id="tableId"
      :ref="tableId"
      :columns="allColumns"
      :data="data"
      :options="tableOptions"
      @on-check="onCheck"
      @on-uncheck="onUncheck"
      @on-load-success="onLoadSuccess"
      class="no-wrap"
    ></BootstrapTable>
  </div>
</template>

<script>
import 'bootstrap-table/src/bootstrap-table.js'
import BootstrapTable from 'bootstrap-table/src/vue/BootstrapTable.vue'

import 'bootstrap-table/src/extensions/export/bootstrap-table-export.js'
import 'bootstrap-table/src/extensions/defer-url/bootstrap-table-defer-url.js'
import 'bootstrap-table/src/extensions/print/bootstrap-table-print.js'
import 'bootstrap-table/src/locale/bootstrap-table-tr-TR.js'

import { BForm } from 'bootstrap-vue'
import config from '../../utils/config'

export default {
  name: 'GDatatable',
  components: { BForm, BootstrapTable },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: [Array, Object],
      default: () => []
    },
    dataUrl: { type: String },
    hasFirstLoad: { type: Boolean, default: true },
    queryParams: { type: Object },
    options: {
      type: Object,
      default: function () {
        return {}
      }
    },
    features: {
      type: Object,
      default: function () {
        return {}
      }
    },
    id: { type: String },
    actions: { type: Array, default: () => [] }
  },
  data () {
    const _self = this
    const tableId = this.id ? this.id : this.generateId()
    const toolbarId = `${tableId}-toolbar`

    if (this.features.crud) {
      this.features.create = true
      this.features.update = true
      this.features.delete = true
    }

    const componentFeatures = Object.assign(
      {
        create: false,
        update: false,
        delete: false,
        pagination: true,
        serverSidePagination: false,
        export: false,
        serverSideExport: false,
        search: false,
        fullscreen: true,
        showColumns: true,
        singleSelect: false,
        multiSelect: false,
        actionColumnFirst: true,
        singleSelectType: 'radio'
      },
      this.features
    )

    const defaultOptions = {
      toolbar: `#${toolbarId}`,
      sortReset: true,
      search: componentFeatures.search,
      showColumns: componentFeatures.showColumns,
      showFullscreen: componentFeatures.fullscreen,
      pagination: componentFeatures.pagination,
      totalField: 'count',
      queryParamsType: 'limit',
      queryParams: params => ({ ...params, ...this.queryParams }),
      loadingTemplate: () =>
        '<div class="spinner-border" role="status"><span class="sr-only">Yükleniyor...</span></div>'
    }

    if (this.dataUrl) {
      const ROOT_API = config.api.rootUrl
      const JWT_TOKEN_KEY = config.jwt.jwtTokenKey

      if (this.hasFirstLoad) {
        defaultOptions.url = `${ROOT_API}${this.dataUrl}`
      } else {
        defaultOptions.deferUrl = `${ROOT_API}${this.dataUrl}`
      }

      const token = window.localStorage.getItem(JWT_TOKEN_KEY)
      defaultOptions.ajaxOptions = {
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        statusCode: {
          401: () => {
            this.$store.dispatch('logout')
          },
          400: error => {
            let errorMessage = config.datatable.messages.errorOccurred
            if (error.responseJSON && error.responseJSON.message) {
              errorMessage = error.responseJSON.message
            }
            this.$refs[this.tableId].updateFormatText(
              'formatNoMatches',
              errorMessage
            )
          }
        },
        success: function (data) {
          // _self.$emit('beforeLoad', data)
        }
      }
    }

    if (componentFeatures.serverSidePagination) {
      defaultOptions.pagination = true
      defaultOptions.sidePagination = 'server'
    }

    let allColumns = []

    if (componentFeatures.singleSelect || componentFeatures.multiSelect) {
      if (componentFeatures.singleSelect) {
        allColumns.push(
          componentFeatures.singleSelectType === 'radio'
            ? { radio: true }
            : { checkbox: true }
        )
        defaultOptions.singleSelect = true
      } else if (componentFeatures.multiSelect) {
        allColumns.push({ checkbox: true })
        allColumns.push({ field: 'id', visible: false })
        defaultOptions.multiSelect = true
      }
      defaultOptions.clickToSelect = true
      defaultOptions.ignoreClickToSelectOn = e => {
        return ['A', 'BUTTON', 'INPUT', 'I'].indexOf(e.tagName) > -1
      }
    }
    allColumns = [...allColumns, ...this.mapColumns(this.columns)]

    if (componentFeatures.serverSideExport) {
      defaultOptions.buttons = () => {
        return {
          exportButton: {
            text: 'Export',
            icon: 'fa-download',
            event: async () => {
              this.$goc.progress.start()
              const headers = {}
              this.allColumns
                .filter(c => c.field !== 'action' && !c.checkbox && !c.radio)
                .forEach(c => {
                  headers[c.field] = c.title
                })
              const exportUrl =
                defaultOptions.exportUrl || `${this.dataUrl}/export`
              const url = await this.$http.post(exportUrl, {
                params: this.queryParams,
                headers
              })
              window.location.href = url
              this.$goc.progress.done()
            },
            attributes: {
              title: 'Export'
            }
          }
        }
      }
    } else if (componentFeatures.export) {
      defaultOptions.exportDataType = defaultOptions.pagination
        ? 'all'
        : 'basic'
      defaultOptions.showExport = true
      defaultOptions.exportTypes = ['xlsx']
      defaultOptions.exportOptions = {
        date: { html: config.date.dateFormat },
        fileName: this.options.exportFileName || tableId,
        mso: {
          fileFormat: 'xlsx',
          xlsx: { formatId: { date: 14, numbers: 1 } }
        }
      }
      defaultOptions.onExportSaved = () => {
        this.$goc.progress.start()
      }

      if (defaultOptions.pagination) {
        defaultOptions.onLoadSuccess = () => {
          this.$goc.progress.done()
        }
      } else {
        defaultOptions.exportOptions.onAfterSaveToFile = () => {
          this.$goc.progress.done()
        }
      }
    }

    const tableOptions = Object.assign(defaultOptions, this.options)

    /* eslint-disable spellcheck/spell-checker */
    if (
      componentFeatures.update ||
      componentFeatures.delete ||
      this.actions.length > 0
    ) {
      const actionTemplates = {}
      const actionVisibilityFunctions = {}
      const actionEvents = {}
      if (componentFeatures.delete) {
        actionTemplates.delete = `<a href="javascript:" class="deleteButton mr-4" title="${config.datatable.labels.delete}" data-toggle="tooltip" data-placement="top"><i class="fa fa-trash-o"></i></a>`
        actionEvents['click .deleteButton'] = function (e, value, row) {
          _self.onDelete(row)
        }
      }
      if (componentFeatures.update && !tableOptions.updateRoute) {
        actionTemplates.update = `<a href="javascript:" class="editButton mr-4" title="${config.datatable.labels.edit}" data-toggle="tooltip" data-placement="top"><i class="fa fa-edit"></i></a>`
        actionEvents['click .editButton'] = function (e, value, row) {
          _self.onUpdate(row)
        }
      }
      if (this.actions.length > 0) {
        for (const action of this.actions) {
          const { icon, title, name, visibility } = action
          actionTemplates[
            name
          ] = `<a href="javascript:" class="${name} mr-4" title="${title}" data-toggle="tooltip" data-placement="top"><i class="fa fa-${icon}" ></i></a>`
          actionEvents[`click .${name}`] = function (e, value, row) {
            _self.onAction(row, name)
          }
          if (visibility) {
            actionVisibilityFunctions[name] = visibility
          }
        }
      }
      const actionColumn = {
        field: 'action',
        title: config.datatable.labels.actions,
        align: 'center',
        width: 100,
        sortable: false,
        formatter: function (value, row) {
          const rowActionTemplates = { ...actionTemplates }
          if (componentFeatures.update && tableOptions.updateRoute) {
            actionTemplates.update = `<a href="${tableOptions.updateRoute}/${row.id}" class="editButton mr-4"><i class="fa fa-edit"></i></a>`
          }
          Object.keys(actionVisibilityFunctions).forEach(actionName => {
            const isVisible = actionVisibilityFunctions[actionName](row)
            if (isVisible !== true) {
              rowActionTemplates[actionName] = ''
            }
          })
          const actionTemplateFormatter = Object.values(
            rowActionTemplates
          ).join('')
          return actionTemplateFormatter
        },
        events: actionEvents
      }
      if (componentFeatures.actionColumnFirst) {
        allColumns.unshift(actionColumn)
      } else {
        allColumns.push(actionColumn)
      }
    }
    /* eslint-enable spellcheck/spell-checker */
    return {
      show: false,
      tableOptions,
      componentFeatures,
      allColumns,
      toolbarId,
      tableId,
      labels: config.datatable.labels,
      messages: config.datatable.messages
    }
  },
  destroyed () {
    window.$('.tooltip').remove()
  },
  methods: {
    onCreate () {
      this.$emit('create')
    },
    onUpdate (row) {
      this.$emit('update', row)
    },
    async onDelete (row) {
      const value = await this.$goc.modal.confirm(
        this.messages.deleteConfirmMessage,
        {
          size: 'sm',
          okTitle: this.labels.delete,
          cancelTitle: this.labels.cancel,
          okVariant: 'danger',
          cancelVariant: 'light'
        }
      )

      if (value) {
        this.$emit('delete', row)
      }
    },
    onAction (row, name) {
      this.$emit('action', row, name)
    },
    onCheck (row) {
      this.$emit('select', row)
    },
    onUncheck (row) {
      this.$emit('unselect', row)
    },
    getSelections () {
      return this.$refs[this.tableId].getSelections()
    },
    refresh (params) {
      this.$refs[this.tableId].refresh(params)
    },
    select (ids, params) {
      if (!params) {
        params = { field: 'id' }
      }
      if (ids && ids.length > 0) {
        params.values = ids
      }
      window.setTimeout(() => {
        this.$refs[this.tableId].checkBy(params)
      }, 500)
    },
    selectAll () {
      this.$refs[this.tableId].checkAll()
    },
    unselectAll () {
      this.$refs[this.tableId].uncheckAll()
    },
    onLoadSuccess (data) {
      this.$emit('load', data)
    },
    load (data) {
      this.$refs[this.tableId].load(data)
    },
    mapColumn (c) {
      const col = {
        sortable: true,
        ...c,
        title: c.title || c.field
      }
      return col
    },
    mapColumns (cols) {
      return cols.map(c =>
        Array.isArray(c) ? this.mapColumns(c) : this.mapColumn(c)
      )
    }
  }
}
</script>
