import React from 'react';
import { Link } from 'react-router-dom';

export const Lateral = () => {
    return (
        <div className='lateral'>
            <a href='https://github.com/MkkCreations'>
                <img src="https://img.icons8.com/ios/30/b9cfea/github.png" alt='GitHub' />
                <span>GitHub</span>
            </a>
            <a href='https://fr.linkedin.com/in/mohamed-khaffou-khaffou-b7b348208?trk=people-guest_people_search-card'>
                <img src="https://img.icons8.com/ios/30/b9cfea/linkedin.png" alt='Linkedin' />
                <span>Linkedin</span>
            </a>
            <Link to='/Contact'>
                <img src="https://img.icons8.com/ios/30/b9cfea/email.png" alt='Email' />
                <span>Email</span>
            </Link>
            <Link to='/Contact'>
                <img src="https://img.icons8.com/ios/30/b9cfea/phone.png" alt='Phone' />
                <span>Phone</span>
            </Link>
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
        </div>
    );
}