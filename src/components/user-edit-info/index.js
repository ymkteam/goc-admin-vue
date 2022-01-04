import UserEditInfo from './UserEditInfo'

import { registerComponents } from '../../utils/plugins'

const UserEditInfoPlugin = {
  install (Vue) {
    registerComponents(Vue, { UserEditInfo })
  }
}

export default UserEditInfoPlugin

export { UserEditInfo as FUserEditInfo }
