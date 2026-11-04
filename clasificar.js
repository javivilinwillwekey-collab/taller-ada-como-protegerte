(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const examples = [
    {id:'azucena',text:'azucenatequiero',kind:'weak',reason:'Une un nombre con una expresión frecuente y tiene 15 caracteres. Ese patrón resulta previsible aunque parezca una frase personal.'},
    {id:'variada',text:'vR7!pL2#sT9@kM4?',kind:'strong',reason:'Tiene 16 caracteres y mezcla los cuatro tipos sin una palabra, fecha o repetición evidente. Sería una buena construcción si se generara al azar y se usara solo en una cuenta.'},
    {id:'mejor',text:'soyelmejor10',kind:'weak',reason:'Tiene 12 caracteres y combina una expresión común con un número al final. Añadir 10 no elimina ese patrón previsible.'},
    {id:'corta',text:'ts.&6+Bu',kind:'weak',reason:'Mezcla mayúsculas, minúsculas, números y símbolos, pero solo tiene 8 caracteres. La variedad no compensa una longitud tan corta.'},
    {id:'palabras',text:'Nuez-Tren-Lago-Faro-8',kind:'strong',reason:'Tiene 21 caracteres y combina cuatro palabras sin formar una frase habitual. Una selección de palabras al azar puede dar longitud y poca previsibilidad; debe ser distinta para cada cuenta.'},
    {id:'repetida',text:'aaaaaaaaaaaaaaaa',kind:'weak',reason:'Tiene 16 caracteres, pero repite siempre la misma letra. La longitud no basta cuando toda la contraseña sigue un único patrón.'}
  ];
  const areas = {bank:$('password-bank'),strong:$('password-strong'),weak:$('password-weak')};
  const cards = new Map();
  const placed = new Map();
  let selected = null, checked = false, drag = null, lastDragId = null, lastDragAt = 0;

  function remaining() {return examples.filter(e => !placed.has(e.id)).length;}
  function announce(message) {$('sort-status').textContent = message;}
  function render() {
    for (const example of examples) {
      const card = cards.get(example.id);
      const destination = placed.get(example.id) || 'bank';
      if (card.parentElement !== areas[destination]) areas[destination].append(card);
      const correct = checked && destination === example.kind;
      card.classList.toggle('sort-selected', selected === example.id);
      card.classList.toggle('sort-right', checked && correct);
      card.classList.toggle('sort-wrong', checked && !correct);
      card.setAttribute('aria-pressed', String(!checked && selected === example.id));
      card.setAttribute('aria-label', example.text + (checked ? (correct ? ' · bien situada' : ' · revisar') + ' · pulsa para ver el motivo' : ' · seleccionar contraseña'));
      card.querySelector('.sort-mark').textContent = checked ? (correct ? '✓' : '↔') : '';
    }
    $('password-bank-wrap').hidden = remaining() === 0;
    $('sort-hint').textContent = checked
      ? 'Pulsa una tarjeta para ver el porqué. Puedes cambiarla de columna.'
      : 'Arrastra cada ejemplo o pulsa una tarjeta y después su columna.';
  }
  function place(id, destination) {
    if (!areas[destination]) return;
    if (destination === 'bank') placed.delete(id); else placed.set(id,destination);
    checked = false; selected = null;
    render();
    const count = remaining();
    announce(count ? `Quedan ${count} ejemplos por clasificar.` : 'Todos colocados. Comprobad vuestra clasificación.');
  }
  function explain(id) {
    const example = examples.find(e => e.id === id);
    const correct = placed.get(id) === example.kind;
    $('sort-why-title').textContent = example.text;
    $('sort-verdict').textContent = (correct ? '✓ Bien situada en ' : '↔ Debe ir en ') + (example.kind === 'strong' ? 'FUERTES' : 'DÉBILES') + ` · ${Array.from(example.text).length} caracteres`;
    $('sort-reason').textContent = example.reason;
    $('sort-why').classList.toggle('weak-example',example.kind === 'weak');
    $('sort-why').showModal();
  }
  function cleanupDrag() {
    if (!drag) return;
    if (drag.card.hasPointerCapture(drag.pointer)) drag.card.releasePointerCapture(drag.pointer);
    drag.ghost?.remove();
    drag.card.classList.remove('sort-drag-origin');
    document.querySelectorAll('.sort-drop-over').forEach(e => e.classList.remove('sort-drop-over'));
    drag = null;
  }
  function pointerMove(event) {
    if (!drag || event.pointerId !== drag.pointer) return;
    if (!drag.ghost && Math.hypot(event.clientX-drag.x,event.clientY-drag.y) < 8) return;
    event.preventDefault();
    if (!drag.ghost) {
      const rect = drag.card.getBoundingClientRect();
      const ghost = drag.card.cloneNode(true);
      ghost.className = 'password-card sort-ghost';
      ghost.removeAttribute('data-sort-password');
      ghost.setAttribute('aria-hidden','true');
      ghost.tabIndex = -1;
      ghost.style.fontSize = getComputedStyle(drag.card).fontSize;
      ghost.style.width = rect.width+'px';
      document.body.append(ghost);
      drag.ghost = ghost;
      drag.card.classList.add('sort-drag-origin');
    }
    drag.ghost.style.left = event.clientX+'px';
    drag.ghost.style.top = event.clientY+'px';
    const target = document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-password-zone]');
    document.querySelectorAll('[data-password-zone]').forEach(e => e.classList.toggle('sort-drop-over',e === target));
  }
  function pointerUp(event) {
    if (!drag || event.pointerId !== drag.pointer) return;
    const id = drag.id;
    const wasDragged = !!drag.ghost;
    const destination = document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-password-zone]')?.dataset.passwordZone;
    cleanupDrag();
    if (wasDragged) {
      lastDragId = id; lastDragAt = Date.now();
      if (destination) place(id,destination);
    }
  }

  for (const example of examples) {
    const card = document.createElement('button');
    card.type = 'button'; card.className = 'password-card'; card.dataset.sortPassword = example.id;
    const code = document.createElement('code'); code.textContent = example.text;
    const mark = document.createElement('span'); mark.className = 'sort-mark'; mark.setAttribute('aria-hidden','true');
    card.append(code,mark); cards.set(example.id,card);
    card.addEventListener('click',() => {
      if (lastDragId === example.id && Date.now()-lastDragAt < 450) return;
      if (checked) {explain(example.id);return;}
      selected = selected === example.id ? null : example.id;
      render();
      announce(selected ? 'Ahora pulsa FUERTES o DÉBILES.' : 'Selecciona otro ejemplo o arrástralo.');
    });
    card.addEventListener('pointerdown',event => {
      if (event.button !== 0 || !event.isPrimary) return;
      cleanupDrag();
      drag = {id:example.id,x:event.clientX,y:event.clientY,pointer:event.pointerId,card,ghost:null};
      card.setPointerCapture(event.pointerId);
    });
    card.addEventListener('pointermove',pointerMove);
    card.addEventListener('pointerup',pointerUp);
    card.addEventListener('pointercancel',cleanupDrag);
  }
  document.querySelectorAll('.password-zone').forEach(zone => {
    zone.addEventListener('click',event => {
      if (event.target.closest('[data-sort-password]') || !selected) return;
      place(selected,zone.dataset.passwordZone);
    });
  });
  $('sort-check').addEventListener('click',() => {
    const count = remaining();
    if (count) {announce(`Quedan ${count} ejemplos sin clasificar. Colocadlos antes de comprobar.`);return;}
    checked = true; selected = null; render();
    const correct = examples.filter(e => placed.get(e.id) === e.kind).length;
    announce(`${correct} de ${examples.length} bien colocadas. Pulsad una tarjeta para descubrir su motivo.`);
  });
  function reset() {
    cleanupDrag(); placed.clear(); selected=null; checked=false; lastDragId=null;
    render(); announce('Seis ejemplos inventados. Decidid y justificad antes de comprobar.');
  }
  $('sort-reset').addEventListener('click',reset);
  $('restart').addEventListener('click',reset);
  reset();
})();
