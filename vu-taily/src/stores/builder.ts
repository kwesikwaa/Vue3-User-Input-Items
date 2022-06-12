import { defineStore } from "pinia";

interface Imageset  {
    title: string;
    // description: string;
    image: string;
}

export const useBuilderStore = defineStore('admin',{

    state:()=>(
        {   
            updated:false,
            header: 'hello, My artz Portfolio site builder',
            footermessage: '(c) 2022 mysitename goes here',
            about: "write a little about yourself and perhaps your contacts etc etc etc bla bla bla bla abala alalalalala",
            image: '../assets/frg.jpg',
            imagesupload: [],
        }
    ),
    actions:{
        save(title:String,about:String,footer:String, images?: Array<Object>){
            this.header = title;
            this.about = about;
            this.footermessage = footer
            this.imagesupload = images
            this.updated = true
            this.savetolocalstorage()
            
        },
        savetolocalstorage(){
            //implement local sotrage of data
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

    }
})