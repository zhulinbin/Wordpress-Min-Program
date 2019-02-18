import {
  apiConfig
} from '../../configs/api'

Component({
  properties: {
    skeletonRow: {
      type: Number,
      value: 8
    },
    isShowNoMore: {
      type: Boolean,
      value: false
    },
    isLoadingArticle: {
      type: Boolean,
      value: true,
    },
    articleList: {
      type: Array,
      value: []
    }
  },
  data: {
    loadingIcon: apiConfig.image.common.loadingIcon
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    goDetailPage(ev) {
      this.triggerEvent('goDetailPage', ev.currentTarget.dataset.link)
    }
  }
})