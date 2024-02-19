Welcome to the Modern Application Development - 2 Screencasts. In this screencast we will explore fetch API to request data from the network.

For this you will need 

- Browser Firefox or Chrome
- I am using firefox
- We will also be using online tool - https://httpbin.org for checking our requests.

## Fetch Basic
- Fetch is the modern way of doing AJAX requests

- The simplest use of fetch() takes one argument - URL or the path to the resource.
- It's doing a get


```javascript
fetch("https://httpbin.org/uuid")
  .then(response => response.json())
  .then(data => console.log(data));
```

- Stadard fetch looks like
- `fetch(resource [, init])`
- resource is usally string url or a Resource object
- init - An object containing any custom settings that you want to apply to the request. 
- Parameters
  - https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
- It uses promise
- It does not directly return the JSON response body but instead returns a promise that resolves with a Response object.
- The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.
- You can use
    - Response.arrayBuffer()
      - The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer. You cannot directly manipulate the contents of an ArrayBuffer; instead, you create one of the typed array objects or a DataView object which represents the buffer in a specific format, and use that to read and write the contents of the buffer.
      - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
    - Response.blob()
      - A Blob object represents a file-like object of immutable, raw data. Blob represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.
      - https://developer.mozilla.org/en-US/docs/Web/API/Blob
      - May not have javascript representaion
    - Response.formData()
      - The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values.
      - https://developer.mozilla.org/en-US/docs/Web/API/FormData
      -  It uses the same format a form would use if the encoding type were set to `"multipart/form-data"`.
      - You can also pass it directly to the URLSearchParams constructor if you want to generate query parameters in the way a `<form>` would do if it were using simple GET submission.
    - Response.json()
      - JSON data - javascript object
    - Response.text()
      - text/string
      - The response is always decoded using UTF-8. 

### Refer
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
Promise/promises.png
- Uses promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/

## Error handling
- It won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false),

```javascript
fetch("https://httpbin.org/uuid/404")
  .then(function(response) {
      console.log(response)
      if (!response.ok) {
        console.log("Response not okay");
        //we can throw an error        
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      console.log("Got data", data);
    })
    .catch(function(error) {
      //we can catch and do something
      console.log("IN catch", error);
    });
```

## Sending JSON data

- Set method
- 'Content-Type': 'application/json' if you plan to send JSON
- But you need to stringify the data

```javascript
 data = { "name": "thejeshgn", "city":"Bengaluru" };
  fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

```

## Submitting form
```javascript
form = new FormData(document.getElementById('my-form'));
fetch('https://httpbin.org/post', {
  method: 'POST',
  body: form
});
```



## Uploading file
```javascript
formData = new FormData(document.getElementById('my-form'));

fetch('https://httpbin.org/put', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
})
.catch(error => {
  console.error('Error:', error);
});
```

## Blob
```javascript
console.log ('Starting');
let image;

fetch("https://httpbin.org/image/jpeg").then((response) => {
  console.log("Got it")
  return response.blob();
}).then((myBlob) => {
  console.log(myBlob)
}).catch((error) => {
  console.log('Error: ' + error.message);
});
```

You can create the url and set it as a source to img element

```javascript
  let objectURL = URL.createObjectURL(myBlob);
  image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
```


## Create your on request and headers
```javascript
const myHeaders = new Headers();
myHeaders = {'Content-Type': 'application/json'}

const myRequest = new Request(URL, {
  method: 'post',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
});


fetch(myRequest)
  .then(response => response.json())
  .then(data => console.log(data));
```



# Using Await
```javascript
response = await fetch("https://httpbin.org/uuid");
data = await response.json()
console.log(data)
```

# Others
- https://github.com/mdn/fetch-examples
