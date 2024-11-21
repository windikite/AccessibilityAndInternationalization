My 51st assignment! In this project, I upgrade the 50th assignment (the optimized data fetching blog) to be compliant with ARIA and improve the usability of the site for screen readers. Additionally, I implemented internationalization so that the site's language can be freely and easily changed.

For accessibility I had the following concerns:  
1. Ensure that the post content could be read by screen readers.    
2. Ensure that it was easy to sequentially navigate down the page via keyboard.  
3. Ensure that buttons would state their purpose.  
4. Ensure that forms could be navigated and each input would state what was needed.  

Thankfully, modern screen readers do a lot of work here as long as you are correctly labeling things and using the right HTML elements. To quote the mdn web docs, 'Developers should always prefer using the correct semantic HTML element over using ARIA'. Using the correct element such as nav will automatically communicate the correct information to the screen reader. I tested this to be working, and in the f12 inspector even a react navbar will render simply as a nav element making this easy.  

As for labeling, I made sure that my login and post forms were correctly labeled so as to make it easier on users with screen readers. There are no images on the site right now, but if there were then that would necessitate alt text as well.

Lastly, I set up internationalization so that you can choose between english and japanese for the site language. I did my best to create sensible translations for the words/actions in japanese, so it should be roughly navigable by someone using it. Translations were made using my own knowledge, jisho.org and searching for common ways of expressing the particular concept.