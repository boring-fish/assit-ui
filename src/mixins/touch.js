import { getScroller } from '../utils/utils.js';

// const MIN_DISTANCE = 10;

// function getDirection(x, y) {
//   if (x > y && x > MIN_DISTANCE) {
//     return 'horizontal';
//   }

//   if (y > x && y > MIN_DISTANCE) {
//     return 'vertical';
//   }

//   return '';
// }

// export const TouchMixin = {
//   data() {
//     return { direction: '' };
//   },

//   methods: {
//     touchStart(event) {
//       this.resetTouchStatus();
//       this.startX = event.touches[0].clientX;
//       this.startY = event.touches[0].clientY;
//     },

//     touchMove(event) {
//       const touch = event.touches[0];
//       this.deltaX = touch.clientX - this.startX;
//       this.deltaY = touch.clientY - this.startY;
//       this.offsetX = Math.abs(this.deltaX);
//       this.offsetY = Math.abs(this.deltaY);
//       this.direction =
//         this.direction || getDirection(this.offsetX, this.offsetY);
//     },

//     resetTouchStatus() {
//       this.direction = '';
//       this.deltaX = 0;
//       this.deltaY = 0;
//       this.offsetX = 0;
//       this.offsetY = 0;
//     },

//     bindTouchEvent(el) {
//       const { onTouchStart, onTouchMove, onTouchEnd } = this;

//       on(el, 'touchstart', onTouchStart);
//       on(el, 'touchmove', onTouchMove);

//       if (onTouchEnd) {
//         on(el, 'touchend', onTouchEnd);
//         on(el, 'touchcancel', onTouchEnd);
//       }
//     },
//   },
// };



export const HeaderPositionMixin = {
    data(){
      return {
        fixedStyle: false,
        startY: 0,
        scroller: null,
      }
    },
    methods: {
      onTouchStart(event){
        this.startY = event.touches[0].clientY;
      },
      onTouchMove(event){
          const deltaY = event.touches[0].clientY - this.startY;
          // console.log(this.scroller.pageYOffset)
        
          if( deltaY < 0 &&  this.fixedStyle ){
              this.fixedStyle = false;
              return;

          }
          if( deltaY > 0 &&  !this.fixedStyle){
              this.fixedStyle = true;
              return;

          }
      
      },
      onTouchEnd (){
          if( this.scroller.pageYOffset <= 0  &&  this.fixedStyle ){
              // console.log('执行了')
              this.fixedStyle = false;
              return;
          }
      }
    
      },
      mounted(){
       setTimeout(()=>{
         const scroller = this.$refs.scroller.$el? this.$refs.scroller : this.$refs.scroller[0];
         this.scroller = scroller.scroller;
        console.log(this.scroller, 'this.$refs.scroller')
        if (!this.scroller) {
          this.scroller = getScroller(scroller.$el);
        }
        this.scroller.addEventListener('touchstart',this.onTouchStart);
        this.scroller.addEventListener('touchmove',this.onTouchMove);
        this.scroller.addEventListener('touchend',this.onTouchEnd);
       }, 0);
          

      },
      beforeDestroy(){
          this.scroller.removeEventListener('touchstart',this.onTouchStart);
          this.scroller.removeEventListener('touchmove',this.onTouchMove);
          this.scroller.removeEventListener('touchend',this.onTouchEnd);
    }
}
