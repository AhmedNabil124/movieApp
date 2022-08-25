import React from 'react'
import notfoundStyle from './notfound.module.css';

export default function Notfound() {
  return (
    <div className={`${notfoundStyle.container} container`}>
        <div className="row">
            <div className="col-md-12">
                <h1 className={`${notfoundStyle.notfound} pb-5`}>Page Not Found</h1>
                <p className='lead pb-5'>We couldn't find what you were looking for.</p>
                <p>Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</p>
            </div>
        </div>
      </div>
  )
}
