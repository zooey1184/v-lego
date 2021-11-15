```html

<g-button type="primary" id='confirm' name='helo'>点击确定</g-button>

```

```js
function $$(name) {
  return document.getElementById(name)
}
function $e(el, name, cb) {
  el.addEventListener(name, e => {
    const payload = e.detail
    cb && cb(payload)
  })
}
window.onload = () => {
  $e($$('confirm'), 'click', (e) => {
    console.log(e)
  })
};
```