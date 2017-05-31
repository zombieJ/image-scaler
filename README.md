# image-scaler
A module for electron image scale.


## Init
Use one of then to create a `scaler`:
```javascript
scaler = Scaler.fromBlob(blob);
```
```javascript
scaler = Scaler.fromArrayBuffer(arrayBuffer);
```
```javascript
scaler = Scaler.fromBuffer(buffer);
```

### Fill Canvas
```javascript
scaler.scale(scaleX, scaleY?, $canvasElement?);
```

### Get Data
```javascript
const arrayBufferPromise = scaler.toArrayBuffer(scaleX, scaleY?);
```
```javascript
const dataUrlPromise = scaler.toDataUrl(scaleX, scaleY?, type?);
```
