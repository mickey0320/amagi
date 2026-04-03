/**
 * 抖音系列列表返回类型定义
 * @module ReturnDataType/Douyin/SeriesList
 */

/**
 * 封面图片信息
 */
export interface DySeriesCover {
  /** 图片 URL 列表 */
  url_list: string[]
  /** URI */
  uri: string
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
}

/**
 * 系列统计信息
 */
export interface DySeriesStats {
  /** 收藏数 */
  collect_vv: number
  /** 当前集数 */
  current_episode: number
  /** 最后添加项目时间 */
  last_added_item_time: number
  /** 播放数 */
  play_vv: number
  /** 总集数 */
  total_episode: number
  /** 更新到的集数 */
  updated_to_episode: number
}

/**
 * 单个系列信息
 */
export interface DySeriesItem {
  /** 演员 */
  actors: any[]
  /** 作者信息 */
  author: any
  /** 付费信息 */
  charge_info: any
  /** 内容子类型 */
  content_sub_type: number
  /** 封面图片 */
  cover_url: DySeriesCover
  /** 创建时间 */
  create_time: number
  /** 深色图标 URL */
  dark_icon_url: string
  /** 描述 */
  desc: string
  /** 导演 */
  directors: any[]
  /** 横向封面 URL */
  horizontal_cover_url: DySeriesCover
  /** IDs */
  ids: string[]
  /** 是否为付费系列 */
  is_charge_series: boolean
  /** 是否独家 */
  is_exclusive: boolean
  /** 是否 IAA */
  is_iaa: boolean
  /** 浅色图标 URL */
  light_icon_url: string
  /** 付费集数 */
  paid_episodes: any
  /** 真实姓名 */
  real_name: string
  /** 推荐颜色 */
  recommend_color: string
  /** 权益信息 */
  rights_info: any
  /** 系列内容类型 */
  series_content_types: any
  /** 系列内容类型新版 */
  series_content_types_new: any
  /** 系列表单类型 */
  series_form_type: number
  /** 系列 ICP */
  series_icp: string
  /** 系列 ID */
  series_id: string
  /** 系列互动 */
  series_interactive: any
  /** 系列名称 */
  series_name: string
  /** 系列付费类型列表 */
  series_paid_type_list: any
  /** 系列排名信息 */
  series_rank_info: any
  /** 系列类型 */
  series_type: number
  /** 系列 UI 配置 */
  series_ui_config: any
  /** 分享信息 */
  share_info: any
  /** 统计信息 */
  stats: DySeriesStats
  /** 状态 */
  status: number
  /** 更新时间 */
  update_time: number
  /** 观看项目 */
  watched_item: any
}

/**
 * 系列列表响应数据
 */
export interface DySeriesList {
  /** 状态码 */
  status_code: number
  /** 状态信息 */
  status_msg: string
  /** 系列列表 */
  series_infos: DySeriesItem[]
  /** 是否还有更多数据 */
  has_more: number
  /** 游标，用于翻页 */
  cursor: number
  /** 总数 */
  total: number
  /** 额外信息 */
  extra: {
    /** 致命项目 IDs */
    fatal_item_ids: any[]
    /** 日志 ID */
    logid: string
    /** 当前时间戳 */
    now: number
  }
  /** 日志信息 */
  log_pb: {
    /** 展示 ID */
    impr_id: string
  }
}

export default DySeriesList
