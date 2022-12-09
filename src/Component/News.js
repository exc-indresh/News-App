import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropsTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'

    }
    static propsTypes = {
        country: PropsTypes.string,
        pageSize: PropsTypes.number,
        category: PropsTypes.string,
    }
    async updateNews() {
        const dataurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b59327e8cee7458b9bc49f4d82b0a659&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(dataurl);
        let parseData = await data.json();
        this.setState({
            page: this.state.page,
            articles: parseData.articles,
            loading: false,
            totalResults:parseData.totalResults,
        });

    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false
        }
        document.title = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
    }
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        const dataurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b59327e8cee7458b9bc49f4d82b0a659&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(dataurl);
        let parseData = await data.json();
        this.setState({
            page: this.state.page+1,
            articles: this.state.articles.concat(parseData.articles),
        });

    }
    render() {
        let defaultimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_pjwk49MVvThr_QksYSg4PEe2QeR_A0szg&usqp=CAU";
        return (
            <div>
                <h2 style={{ margin: "65px" ,border:"5px solid black",backgroundColor:"grey", borderRadius:"10px" }} className='text-center'>NewsMonkey - Top Headlines on {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h2>
                <hr />
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-3">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage ? element.urlToImage : defaultimg} newsUrl={element.url ? element.url : "/"} author={element.author ? element.author : "Unknown"} date={element.publishedAt ? element.publishedAt : ".."} source={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
