import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
            <div>
                <div className="card">
                {/* <span class="badge rounded-pill text-bg-primary">{source}</span> */}
                    <span className="position-absolute top-0 translate-middle badge rounded pill bg-dander" style={{left:"90%",zIndex:'1',backgroundColor:"green"}}>{source}</span>
                    <img src={imageUrl}alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {(new Date(date)).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
