let copyStringToClipboard = str => {
  // Create new element
  var el = document.createElement('textarea');
  
  // Set value (string to be copied)
  el.value = str;

  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);

  // Select text inside element
  el.select();

  // Copy text to clipboard
  document.execCommand('copy');

  // Remove temporary element
  document.body.removeChild(el);
}

// Create elements to wrap sentences
$('p').each(() => {
  $(this).html(
    $(this).text()
      .split(/([\.\?!])(?= )/)
      .map(v => '<span class=sentence>' + v + '</span>')
  );
});

/*
We're putting a simple json object with "word" and "sentence" attributes to the clipboard
which will be parsed by ssmtool
*/
$('.sentence').click(() => {
  chrome.storage.sync.get(['enableSSM'], res => {
    if (!res.enableSSM) return;

    let selection = window.getSelection();
    selection.modify('extend','backward','word');        
    let a = selection.toString();
          
    selection.modify('extend','forward','word');
    while (selection.toString().slice(-1) == "-") {
       selection.modify('extend','forward','word');
    }
    let b = selection.toString();
  
    selection.modify('move','forward','character');
    word = (b + a).replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "");
    console.log(word);

    copyobj = {
      "sentence": $(this).text(),
      "word": word
    };

    copyStringToClipboard(JSON.stringify(copyobj));
  });
});
