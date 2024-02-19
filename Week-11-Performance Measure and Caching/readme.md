# Measuring and improving performance

Welcome to the Modern Application Development - 2 Screencasts. In this screencast we will see how to measure and improve perormance.

- You will need Linux env
- You will have to install and run the Redis. We are going to use it. 


# Introduction
It's a vast subject. And there are many areas in an application that you can work on to improve the performance of an application. We are going to look at some of the basic ones so you get a starting point.

## Organize

## Server side

### Measurement

```python
from time import perf_counter
from time import perf_counter_ns
```
- line profile - https://github.com/pyutils/line_profiler
- Memory profile - https://pypi.org/project/memory-profiler/

### Fixing
- Caching
- Fixing queries (explain, indexes)

## Client side 

### Measurement
    - Rendering
    - Loading
    - Perfomance tab

### Client side Fixing

- Compression (gzip)
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
    - The Accept-Encoding request HTTP header indicates the content encoding (usually a compression algorithm) that the client can understand. The server uses content negotiation to select one of the proposal and informs the client of that choice with the Content-Encoding response header.
    - https://www.giftofspeed.com/gzip-test/
- Client Caching control
    - cache-control
        - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
    - If-Modified-Since
        - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since
    - ETag
        - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
        - if-none-match
