import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
// allow us to use/access router
import { withRouter } from 'next/router';

/*=== IMPORT ACTIONS ====*/
// to get a token and send in header
import { getCookie, isAuth } from '../../actions/auth';
// we will load all categiories and tags for a check box
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
/*=== END OF ACTIONS ====*/

// we will be using ReactQuill as a text editor
import dynamic from 'next/dynamic';
// so that it can be use only on client side
// not in the server side

const ReactQuill =dynamic(() => import('quill'), { ssr: false });
import "../../node_modules/quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import '../../node_modules/react-quill/dist/quill.snow.css';


const CreateBlog = ({ router }) => {
  return (
    <div>
      <h2>create blog form</h2>
    </div>
  )
}

export default CreateBlog
