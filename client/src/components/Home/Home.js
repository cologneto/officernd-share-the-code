import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'

function Home(props) {

    return(
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);