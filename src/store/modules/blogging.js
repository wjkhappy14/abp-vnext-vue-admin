import blog from './blogging/blog'
import comment from './blogging/comment'
import post from './blogging/post'
import tag from './blogging/tag'


export default {
  namespaced: true,
  modules: {
    blog,
    comment,
    post,
    tag
  }
}
