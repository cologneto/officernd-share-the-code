import React,{ useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'

function Home(props) {

    const [state , setState] = useState({
        isAdmin : false,
        isFirstChange : true,
        snippets: [],
        skip: 0,
        isUserSnippets: false,

    });

    const deleteSnippet = (e) => {
        const parent = e.target.closest('div');
        const sid = parent.dataset.sid;

        axios.get(API_BASE_URL + '/api/test/admin', { headers: { 'x-access-token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then((res) => {
                if(res.status === 200) {
                    return axios.delete(API_BASE_URL + '/api/snippet/' + sid)
                }
            })
            .then(() => {
                let snips = state.snippets.filter(snip => snip._id !== sid);

                setState(prevState => ({
                    ...prevState,
                    snippets: snips
                }));
            })
            .catch(e => console.log(e))
    };

    const likeSnippet = (e) => {
        const parent = e.target.closest('div');
        const sid = parent.dataset.sid;
        const payload = {
            userId: localStorage.getItem('userId'),
            snippetId: sid
        }
        let likeId = '';

        replaceLikeButton(sid);

        axios.get(API_BASE_URL + '/api/test/user', { headers: { 'x-access-token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then((res) => {
                if(res.status === 200) {
                    return axios.post(API_BASE_URL + '/api/like', payload)
                }
            })
            .then(res => {
                likeId = res.data.like._id;
                return axios.put(API_BASE_URL + '/api/snippet', res.data.like)
            })
            .then(() => {
                 updateSnippets(sid, likeId, parent);
            })
            .catch()
    };

    const updateSnippets = (snippetId, likeId) => {
        const snippetIn = state.snippets.findIndex(s => s._id === snippetId);
        const arr = state.snippets;

        arr[snippetIn].likes.push(likeId);

        setState(prevState => ({
            ...prevState,
            snippets: arr
        }));
    };

    const renderDeleteBtn = () => {
        if (localStorage.getItem('roles') === 'ROLE_ADMIN') {
            return(
                <button type="button" className="btn btn-labeled btn-danger float-right" onClick={deleteSnippet}>
                    <span className="btn-label">Delete</span>
                </button>
            )
        }
    };

    const toggleSnippets = () => {
        setState(prevState => ({
            ...prevState,
            isUserSnippets: !prevState.isUserSnippets,
            isFirstChange: !prevState.isFirstChange,
            skip: 0,
            snippets: []
        }));

        // loadMore();
    };

    const renderLikeBtn = () => {
        if (localStorage.getItem('username')) {
            return(
                <button className="btn btn-secondary header-btn float-right like-btn"
                        style={{marginLeft: '10px'}}
                        onClick={likeSnippet}
                        disabled={state.likeBtnDisabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path
                            d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>
                </button>
            )
        }
    };

    const renderAddSnippetBtn = () => {
        if (localStorage.getItem('username')) {
            return (
                <button type="button" className="btn btn-primary btn-lg" onClick={redirectToCreateSnippet} style={{position: 'fixed', top: '100px', right: '30px'}}>Add Snippet</button>
            )
        }

    };

    const renderMySnippetsBtn = () => {
        if (localStorage.getItem('username')) {
            return (
                <button type="button" className="btn btn-secondary btn-lg"
                        onClick={toggleSnippets} style={{position: 'fixed', top: '150px', right: '30px'}}>
                    { state.isUserSnippets ?  "My snippets" : "All Snippets"}
                </button>
            )
        }
    };

    const redirectToCreateSnippet = () => {
        props.history.push('/createSnippet');
    };

    const getUserSnippets = () => {
        if(state.isFirstChange) {
            setState(prevState => ({
                ...prevState,
                snippets: [],
                skip: 0,
            }))
        }

        let url = API_BASE_URL + '/api/snippet/all?userId=' + localStorage.getItem('userId') + '&skip=' + state.skip;

        return axios.get(url);
    };

    const getSnippets = () => {
        let url = API_BASE_URL + '/api/snippet/all?skip=' + state.skip;

        return axios.get(url);
    };

    const replaceLikeButton = (snippedId) => {
        const snippedDiv = document.querySelector('[data-sid="'+ snippedId+ '"]');
        const likeBtn = snippedDiv.querySelector('.like-btn');
        const newBtn = document.createElement('button');
        newBtn.innerHTML = 'Liked';
        newBtn.disabled = true;
        newBtn.classList.add("btn", "btn-secondary", "header-btn", "float-right");
        newBtn.style.marginLeft = "10px";
        likeBtn.parentNode.replaceChild(newBtn, likeBtn);
    }

    const retrieveSnippetsData = (snippets) => {
        let arr = [];
        snippets.forEach((s) => {
            axios.post(API_BASE_URL + '/api/tags', {
                tags: s.tags
            })
                .then((t) => {
                    s.tags = t.data.map(sn => sn.name);
                    arr.push(s);
                    setState(prevState => ({
                        ...prevState,
                        snippets: state.snippets.concat(arr),
                        skip: state.skip + 5
                    }))
                    return axios.get(API_BASE_URL + '/api/likesPerSnippet/' + s._id)
                })
                .then(l => {
                    const likes = l.data.result;

                    const userLike = likes.filter(like => like.userId === localStorage.getItem('userId'))

                    if(userLike.length > 0) {
                        replaceLikeButton(s._id);
                    }

                })
        })
    };

    const loadMore = () => {
        if(!state.isUserSnippets) {
            getUserSnippets().then((res) => {
                retrieveSnippetsData(res.data.snippets)
            })
        } else {
            getSnippets().then((res) => {
                retrieveSnippetsData(res.data.snippets)
            })
        }
    }

    useEffect(() => {
        let mounted = true;
        getSnippets().then((res) => {
            if (res.status === 200 && mounted) {
                retrieveSnippetsData(res.data.snippets)
                toggleSnippets();
            }
        }).catch(e => {
            console.log(e);
        });

        return () => mounted = false;
    }, []);

    return(
        <div className="mt-2">
            {renderAddSnippetBtn()}
            {renderMySnippetsBtn()}

            {state.snippets.map((snippet) => {
                return (
                    <div style={{width: '1024px'}} key={snippet._id}>
                        <div  className="container border mt-2" style={{textAlign: 'left'}}>
                            <div data-sid={snippet._id} data-uid={snippet.userId}>
                                <button
                                    type="button"
                                    className="btn btn-info float-right"
                                    disabled={true}>
                                        {snippet.likes.length}
                                </button>
                                {renderLikeBtn()}
                                {renderDeleteBtn()}
                            </div>
                            <h2 className="text-left">Code</h2>
                            <div className="bg-dark">
                                <pre>
                                    <code style={{color: 'white'}}>
                                        {snippet.code}
                                    </code>
                                </pre>
                            </div>
                            <h2>Tags</h2>
                            <div>
                                {snippet.tags.map(t => {
                                    return (<span key={t}>{'#' + t + '  '}</span>)
                                })}
                            </div>

                        </div>
                    </div>


                )
            })}
            <div className="alert alert-success " style={{display: state.isAdmin ? 'block' : 'none' }} role="alert">
                {state.isAdmin}
            </div>
            {/*<button type="button" style={{display: state.isUserSnippets ? 'block' : 'none' }} className="mt-2 btn btn-labeled btn-secondary" onClick={loadMore}>*/}
                {/*<span className="btn-label">Load more...</span>*/}
            {/*</button>*/}
            <button type="button" className="mt-2 btn btn-labeled btn-secondary" onClick={loadMore}>
                <span className="btn-label">Load more...</span>
            </button>
        </div>
    )
}

export default withRouter(Home);
