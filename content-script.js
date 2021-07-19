function copyStringToClipboard (str) {
   // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
}
// Create elements to wrap sentences
$('p').each(function() {
      $(this).html($(this).text().split(/([\.\?!])(?= )/).map(
      function(v){return '<span class=sentence>'+v+'</span>'}
   ));
});

/*
We're putting a simple json object with "word" and "sentence" attributes to the clipboard
which will be parsed by ssmtool
*/
$('.sentence').click(function(){
   var s = window.getSelection();
   s.modify('extend','backward','word');        
   var b = s.toString();
   
   s.modify('extend','forward','word');
   while (s.toString().slice(-1) == "-"){
      s.modify('extend','forward','word');
   }
   a = s.toString();
   
   s.modify('move','forward','character');
   word = (b+a).replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
   console.log(word)

   copyobj = {
      "sentence": $(this).text(),
      "word": word
   }

   copyStringToClipboard(JSON.stringify(copyobj));
});
