import accounting from 'accounting';
window._ = require('lodash');
window.Benchmark = require('benchmark');
import * as tickets from './ticket-rendering/bundle';
import * as todos from './todos-rendering/bundle';
import * as singlePoint from './single-point-rendering/bundle';

window.firstRendeing = function firstRendeing() {
  run(tickets.getSuite1(new Benchmark.Suite()));
}

window.repeatedRendering = function repeatedRendering() {
  run(tickets.getSuite2(new Benchmark.Suite()));
}

window.todosRendering = function todosRendering() {
  //todos.test();
  run(todos.getSuite1(new Benchmark.Suite()));
}

window.singlePointRendering = function singlePointRendering() {
  run(singlePoint.getSuite1(new Benchmark.Suite()));
}

function run(suite) {
  let data = {
    title: getBrowser(),
    rows: []
  };
  suite
    .on('cycle', function onCycle({target}) {
      let hz = target.hz;
      let {rme, sample} = target.stats;
      data.rows.push({
        name: target.name, hz, rme, sample: sample.length
      });
    })
    .on('complete', function onComplete() {
      console.log(JSON.stringify(data));
      print(template([data]));
      print(`Fastest is <b>${this.filter('fastest').map('name')}</b>`);
    });

  print('Starting tests...');

  setTimeout(() => {
    suite.run({async: true});
  }, 500);
}

window.template = function template(data) {
  let max = 0;
  for (let result of data) {
    for(let row of result.rows) {
      if (max < row.hz) {
        max = row.hz;
      }
    }
  }

  return data.map(({title, rows}) => `
    <section>
      <h3>${title}</h3>
      ${rows.map(({name, hz, rme, sample}) => `
        <div class="line ${name.toLowerCase().replace(' ', '-')}" style="width: ${100 * hz / max}%;">
            <small>
              <b>${name}</b>
              ${accounting.formatNumber(hz, hz < 100 ? 2 : 0, ' ')} op/sec
              ±${rme.toFixed(2)}% (${sample} runs sampled)
            </small>
        </div>
      `).join(``)}
    </section>
  `).join(``);
}

window.print = function print(message) {
  let div = document.createElement('div');
  div.innerHTML = message;
  document.body.appendChild(div);
}

function getBrowser() {
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}
