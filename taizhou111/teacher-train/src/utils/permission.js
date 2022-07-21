import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export const checkPermission = (value) => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

export const filterRoutes = (routes, perssionList) => {
  const res = []
  const allPath = perssionList.map(item => item.path).join('')
  routes.forEach(route => {
    const tmp = { ...route }
    if (!tmp.meta?.title || tmp.hidden || allPath.indexOf(tmp.meta?.title) > -1) {
      if (tmp.children) {
        tmp.children = filterRoutes(tmp.children, perssionList)
      }
      res.push(tmp)
    }
  })

  return res
}