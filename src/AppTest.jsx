import { useRef } from "react"

export function Interface(){
    

    const ref = useRef()


    function Open(){
        ref.current.style.display = 'flex'


        setTimeout(() =>{
            ref.current.style.opacity = '1'

        },100)


    }

    function Close(){
        ref.current.style.opacity = '0'

        setTimeout(() =>{
            ref.current.style.display = 'none'

        },500)

    }

    function Movetosection(value){

        Close()

        switch(value){

            case 1:
                document.querySelectorAll('div').forEach((el,i) =>{
                

                    const mysheetPosition =1.12; // This is the current position

                    // Calculate scroll offset
                    const scrollOffset = (mysheetPosition - 1.4) / 22.5;
                    
                    // Calculate scrollTop
                    const scrollableElement = el;
                    const scrollableHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
                    const scrollTop = scrollOffset * scrollableHeight;
    
                    el.scrollTop = scrollTop

                   })
        
                  

            break;

           
            case 2:

            document.querySelectorAll('div').forEach((el,i) =>{
          

                const mysheetPosition =7; // This is the current position

                // Calculate scroll offset
                const scrollOffset = (mysheetPosition - 1.4) / 22.5;
                
                // Calculate scrollTop
                const scrollableElement = el;
                const scrollableHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
                const scrollTop = scrollOffset * scrollableHeight;

                el.scrollTop = scrollTop


               })

            break;
            
            case 3:

            document.querySelectorAll('div').forEach((el,i) =>{
               
                const mysheetPosition =10; // This is the current position

                // Calculate scroll offset
                const scrollOffset = (mysheetPosition - 1.4) / 22.5;
                
                // Calculate scrollTop
                const scrollableElement = el;
                const scrollableHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
                const scrollTop = scrollOffset * scrollableHeight;

                el.scrollTop = scrollTop


                
               })

            break;

            case 4:

            document.querySelectorAll('div').forEach((el,i) =>{
                
                const mysheetPosition =12.82; // This is the current position

                // Calculate scroll offset
                const scrollOffset = (mysheetPosition - 1.4) / 22.5;
                
                // Calculate scrollTop
                const scrollableElement = el;
                const scrollableHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
                const scrollTop = scrollOffset * scrollableHeight;

                el.scrollTop = scrollTop


              

               })
            
            break;
        }

       
    }

    return(
        <>
 
       <img className="scroll-down-img" src="scroll-logo.png"/>

        <div className="milkbox-points-container">
            <img onClick={() => Movetosection(1)} src="milkbox-logo.png"/>
            <img onClick={() => Movetosection(2)} src="milkbox-logo.png"/>
            <img onClick={() => Movetosection(3)} src="milkbox-logo.png"/>
            <img onClick={() => Movetosection(4)} src="milkbox-logo.png"/>

        </div>

        <i class="menu-btn bi bi-list" onClick={() => Open()}></i>
        <div ref={ref} class="menu-overlay">
       
        <nav class="menu-buttons">
        <button class="close-btn" onClick={() => Close()}>✕</button>
            <a href="#" onMouseEnter={(e) => e.target.children[0].src = 'milkbox-logo-hovered.png'} onMouseLeave={(e) => e.target.children[0].src = 'milkbox-logo.png'} onClick={() => Movetosection(1)}>HOME<img  src="milkbox-logo.png" class="icon" /></a>
            <a href="#" onMouseEnter={(e) => e.target.children[0].src = 'milkbox-logo-hovered.png'} onMouseLeave={(e) => e.target.children[0].src = 'milkbox-logo.png'}  onClick={() => Movetosection(2)}>FACTS<img  src="milkbox-logo.png" class="icon" /></a>
            <a href="#" onMouseEnter={(e) => e.target.children[0].src = 'milkbox-logo-hovered.png'} onMouseLeave={(e) => e.target.children[0].src = 'milkbox-logo.png'}  onClick={() => Movetosection(3)}>NOURISHMENT<img  src="milkbox-logo.png" class="icon"/></a>
            <a href="#" onMouseEnter={(e) => e.target.children[0].src = 'milkbox-logo-hovered.png'} onMouseLeave={(e) => e.target.children[0].src = 'milkbox-logo.png'}  onClick={() => Movetosection(4)}>THE HERD<img src="milkbox-logo.png" class="icon"/></a>
        </nav>
    </div>
    </>

    )
}