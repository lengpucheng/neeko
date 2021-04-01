import el from "element-ui/lib/locale/lang/zh-CN" // 加载element的内容
import fu from "fit2cloud-ui/src/locale/lang/zh-CN" // 加载fit2cloud的内容

const message = {
  commons: {
    message_box: {
      alert: "警告",
      confirm: "确认",
      prompt: "提示"
    },
    dialog: {
      delete: "删除"
    },
    confirm_message: {
      delete: "此操作不可撤销, 是否继续?"
    },
    button: {
      login: "登录",
      ok: "确定",
      save: "保存",
      delete: "删除",
      import: "导入",
      upgrade: "升级",
      check: "诊断",
      cancel: "取消",
      return: "返回",
      create: "添加",
      confirm: "确定",
      edit: "编辑",
      sync: "同步",
      enable: "启用",
      disable: "禁用",
      jump_to: "转到",
      search: "查询",
      verify: "校验",
      submit: "提交"
    },
    msg: {
      success: "{0}成功",
      op_success: "操作成功",
      save_success: "保存成功",
      delete_success: "删除成功",
      delete_cancel: "已取消删除",
      sync_success: "同步成功",
      create_success: "创建成功",
      verify_success: "校验成功",
      import_success: "导入成功"
    },
    validate: {
      limit: "长度在 {0} 到 {1} 个字符",
      input: "请输入{0}",
      cannot_be_empty: "该内容不能为空!",
      select: "请选择{0}",
    },
    search: {
      name: "",
      quickSearch: "快速搜索",
      select: "请选择{0}",
      time: "时间",
      time_start: "开始时间",
      time_end: "结束时间",
      time_range: "至",
      date_start: "开始日期",
      date_end: "结束日期"
    },
    personal: {
      personal_information: "个人信息",
      help_documentation: "帮助文档",
      exit_system: "退出系统"
    },
    table: {
      action: "动作",
      name: "名称",
      status: "状态",
      description: "描述",
      create_time: "创建时间",
      type: "类型",
    },
    status: {
      running: "运行中",
      initializing: "初始化中",
      failed: "失败",
      error: "错误",
      active: "活跃",
      passive: "禁用",
      Waiting: "等待中",
      Failed: "失败",
      Running: "运行中",
      Initializing: "初始化中",
      Upgrading: "升级中",
      Terminating: "销毁中",
    },
    role: {
      admin: "管理员",
      user: "用户"
    },
    form: {
      required_msg: "输入项不能为空",
      ip_error: "请输入正确的Ip地址",
      ip_range_error: "Ip范围无效"
    }
  },
  login: {
    username: "用户名",
    password: "密码",
    title: "登录 FIT2CLOUD",
    welcome: "欢迎回来，请输入用户名和密码登录",
    expires: "认证信息已过期，请重新登录"
  },
  route: {
    project: "项目",
    cluster: "集群",
    host: "主机",
    system_setting: "系统设置",
    manifest: "版本管理",
    message: "消息中心",
    message_receiver: "接收源",
    message_subscribe: "消息订阅",
    system_log: "系统日志",
    complex_table: "复合表格",
    user: "用户"
  },
  cluster: {
    cluster: "集群",
    version: "版本",
    node_size: "节点数量",
    creation: {
      step1: "集群信息",
      name: "名称",
      name_check: "校验中",
      name_help: "支持小写英文、数字和- 不能以数字开头",
      name_invalid_err: "集群名称无效",
      provider: "提供商",
      provide_plan: "部署计划",
      provide_bare_metal: "裸金属",
      version: "版本",
      arch: "架构",
      repo_err: "请在系统设置中完善对应仓库信息",
      yum_repo: "Yum 仓库",
      yum_repo_replace_help:
        "此操作将会对 K8S 节点服务器原始 yum repo 文件进行备份，之后生成并仅使用 KubeOperator 的 yum repo",
      yum_repo_coexist_help: "此操作将保持K8S节点服务器原始 yum repo 文件不变，同时生成并使用 kubeoperator 的 yum repo",
      yum_repo_no_help: "此操作将保持使用 K8S 节点服务器原始 yum repo 文件，不对K8S节点服务器的 yum repo 做任何操作",

      step2: "集群设置",
      container_network: "容器网络",
      cluster_cidr: "集群 CIDR",
      max_node_pod_num: "POD 数量上限/节点",
      max_cluster_service_num: "Service 数量上限/集群",
      proxy_mode: "proxy 模式",
      kubernetes_audit: "Kubernetes 审计",
      enable: "启用",
      disable: "禁用",
      network_help: "CIDR不能与目标IP段重叠，否则会造成初始化失败",
      max_node_num_show: "当前容器网络配置下，集群最多拥有 {0} 节点",

      step3: "运行时设置",
      runtime_type: "容器运行时",
      docker_storage_dir: "Docker 数据路径",
      containe_storage_dir: "Container 数据路径",
      subnet: "Container 子网",

      step4: "容器网络设置",
      network_interface: "网卡名称",
      network_interface_help: "多网卡环境需要指定使用的网卡名称，单网卡环境可不填",
      network_type: "容器网络",
      flannel_backend: "网络模式",
      flannel_backend_help_route:
        "基于路由，不适用于公有云环境，优势是没有封包和解包过程，完全基于两端宿主机的路由表进行转发劣势是要求宿主机在2层网络是互通，且路由表膨胀会导致性能降低。",
      flannel_backend_help_channel:
        "基于隧道，在任何网络环境下都可以正常工作，优势是对物理网络环境没有特殊要求，只要宿主机IP层可以路由互通即可。劣势是封包和解包耗费CPU性能，且额外的封装导致带宽浪费。",

      step5: "组件设置",
      ingress_type: "ingress 类型",
      support_gpu: "安装GPU套件",

      step6_of_bare_metal: "节点信息",
      node_help: "主机需要先在项目-资源中授权",
      master_select_help: "（Master 节点的数量必须为1或者3）",
      step6_of_plan: "部署计划",
      worker_num: "Worker 数量",

      step7: "配置预览",
      base_setting: "基本配置"
    },
    detail: {
      tag: {
        overview: "概览",
        node: "节点",
        namespace: "命名空间",
        storage: "存储",
        event: "事件",
        monitor: "监控",
        log: "日志",
        tool: "工具",
        backup: "备份",
        csi: "csi扫描",
        grade: "集群评分",
      },
      overview: {
        source: "来源",
      },
      log: {
        time: "时间",
        msg_info: "消息内容",
        monitor_node: "监控节点",
        label: "标签",
        value: "标签值",
        match_info: "匹配内容",
        match_info_quick: "按 匹配内容 查询",
      },
      tool: {
        enable_title: "启用工具",
        disable_title: "禁用工具",
        info_title: "提示信息",
        err_title: "错误信息",
        upgrade_title: "版本升级",
        disable_show_msg: "禁用此工具会导致数据丢失,是否继续？",
        enable_storage: "启用存储",
        storage_class: "存储类",
        storage_size: "大小（Gi）",
        data_retention: "数据保留（天）",
        search_index: "前缀索引",
        search_index_help: "例如：logstash",
        replicas: "副本数量",
        max_replicas_num: "最大副本数为",
        hip_memery: "堆内存(GB)",
        default_hip_memery: "默认值为1G",
        password: "密码",
        password_re: "确认密码",
        node_select_help: "（非必填项）",
        log_err_msg: "logging 和 loki 不支持同时启用！",
        grafana_err_msg: "请先启用 promethues 作为默认数据源！",
      }
    }
  },
  host: {
    host: "主机",
    memory: "内存",
    os: "操作系统",
    architecture: "架构",
    port: "端口",
    new_credential: "新建凭据",
    exists_credential: "已存在凭据",
    ip: "IP",
    gpu: "GPU(个)"
  },
  message: {
    content: "消息内容",
    type: "类型",
    level: "级别",
    mark_as_read: "标记为已读",
    dingding_phone: "钉钉手机号",
    dingding_phone_help: "用于钉钉接收告警消息",
    work_wechart_id: "企业微信用户ID",
    work_wechart_id_help: "用于企业微信接收告警消息 userid如何查找？https://work.weixin.qq.com/api/doc/90000/90135/90665",
    email: "邮箱",
    message_type: "消息类型",
    message_in_station: "站内信",
    mail: "邮件",
    work_wechat: "企业微信",
    dingding: "钉钉",
  },
  user: {
    username: "用户名",
    password: "密码",
    confirm_password: "确认密码",
    role: "角色",
    email: "邮箱",
    user: "用户"
  },
  manifest: {
    title: "版本管理",
    detail: "详情",
    enable: "启用",
    message: "版本 {0} 启用/停用成功！"
  },
  system_log: {
    title: "系统日志",
    operation: "操作",
    operation_info: "操作内容",
    query_placeholder: "按 名称/操作/操作内容 搜索"
  },
  automatic: {
    name: "自动模式",
    cloud_provider: "云提供商",
    datacenter: "数据中心",
    region: {
      name: "区域",
      basic: "基本信息",
      config: "配置参数",
      description: "区域(Region)：与公有云中的区域（Region）概念相似，比如阿里云华北 1。对于 vSphere，区域对应于 Datacenter。"
    },
    zone: {
      name: "可用区",
      description: "可用区(Zone): 与公有云中的 AZ 概念相似，可以理解为区域中具体的机房，比如北京1区，北京2区。对于 vSphere，可用区对应于集群，也可以对应于集群下面的资源池",
      ready: "就绪",
      uploadImageError: "上传镜像失败",
      initializing: "初始化中"
    },
    plan: {
      name: "部署计划",
      description: "部署计划 (Plan): 在 KubeOperator 中用来描述在哪个区域下，哪些可用区中，使用什么样的机器规格，部署什么类型的集群的一个抽象概念",
      deploy_template: "部署模型",
      SINGLE: "一主多节点",
      MULTIPLE: "多主多节点"
    },
    vm_config: {
      name: "虚拟机配置",
      cpu: "CPU(核)",
      memory: "内存(GB)",
      name_validate_msg: "支持英文和数字",
      cpu_invalid: "CPU 范围 1～1000",
      mem_invalid: "内存 范围 1～1000",
    },
    ip_pool: {
      name: "IP池",
      subnet: "子网",
      ip_usage: "使用情况",
      gateway: "网关",
      ip_start: "开始IP",
      ip_end: "结束IP",
      dns1: "DNS1",
      dns2: "DNS2",
      description: "描述",
      address: "IP",
      status: "状态",
      ip_list: "IP列表",
      ip_available: "可用",
      ip_lock: "占用",
      ip_used: "使用中",
      ip_reachable: "可达"
    }
  },
  project: {
    project: "项目",
    member: "成员管理",
    resource: "资源管理",
    CLUSTER_MANAGER: "集群管理员",
    PROJECT_MANAGER: "项目管理员",
    description: "描述",
    add_project_manager: "添加项目管理员",
    key_words:"请输入姓名",
    add_project_resource: "添加资源",
  },
  credential: {
    name: "凭据名称",
    credential: "凭据",
    username: "用户名",
    password: "密码",
    privateKey: "密钥",
    type: "类型"
  },
  backup_account: {
    name: "备份账号",
    bucket: "桶",
    type: "类型",
    status: "状态"
  },
  setting: {
    registry: "仓库",
    ntp: "NTP",
    email: "邮箱",
    license: "许可证",
    ldap: "LDAP",
    message: "消息",
    theme: "主题",
    credential: "凭证",
    ntpServer: "NTP服务器",
    table: {
      registry: {
        protocol: "协议",
        hostname: "地址",
        arch: "CPU架构",
      },
      mail: {
        smtp: "SMTP 地址",
        port: "端口",
        username: "用户名",
        password: "密码",
        testUser: "测试用户",
        status: "状态"
      },
      ldap: {
        address: "地址",
        port: "端口",
        username: "用户名",
        password: "密码",
        filterDN: "用户过滤 DN",
        filterRule: "用户过滤规则",
        status: "状态"
      },
      license: {
        title: "KubeOperator 许可证",
        corporation: "公司",
        count: "数量",
        expiration: "过期时间",
        edition: "版本",
        status: "状态",
        valid: "有效",
        invalid: "无效",
        expired: "已到期",
        licenseFile: "许可证",
        communityEdition: "社区版"
      },
      theme: {
        systemName: "系统名称",
        logo: "Logo"
      },
      message: {
        testUser: "测试用户",
        status: "状态",
        webhookAddress: "webhook地址",
        dingTalkConcept: "钉钉基本概念",
        dingTalkLimit: "钉钉消息频率限制",
        wechatConcept: "企业微信基本概念",
        wechatLimit: "企业微信消息频率限制"
      }
    },
    option: {
      addRegistry: "添加仓库",
      editRegistry: "编辑仓库",
      addCredential: "添加SSH凭证",
      editCredential: "编辑SSH凭证",
      addLicense: "添加许可"
    },
    helpInfo: {
      inputPassword: "请输入密码",
      messageInfo: "说明：由于每个企业的消息限制不同 所以KubeOperator没有做主动限制 请根据自身情况酌情使用"
    }
  }
}

export default {
  ...el,
  ...fu,
  ...message
}
