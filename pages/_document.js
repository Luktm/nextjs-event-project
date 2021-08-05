// allow us customize entire html document
import Document, { Html, Head, Main, NextScript } from 'next/document';

// this alter the whole document properties from _app.js, so please follow the code below, else it will affect the _app.js incorrectly
// see the change by open elements dev tool in chrome
/**
 * html
 * head
 * body
 * main
 */
class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head/>
                <body>
                    <div id="overlays"></div>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }

}

export default MyDocument;