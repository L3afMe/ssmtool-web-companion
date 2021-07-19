# WebExtension for ssmtool
This extension directly sends both the word and sentence to [ssmtool](https://github.com/FreeLanguageTools/) when you click on a word in your browser page.

When you click on any word on a page in a `<p>` tag, this extension copies the following to the clipboard:
```
{
    word: <word>,
    sentence: <sentence>
}
```
When this information is received by ssmtool, the appropriate fields will be filled, providing a seamless card-creation experience.