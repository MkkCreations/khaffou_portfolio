import React, { useEffect } from "react";

const Presentation = () => {

    useEffect(()=> {
        const doc = document.getElementById("box");

        for (let i = 0; i < 150; i++) {
            let p = document.createElement('p');
            let n = document.createTextNode('');
            
            setTimeout(() => {
                p.style.position = 'relative';
                p.style.left = i + 'px';
                p.appendChild(n);
                doc.appendChild(p);
    
                document.getElementById('counter').innerHTML = Math.floor(i/1.5+1);
            },i * 25)
        }
    
        for (let i = 0; i < 150; i++) {
            let p = document.createElement('p');
            let n = document.createTextNode('');
            
            setTimeout(() => {
                p.style.position = 'relative';
                p.style.left = -i + 'px';
                p.appendChild(n);
                doc.appendChild(p);
            },i * 25)
        }
    }, [])


    return (
        <div className="presentation">
            <span id="counter"></span>
            <div id="box"></div>
        </div>
    )
}

export default Presentation;