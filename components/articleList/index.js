import {
  apiConfig
} from '../../configs/api'

Component({
  properties: {
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
      this.triggerEvent('goDetailPage', ev.currentTarget.dataset.id)
    }
  }
})