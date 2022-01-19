<template>

  <div class="wrapper">




    <parallax
      class="page-header header-filter"
      :style="headerStyle"
    >
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img
              :src="leaf4"
              alt="leaf4"
              class="leaf4"
              v-show="leafShow"
            />
            <img
              :src="leaf3"
              alt="leaf3"
              class="leaf3"
              v-show="leafShow"
            />
            <img
              :src="leaf2"
              alt="leaf2"
              class="leaf2"
              v-show="leafShow"
            />
            <!-- <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" /> -->
            <div class="brand">
              <h1>康宇的2D图像研究室</h1>
              <h3>Kang Yu's 2D Image Research Laboratory</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>

    <vue-element-loading
      :active="LoadingIsActive"
      :is-full-screen="true"
    />

    <div
      id="main main-raised"
      class="main main-raised"
    >
      <div class="section section-basic">
        <div
          id="search"
          class="container"
        >
          <md-field
            class="md-form-group"
            slot="inputs"
          >
            <md-icon>search</md-icon>
            <label>search...</label>
            <md-input v-model="content"></md-input>

          </md-field>
          <md-button
            target="_blank"
            class="md-success"
            v-on:click="getPicList()"
          ><i>Go!</i></md-button>
        </div>
      </div>
      <div
        class="alert alert-danger"
        v-if="error"
      >
        <div class="container">
          <button
            type="button"
            aria-hidden="true"
            class="close"
            @click="event => removeNotify(event,'alert-danger')"
          >
            <md-icon>clear</md-icon>
          </button>
          <div class="alert-icon">
            <md-icon>info_outline</md-icon>
          </div>
          <b> ERROR ALERT </b> : it seems something goes wrong....{{errorMsg}}
        </div>
      </div>
      <div
        id="pictureDispaly"
        class="pictureDispaly"
      >
        <ul>
          <li
            v-for="(item,index) in pictureList"
            :key="index"
          >
            <img
              class="minImg"
              @click="showModal = true;modalPicUrl = item.url;modalPicContent = item.content"
              :src="item.url"
            >
          </li>
        </ul>
        <modal
          v-if="showModal"
          @close="classicModalHide"
        >
          <template slot="header">

            <md-button
              class="md-simple md-just-icon md-round modal-default-button"
              @click="classicModalHide"
            >
              <md-icon>clear</md-icon>
            </md-button>
          </template>

          <template slot="body">
            <img
              class="modalPic"
              :src="modalPicUrl"
            >
          </template>

          <template slot="footer">
            <h5>{{modalPicContent}}</h5>

          </template>
        </modal>
      </div>
      <div class="section section-navbars">
        <div class="container">
        </div>

      </div>
      <div class="space-50"></div>
      <template>
        <!-- 分页器组件 -->
        <div
          class="pagination"
          style="padding-left: 30%;"
        >
          <VuePagination
            ref="vuePagination"
            :current-page="pagination.currentPage"
            :pageSize="pagination.pageSize"
            :totals="pagination.totals"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
   
      <div
        class="section section-download"
        id="downloadSection"
      >
        <div class="container">
    
          <div class="sharing-area text-center">
            <div class="md-layout">
              <div class="md-layout-item">
                <h3>欢迎使用，如果你喜欢</h3>
              </div>
            </div>

            <md-button class="md-weixin"><i class="fab fa-weixin"></i>weixin</md-button>
            <md-button class="md-qq"><i class="fab fa-qq"></i> qq</md-button>
            <md-button class="md-weibo"><i class="fab fa-weibo"></i> weibo</md-button>
            <md-button class="md-github"><i class="fab fa-github"></i> Star</md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicElements from "./components/BasicElementsSection";
import Navigation from "./components/NavigationSection";
import SmallNavigation from "./components/SmallNavigationSection";
import Tabs from "./components/TabsSection";
import NavPills from "./components/NavPillsSection";
import Notifications from "./components/NotificationsSection";
import TypographyImages from "./components/TypographyImagesSection";
import JavascriptComponents from "./components/JavascriptComponentsSection";
import { LoginCard } from "@/components";
import { Modal } from "@/components";
import { Pagination } from '@/components'
import VuePagination from "@/components/VuePagination";
import VueElementLoading from 'vue-element-loading'
export default {
  components: {
    BasicElements,
    Navigation,
    SmallNavigation,
    Tabs,
    NavPills,
    Notifications,
    TypographyImages,
    JavascriptComponents,
    LoginCard,
    Modal,
    Pagination,
    VuePagination,
    VueElementLoading
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg"),
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png"),
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png"),
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png"),
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png"),
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg"),
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg"),
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg"),
    },
  },
  data() {
    return {
      leafShow: true,
      pictureList: [],
      showModal: false,
      pagination: {
        pageSize: 50, // 显示的条数
        totals: 0, // 总数
        currentPage: 1, // 当前第几页
      },
      content: '',
      modalPicUrl: '',
      modalPicContent: '',
      LoadingIsActive: false,
      error: false,
      errorMsg: '请检查网络连接'
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`,
      };
    },
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    },
    getPicList() {
      this.LoadingIsActive = true
      this.$axios({
        method: 'POST',
        url: '/search/',
        data: {
          'content': this.content,
          'page': this.pagination.currentPage
        }
      }).then((response) => {
        if (response.data.code != 200) {
          this.error = true
          this.errorMsg = response.data.message
            this.LoadingIsActive = false
        } else {
          this.error = false;
          console.log(response)
          let data = response.data.data;
          this.pictureList = data.list
          this.pagination.totals = data.count
          // this.picCount = data.count
            this.LoadingIsActive = false
        }


      }).catch((error) => {
        this.error = true
        this.errorMsg = error
          this.LoadingIsActive = false
      })
      let element_id = document.getElementById("main main-raised");
      if (element_id) {
        element_id.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    
    },
    classicModalHide() {
      this.showModal = false;
    },
    handleCurrentChange(val) {
      val.totals = this.pagination.totals;
      this.pagination = {
        ...val,
      };
      this.getPicList()
    },
    removeNotify() {
      this.error = false;
    }
  },

  mounted() {
    console.log('mouted')
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
    this.getPicList();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  },
}
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
.pictureDispaly {
  float: left;
  display: flex;
  overflow: hidden;
  list-style: none;
}
.pictureDispaly .minImg {
  padding: 10px;
  border-radius: 10px;
  max-width: 200px;
  width: expression(this.width >200? "200px": this.width);
  max-height: 200px;
  height: expression(this.height>200? "200px": this.height);
  transition: all 0.3s;
}

.pictureDispaly .minImg:hover {
  transform: scale(1.1);
}
.pictureDispaly li {
  float: left;
  width: 200px;
  height: 200px;
  display: block;
}
.pagination {
  padding-left: 30%;
}
.modalPic {
  max-width: 800px;
  width: expression(this.width >800? "800px": this.width);
  max-height: 500px;
  height: expression(this.height>500? "500px": this.height);
}
</style>
