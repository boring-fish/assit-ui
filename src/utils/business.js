
export function renderAvatar( item ){
    let avatar = '';
   switch(item.gender){
       case 1:
           avatar=require('@/assets/client-photo-male@2x.png');
           break;
       case 2:
           avatar=require('@/assets/client-photo-female@2x.png');
           break;
       default:
           avatar=require('@/assets/client-photo-unknown@2x.png');
  
   }
   item.identifier = {
       avatar,
   }
  }