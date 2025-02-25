<template>
  <layout-content :header="$t('cluster.cluster')">
    <complex-table ref="clusterData" local-key="cluster_columns" :row-key="getRowKeys" :selects.sync="clusterSelection" @selection-change="selectChange" :search-config="searchConfig" :data="data" :pagination-config="paginationConfig" @search="search" v-loading="loading">
      <template #header>
        <el-button-group>
          <el-button size="small" @click="onCreate()" v-permission="['ADMIN','PROJECT_MANAGER']">
            {{ $t("commons.button.create") }}
          </el-button>
          <el-button size="small" @click="onImport()" v-permission="['ADMIN','PROJECT_MANAGER']">
            {{ $t("commons.button.import") }}
          </el-button>
          <el-button size="small" :disabled="clusterSelection.length !== 1 || isDeleteButtonDisable" @click="onUpgrade()">
            {{ $t("commons.button.upgrade") }}
          </el-button>
          <el-button size="small" :disabled="clusterSelection.length !== 1 || isDeleteButtonDisable" @click="onHealthCheck()">
            {{ $t("commons.button.check") }}
          </el-button>
        </el-button-group>
      </template>

      <el-table-column type="selection" :reserve-selection="true" fix></el-table-column>
      <el-table-column sortable :label="$t('commons.table.name')" min-width="100" prop="name" fix>
        <template v-slot:default="{row}">
          <el-link v-if="row.status === 'Running'" type="info" @click="goForDetail(row)">{{ row.name }}</el-link>
          <span v-if="row.status !== 'Running'">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable :label="$t('cluster.project')" v-if="isAdmin" min-width="100" prop="projectName" fix />
      <el-table-column sortable :label="$t('cluster.version')" min-width="75" prop="version" fix />
      <el-table-column sortable :label="$t('cluster.node_size')" min-width="70" prop="nodeSize" />
      <el-table-column :label="$t('commons.table.status')" min-width="100" prop="status">
        <template v-slot:default="{row}">
          <div v-if="row.status ==='Running'">
            <span class="iconfont iconduihao" style="color: #32B350"></span>
            {{ $t("commons.status.running") }}
          </div>
          <div v-if="row.status === 'Failed'">
            <span class="iconfont iconerror" style="color: #FA4147"></span> &nbsp; &nbsp; &nbsp;
            <el-link type="info" @click="getStatus(row)">{{ $t("commons.status.failed") }}</el-link>
          </div>
          <div v-if="row.status === 'Initializing'">
            <i class="el-icon-loading" />&nbsp; &nbsp; &nbsp;
            <el-link type="info" @click="getStatus(row)"> {{ $t("commons.status.initializing") }}</el-link>
          </div>
          <div v-if="row.status === 'Upgrading' ">
            <i class="el-icon-loading" /> &nbsp; &nbsp; &nbsp;
            <el-link @click="getStatus(row)" type="info"> {{ $t("commons.status.upgrading") }}</el-link>
          </div>
          <div v-if="row.status === 'Terminating' && row.provider==='bareMetal' ">
            <i class="el-icon-loading" /> &nbsp; &nbsp; &nbsp;
            <el-link type="info" @click="getStatus(row)">{{ $t("commons.status.terminating") }}</el-link>
          </div>
          <div v-if="row.status === 'Terminating' && row.provider!=='bareMetal' ">
            <i class="el-icon-loading" /> &nbsp; &nbsp; &nbsp;
            <span>{{ $t("commons.status.terminating") }} </span>
          </div>
          <div v-if="row.status === 'Creating'">
            <i class="el-icon-loading" />{{ $t("commons.status.creating") }}
          </div>
          <div v-if="row.status === 'Waiting'">
            <i class="el-icon-loading" />{{ $t("commons.status.waiting") }}
          </div>
          <div v-if="row.status === 'NotReady'">
            <span class="iconfont iconerror" style="color: #FA4147"></span> &nbsp; &nbsp; &nbsp;
            <el-link type="info" @click="getStatus(row)">{{ $t("commons.status.not_ready") }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" sortable :label="$t('commons.table.create_time')" prop="createdAt">
        <template v-slot:default="{row}">
          {{ row.createdAt | datetimeFormat }}
        </template>
      </el-table-column>
      <el-table-column width="120px" fix>
        <template v-slot:default="{row}">
          <el-button style="font-weight: bold;" :disabled="row.status !== 'Running'" type="primary" size="mini" @click="getDashboardUrl(row)">Dashboard</el-button>
        </template>
      </el-table-column>
      <fu-table-operations :buttons="buttons" :label="$t('commons.table.action')" fix />
    </complex-table>

    <el-dialog @close="searchForPolling()" :title="$t('task.condition_detail')" destroy-on-close width="70%" :visible.sync="dialogLogVisible">
      <ko-logs :key="isRefresh" :operation="operationType" :clusterName="clusterName" :errMsg="errMsg" @retry="onRetry" @cancle="dialogLogVisible = false" />
    </el-dialog>

    <el-dialog :title="$t('cluster.delete.delete_cluster')" width="30%" :visible.sync="dialogDeleteVisible">
      <el-form ref="delForm" :model="delForm" :rules="rules">
        <div v-if="isUninstallShow">
          <el-checkbox @change="isForce = false" v-model="isUninstall">{{ $t('cluster.delete.is_uninstall') }}</el-checkbox>
          <div style="margin-top: 5px; margin-bottom: 20px"><span class="input-help">{{ $t('cluster.delete.sure_uninstall') }}</span></div>
        </div>

        <div v-if="isForceShow">
          <el-checkbox :disabled="isUninstallShow && !isUninstall" v-model="isForce">{{ $t('cluster.delete.is_force') }}</el-checkbox>
          <div style="margin-top: 5px"><span class="input-help">{{ $t('cluster.delete.force_delete') }}</span></div>
        </div>

        <div style="margin-top: 20px;font-weight: 500;"><span>{{ $t('cluster.delete.delete_cluster_help', [deleteName]) }}</span></div>
        <el-form-item style="margin-top: 5px" prop="inputName">
          <el-input v-model="delForm.inputName" :placeholder="$t('cluster.delete.submit_delete_input', [deleteName])" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogDeleteVisible = false">{{ $t("commons.button.cancel") }}</el-button>
        <el-button size="small" @click="submitDelete()" v-preventReClick>
          {{ $t("commons.button.submit") }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('cluster.health_check.health_check')" width="50%" :visible.sync="dialogCheckVisible" :close-on-click-modal="false">
      <div align="center" style="margin-top: 15px">
        <el-table v-loading="checkLoading" :data="checkData.hooks" v-if="!isRecover" border style="width: 90%">
          <el-table-column prop="name" :label="$t('commons.table.name')">
            <template v-slot:default="{row}">
              {{ $t('cluster.health_check.' + row.name) }}
            </template>
          </el-table-column>
          <el-table-column prop="level" :label="$t('commons.table.status')">
            <template v-slot:default="{row}">
              {{ $t('cluster.health_check.' + row.level) }}
            </template>
          </el-table-column>
          <el-table-column prop="msg" :label="$t('cluster.health_check.message')" />
        </el-table>
      </div>
      <div align="center" style="margin-top: 15px">
        <el-table v-loading="checkLoading" :data="recoverItems" v-if="isRecover" border style="width: 90%">
          <el-table-column prop="name" :label="$t('commons.table.name')">
            <template v-slot:default="{row}">
              {{ $t('cluster.health_check.' + row.name) }}
            </template>
          </el-table-column>
          <el-table-column prop="method" :label="$t('cluster.health_check.method')">
            <template v-slot:default="{row}">
              {{ $t('cluster.health_check.' + row.method) }}
            </template>
          </el-table-column>
          <el-table-column prop="result" :label="$t('cluster.health_check.result')">
            <template v-slot:default="{row}">
              {{ $t('cluster.health_check.' + row.result) }}
            </template>
          </el-table-column>
          <el-table-column prop="msg" :label="$t('cluster.health_check.message')" />
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" v-if="checkData.level=='STATUS_ERROR'" @click="onRecover()" v-preventReClick>
          {{ $t("cluster.health_check.recover") }}
        </el-button>
      </div>
    </el-dialog>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent"
import ComplexTable from "@/components/complex-table"
import { initCluster, upgradeCluster, deleteCluster, healthCheck, clusterRecover, searchClusters } from "@/api/cluster"
import KoLogs from "@/components/ko-logs/index.vue"
import { listRegistryAll } from "@/api/system-setting"
import { checkPermission } from "@/utils/permisstion"
import { jumpTo } from "../../api/system-setting"
import Rule from "@/utils/rules"
import { openLoggerWithName } from "@/api/cluster/tasks"

export default {
  name: "ClusterList",
  components: { ComplexTable, LayoutContent, KoLogs },
  data() {
    return {
      buttons: [
        {
          label: this.$t("commons.button.upgrade"),
          icon: "el-icon-upload2",
          click: (row) => {
            this.onUpgrade(row)
          },
          disabled: (row) => {
            return row.status !== "Running"
          },
        },
        {
          label: this.$t("commons.button.check"),
          icon: "el-icon-data-line",
          click: (row) => {
            this.onHealthCheck(row)
          },
          disabled: (row) => {
            return row.status !== "Running" && row.status !== "Failed" && row.status !== "NotReady"
          },
        },
        {
          label: this.$t("commons.button.delete"),
          icon: "el-icon-delete",
          click: (row) => {
            this.onDelete(row)
          },
          disabled: (row) => {
            return row.status !== "Running" && row.status !== "Failed" && row.status !== "NotReady"
          },
        },
      ],
      isAdmin: checkPermission("ADMIN"),
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      clusterName: "",
      errMsg: "",
      currentCluster: {
        spec: {},
      },
      clusterSelection: [],
      data: [],

      // cluster health check
      dialogCheckVisible: false,
      checkLoading: true,
      isRecover: false,
      recoverItems: [],
      checkData: {},

      // cluster logs
      dialogLogVisible: false,
      operationType: "",
      isRefresh: false,

      // cluster delete
      isForce: false,
      isUninstall: false,
      isForceShow: false,
      isUninstallShow: false,
      dialogDeleteVisible: false,
      isDeleteButtonDisable: false,
      deleteName: "",
      delForm: {
        inputName: "",
      },
      rules: {
        inputName: [Rule.RequiredRule],
      },

      searchConfig: {
        quickPlaceholder: this.$t("commons.search.quickSearch"),
        components: [
          { field: "name", label: this.$t("commons.table.name"), component: "FuComplexInput", defaultOperator: "eq" },
          {
            field: "created_at",
            label: this.$t("commons.table.create_time"),
            component: "FuComplexDate",
            valueFormat: "yyyy-MM-dd",
          },
        ],
      },
      loading: false,
      timer: null,
    }
  },
  methods: {
    getDashboardUrl(row) {
      jumpTo(row.projectName, row.name).then((data) => {
        window.open(data.url, "_blank")
      })
    },
    getRowKeys(row) {
      return row.name
    },
    search(condition) {
      this.loading = true
      this.$refs.clusterData?.clearSelection()
      const { currentPage, pageSize } = this.paginationConfig
      searchClusters(currentPage, pageSize, condition, false).then((data) => {
        this.loading = false
        this.data = data.items || []
        this.paginationConfig.total = data.total
      })
    },
    searchForPolling(condition) {
      const { currentPage, pageSize } = this.paginationConfig
      searchClusters(currentPage, pageSize, condition, true).then((data) => {
        this.data = data.items || []
        this.paginationConfig.total = data.total
      })
    },
    onCreate() {
      this.$router.push({ name: "ClusterCreate" })
    },
    onImport() {
      this.$router.push({ name: "ClusterImport" })
    },
    onUpgrade(row) {
      if (!row) {
        row = this.clusterSelection[0]
      }
      this.$router.push({ name: "ClusterUpgrade", params: { name: row.name } })
    },
    goForDetail(row) {
      listRegistryAll().then((data) => {
        let repoList = data.items === null ? [] : data.items
        let isExit = false
        let isAmdExit = false
        let isArmExit = false
        switch (row.architectures) {
          case "amd64":
            for (const repo of repoList) {
              if (repo.architecture === "x86_64") {
                isExit = true
                break
              }
            }
            break
          case "arm64":
            for (const repo of repoList) {
              if (repo.architecture === "aarch64") {
                isExit = true
                break
              }
            }
            break
          case "all":
            for (const repo of repoList) {
              if (repo.architecture === "x86_64") {
                isAmdExit = true
                continue
              }
              if (repo.architecture === "aarch64") {
                isArmExit = true
                continue
              }
            }
            isExit = isAmdExit && isArmExit
            break
        }
        if (isExit) {
          this.$router.push({ name: "ClusterOverview", params: { project: row.projectName, name: row.name } })
        } else {
          this.$message({ type: "info", message: this.$t("cluster.creation.repo_err") })
        }
      })
    },
    selectChange() {
      let isOk = true
      if (this.clusterSelection.length === 0) {
        this.isDeleteButtonDisable = true
        return
      }
      for (const item of this.clusterSelection) {
        if (item.status !== "Running" && item.status !== "Failed" && item.status !== "NotReady") {
          isOk = false
          break
        }
      }
      this.isDeleteButtonDisable = !isOk
    },
    onDelete(row) {
      this.isForce = false
      this.isUninstall = false
      this.dialogDeleteVisible = true
      this.deleteName = row.name
      this.delForm.inputName = ""
      switch (row.source) {
        case "local":
          this.isForceShow = true
          this.isUninstallShow = false
          break
        case "ko-external":
          this.isForceShow = true
          this.isUninstallShow = true
          break
        case "external":
          this.isForceShow = false
          this.isUninstallShow = false
          break
      }
    },
    submitDelete() {
      if (this.deleteName !== this.delForm.inputName) {
        this.$message({
          type: "info",
          message: this.$t("commons.validate.input_error"),
        })
        return
      }
      this.$refs["delForm"].validate((valid) => {
        if (valid) {
          deleteCluster(this.deleteName, this.isForce, this.isUninstall)
            .then(() => {
              this.search()
              if (this.isUninstall) {
                this.$message({
                  type: "success",
                  message: this.$t("commons.msg.restart_after_delete"),
                })
              }
              this.dialogDeleteVisible = false
            })
            .catch(() => {
              this.search()
              this.dialogDeleteVisible = false
            })
        }
      })
    },

    // cluster health check
    onHealthCheck(row) {
      this.checkData = {}
      if (!row) {
        row = this.clusterSelection[0]
      }
      this.currentCluster = row
      this.dialogCheckVisible = true
      this.checkLoading = true
      this.isRecover = false
      healthCheck(this.currentCluster.name).then((data) => {
        this.checkData = data
        this.checkLoading = false
      })
    },
    onRecover() {
      this.recoverItems = []
      this.checkLoading = true
      this.isRecover = true
      clusterRecover(this.currentCluster.name, this.checkData).then((data) => {
        this.checkData = { hooks: [], level: "" }
        this.recoverItems = data
        this.checkLoading = false
      })
    },

    getStatus(row) {
      if (row.status === "Terminating") {
        openLoggerWithName(row.name, row.currentTaskID)
        return
      }
      this.isRefresh = !this.isRefresh
      this.operationType = row.status.indexOf("NotReady") !== -1 ? "not-ready" : "waiting-poll"
      this.dialogLogVisible = true
      this.clusterName = row.name
      this.errMsg = row.message
    },
    onRetry(operation) {
      switch (operation) {
        case "CLUSTER_UPGRADE":
          upgradeCluster(this.clusterName, this.currentCluster.upgradeVersion)
          break
        case "CLUSTER_CREATE":
          initCluster(this.clusterName)
          break
        case "CLUSTER_DELEDE":
          deleteCluster(this.clusterName, true, this.isUninstall)
          break
      }
    },

    polling() {
      this.timer = setInterval(() => {
        let flag = false
        const needPolling = ["Initializing", "Terminating", "Creating", "Waiting", "Upgrading"]
        for (const item of this.data) {
          if (needPolling.indexOf(item.status) !== -1) {
            flag = true
            break
          }
        }
        if (flag) {
          this.searchForPolling()
        }
      }, 10000)
    },
  },
  mounted() {
    this.search()
    this.polling()
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
  }
}
</style>
