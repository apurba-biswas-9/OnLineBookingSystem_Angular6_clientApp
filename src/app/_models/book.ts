export class Book {  

    constructor( id: number,
        booksTitle: string,
        bookCategories : number,
        price: string,
        units : number,
        isSelected : boolean  ){

            this.id=id;
            this.booksTitle =booksTitle;
            this.bookCategories = bookCategories;
            this.price = price;            
            this.isSelected = false;
       
    }

   set(B : Book) 
   {
       this.id=B.id;
       this.booksTitle =B.booksTitle;
       this.bookCategories = B.bookCategories;
       this.price = B.price; 
      
       this.isSelected = false;
   

   }

   get () : Book{
 return this;
   }
  
    id: number;
    booksTitle: string;  
    bookCategories : number;
    price: string; 
    units : number;
    isSelected : boolean;
}