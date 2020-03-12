class hoverjs {
    constructor(obj){
        //==>get varable
        let {
            parent,
            children,
            type,
        } = obj;

        //==>set variable
        //parent
        this.ParentQuery      = parent;
        this.ParentElement    = document.querySelector(this.ParentQuery);
        if (!this.ParentElement){
            console.error('parent is null');
            return
        }
        //children
        this.ChildrenQuery    = children;
        this.ChildrenElements = this.ParentElement.querySelectorAll(this.ChildrenQuery);
        if (!this.ChildrenElements[0]){
            console.error('children is null');
            return
        }


        //type
        if ( !type || typeof type !== "string" || ( type !== 'list' && type !== 'tab') ) return ;
        this.type = type;

        if (!this.ParentElement.querySelector('.active_hoverJS_Element')) {
            console.error(`please Enter .active_hoverJS_Element

            <li class="active_hoverJS_Element"></li>
            <li></li>
            <li></li>
            `);
            return;
        }



        //==================
        this.run()

    }

    run(){
        /*1*/ this.create_absolute_Element();
        /*2*/ this.defulte_show()           ;
        /*3*/ this.child_mouseEnter()       ;
        /*4*/ this.parent_mouseLeave()      ;
        /*5*/ this.resizeWindow()           ;
    }
    create_absolute_Element(){
        let abs = document.createElement('div');
        abs.classList.add('hoverJs_Element');
        abs.style.position = 'absolute';
        this.ParentElement.append(abs);
        //===get div
        this.absolute_Element = this.ParentElement.querySelector('.hoverJs_Element');

        this.ParentElement.insertAdjacentHTML('beforeend',`
<style>
    ${this.ParentQuery} ${this.ChildrenQuery}{z-index:2}        
</style>
        `)
    }
    defulte_show(){
        this.ParentElement.style.position  = 'relative';
        this.absolute_Element.style.zIndex = '1';
        this.absolute_Element.classList.add('the_parent_leave');

        let active = this.ParentElement.querySelector('.active_hoverJS_Element');

        this.absolute_Element.style.width  = active.offsetWidth  + 'px' ;
        this.absolute_Element.style.height = active.offsetHeight + 'px' ;
        this.absolute_Element.style.left   = active.offsetLeft   + 'px' ;
        this.absolute_Element.style.top    = active.offsetTop    + 'px' ;
    }
    child_mouseEnter(){
        let abs = this.absolute_Element;
        this.ChildrenElements.forEach(child =>{

            child.addEventListener('mouseenter',function (event) {
                abs.style.width  = event.target.offsetWidth  + 'px';
                abs.style.height = event.target.offsetHeight + 'px';
                abs.style.left   = event.target.offsetLeft   + 'px';
                abs.style.top    = event.target.offsetTop    + 'px';
                abs.classList.remove('the_parent_leave')     ;
                this.classList.add('hover_absolute_Element')       ;
                let all_child = this.parentElement.children        ;

                for(let x in all_child){
                    if (all_child[x].tagName != child.tagName) continue;
                    if (all_child[x] == child) continue;
                    all_child[x].classList.remove('hover_absolute_Element')
                }
            })

            if (this.type == 'tab'){


                child.addEventListener('click',function (event){
                    event.preventDefault();

                    this.classList.add('active_hoverJS_Element');

                    let all_child = this.parentElement.children        ;

                    for(let x in all_child){
                        if (all_child[x].tagName != child.tagName) continue;
                        if (all_child[x] == child) continue;
                        all_child[x].classList.remove('active_hoverJS_Element')
                    }
                })


            }


        })
    }
    parent_mouseLeave(){

        this.ParentElement.addEventListener('mouseleave',()=>{
            let h_remove = this.ParentElement.querySelector(`${this.ChildrenQuery}.hover_absolute_Element`);

            if (h_remove) h_remove.classList.remove('hover_absolute_Element');

            this.defulte_show();
            this.absolute_Element.classList.add('the_parent_leave');
        });
    }
    resizeWindow(){
        window.addEventListener('resize',()=> this.defulte_show())
    }
}








































