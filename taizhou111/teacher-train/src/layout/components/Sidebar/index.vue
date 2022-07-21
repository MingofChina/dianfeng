<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes_real" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { filterRoutes } from '@/utils/permission'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
	permission_routes_real () {
		console.log(filterRoutes, 'filterRoutes')
		const perssionList =  window.localStorage.getItem('perssionList') ? JSON.parse( window.localStorage.getItem('perssionList')) : []
		const res = filterRoutes(this.permission_routes, perssionList)
		console.log(res)
		return res
	},
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
	::v-deep .el-scrollbar__view {
		padding-top: 24px;
		.el-menu {
			background: #FFF !important;
			.el-menu-item, .el-submenu .el-submenu__title {
				background: #FFF !important;
				color: #606266 !important;
			}

			.router-link-exact-active {
				position: relative;
				.el-menu-item {
					background: #d9ecff !important;
					color: #409EFF !important;
					&:before {
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						content: '';
						border-left: 5px solid #409EFF;
					}
				}
			}

			.el-submenu.is-opened {
				// .el-submenu__title {
				// 	background: #d9ecff !important;
				// 	color: #409EFF !important;
				// }
				.el-menu.el-menu--inline {
					padding: 12px 0 12px 24px;
					.nest-menu {
						.el-menu-item {
							position: relative;
							padding: 0 42px 0 26px !important;
							background-color: #FFF !important;
							&:before {
								position: absolute;
								left: 0;
								top: 0;
								bottom: 0;
								content: '';
								border-left: 3px solid #E5EAF3;
							}
						}
						.router-link-exact-active.router-link-active, .router-link-active {
							.el-menu-item {
								background-color: #d9ecff !important;
								&:before {
									border-left: 3px solid #409EFF;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
