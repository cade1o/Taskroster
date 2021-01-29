    /*

Top menu (task 1.5):

{ title:'Home',         url:'/' }
{ title:'About',        url:'/about' }
{ title:'Contact Us',   url:'/contact' }


Top menu 2 (task 1.7):

{ title:'Home', url:'/', submenus: [] }
{ title:'About', url:'/about', 
    submenus: [
        { title:'Who we are',   url:'/about#us' },
        { title:'What we do',   url:'/about#store' },
        { title:'Our range',     url:'/about#range' }
    ]
}
{ title:'Contact Us',   url:'/contact', 
    submenus: [
        { title:'Information',   url:'/contact#info' },
        { title:'Returns',   url:'/contact#return' },
        { title:'Locate Us',     url:'/contact#locate' }
    ]
}


Stores (task 1.8):

{ name:'Adelaide City',  address:'45 Florabunda Lane, Adelaide, 5000', counter: 0, img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg/320px-11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg' },
{ name:'Steelton South', address:'77 Weigall Avenue, Steelton, 5413',  counter: 0, img:'https://upload.wikimedia.org/wikipedia/commons/4/42/Well-shop-front.jpg' },
{ name:'Milton',         address:'33 McGregor Street, Milton, 5880',   counter: 0, img:'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Greggs_store_front.JPG/320px-Greggs_store_front.JPG' }

*/

var ads = [
    { name:'Drink Dr. Pepper', url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Dr_pepper_king_of_beverages.png/418px-Dr_pepper_king_of_beverages.png' },
    { name:'The Fulton Lewis Show', url:'https://upload.wikimedia.org/wikipedia/commons/c/ca/Mutual_Broadcasting_System_-_Fulton_Lewis_Radio_1940s-1950s_Commercial.jpg' },
    { name:'Clarks Shoes', url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Clarks_US_vintage_Desert_Boot_advert.jpg/433px-Clarks_US_vintage_Desert_Boot_advert.jpg' }
];

var vueinst = new Vue({

 el: '#vuemain',
  data: {
    text: 'Pretty good.',
    image:ads[0],
    showad:true,
    nightmode:false,
    topmenu:[{ title:'Home', url:'/', submenus: [] },
{ title:'About', url:'/about', 
    submenus: [
        { title:'Who we are',   url:'/about#us' },
        { title:'What we do',   url:'/about#store' },
        { title:'Our range',     url:'/about#range' }
    ]
},
{ title:'Contact Us',   url:'/contact', 
    submenus: [
        { title:'Information',   url:'/contact#info' },
        { title:'Returns',   url:'/contact#return' },
        { title:'Locate Us',     url:'/contact#locate' }
    ]
}],
ctext:'type your comment here',
carr:[],
topmenuitem:0,
topmenuhover:false
  }
}); 




