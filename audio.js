/* notes: mediaGroup is for linking playback together, e.g. a video with its
          attendant audio stream. basically, it's not at all what we need, so
          leave it null

   notes: while autoplay works, loop only appears to work if 
*/

game.soundtrack = new Audio(); //document.createElement("audio")
game.soundtrack.setAttribute("id", "soundtrack")
game.soundtrack.autoplay = true;

//game.soundtrack.loop = true; //looping unsupported by firefox, buggily supported by chrome (why doesn't it loop if run from http://localhost??)

game.soundtrack.addEventListener('ended', function(){
this.currentTime = 0;
this.play();
}, false);


game.soundeffects = []
for(i=0; i<32; i++)
{
  game.soundeffects.push(document.createElement("audio")) //assumption: loop is false by default
}
