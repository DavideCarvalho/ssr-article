require('@skatejs/ssr/register');
const render = require('@skatejs/ssr');
const { props, withComponent } = require('skatejs/dist/node/index');
const express = require('express');
const PORT = 3000;
const app = express();
app.get('/api/first', (req, res) => {
  class Skate extends withComponent() {
    render() {
      return `Olá Mundo do component renderizado via SSR do SkateJS!`;
    }
  }
  customElements.define('x-skate', Skate);
  render(new Skate())
    .then((component) => res.send(component));
})
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/public` });
});
app.listen(PORT, () => console.log(`App running on port ${PORT}`));