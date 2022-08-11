import blog from './blogging/blog'
import post from './blogging/post'
import comment from './blogging/comment'

export default {
  namespaced: true,
  modules: {
    blog,
    post,
    comment
  }
}
