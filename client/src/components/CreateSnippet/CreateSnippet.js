import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function CreateSnippet(props) {
    const [state , setState] = useState({
        code: '',
        tags: ''
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "userId": localStorage.getItem('userId'),
            "code": state.code,
            "tags": state.tags.split(" "),
            "likes": [],
        };

        axios.get(API_BASE_URL + '/api/test/user', { headers: { 'x-access-token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then((res) => {
                if(res.status === 200)
                {
                    return axios.post(API_BASE_URL+'/api/snippet/create', payload)
                }
            })
            .then(function (response) {
                if(response.status === 200){
                    redirectToHome();
                    props.showError(null)
                }
            })
            .catch(function (error) {
                if(error) {
                    props.showError("Unauthorized!!!")
                }
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/');
    }


    return(
        <div className="card col-12 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">

                    <label htmlFor="exampleFormControlTextarea1">Paste code snippet below</label>
                    <textarea
                        className="form-control"
                        id="code"
                        rows="15"
                        value={state.code}
                        onChange={handleChange}
                        required={true}>
                    </textarea>



                    <label htmlFor="exampleInputEmail1">Enter tag below separated by space</label>
                    <input type="text"
                           className="form-control"
                           id="tags"
                           placeholder=""
                           value={state.tags}
                           onChange={handleChange}
                           required={true}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Save Snippet</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Go back to </span>
                <span className="loginText" onClick={redirectToHome}>Home page</span>
            </div>
        </div>
    )
}

export default withRouter(CreateSnippet);