import {Component} from 'react'

import './index.css'

class BlogItemDetails extends Component {
  state = {isLoding: false, blogData: {}}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const Data = await response.json()
    const updatedData = {
      title: Data.title,
      imageUrl: Data.image_url,
      avatarUrl: Data.avata_url,
      content: Data.content,
      topic: Data.topic,
      author: Data.author,
    }
    this.setState({blogData: updatedData, isLoding: true})
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoding} = this.state

    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div>
        {isLoding ? (
          <div className="blog-info">
            <h2 className="blog-details-title">{title}</h2>

            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>

            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
