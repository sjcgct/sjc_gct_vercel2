import React, { Component } from "react";
import { getAllBlogsForHome} from '../prismic-configuration'
import Pagination from "react-js-pagination";
import Layout from '../components/Layout'
import Deck from '../components/deck' 
import { PrismicLink } from 'apollo-link-prismic';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql, { disableExperimentalFragmentVariables } from "graphql-tag";




const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: `https://sjcgctrepo.prismic.io/graphql`,
    accessToken: process.env.PRISMIC_TOKEN,
  }),
  cache: new InMemoryCache()
});

class BlogPage extends Component {
  constructor(props) {
    super(props);
    var page_arr = [];
    page_arr[0]=props.cursor
    this.state = {
      activePage: 0,
      total:props.totalCount,
      blogs:props.blogs,
      rediret:false,
      cursor:props.cursor,
      hasnext:props.hasnext,
      page_arr:page_arr,
      loadedtill:0
    };
    console.log(this.state.loadedtill)

  }

  async loadPage(action,cursor,limit,page){
    //console.log(this.getBlogForNextOrPrevPage(action,cursor,limit));
    var blogs=''
    var curs=''
    var hasnext=''
    this.state.activePage=page
    //alert(this.state.activePage)

    var shallWeStore=true
    if(this.state.loadedtill>=page){
      //alert("alread loaded")
      shallWeStore=false
      cursor=this.state.page_arr[page-1]
    }
    else{
      //alert("newly loading")
      this.state.loadedtill=this.state.loadedtill+1
    }

    apolloClient.query({
      query:this.getBlogForNextOrPrevPage(action,cursor,limit)
    }).then(response => {
      console.log("success");
      blogs=response.data.allBlogss.edges
      curs=response.data.allBlogss.pageInfo.endCursor
      hasnext=response.data.allBlogss.pageInfo.hasNextPage
      if(shallWeStore==true){
        this.state.page_arr[this.state.loadedtill]=curs
      }
      this.setState({blogs:blogs,cursor:curs,hasnext:hasnext})
    }).catch(error => {
      console.error("error");
      alert(error)
    });
    
    //alert(this.state.loadedtill+" max")
    for(var i=0;i<this.state.loadedtill;i++){
      //alert(this.state.page_arr[i])
      console.log("hi")
    }

  }

   getBlogForNextOrPrevPage(action,lastPostCursor,limitation){
    const query =gql`
        {
          allBlogss(sortBy: date_DESC, ${action}:"${lastPostCursor}",first:${limitation}){
            totalCount
            pageInfo{
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            edges{
              node{
                title
                date
                featured_image
                excerpt
                author {
                  _linkType
                }
                category {
                  ... on Category{
                    name
                    _meta {
                      id
                    }
                  }
                }
                _meta{
                  uid
                }
                excerpt
              }
            }
          }
        }
      `
  return query
  }

  async nextPage() {
    await this.loadPage('after',this.state.cursor,6,this.state.activePage+1)
  }
  async prevPage() {
    if(this.state.activePage-1==0){
      this.state.hasprev=false
    }
    await this.loadPage('after',this.state.cursor,6,this.state.activePage-1)
  }

  render() {
    return (
        <Layout>
           {this.state.blogs && (
        <Deck
          cards={this.state.blogs}
          type='blog'
        />
         )}


        <button disabled={this.state.activePage==0} onClick={() => this.prevPage()}>
         Previous
        </button>

        <p> </p>

        <button disabled={!this.state.hasnext} onClick={() => this.nextPage()}>
          Next
        </button>

        </Layout>

    );
  }
}

export default BlogPage

export async function getServerSideProps({params,previewData}) {
  const posts=await getAllBlogsForHome(" ",6)
  var blogs=posts.edges
  var cursor=posts.pageInfo.endCursor
  var totalCount=posts.totalCount
  var hasnext=posts.pageInfo.hasNextPage
  return {
    props: {blogs,cursor,totalCount,hasnext}
  }
}

