import { defineStore } from "pinia";

interface Imageset  {
    title: string;
    // description: string;
    image: string;
    todisk: string;
}

export const useBuilderStore = defineStore('admin',{

    state:()=>(
        {   
            updated:false,
            header: 'hello, My artz Portfolio site builder',
            footermessage: '(c) 2022 mysitename goes here',
            about: "write a little about yourself and perhaps your contacts etc etc etc bla bla bla bla abala alalalalala",
            image: '../assets/frg.jpg',
            imagesupload: [] ,
        }
    ),
    actions:{
        save(title:String,about:String,footer:String, images?: Imageset[]){
            
            this.header = title;
            this.about = about;
            this.footermessage = footer
            this.imagesupload = images
            this.updated = true
            localStorage.setItem("saved",JSON.stringify(
                {
                    images: this.imagesupload,
                    header: title,
                    about: about,
                    footermessage: footer,
                }
            ))
        },
        setupdate(){
            this.updated = !this.updated
        },
       
        setheader(header: String){
            // this.header = header;
            console.log('hi')
        },
        setimage(image: String){
            this.image = image;
        },
        addimages(here: String[]){
            here.forEach(element => {
                this.imagesupload.push(element);
            });
            here.reverse();
        },
        clear(){
            this.imagesupload = [];
        },
        remove(which: Number){
            for(var i=0; i<this.imagesupload.length; i++){
                if(this.imagesupload[i]==which){
                    this.imagesupload.splice(i,1)
                }
                break
            }
        }

    },
    getters:{
        getimagelist:(state)=>{
            console.log('inside getters')
            let temp = state.imagesupload
            console.log(temp)            
            console.log(temp.reverse())
            return temp.reverse()
            
        }
    },
   
})